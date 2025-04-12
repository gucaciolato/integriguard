"use client"

// Function to apply saved theme when loading the page
export function applyThemeFromLocalStorage() {
  if (typeof window === "undefined") return

  const savedMode = localStorage.getItem("theme-mode") as "light" | "dark" | null
  const savedThemeId = localStorage.getItem("theme-id")

  if (savedMode === "dark") {
    document.documentElement.classList.add("dark")
  } else {
    document.documentElement.classList.remove("dark")
  }

  // If no saved theme, do nothing
  if (!savedThemeId) return

  // Load theme from localStorage
  try {
    const themeData = localStorage.getItem("theme-data")
    if (themeData) {
      const theme = JSON.parse(themeData)
      const isDark = savedMode === "dark"

      // Garantir que o buttonTextColor seja sempre preto no modo escuro
      if (isDark) {
        theme.buttonTextColor = "#000000"
      }

      // Update global style
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
  color: ${isDark ? "#ffffff" : "#333333"};
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

/* Dark mode specific styles */
${
  isDark
    ? `
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
    : `
/* Style for focused inputs in light mode */
input:focus, textarea:focus, select:focus {
  outline-color: ${theme.primary} !important;
  border-color: ${theme.primary} !important;
  box-shadow: 0 0 0 2px ${theme.primary}40 !important;
}
`
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
    }
  } catch (e) {
    console.error("Error applying theme:", e)
  }
}

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
