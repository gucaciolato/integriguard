export type ReactionType = "like" | "love" | "laugh"

export interface Reaction {
  userId: string
  type: ReactionType
  createdAt: string
}

export interface Comment {
  id: string
  postId: string
  user: {
    id: string
    name: string
    avatar: string
  }
  content: string
  createdAt: string
  reactions: Reaction[]
  hidden: boolean
}
