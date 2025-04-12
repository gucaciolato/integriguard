import AuthorProfileTemplate from "@/components/templates/author-profile-template"

interface AuthorProfilePageProps {
  params: {
    id: string
  }
}

export default function AuthorProfilePage({ params }: AuthorProfilePageProps) {
  // Em um cenário real, você buscaria os dados do autor com base no ID
  // Aqui estamos usando dados de exemplo
  const author = {
    id: params.id,
    name: "Ana Silva",
    username: "anasilva",
    avatar: "/placeholder.svg?height=200&width=200",
    coverImage: "/placeholder.svg?height=600&width=1200",
    bio: "Especialista em marketing digital e criação de conteúdo. Ajudo empreendedores e criadores a amplificar sua presença online através de estratégias eficientes de conteúdo.",
    location: "São Paulo, Brasil",
    website: "https://anasilva.com.br",
    joinedAt: "2023-05-15T10:30:00Z",
    stats: {
      followers: 1248,
      following: 356,
      posts: 47,
    },
    socialLinks: [
      { type: "whatsapp", url: "https://wa.me/5511999999999" },
      { type: "x", url: "https://x.com/anasilva" },
      { type: "instagram", url: "https://instagram.com/anasilva" },
      { type: "linkedin", url: "https://linkedin.com/in/anasilva" },
      { type: "github", url: "https://github.com/anasilva" },
      { type: "email", url: "mailto:ana@blogforge.com.br" },
    ],
    supporters: [
      {
        id: "supporter1",
        name: "TechCorp Solutions",
        logo: "/placeholder.svg?height=48&width=48",
        website: "https://techcorp.com",
      },
      {
        id: "supporter2",
        name: "Digital Marketing Pro",
        logo: "/placeholder.svg?height=48&width=48",
        website: "https://dmkpro.com",
      },
    ],
    acceptingSupport: true,
    posts: [
      {
        id: "1",
        title: "Como criar um blog de sucesso em 2025",
        slug: "como-criar-blog-sucesso-2025",
        excerpt: "Descubra as melhores práticas para criar e manter um blog de sucesso no próximo ano.",
        imageUrl: "/placeholder.svg?height=400&width=600",
        publishedAt: "2025-01-15T10:30:00Z",
        tags: [
          { id: "blogging", name: "Blogging" },
          { id: "marketing", name: "Marketing" },
        ],
      },
      {
        id: "2",
        title: "10 dicas para melhorar o SEO do seu blog",
        slug: "10-dicas-melhorar-seo-blog",
        excerpt: "Aprenda técnicas eficientes para otimizar seu blog para os motores de busca.",
        imageUrl: "/placeholder.svg?height=400&width=600",
        publishedAt: "2025-01-02T14:45:00Z",
        tags: [
          { id: "seo", name: "SEO" },
          { id: "marketing", name: "Marketing" },
        ],
      },
      {
        id: "3",
        title: "Como monetizar seu blog em 2025",
        slug: "como-monetizar-blog-2025",
        excerpt: "Estratégias comprovadas para transformar seu blog em uma fonte de renda.",
        imageUrl: "/placeholder.svg?height=400&width=600",
        publishedAt: "2024-12-18T09:15:00Z",
        tags: [
          { id: "monetizacao", name: "Monetização" },
          { id: "negocios", name: "Negócios" },
        ],
      },
      {
        id: "4",
        title: "Ferramentas essenciais para blogueiros",
        slug: "ferramentas-essenciais-blogueiros",
        excerpt: "Conheça as melhores ferramentas para criar e gerenciar seu blog com eficiência.",
        imageUrl: "/placeholder.svg?height=400&width=600",
        publishedAt: "2024-12-05T16:30:00Z",
        tags: [
          { id: "ferramentas", name: "Ferramentas" },
          { id: "produtividade", name: "Produtividade" },
        ],
      },
      {
        id: "5",
        title: "Como criar conteúdo viral para seu blog",
        slug: "como-criar-conteudo-viral-blog",
        excerpt: "Estratégias para criar conteúdo que as pessoas adoram compartilhar.",
        imageUrl: "/placeholder.svg?height=400&width=600",
        publishedAt: "2024-11-22T11:20:00Z",
        tags: [
          { id: "conteudo", name: "Conteúdo" },
          { id: "viral", name: "Viral" },
        ],
      },
      {
        id: "6",
        title: "Tendências de design para blogs em 2025",
        slug: "tendencias-design-blogs-2025",
        excerpt: "Descubra as tendências de design que dominarão o mundo dos blogs no próximo ano.",
        imageUrl: "/placeholder.svg?height=400&width=600",
        publishedAt: "2024-11-10T08:45:00Z",
        tags: [
          { id: "design", name: "Design" },
          { id: "tendencias", name: "Tendências" },
        ],
      },
    ],
  }

  return <AuthorProfileTemplate author={author} />
}
