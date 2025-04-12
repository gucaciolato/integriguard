import { Metadata } from "next"
import Header from "@/components/molecules/header"
import Footer from "@/components/molecules/footer"
import Hero from "@/components/organisms/hero"
import CTASection from "@/components/organisms/cta-section"
import BlogPostsList from "@/components/organisms/blog-posts-list"
import { getPosts } from "@/lib/ghost"
import ServicesSection from "@/components/organisms/services-section"

export const metadata: Metadata = {
  title: "IntegriGuard | Soluções em Desenvolvimento Web",
  description: "Desenvolvimento de sites, aplicações web e soluções personalizadas para o seu negócio.",
}

interface Post {
  id: string
  title: string
  excerpt: string
  feature_image: string
  slug: string
  tags?: Array<{ name: string }>
}

export default async function Home() {
  let initialPosts: Post[] = []
  
  try {
    const posts = await getPosts({ limit: 3 })
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
      <Header currentPath="/" />

      <main className="flex-grow">
        <Hero 
          title="Transforme suas ideias em soluções digitais inovadoras"
          subtitle="Desenvolvimento web, consultoria em TI e segurança da informação para impulsionar seu negócio"
        />

        <ServicesSection />

        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Últimos Posts</h2>
            <BlogPostsList initialPosts={initialPosts} showTitle={false} />
          </div>
        </section>

        <CTASection />
      </main>

      <Footer />
    </div>
  )
}
