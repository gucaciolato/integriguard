"use client"

import { useState } from "react"
import Image from "next/image"
import { formatDistanceToNow } from "date-fns"
import { ptBR } from "date-fns/locale"
import { MoreHorizontal, EyeOff, Flag, ThumbsUp, Heart, SmilePlus } from "lucide-react"
import type { Comment, ReactionType } from "@/types/comment"

interface CommentItemProps {
  comment: Comment
  isAuthor: boolean
  onHideComment: (commentId: string) => void
  onAddReaction: (commentId: string, type: ReactionType) => void
}

export default function CommentItem({ comment, isAuthor, onHideComment, onAddReaction }: CommentItemProps) {
  const [showOptions, setShowOptions] = useState(false)

  // Formatar a data do comentário
  const formattedDate = formatDistanceToNow(new Date(comment.createdAt), {
    addSuffix: true,
    locale: ptBR,
  })

  // Contar reações por tipo
  const reactionCounts = comment.reactions.reduce(
    (counts, reaction) => {
      counts[reaction.type] = (counts[reaction.type] || 0) + 1
      return counts
    },
    {} as Record<ReactionType, number>,
  )

  // Verificar se o usuário atual já reagiu (simulado)
  const currentUserId = "current-user" // Simulando o ID do usuário atual
  const userReactions = comment.reactions.filter((r) => r.userId === currentUserId)

  const hasReacted = (type: ReactionType) => {
    return userReactions.some((r) => r.type === type)
  }

  if (comment.hidden) {
    return (
      <div className="py-4 px-3 bg-gray-50 rounded-md italic text-gray-500 text-sm">
        Este comentário foi ocultado pelo autor.
      </div>
    )
  }

  return (
    <div className="flex gap-3 py-4">
      {/* Avatar do usuário */}
      <div className="flex-shrink-0">
        <div className="w-10 h-10 rounded-full overflow-hidden relative">
          <Image
            src={comment.user.avatar || "/placeholder.svg?height=40&width=40"}
            alt={comment.user.name}
            fill
            className="object-cover"
          />
        </div>
      </div>

      {/* Conteúdo do comentário */}
      <div className="flex-grow">
        <div className="bg-white/50 backdrop-blur-sm rounded-lg p-3 border border-gray-100">
          <div className="flex justify-between items-start mb-1">
            <div>
              <span className="font-medium">{comment.user.name}</span>
              <span className="text-xs text-gray-500 ml-2">{formattedDate}</span>
            </div>

            {/* Menu de opções */}
            <div className="relative">
              <button
                onClick={() => setShowOptions(!showOptions)}
                className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100"
              >
                <MoreHorizontal size={16} />
              </button>

              {showOptions && (
                <div className="absolute right-0 mt-1 w-48 bg-white rounded-md shadow-lg border border-gray-100 z-10">
                  <div className="py-1">
                    {isAuthor && (
                      <button
                        onClick={() => {
                          onHideComment(comment.id)
                          setShowOptions(false)
                        }}
                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <EyeOff size={16} className="mr-2" />
                        Ocultar comentário
                      </button>
                    )}
                    <button
                      onClick={() => setShowOptions(false)}
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <Flag size={16} className="mr-2" />
                      Denunciar
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          <p className="text-gray-800 mb-3">{comment.content}</p>

          {/* Reações */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => onAddReaction(comment.id, "like")}
              className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs ${
                hasReacted("like") ? "bg-blue-100 text-blue-600" : "hover:bg-gray-100 text-gray-600"
              }`}
            >
              <ThumbsUp size={14} />
              {reactionCounts.like > 0 && <span>{reactionCounts.like}</span>}
            </button>

            <button
              onClick={() => onAddReaction(comment.id, "love")}
              className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs ${
                hasReacted("love") ? "bg-red-100 text-red-600" : "hover:bg-gray-100 text-gray-600"
              }`}
            >
              <Heart size={14} />
              {reactionCounts.love > 0 && <span>{reactionCounts.love}</span>}
            </button>

            <button
              onClick={() => onAddReaction(comment.id, "laugh")}
              className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs ${
                hasReacted("laugh") ? "bg-yellow-100 text-yellow-600" : "hover:bg-gray-100 text-gray-600"
              }`}
            >
              <SmilePlus size={14} />
              {reactionCounts.laugh > 0 && <span>{reactionCounts.laugh}</span>}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
