import { NextResponse } from "next/server"
import { getPosts } from "@/lib/ghost"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const page = Number.parseInt(searchParams.get("page") || "1", 10)
  const limit = Number.parseInt(searchParams.get("limit") || "9", 10)
  const tag = searchParams.get("tag")
  const author = searchParams.get("author")

  try {
    let result: any = { posts: [], meta: { pagination: { pages: 1, total: 0 } } }

    if (tag) {
      // Importar dinamicamente para evitar problemas de SSR
      const { getPostsByTag } = await import("@/lib/ghost")
      result = await getPostsByTag(tag, page, limit)
    } else if (author) {
      // Importar dinamicamente para evitar problemas de SSR
      const { getPostsByAuthor } = await import("@/lib/ghost")
      result = await getPostsByAuthor(author, page, limit)
    } else {
      result = await getPosts(page, limit)
    }

    // Verificar se o resultado tem o formato esperado e garantir uma estrutura consistente
    if (!result) {
      throw new Error("Resposta nula da API do Ghost")
    }

    // Garantir que posts seja sempre um array, mesmo que venha como undefined
    const posts = Array.isArray(result.posts) ? result.posts : []

    // Garantir que meta.pagination exista com valores padrão se necessário
    const pagination = result.meta?.pagination || { pages: 1, total: posts.length }

    // Retornar uma estrutura consistente
    return NextResponse.json({
      posts,
      meta: { pagination },
    })
  } catch (error) {
    console.error("Error fetching posts:", error)

    // Retornar dados de fallback em caso de erro
    const fallbackPosts = [
      {
        id: "1",
        title: "Como proteger sua empresa contra ataques cibernéticos",
        slug: "como-proteger-empresa-ataques-ciberneticos",
        feature_image: "/placeholder.svg?height=400&width=600",
        excerpt: "Descubra as melhores práticas para proteger sua empresa contra ameaças digitais.",
        published_at: new Date().toISOString(),
        reading_time: 5,
        tags: [
          { id: "seguranca", slug: "seguranca", name: "Segurança" },
          { id: "empresas", slug: "empresas", name: "Empresas" },
        ],
        primary_author: {
          id: "1",
          name: "Admin",
          slug: "admin",
          profile_image: "/placeholder.svg?height=100&width=100",
          bio: "Administrador do blog",
        },
      },
      {
        id: "2",
        title: "LGPD: O que sua empresa precisa saber",
        slug: "lgpd-o-que-sua-empresa-precisa-saber",
        feature_image: "/placeholder.svg?height=400&width=600",
        excerpt: "Um guia completo sobre a Lei Geral de Proteção de Dados e como se adequar.",
        published_at: new Date().toISOString(),
        reading_time: 8,
        tags: [
          { id: "lgpd", slug: "lgpd", name: "LGPD" },
          { id: "compliance", slug: "compliance", name: "Compliance" },
        ],
        primary_author: {
          id: "1",
          name: "Admin",
          slug: "admin",
          profile_image: "/placeholder.svg?height=100&width=100",
          bio: "Administrador do blog",
        },
      },
      {
        id: "3",
        title: "5 ferramentas essenciais para monitoramento de segurança",
        slug: "5-ferramentas-essenciais-monitoramento-seguranca",
        feature_image: "/placeholder.svg?height=400&width=600",
        excerpt: "Conheça as ferramentas que não podem faltar na sua estratégia de segurança.",
        published_at: new Date().toISOString(),
        reading_time: 6,
        tags: [
          { id: "ferramentas", slug: "ferramentas", name: "Ferramentas" },
          { id: "monitoramento", slug: "monitoramento", name: "Monitoramento" },
        ],
        primary_author: {
          id: "1",
          name: "Admin",
          slug: "admin",
          profile_image: "/placeholder.svg?height=100&width=100",
          bio: "Administrador do blog",
        },
      },
    ]

    return NextResponse.json({
      posts: fallbackPosts,
      meta: { pagination: { pages: 1, total: fallbackPosts.length } },
    })
  }
}
