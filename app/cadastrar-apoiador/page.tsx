"use client"

import { useSearchParams } from "next/navigation"
import SupporterRegistrationTemplate from "@/components/templates/supporter-registration-template"

export default function SupporterRegistrationPage() {
  const searchParams = useSearchParams()
  const forgerId = searchParams.get("forger")

  return <SupporterRegistrationTemplate preselectedForgerId={forgerId} />
}
