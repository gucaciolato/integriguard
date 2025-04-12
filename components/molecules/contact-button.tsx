"use client"

import type React from "react"
import { useContactModal } from "@/hooks/use-contact-modal"

interface ContactButtonProps {
  children: React.ReactNode
}

export default function ContactButton({ children }: ContactButtonProps) {
  const contactModal = useContactModal()

  return (
    <div onClick={contactModal.onOpen}>
      {children}
    </div>
  )
}
