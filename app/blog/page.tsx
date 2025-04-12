import { Metadata } from "next"
import Header from "@/components/molecules/header"
import Footer from "@/components/molecules/footer"
import BlogPostsList from "@/components/organisms/blog-posts-list"
import CTASection from "@/components/organisms/cta-section"
import { getPosts } from "@/lib/ghost"

export const metadata: Metadata = {
  title: "Blog | IntegriGuard",
  description: "Artigos sobre segurança da informação, LGPD e compliance.",
}

export const revalidate = 3600 * 6 // Revalidar a cada 6 horas

interface Post {
  id: string
  title: string
  excerpt: string
  feature_image: string
  slug: string
  tags?: Array<{ name: string }>
}

export default async function BlogPage() {
  let initialPosts: Post[] = []
  
  try {
    const posts = await getPosts({ limit: 10 })
    initialPosts = posts.map(post => ({
      id: post.id,
      title: post.title,
      excerpt: post.excerpt,
      feature_image: post.feature_image,
      slug: post.slug,
      tags: post.tags,
    }))
  } catch (error) {
    console.error("Erro ao buscar posts:", error)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header currentPath="/blog" />

      <main className="container mx-auto px-4 py-16 flex-grow">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Blog</h1>
        </div>
        <BlogPostsList initialPosts={initialPosts} showTitle={false} />
      </main>

      <CTASection />

      <Footer />
    </div>
  )
}
