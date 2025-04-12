import Image from "next/image"
import Link from "next/link"

interface Tag {
  id: string
  name: string
}

interface BlogPostCardProps {
  id: string
  title: string
  excerpt?: string
  imageUrl: string
  tags?: Tag[]
  slug: string
}

export default function BlogPostCard({ id, title, excerpt, imageUrl, tags = [], slug }: BlogPostCardProps) {
  return (
    <article className="bg-white/30 backdrop-blur-sm rounded-lg overflow-hidden shadow-sm border border-gray-100 transition-all hover:shadow-md h-full">
      <Link href={`/blog/${slug}`} className="block">
        <div className="relative h-48 w-full">
          <Image src={imageUrl || "/placeholder.svg"} alt={title} fill className="object-cover" />
        </div>
      </Link>

      <div className="p-5">
        <Link href={`/blog/${slug}`} className="block">
          <h3 className="text-xl font-semibold mb-2 hover:text-orange-500 transition-colors">{title}</h3>
        </Link>

        {excerpt && <p className="text-gray-600 mb-4 line-clamp-2">{excerpt}</p>}

        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Link
                key={tag.id}
                href={`/blog/tag/${tag.id}`}
                className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-full hover:bg-orange-200 transition-colors"
              >
                {tag.name}
              </Link>
            ))}
          </div>
        )}
      </div>
    </article>
  )
}
