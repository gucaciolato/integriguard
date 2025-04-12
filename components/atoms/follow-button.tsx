"use client"

import { useState } from "react"
import { UserPlus, UserMinus } from "lucide-react"

interface FollowButtonProps {
  initialFollowing?: boolean
  userId: string
  className?: string
  variant?: "primary" | "secondary" | "outline"
  size?: "small" | "medium" | "large"
}

export default function FollowButton({
  initialFollowing = false,
  userId,
  className = "",
  variant = "outline",
  size = "small",
}: FollowButtonProps) {
  const [isFollowing, setIsFollowing] = useState(initialFollowing)
  const [isLoading, setIsLoading] = useState(false)

  const handleToggleFollow = async () => {
    setIsLoading(true)

    // Simular uma chamada de API
    setTimeout(() => {
      setIsFollowing(!isFollowing)
      setIsLoading(false)
    }, 500)

    // Em um cenário real, você faria uma chamada à API aqui
    // try {
    //   const response = await fetch(`/api/users/${userId}/follow`, {
    //     method: isFollowing ? 'DELETE' : 'POST',
    //   })
    //   if (response.ok) {
    //     setIsFollowing(!isFollowing)
    //   }
    // } catch (error) {
    //   console.error('Error toggling follow status:', error)
    // } finally {
    //   setIsLoading(false)
    // }
  }

  // Definir classes com base nas props
  const sizeClasses = {
    small: "text-xs px-3 py-1",
    medium: "text-sm px-4 py-1.5",
    large: "px-4 py-2",
  }

  const variantClasses = {
    primary: isFollowing
      ? "bg-gray-200 text-gray-800 hover:bg-gray-300"
      : "bg-orange-500 text-white hover:bg-orange-600",
    secondary: isFollowing
      ? "bg-gray-100 text-gray-800 hover:bg-gray-200"
      : "bg-orange-100 text-orange-700 hover:bg-orange-200",
    outline: isFollowing
      ? "border border-gray-300 text-gray-700 hover:bg-gray-100"
      : "border border-orange-500 text-orange-500 hover:bg-orange-50",
  }

  return (
    <button
      onClick={handleToggleFollow}
      disabled={isLoading}
      className={`
        rounded-full font-medium flex items-center justify-center transition-colors
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        ${isLoading ? "opacity-70 cursor-not-allowed" : ""}
        ${className}
      `}
    >
      {isFollowing ? (
        <>
          <UserMinus size={size === "small" ? 14 : 16} className="mr-1" />
          Deixar de seguir
        </>
      ) : (
        <>
          <UserPlus size={size === "small" ? 14 : 16} className="mr-1" />
          Seguir
        </>
      )}
    </button>
  )
}
