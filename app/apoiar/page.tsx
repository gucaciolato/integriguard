"use client"

import { useSearchParams } from "next/navigation"
import SupporterTemplate from "@/components/templates/supporter-template"

export default function SupporterPage() {
  const searchParams = useSearchParams()
  const forgerId = searchParams.get("forger")

  return <SupporterTemplate preselectedForgerId={forgerId} />
}
