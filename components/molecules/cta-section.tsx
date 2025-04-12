"use client"
import { useContactModal } from "@/hooks/use-contact-modal"

export default function CTASection() {
  const contactModal = useContactModal()

  return (
    <div className="text-center text-black">
      <h2 className="text-3xl font-bold tracking-tight text-black [color:black!important] sm:text-4xl">
        Pronto para transformar seu negócio?
      </h2>
      <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-black [color:black!important]">
        Entre em contato conosco e descubra como podemos ajudar sua empresa a crescer com soluções digitais personalizadas.
      </p>
      <div className="mt-10 flex items-center justify-center gap-x-6">
        <button
          onClick={contactModal.onOpen}
          className="rounded-md bg-blue-500 px-3.5 py-2.5 text-sm font-semibold !text-black shadow-sm hover:bg-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
          Fale Conosco
        </button>
        <a href="/blog" className="text-sm font-semibold leading-6 text-gray-900">
          Leia nosso blog <span aria-hidden="true">→</span>
        </a>
      </div>
    </div>
  )
} 