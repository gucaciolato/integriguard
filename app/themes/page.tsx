"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Header from "@/components/molecules/header"
import Footer from "@/components/molecules/footer"
import { Moon, Sun, Check, ChevronRight, Palette, Sparkles } from "lucide-react"

// Light themes definition
const lightThemes = [
  {
    id: "default",
    name: "Padrão",
    primary: "#ff7700",
    secondary: "#f8f9fa",
    accent: "#e9ecef",
    background: "linear-gradient(135deg, #ffffff 0%, #fff5eb 100%)",
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
    borderColor: "rgba(170, 255, 0, 0.1)",
    textColor: "#333333",
    buttonTextColor: "#ffffff",
  },
]

// Dark themes definition
const darkThemes = [
  {
    id: "dark-default",
    name: "Escuro Padrão",
    primary: "#ff7700",
    secondary: "#1a1a1a",
    accent: "#2a2a2a",
    background: "linear-gradient(135deg, #2a2a2a 0%, #121212 100%)",
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
    background: "linear-gradient(135deg, #2a2a2a 0%, #121212 100%)",
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
    background: "linear-gradient(135deg, #2a2a2a 0%, #121212 100%)",
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
    background: "linear-gradient(135deg, #2a2a2a 0%, #121212 100%)",
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
    background: "linear-gradient(135deg, #2a2a2a 0%, #121212 100%)",
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
    background: "linear-gradient(135deg, #2a2a2a 0%, #121212 100%)",
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
    background: "linear-gradient(135deg, #2a2a2a 0%, #121212 100%)",
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
    background: "linear-gradient(135deg, #2a2a2a 0%, #121212 100%)",
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
    background: "linear-gradient(135deg, #2a2a2a 0%, #121212 100%)",
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
    background: "linear-gradient(135deg, #2a2a2a 0%, #121212 100%)",
    borderColor: "rgba(204, 255, 0, 0.2)",
    textColor: "#ffffff",
    buttonTextColor: "#000000",
  },
]

// Function to adjust color (darken/lighten)
function adjustColor(hex: string, percent: number) {
  // Convert hex to RGB
  let r = Number.parseInt(hex.substring(1, 3), 16)
  let g = Number.parseInt(hex.substring(3, 5), 16)
  let b = Number.parseInt(hex.substring(5, 7), 16)

  // Adjust values
  r = Math.min(255, Math.max(0, r + percent))
  g = Math.min(255, Math.max(0, g + percent))
  b = Math.min(255, Math.max(0, b + percent))

  // Convert back to hex
  return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`
}

// Theme card component
function ThemeCard({
  theme,
  isActive,
  onClick,
  isDarkMode,
}: {
  theme: any
  isActive: boolean
  onClick: () => void
  isDarkMode: boolean
}) {
  return (
    <motion.div
      whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)" }}
      whileTap={{ scale: 0.98 }}
      className={`
        relative overflow-hidden rounded-xl cursor-pointer
        ${isDarkMode ? "bg-gray-800/50" : "bg-white/50"} 
        backdrop-blur-sm border transition-all
        ${
          isActive
            ? `ring-2 ring-offset-2 ${isDarkMode ? "ring-offset-gray-900" : "ring-offset-white"}`
            : "hover:border-gray-300"
        }
      `}
      style={{
        borderColor: isActive ? theme.primary : isDarkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)",
        ringColor: isActive ? theme.primary : undefined,
      }}
      onClick={onClick}
    >
      {/* Theme preview */}
      <div className="h-24 w-full" style={{ background: theme.background }}>
        <div className="h-full w-full flex items-center justify-center">
          <div
            className="h-12 w-12 rounded-full flex items-center justify-center text-white"
            style={{ backgroundColor: theme.primary }}
          >
            <Palette size={20} />
          </div>
        </div>
      </div>

      {/* Theme info */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className={`font-medium ${isDarkMode ? "text-white" : "text-gray-800"}`}>{theme.name}</h3>
          {isActive && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="bg-green-500 text-white p-1 rounded-full"
            >
              <Check size={12} />
            </motion.div>
          )}
        </div>

        {/* Color swatches */}
        <div className="flex space-x-2 mb-2">
          <div className="h-6 w-6 rounded-full" style={{ backgroundColor: theme.primary }} title="Primary color" />
          <div className="h-6 w-6 rounded-full" style={{ backgroundColor: theme.secondary }} title="Secondary color" />
          <div className="h-6 w-6 rounded-full" style={{ backgroundColor: theme.accent }} title="Accent color" />
        </div>
      </div>

      {/* Active indicator */}
      {isActive && (
        <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
          <div
            className="absolute transform rotate-45 bg-green-500 text-white font-bold py-1 right-[-35px] top-[12px] w-[120px]"
            style={{ backgroundColor: theme.primary }}
          />
        </div>
      )}
    </motion.div>
  )
}

export default function ThemesPage() {
  const [mode, setMode] = useState<"light" | "dark">("light")
  const [selectedTheme, setSelectedTheme] = useState(lightThemes[0])
  const [savedTheme, setSavedTheme] = useState<string | null>(null)
  const [themeApplied, setThemeApplied] = useState(false)
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)
  const previewRef = useRef<HTMLDivElement>(null)

  // Load saved theme on start
  useEffect(() => {
    const savedMode = localStorage.getItem("theme-mode") as "light" | "dark" | null
    const savedThemeId = localStorage.getItem("theme-id")

    if (savedMode) {
      setMode(savedMode)
    }

    if (savedThemeId) {
      setSavedTheme(savedThemeId)

      // Find and apply saved theme
      const themes = savedMode === "dark" ? darkThemes : lightThemes
      const theme = themes.find((t) => t.id === savedThemeId) || themes[0]
      setSelectedTheme(theme)
    }
  }, [])

  // Toggle between light and dark mode
  const toggleMode = () => {
    const newMode = mode === "light" ? "dark" : "light"
    setMode(newMode)

    // Select the first theme of the new mode or the saved theme if it exists
    const themes = newMode === "light" ? lightThemes : darkThemes

    if (savedTheme) {
      // Try to find the saved theme in the new mode (light/dark version of the same theme)
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

  // Apply theme to site
  useEffect(() => {
    // Apply the selected theme to the document
    applyThemeToDocument(selectedTheme, mode)
  }, [selectedTheme, mode])

  // Function to apply theme to document
  const applyThemeToDocument = (theme: any, themeMode: "light" | "dark") => {
    const isDark = themeMode === "dark"

    // Update the style element
    const styleElement = document.getElementById("theme-style") || document.createElement("style")
    if (!styleElement.id) {
      styleElement.id = "theme-style"
      document.head.appendChild(styleElement)
    }

    styleElement.textContent = `
body {
  background: ${isDark ? "linear-gradient(135deg, #2a2a2a 0%, #121212 100%)" : theme.background};
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
  background-image: ${isDark ? "none" : `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='10' cy='10' r='2' fill='${encodeURIComponent(theme.primary)}' fillOpacity='0.1'/%3E%3C/svg%3E")`};
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

/* Theme color replacements - applied in both light and dark modes */
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

/* Apply theme color to "forge" text in logo */
text[fill="#ff7700"] {
  fill: ${theme.primary};
}

circle[fill="#ff7700"] {
  fill: ${theme.primary};
}

/* Adjust text colors for buttons */
.bg-orange-500, .hover\\:bg-orange-500:hover, 
.bg-orange-600, .hover\\:bg-orange-600:hover {
  color: ${isDark ? "#000000" : theme.buttonTextColor} !important;
}

/* Pricing card border */
[style*="borderColor: var(--primary"] {
  border-color: ${theme.primary} !important;
}

/* Focus ring styles for inputs */
.focus\\:ring-orange-500:focus,
.focus\\:ring-2:focus {
  --tw-ring-color: ${theme.primary} !important;
  --tw-ring-opacity: 1 !important;
}

/* Set CSS variable for theme color */
:root {
  --primary: ${theme.primary};
  --primary-darker: ${adjustColor(theme.primary, -10)};
}
`

    // Add/remove dark class
    if (isDark) {
      document.documentElement.classList.add("dark")

      // Add dark mode specific styles in a separate style element
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
    
    /* Exceptions for specific elements */
    .text-gray-500, .text-gray-600, .text-gray-700 {
      color: #d1d5db !important;
    }
    
    /* Make "blog" part of logo white in dark mode */
    text[fill="#333333"] {
      fill: #ffffff;
    }
    
    /* Make input text black */
    input, textarea, select {
      color: #333333 !important;
    }
    
    /* Style for focused inputs */
    input:focus, textarea:focus, select:focus {
      outline-color: ${theme.primary} !important;
      border-color: ${theme.primary} !important;
      box-shadow: 0 0 0 2px ${theme.primary}40 !important;
    }
    
    /* Fix for buttons in dark mode */
    .bg-orange-500, .hover\\:bg-orange-500:hover, 
    .bg-orange-600, .hover\\:bg-orange-600:hover {
      color: #000000 !important;
    }
    
    /* Fix for mobile navigation */
    .md\\:hidden button {
      color: #ffffff !important;
    }
    
    /* Fix for mobile menu background */
    .absolute.top-full {
      background-color: rgba(0, 0, 0, 0.9) !important;
    }
    
    /* Fix for tags in dark mode */
    .bg-orange-100.text-orange-700, 
    .text-xs.bg-orange-100.text-orange-700 {
      background: linear-gradient(135deg, #2a2a2a 0%, #121212 100%) !important;
      color: #ffffff !important;
      border: 1px solid ${theme.primary}40;
    }
    `
    } else {
      document.documentElement.classList.remove("dark")
      // Remove dark mode specific styles
      const darkStyleElement = document.getElementById("dark-theme-style")
      if (darkStyleElement) {
        darkStyleElement.remove()
      }
    }
  }

  // Save theme
  const saveTheme = () => {
    localStorage.setItem("theme-mode", mode)
    localStorage.setItem("theme-id", selectedTheme.id)
    localStorage.setItem("theme-data", JSON.stringify(selectedTheme))
    setSavedTheme(selectedTheme.id)
    setThemeApplied(true)
    setShowSuccessMessage(true)

    // Show success message for 3 seconds
    setTimeout(() => {
      setShowSuccessMessage(false)
    }, 3000)
  }

  // Get current theme list based on mode
  const currentThemes = mode === "light" ? lightThemes : darkThemes
  const isDarkMode = mode === "dark"

  return (
    <div className="min-h-screen flex flex-col">
      <Header currentPath="/themes" />

      <main className="flex-grow py-12">
        <div className="container mx-auto px-4">
          {/* Hero section */}
          <div className="mb-12 text-center">
            <div
              className="inline-flex items-center justify-center p-2 rounded-full mb-4"
              style={{
                backgroundColor: `${selectedTheme.primary}15`,
                color: selectedTheme.primary,
              }}
            >
              <Palette size={20} className="mr-2" />
              <span className="font-medium">Personalização</span>
            </div>

            <h1 className={`text-4xl md:text-5xl font-bold mb-4 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
              Escolha o tema do seu blog
            </h1>

            <p className={`text-lg max-w-2xl mx-auto ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
              Personalize a aparência do seu blog.forge com cores que combinam com a sua identidade
            </p>
          </div>

          {/* Mode toggle and preview */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
            <div className="flex items-center">
              <h2 className={`text-2xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>Temas</h2>
              <div className="ml-4">
                <button
                  onClick={toggleMode}
                  className={`
                    flex items-center gap-2 px-4 py-2 rounded-full transition-all
                    ${
                      isDarkMode
                        ? "bg-gray-800 text-white hover:bg-gray-700"
                        : "bg-white text-gray-800 hover:bg-gray-100 shadow-sm"
                    }
                  `}
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
            </div>

            {/* Preview section */}
            <div
              ref={previewRef}
              className={`
                relative overflow-hidden rounded-lg p-4 flex items-center gap-3
                ${isDarkMode ? "bg-gray-800" : "bg-white"} 
                shadow-sm border
              `}
              style={{
                borderColor: isDarkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)",
              }}
            >
              <div
                className="h-8 w-8 rounded-full flex items-center justify-center"
                style={{ backgroundColor: selectedTheme.primary }}
              >
                <Sparkles size={14} className="text-white" />
              </div>
              <div>
                <p className={`text-sm font-medium ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                  Tema atual: <span style={{ color: selectedTheme.primary }}>{selectedTheme.name}</span>
                </p>
                <p className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                  {savedTheme === selectedTheme.id ? "Tema salvo" : "Clique em aplicar para salvar este tema"}
                </p>
              </div>
            </div>
          </div>

          {/* Theme grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-12">
            <AnimatePresence mode="wait">
              {currentThemes.map((theme) => (
                <ThemeCard
                  key={theme.id}
                  theme={theme}
                  isActive={selectedTheme.id === theme.id}
                  onClick={() => setSelectedTheme(theme)}
                  isDarkMode={isDarkMode}
                />
              ))}
            </AnimatePresence>
          </div>

          {/* Apply button */}
          <div className="flex justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={saveTheme}
              className={`
                relative overflow-hidden px-8 py-3 rounded-full font-medium text-lg
                flex items-center justify-center min-w-[200px]
                transition-all shadow-lg
              `}
              style={{
                backgroundColor: themeApplied ? "#4CAF50" : selectedTheme.primary,
                color: selectedTheme.buttonTextColor,
              }}
            >
              <AnimatePresence mode="wait">
                {showSuccessMessage ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="flex items-center"
                  >
                    <Check size={20} className="mr-2" />
                    Tema Aplicado
                  </motion.div>
                ) : (
                  <motion.div
                    key="apply"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    className="flex items-center"
                  >
                    <Palette size={20} className="mr-2" />
                    Aplicar Tema
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>

          {/* Theme information */}
          <div className={`mt-16 p-6 rounded-xl ${isDarkMode ? "bg-gray-800/50" : "bg-white"} backdrop-blur-sm`}>
            <h3 className={`text-xl font-bold mb-4 ${isDarkMode ? "text-white" : "text-gray-900"}`}>Sobre os temas</h3>
            <div className={`space-y-4 ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
              <p>
                Os temas do blog.forge permitem que você personalize a aparência do seu blog para combinar com sua
                identidade visual. Cada tema inclui uma paleta de cores completa que será aplicada em todo o site,
                incluindo botões, links, ícones e elementos de destaque.
              </p>
              <p>
                Você pode alternar entre os modos claro e escuro a qualquer momento, e suas preferências serão salvas
                automaticamente para sua próxima visita.
              </p>
              <div className="flex items-start mt-6">
                <div className="flex-shrink-0 mr-4">
                  <ChevronRight size={20} style={{ color: selectedTheme.primary }} />
                </div>
                <p>
                  <strong className="font-medium" style={{ color: selectedTheme.primary }}>
                    Dica:
                  </strong>{" "}
                  Experimente diferentes temas para encontrar o que melhor representa sua marca e estilo de conteúdo.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
