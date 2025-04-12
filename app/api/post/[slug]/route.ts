import { NextResponse } from "next/server"
import { getPostBySlug } from "@/lib/ghost"

export async function GET(request: Request, { params }: { params: { slug: string } }) {
  const slug = params.slug

  try {
    const post = await getPostBySlug(slug)

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 })
    }

    return NextResponse.json(post)
  } catch (error) {
    console.error(`Error fetching post with slug ${slug}:`, error)

    // Retornar um post de fallback em caso de erro
    const fallbackPost = {
      id: slug,
      title: "Conteúdo temporariamente indisponível",
      slug: slug,
      feature_image: "/placeholder.svg?height=600&width=1200",
      excerpt: "Estamos enfrentando problemas técnicos. Por favor, tente novamente mais tarde.",
      html: "<p>Estamos enfrentando problemas técnicos ao carregar este conteúdo. Por favor, tente novamente mais tarde.</p>",
      published_at: new Date().toISOString(),
      reading_time: 1,
      tags: [{ id: "erro", slug: "erro", name: "Erro" }],
      primary_author: {
        id: "1",
        name: "Sistema",
        slug: "sistema",
        profile_image: "/placeholder.svg?height=100&width=100",
        bio: "Mensagem automática do sistema",
      },
    }

    return NextResponse.json(fallbackPost)
  }
}
