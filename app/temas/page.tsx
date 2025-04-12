"use client"

import { useState, useEffect } from "react"
import Header from "@/components/molecules/header"
import Footer from "@/components/molecules/footer"
import Button from "@/components/atoms/button"
import { Moon, Sun, Check } from "lucide-react"

// Definição dos temas light
const lightThemes = [
  {
    id: "default",
    name: "Padrão",
    primary: "#ff7700",
    secondary: "#f8f9fa",
    accent: "#e9ecef",
    background: "linear-gradient(135deg, #ffffff 0%, #fff5eb 100%)",
    dotPattern: "rgba(255, 119, 0, 0.1)",
    borderColor: "rgba(0, 0, 0, 0.1)",
    textColor: "#333333",
    buttonTextColor: "#ffffff",
  },
  {
    id: "blue",
    name: "Azul",
    primary: "#0077ff",
    secondary: "#f0f7ff",
    accent: "#e1f0ff",
    background: "linear-gradient(135deg, #ffffff 0%, #ebf5ff 100%)",
    dotPattern: "rgba(0, 119, 255, 0.1)",
    borderColor: "rgba(0, 119, 255, 0.1)",
    textColor: "#333333",
    buttonTextColor: "#ffffff",
  },
  {
    id: "green",
    name: "Verde",
    primary: "#00aa55",
    secondary: "#f0fff4",
    accent: "#e1ffec",
    background: "linear-gradient(135deg, #ffffff 0%, #ebffef 100%)",
    dotPattern: "rgba(0, 170, 85, 0.1)",
    borderColor: "rgba(0, 170, 85, 0.1)",
    textColor: "#333333",
    buttonTextColor: "#ffffff",
  },
  {
    id: "purple",
    name: "Roxo",
    primary: "#7700ff",
    secondary: "#f5f0ff",
    accent: "#efe1ff",
    background: "linear-gradient(135deg, #ffffff 0%, #f2ebff 100%)",
    dotPattern: "rgba(119, 0, 255, 0.1)",
    borderColor: "rgba(119, 0, 255, 0.1)",
    textColor: "#333333",
    buttonTextColor: "#ffffff",
  },
  {
    id: "pink",
    name: "Rosa",
    primary: "#ff0077",
    secondary: "#fff0f7",
    accent: "#ffe1ef",
    background: "linear-gradient(135deg, #ffffff 0%, #ffebf5 100%)",
    dotPattern: "rgba(255, 0, 119, 0.1)",
    borderColor: "rgba(255, 0, 119, 0.1)",
    textColor: "#333333",
    buttonTextColor: "#ffffff",
  },
  {
    id: "teal",
    name: "Turquesa",
    primary: "#00aaa5",
    secondary: "#f0fffc",
    accent: "#e1fff9",
    background: "linear-gradient(135deg, #ffffff 0%, #ebfffc 100%)",
    dotPattern: "rgba(0, 170, 165, 0.1)",
    borderColor: "rgba(0, 170, 165, 0.1)",
    textColor: "#333333",
    buttonTextColor: "#ffffff",
  },
  {
    id: "amber",
    name: "Âmbar",
    primary: "#ffaa00",
    secondary: "#fffbf0",
    accent: "#fff8e1",
    background: "linear-gradient(135deg, #ffffff 0%, #fffaeb 100%)",
    dotPattern: "rgba(255, 170, 0, 0.1)",
    borderColor: "rgba(255, 170, 0, 0.1)",
    textColor: "#333333",
    buttonTextColor: "#ffffff",
  },
  {
    id: "red",
    name: "Vermelho",
    primary: "#ff0000",
    secondary: "#fff0f0",
    accent: "#ffe1e1",
    background: "linear-gradient(135deg, #ffffff 0%, #ffebeb 100%)",
    dotPattern: "rgba(255, 0, 0, 0.1)",
    borderColor: "rgba(255, 0, 0, 0.1)",
    textColor: "#333333",
    buttonTextColor: "#ffffff",
  },
  {
    id: "cyan",
    name: "Ciano",
    primary: "#00aaff",
    secondary: "#f0faff",
    accent: "#e1f7ff",
    background: "linear-gradient(135deg, #ffffff 0%, #ebfaff 100%)",
    dotPattern: "rgba(0, 170, 255, 0.1)",
    borderColor: "rgba(0, 170, 255, 0.1)",
    textColor: "#333333",
    buttonTextColor: "#ffffff",
  },
  {
    id: "lime",
    name: "Lima",
    primary: "#aaff00",
    secondary: "#f9fff0",
    accent: "#f3ffe1",
    background: "linear-gradient(135deg, #ffffff 0%, #f8ffeb 100%)",
    dotPattern: "rgba(170, 255, 0, 0.1)",
    borderColor: "rgba(170, 255, 0, 0.1)",
    textColor: "#333333",
    buttonTextColor: "#ffffff",
  },
]

// Modificar a definição dos temas escuros para garantir consistência
const darkThemes = [
  {
    id: "dark-default",
    name: "Escuro Padrão",
    primary: "#ff7700",
    secondary: "#1a1a1a",
    accent: "#2a2a2a",
    background: "linear-gradient(135deg, #121212 0%, #1e1e1e 100%)",
    dotPattern: "rgba(255, 119, 0, 0.2)",
    borderColor: "rgba(255, 255, 255, 0.1)",
    textColor: "#ffffff",
    buttonTextColor: "#000000",
  },
  {
    id: "dark-blue",
    name: "Azul Escuro",
    primary: "#0099ff",
    secondary: "#0a1a2a",
    accent: "#152535",
    background: "linear-gradient(135deg, #0a1520 0%, #0d1d2d 100%)",
    dotPattern: "rgba(0, 153, 255, 0.2)",
    borderColor: "rgba(0, 153, 255, 0.2)",
    textColor: "#ffffff",
    buttonTextColor: "#000000",
  },
  {
    id: "dark-green",
    name: "Verde Escuro",
    primary: "#00cc66",
    secondary: "#0a2a1a",
    accent: "#153525",
    background: "linear-gradient(135deg, #0a2015 0%, #0d2d1a 100%)",
    dotPattern: "rgba(0, 204, 102, 0.2)",
    borderColor: "rgba(0, 204, 102, 0.2)",
    textColor: "#ffffff",
    buttonTextColor: "#000000",
  },
  {
    id: "dark-purple",
    name: "Roxo Escuro",
    primary: "#9900ff",
    secondary: "#1a0a2a",
    accent: "#251535",
    background: "linear-gradient(135deg, #150a20 0%, #1d0d2d 100%)",
    dotPattern: "rgba(153, 0, 255, 0.2)",
    borderColor: "rgba(153, 0, 255, 0.2)",
    textColor: "#ffffff",
    buttonTextColor: "#000000",
  },
  {
    id: "dark-pink",
    name: "Rosa Escuro",
    primary: "#ff0099",
    secondary: "#2a0a1a",
    accent: "#351525",
    background: "linear-gradient(135deg, #200a15 0%, #2d0d1d 100%)",
    dotPattern: "rgba(255, 0, 153, 0.2)",
    borderColor: "rgba(255, 0, 153, 0.2)",
    textColor: "#ffffff",
    buttonTextColor: "#000000",
  },
  {
    id: "dark-teal",
    name: "Turquesa Escuro",
    primary: "#00cccc",
    secondary: "#0a2a2a",
    accent: "#153535",
    background: "linear-gradient(135deg, #0a2020 0%, #0d2d2d 100%)",
    dotPattern: "rgba(0, 204, 204, 0.2)",
    borderColor: "rgba(0, 204, 204, 0.2)",
    textColor: "#ffffff",
    buttonTextColor: "#000000",
  },
  {
    id: "dark-amber",
    name: "Âmbar Escuro",
    primary: "#ffcc00",
    secondary: "#2a2a0a",
    accent: "#353515",
    background: "linear-gradient(135deg, #20200a 0%, #2d2d0d 100%)",
    dotPattern: "rgba(255, 204, 0, 0.2)",
    borderColor: "rgba(255, 204, 0, 0.2)",
    textColor: "#ffffff",
    buttonTextColor: "#000000",
  },
  {
    id: "dark-red",
    name: "Vermelho Escuro",
    primary: "#ff3333",
    secondary: "#2a0a0a",
    accent: "#351515",
    background: "linear-gradient(135deg, #200a0a 0%, #2d0d0d 100%)",
    dotPattern: "rgba(255, 51, 51, 0.2)",
    borderColor: "rgba(255, 51, 51, 0.2)",
    textColor: "#ffffff",
    buttonTextColor: "#000000",
  },
  {
    id: "dark-cyan",
    name: "Ciano Escuro",
    primary: "#00ccff",
    secondary: "#0a2a35",
    accent: "#153540",
    background: "linear-gradient(135deg, #0a1e25 0%, #0d252d 100%)",
    dotPattern: "rgba(0, 204, 255, 0.2)",
    borderColor: "rgba(0, 204, 255, 0.2)",
    textColor: "#ffffff",
    buttonTextColor: "#000000",
  },
  {
    id: "dark-lime",
    name: "Lima Escuro",
    primary: "#ccff00",
    secondary: "#2a350a",
    accent: "#354015",
    background: "linear-gradient(135deg, #1e250a 0%, #252d0d 100%)",
    dotPattern: "rgba(204, 255, 0, 0.2)",
    borderColor: "rgba(204, 255, 0, 0.2)",
    textColor: "#ffffff",
    buttonTextColor: "#000000",
  },
]

// Componente para exibir um card de tema
function ThemeCard({ theme, isActive, onClick }: { theme: any; isActive: boolean; onClick: () => void }) {
  return (
    <div
      className={`
        bg-white/30 backdrop-blur-sm rounded-lg p-6 border
        border-orange-200 transition-all hover:shadow-md relative z-10
        ${isActive ? "ring-2 ring-offset-2" : ""}
      `}
      style={{
        borderColor: isActive ? theme.primary : undefined,
        boxShadow: isActive ? `0 4px 6px -1px ${theme.primary}20` : undefined,
        ringColor: isActive ? theme.primary : undefined,
      }}
      onClick={onClick}
    >
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-medium">{theme.name}</h3>
        {isActive && <Check size={18} style={{ color: theme.primary }} />}
      </div>
      <div className="grid grid-cols-3 gap-2 mb-3">
        <div className="h-8 rounded-md" style={{ backgroundColor: theme.primary }} title="Cor primária"></div>
        <div className="h-8 rounded-md" style={{ backgroundColor: theme.secondary }} title="Cor secundária"></div>
        <div className="h-8 rounded-md" style={{ backgroundColor: theme.accent }} title="Cor de destaque"></div>
      </div>
      <div className="h-16 rounded-md w-full" style={{ background: theme.background }} title="Fundo"></div>
    </div>
  )
}

export default function ThemesPage() {
  const [mode, setMode] = useState<"light" | "dark">("light")
  const [selectedTheme, setSelectedTheme] = useState(lightThemes[0])
  const [savedTheme, setSavedTheme] = useState<string | null>(null)
  const [themeApplied, setThemeApplied] = useState(false)

  // Carregar tema salvo ao iniciar
  useEffect(() => {
    const savedMode = localStorage.getItem("theme-mode") as "light" | "dark" | null
    const savedThemeId = localStorage.getItem("theme-id")

    if (savedMode) {
      setMode(savedMode)
    }

    if (savedThemeId) {
      setSavedTheme(savedThemeId)

      // Encontrar e aplicar o tema salvo
      const themes = savedMode === "dark" ? darkThemes : lightThemes
      const theme = themes.find((t) => t.id === savedThemeId) || themes[0]
      setSelectedTheme(theme)
    }
  }, [])

  // Alternar entre modo claro e escuro
  const toggleMode = () => {
    const newMode = mode === "light" ? "dark" : "light"
    setMode(newMode)

    // Selecionar o primeiro tema do novo modo ou o tema salvo se existir
    const themes = newMode === "light" ? lightThemes : darkThemes

    if (savedTheme) {
      // Tentar encontrar o tema salvo no novo modo (versão light/dark do mesmo tema)
      const baseThemeId = savedTheme.replace("dark-", "")
      const matchingTheme = themes.find((t) => t.id === baseThemeId || t.id === `dark-${baseThemeId}`)

      if (matchingTheme) {
        setSelectedTheme(matchingTheme)
      } else {
        setSelectedTheme(themes[0])
      }
    } else {
      setSelectedTheme(themes[0])
    }
  }

  // Aplicar tema ao site
  useEffect(() => {
    // Aplicar o tema selecionado ao documento
    applyThemeToDocument(selectedTheme, mode)
  }, [selectedTheme, mode])

  // Função para aplicar o tema ao documento
  const applyThemeToDocument = (theme: any, themeMode: "light" | "dark") => {
    const isDark = themeMode === "dark"

    // Atualizar o padrão de pontos com opacidade reduzida
    const dotPatternUrl = `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='10' cy='10' r='2' fill='${encodeURIComponent(theme.primary)}' fillOpacity='0.05'/%3E%3C/svg%3E")`

    // Atualizar o estilo global
    const styleElement = document.getElementById("theme-style") || document.createElement("style")
    if (!styleElement.id) {
      styleElement.id = "theme-style"
      document.head.appendChild(styleElement)
    }

    styleElement.textContent = `
    body {
      background: ${theme.background};
      position: relative;
      min-height: 100vh;
      color: ${theme.textColor};
    }
    
    body::before {
      content: '';
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-image: ${isDark ? "none" : dotPatternUrl};
      background-size: 30px 30px;
      opacity: 0.5;
      pointer-events: none;
      z-index: 0;
    }
    
    body::after {
      content: '';
      position: fixed;
      bottom: -50%;
      right: -20%;
      width: 80%;
      height: 200%;
      background: radial-gradient(circle, ${theme.primary}08 0%, rgba(255,255,255,0) 70%);
      z-index: 0;
    }
    
    /* Preservar as classes originais, apenas substituindo as cores */
    .text-orange-500 {
      color: ${theme.primary} !important;
    }
    
    .text-orange-600 {
      color: ${adjustColor(theme.primary, -10)} !important;
    }
    
    .text-orange-700 {
      color: ${adjustColor(theme.primary, -20)} !important;
    }
    
    .hover\\:text-orange-500:hover {
      color: ${theme.primary} !important;
    }
    
    .hover\\:text-orange-600:hover {
      color: ${adjustColor(theme.primary, -10)} !important;
    }
    
    .bg-orange-500 {
      background-color: ${theme.primary} !important;
    }
    
    .bg-orange-600 {
      background-color: ${adjustColor(theme.primary, -10)} !important;
    }
    
    .hover\\:bg-orange-500:hover {
      background-color: ${theme.primary} !important;
    }
    
    .hover\\:bg-orange-600:hover {
      background-color: ${adjustColor(theme.primary, -10)} !important;
    }
    
    .border-orange-500 {
      border-color: ${theme.primary} !important;
    }
    
    .hover\\:border-orange-500:hover {
      border-color: ${theme.primary} !important;
    }
    
    .bg-orange-100 {
      background-color: ${theme.primary}15 !important;
    }
    
    .hover\\:bg-orange-100:hover {
      background-color: ${theme.primary}25 !important;
    }
    
    .bg-orange-50 {
      background-color: ${theme.primary}08 !important;
    }
    
    .hover\\:bg-orange-50:hover {
      background-color: ${theme.primary}12 !important;
    }
    
    /* Aplicar cor do tema ao texto "forge" no logo */
    text[fill="#ff7700"] {
      fill: ${theme.primary};
    }
    
    circle[fill="#ff7700"] {
      fill: ${theme.primary};
    }
    
    /* Ajustar cores de texto para botões */
    .bg-orange-500, .hover\\:bg-orange-500:hover, 
    .bg-orange-600, .hover\\:bg-orange-600:hover {
      color: ${theme.buttonTextColor} !important;
    }
  `

    // Adicionar/remover classe dark
    if (isDark) {
      document.documentElement.classList.add("dark")

      // Adicionar estilos específicos para o modo escuro
      const darkStyleElement = document.getElementById("dark-theme-style") || document.createElement("style")
      if (!darkStyleElement.id) {
        darkStyleElement.id = "dark-theme-style"
        document.head.appendChild(darkStyleElement)
      }

      darkStyleElement.textContent = `
      /* Header and footer styling for dark mode */
      header, footer {
        background-color: rgba(0, 0, 0, 0.8) !important;
        backdrop-filter: blur(10px);
        border-color: rgba(255, 255, 255, 0.1) !important;
      }
      
      /* Make text white in dark mode */
      header a, footer a, h1, h2, h3, h4, h5, h6, p, span, button, li {
        color: #ffffff !important;
      }
      
      /* Fix for navigation links */
      header a:not(.text-orange-500), 
      nav a:not(.text-orange-500) {
        color: #ffffff !important;
      }
      
      /* Make "blog" part of logo white in dark mode */
      text[fill="#333333"] {
        fill: #ffffff;
      }
      
      /* Fix for buttons in dark mode */
      .bg-orange-500, .hover\\:bg-orange-500:hover, 
      .bg-orange-600, .hover\\:bg-orange-600:hover {
        color: #000000 !important;
      }
    `
    } else {
      document.documentElement.classList.remove("dark")
      // Remover estilos específicos do modo escuro
      const darkStyleElement = document.getElementById("dark-theme-style")
      if (darkStyleElement) {
        darkStyleElement.remove()
      }
    }
  }

  // Função para ajustar a cor (escurecer/clarear)
  function adjustColor(hex: string, percent: number) {
    // Converter hex para RGB
    let r = Number.parseInt(hex.substring(1, 3), 16)
    let g = Number.parseInt(hex.substring(3, 5), 16)
    let b = Number.parseInt(hex.substring(5, 7), 16)

    // Ajustar valores
    r = Math.min(255, Math.max(0, r + percent))
    g = Math.min(255, Math.max(0, g + percent))
    b = Math.min(255, Math.max(0, b + percent))

    // Converter de volta para hex
    return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`
  }

  // Salvar tema
  const saveTheme = () => {
    localStorage.setItem("theme-mode", mode)
    localStorage.setItem("theme-id", selectedTheme.id)
    localStorage.setItem("theme-data", JSON.stringify(selectedTheme))
    setSavedTheme(selectedTheme.id)
    setThemeApplied(true)

    // Mostrar mensagem de sucesso por 3 segundos
    setTimeout(() => {
      setThemeApplied(false)
    }, 3000)
  }

  // Obter a lista de temas atual com base no modo
  const currentThemes = mode === "light" ? lightThemes : darkThemes

  return (
    <div className="min-h-screen flex flex-col">
      <Header currentPath="/temas" />

      <main className="flex-grow py-12">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Temas do blog.forge</h1>

            <button
              onClick={toggleMode}
              className="flex items-center gap-2 px-4 py-2 rounded-md border border-gray-300 bg-white hover:bg-gray-50 text-gray-800"
            >
              {mode === "light" ? (
                <>
                  <Moon size={18} /> Modo Escuro
                </>
              ) : (
                <>
                  <Sun size={18} /> Modo Claro
                </>
              )}
            </button>
          </div>

          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Escolha um tema</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {currentThemes.map((theme) => (
                <ThemeCard
                  key={theme.id}
                  theme={theme}
                  isActive={selectedTheme.id === theme.id}
                  onClick={() => setSelectedTheme(theme)}
                />
              ))}
            </div>
          </div>

          <div className="mt-8 text-center">
            <Button
              onClick={saveTheme}
              disabled={themeApplied}
              size="large"
              style={{
                backgroundColor: themeApplied ? "#4CAF50" : selectedTheme.primary,
                color: selectedTheme.buttonTextColor,
              }}
            >
              {themeApplied ? "Tema Aplicado ✓" : "Aplicar Tema"}
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
