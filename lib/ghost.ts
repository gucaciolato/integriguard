import { formatDistanceToNow } from "date-fns"
import { ptBR } from "date-fns/locale"

// Cache simples para armazenar resultados de requisições
const cache: Record<string, { data: any; timestamp: number }> = {}
const CACHE_TTL = 5 * 60 * 1000 // 5 minutos em milissegundos
const MAX_RETRIES = 3
const RETRY_DELAY = 1000 // 1 segundo

// Telemetria para monitorar a saúde da integração
const telemetry = {
  totalRequests: 0,
  failedRequests: 0,
  lastError: null as Error | null,
  lastSuccess: null as Date | null,
}

// Configuração da API do Ghost
const GHOST_API_URL = process.env.GHOST_API_URL || "https://ghost.integriguard.com.br"
const GHOST_API_KEY = process.env.GHOST_CONTENT_API_KEY || "e03e62aeb6465ecd2762065b4d"

// Função para fazer requisições à API do Ghost
async function fetchGhostAPI(endpoint: string, params: Record<string, string | number> = {}) {
  const url = new URL(`${GHOST_API_URL}/ghost/api/content/${endpoint}`)
  url.searchParams.append("key", GHOST_API_KEY)
  
  // Adicionar parâmetros padrão
  const defaultParams = {
    include: "tags,authors",
    fields: "id,title,slug,feature_image,excerpt,published_at,reading_time,html,primary_author",
  }
  
  // Adicionar todos os parâmetros à URL
  Object.entries({ ...defaultParams, ...params }).forEach(([key, value]) => {
    url.searchParams.append(key, String(value))
  })

  const response = await fetch(url.toString())
  if (!response.ok) {
    throw new Error(`Erro na requisição: ${response.status} ${response.statusText}`)
  }
  return response.json()
}

// Função de retry para tentar novamente em caso de falha
async function withRetry<T>(fn: () => Promise<T>, retries = MAX_RETRIES): Promise<T> {
  try {
    return await fn()
  } catch (error) {
    if (retries > 0) {
      console.log(`Tentativa falhou, tentando novamente em ${RETRY_DELAY}ms... (${retries} tentativas restantes)`)
      await new Promise(resolve => setTimeout(resolve, RETRY_DELAY))
      return withRetry(fn, retries - 1)
    }
    throw error
  }
}

// Função para buscar posts
export async function getPosts(options: { page?: number; limit?: number } = {}): Promise<any[]> {
  telemetry.totalRequests++
  try {
    const cacheKey = `posts-${JSON.stringify(options)}`
    const cachedPosts = cache[cacheKey]
    
    if (cachedPosts && Date.now() - cachedPosts.timestamp < CACHE_TTL) {
      console.log("Usando dados em cache para posts")
      return cachedPosts.data
    }

    const { posts } = await withRetry(() => fetchGhostAPI("posts/", {
      page: options.page || 1,
      limit: options.limit || 10,
    }))

    cache[cacheKey] = {
      data: posts,
      timestamp: Date.now(),
    }
    
    telemetry.lastSuccess = new Date()
    return posts
  } catch (err: any) {
    telemetry.failedRequests++
    console.error("Erro ao buscar posts:", err)
    
    // Se houver dados em cache, mesmo que expirados, use-os
    const cachedPosts = cache[`posts-${JSON.stringify(options)}`]
    if (cachedPosts) {
      console.log("Usando dados em cache expirados devido ao erro")
      return cachedPosts.data
    }
    
    return []
  }
}

// Função para buscar um post específico pelo slug
export async function getPostBySlug(slug: string): Promise<any | null> {
  telemetry.totalRequests++
  try {
    const cacheKey = `post-${slug}`
    const cachedPost = cache[cacheKey]
    
    if (cachedPost && Date.now() - cachedPost.timestamp < CACHE_TTL) {
      console.log(`Usando dados em cache para post ${slug}`)
      return cachedPost.data
    }

    const { posts } = await withRetry(() => fetchGhostAPI("posts/slug/" + slug))
    
    if (!posts || posts.length === 0) {
      return null
    }

    const post = posts[0]
    cache[cacheKey] = {
      data: post,
      timestamp: Date.now(),
    }
    
    telemetry.lastSuccess = new Date()
    return post
  } catch (err: any) {
    telemetry.failedRequests++
    console.error(`Erro ao buscar post ${slug}:`, err)
    
    // Se houver dados em cache, mesmo que expirados, use-os
    const cachedPost = cache[`post-${slug}`]
    if (cachedPost) {
      console.log(`Usando dados em cache expirados para post ${slug}`)
      return cachedPost.data
    }
    
    return null
  }
}

// Função para testar a conexão com o Ghost
export async function testGhostConnection() {
  telemetry.totalRequests++
  try {
    const result = await fetchGhostAPI("posts/", { limit: 1 })
    telemetry.lastSuccess = new Date()
    console.log("Conexão com Ghost bem-sucedida:", result)
    return { success: true, data: result }
  } catch (error) {
    telemetry.failedRequests++
    telemetry.lastError = error as Error
    console.error("Erro na conexão com Ghost:", error)
    return { success: false, error }
  }
}

// Função para obter estatísticas da integração
export function getGhostTelemetry() {
  return {
    ...telemetry,
    successRate: telemetry.totalRequests > 0 
      ? ((telemetry.totalRequests - telemetry.failedRequests) / telemetry.totalRequests) * 100 
      : 0,
  }
}
