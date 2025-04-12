"use client"

import type React from "react"

import { Search, X } from "lucide-react"
import { useState, useEffect } from "react"

interface SearchInputProps {
  placeholder?: string
  onSearch?: (query: string) => void
}

export default function SearchInput({ placeholder = "Buscar posts...", onSearch }: SearchInputProps) {
  const [query, setQuery] = useState("")

  useEffect(() => {
    // Adiciona um pequeno atraso para não realizar buscas a cada tecla
    const delayDebounce = setTimeout(() => {
      if (onSearch) {
        onSearch(query)
      }
    }, 300)

    return () => clearTimeout(delayDebounce)
  }, [query, onSearch])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (onSearch) {
      onSearch(query)
    }
  }

  const handleClear = () => {
    setQuery("")
    if (onSearch) {
      onSearch("")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="relative w-full max-w-md">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className="w-full py-2 pl-4 pr-10 rounded-xl border border-gray-200 
                  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                  bg-white/50 backdrop-blur-sm"
      />
      {query ? (
        <button
          type="button"
          onClick={handleClear}
          className="absolute right-10 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
        >
          <X size={16} />
        </button>
      ) : null}
      <button
        type="submit"
        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-blue-500"
      >
        <Search size={18} />
      </button>
    </form>
  )
}
