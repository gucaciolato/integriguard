import { Metadata } from "next"
import { notFound } from "next/navigation"
import { getPostBySlug, getPosts } from "@/lib/ghost"
import Image from "next/image"
import Header from "@/components/molecules/header"
import Footer from "@/components/molecules/footer"

interface PostPageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const post = await getPostBySlug(params.slug)

  if (!post) {
    return {
      title: "Post não encontrado",
      description: "O post solicitado não foi encontrado.",
    }
  }

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [
        {
          url: post.feature_image,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
  }
}

export default async function PostPage({ params }: PostPageProps) {
  const post = await getPostBySlug(params.slug)
  const posts = await getPosts()
  const otherPosts = posts.filter(p => p.slug !== params.slug).slice(0, 3)

  if (!post) {
    notFound()
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header currentPath={`/blog/${params.slug}`} />
      
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-2/3">
              <div className="mb-6">
                <a href="/blog" className="inline-flex items-center text-blue-600 hover:text-blue-800">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Voltar para o Blog
                </a>
              </div>
              
              <article className="prose prose-lg max-w-none">
                <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
                {post.feature_image && (
                  <img
                    src={post.feature_image}
                    alt={post.title}
                    className="w-full h-auto rounded-lg mb-8"
                  />
                )}
                <div className="flex gap-2 mb-6">
                  {post.tags?.map((tag) => (
                    <span
                      key={tag.slug}
                      className="bg-gray-100 text-gray-800 text-sm px-3 py-1 rounded-full"
                    >
                      {tag.name}
                    </span>
                  ))}
                </div>
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-8 shadow-sm" dangerouslySetInnerHTML={{ __html: post.html || '' }} />
              </article>
            </div>

            <div className="md:w-1/3">
              <div className="sticky top-8">
                <h3 className="text-xl font-bold mb-4">Outros Posts</h3>
                <div className="space-y-4">
                  {otherPosts.map((post) => (
                    <a
                      key={post.slug}
                      href={`/blog/${post.slug}`}
                      className="block p-4 border rounded-lg hover:shadow-lg transition-shadow"
                    >
                      {post.feature_image && (
                        <img
                          src={post.feature_image}
                          alt={post.title}
                          className="w-full h-40 object-cover rounded-lg mb-2"
                        />
                      )}
                      <h4 className="font-semibold text-lg">{post.title}</h4>
                      <p className="text-gray-600 text-sm mt-2">{post.excerpt}</p>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
