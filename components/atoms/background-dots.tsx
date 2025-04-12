"use client"

import { useEffect, useRef } from "react"

interface Dot {
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
}

export default function BackgroundDots() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const dots = useRef<Dot[]>([])
  const animationFrameRef = useRef<number>()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Configurar o canvas para ocupar toda a tela
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Criar bolinhas iniciais
    const createDots = () => {
      const newDots: Dot[] = []
      const dotCount = Math.floor((canvas.width * canvas.height) / 3000)

      for (let i = 0; i < dotCount; i++) {
        newDots.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 4 + 2,
          speedX: (Math.random() - 0.5) * 0.3,
          speedY: (Math.random() - 0.5) * 0.3,
        })
      }
      dots.current = newDots
    }
    createDots()

    // Função para calcular a cor baseada na posição Y
    const getDotColor = (y: number, height: number) => {
      // Normalizar a posição Y (0 a 1)
      const normalizedY = y / height
      
      // Interpolar entre azul (topo) e branco (base)
      const blue = Math.round(59 + (255 - 59) * normalizedY)
      const green = Math.round(130 + (255 - 130) * normalizedY)
      const red = Math.round(246 + (255 - 246) * normalizedY)
      
      return `rgba(${red}, ${green}, ${blue}, 0.5)`
    }

    // Função para animar as bolinhas
    const animate = () => {
      if (!ctx || !canvas) return

      // Limpar o canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Atualizar e desenhar cada bolinha
      dots.current.forEach((dot) => {
        // Atualizar posição
        dot.x += dot.speedX
        dot.y += dot.speedY

        // Fazer as bolinhas "quicar" nas bordas
        if (dot.x < 0 || dot.x > canvas.width) dot.speedX *= -1
        if (dot.y < 0 || dot.y > canvas.height) dot.speedY *= -1

        // Desenhar a bolinha com cor baseada na posição Y
        ctx.beginPath()
        ctx.arc(dot.x, dot.y, dot.size, 0, Math.PI * 2)
        ctx.fillStyle = getDotColor(dot.y, canvas.height)
        ctx.fill()
      })

      animationFrameRef.current = requestAnimationFrame(animate)
    }
    animate()

    // Limpar ao desmontar o componente
    return () => {
      window.removeEventListener("resize", resizeCanvas)
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none"
      style={{ 
        zIndex: -1,
        opacity: 1,
        mixBlendMode: "screen"
      }}
    />
  )
} 