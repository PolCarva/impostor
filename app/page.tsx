"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { X, Plus, Check, Settings, Palette } from "lucide-react"

const WORD_CATEGORIES = {
  Animales: [
    "Gato",
    "Perro",
    "Pájaro",
    "Pez",
    "León",
    "Elefante",
    "Tigre",
    "Oso",
    "Lobo",
    "Jirafa",
    "Cebra",
    "Mono",
    "Delfín",
    "Ballena",
    "Tiburón",
  ],
  Comida: [
    "Pizza",
    "Café",
    "Chocolate",
    "Helado",
    "Pasta",
    "Sushi",
    "Hamburguesa",
    "Ensalada",
    "Frutas",
    "Verduras",
    "Tacos",
    "Paella",
    "Croissant",
    "Donut",
    "Pancake",
  ],
  Deportes: [
    "Fútbol",
    "Basketball",
    "Tennis",
    "Natación",
    "Volleyball",
    "Baseball",
    "Golf",
    "Boxeo",
    "Karate",
    "Yoga",
    "Ciclismo",
    "Esquí",
    "Surf",
    "Escalada",
  ],
  Lugares: [
    "Playa",
    "Montaña",
    "Casa",
    "Edificio",
    "Puente",
    "Torre",
    "Parque",
    "Jardín",
    "Bosque",
    "Río",
    "Océano",
    "Desierto",
    "Museo",
    "Restaurant",
    "Hotel",
    "Hospital",
    "Aeropuerto",
    "Estación",
    "Mercado",
    "Mall",
  ],
  Tecnología: [
    "Computadora",
    "Teléfono",
    "Televisión",
    "Radio",
    "Cámara",
    "Reloj",
    "Tablet",
    "Consola",
    "Auriculares",
    "Micrófono",
    "Router",
    "Drone",
  ],
  Transporte: ["Avión", "Tren", "Coche", "Bicicleta", "Barco", "Motocicleta", "Autobús", "Helicóptero", "Skate"],
  Arte: [
    "Pintura",
    "Escultura",
    "Danza",
    "Teatro",
    "Poesía",
    "Novela",
    "Canción",
    "Concierto",
    "Música",
    "Cine",
    "Libro",
    "Fotografía",
  ],
  Ropa: ["Zapatos", "Sombrero", "Camisa", "Pantalón", "Vestido", "Chaqueta", "Bufanda", "Guantes", "Gafas", "Collar"],
  Naturaleza: ["Sol", "Luna", "Estrella", "Planeta", "Nieve", "Lluvia", "Nube", "Arcoíris", "Relámpago", "Volcán"],
  Abstractos: ["Amor", "Amistad", "Familia", "Trabajo", "Escuela", "Universidad", "Libertad", "Justicia", "Paz"],
  Estaciones: ["Verano", "Invierno", "Primavera", "Otoño"],
  "Momentos del Día": ["Día", "Noche", "Mañana", "Tarde", "Amanecer", "Atardecer"],
}

const COLOR_PALETTES = {
  mystery: {
    name: "Misterio Oscuro",
    colors: {
      background: "oklch(0.18 0.02 270)",
      foreground: "oklch(0.98 0 0)",
      card: "oklch(0.25 0.03 280)",
      "card-foreground": "oklch(0.98 0 0)",
      primary: "oklch(0.75 0.15 340)",
      "primary-foreground": "oklch(0.98 0 0)",
      secondary: "oklch(0.65 0.18 50)",
      "secondary-foreground": "oklch(0.98 0 0)",
      muted: "oklch(0.35 0.02 270)",
      "muted-foreground": "oklch(0.7 0 0)",
      destructive: "oklch(0.55 0.22 10)",
      "destructive-foreground": "oklch(0.98 0 0)",
      border: "oklch(0.35 0.02 270)",
      accent: "oklch(0.65 0.2 300)",
      "accent-foreground": "oklch(0.98 0 0)",
    },
  },
  ocean: {
    name: "Océano Profundo",
    colors: {
      background: "oklch(0.15 0.04 240)",
      foreground: "oklch(0.98 0 0)",
      card: "oklch(0.22 0.05 240)",
      "card-foreground": "oklch(0.98 0 0)",
      primary: "oklch(0.65 0.2 220)",
      "primary-foreground": "oklch(0.98 0 0)",
      secondary: "oklch(0.7 0.15 180)",
      "secondary-foreground": "oklch(0.98 0 0)",
      muted: "oklch(0.3 0.04 240)",
      "muted-foreground": "oklch(0.7 0 0)",
      destructive: "oklch(0.55 0.22 10)",
      "destructive-foreground": "oklch(0.98 0 0)",
      border: "oklch(0.3 0.04 240)",
      accent: "oklch(0.6 0.18 200)",
      "accent-foreground": "oklch(0.98 0 0)",
    },
  },
  sunset: {
    name: "Atardecer Cálido",
    colors: {
      background: "oklch(0.2 0.04 30)",
      foreground: "oklch(0.98 0 0)",
      card: "oklch(0.28 0.05 30)",
      "card-foreground": "oklch(0.98 0 0)",
      primary: "oklch(0.7 0.2 40)",
      "primary-foreground": "oklch(0.98 0 0)",
      secondary: "oklch(0.65 0.22 20)",
      "secondary-foreground": "oklch(0.98 0 0)",
      muted: "oklch(0.35 0.03 30)",
      "muted-foreground": "oklch(0.7 0 0)",
      destructive: "oklch(0.55 0.22 10)",
      "destructive-foreground": "oklch(0.98 0 0)",
      border: "oklch(0.35 0.03 30)",
      accent: "oklch(0.75 0.18 60)",
      "accent-foreground": "oklch(0.98 0 0)",
    },
  },
  forest: {
    name: "Bosque Esmeralda",
    colors: {
      background: "oklch(0.16 0.03 160)",
      foreground: "oklch(0.98 0 0)",
      card: "oklch(0.24 0.04 160)",
      "card-foreground": "oklch(0.98 0 0)",
      primary: "oklch(0.65 0.18 150)",
      "primary-foreground": "oklch(0.98 0 0)",
      secondary: "oklch(0.7 0.15 120)",
      "secondary-foreground": "oklch(0.98 0 0)",
      muted: "oklch(0.32 0.03 160)",
      "muted-foreground": "oklch(0.7 0 0)",
      destructive: "oklch(0.55 0.22 10)",
      "destructive-foreground": "oklch(0.98 0 0)",
      border: "oklch(0.32 0.03 160)",
      accent: "oklch(0.6 0.2 140)",
      "accent-foreground": "oklch(0.98 0 0)",
    },
  },
  neon: {
    name: "Neón Cyber",
    colors: {
      background: "oklch(0.12 0.01 280)",
      foreground: "oklch(0.98 0 0)",
      card: "oklch(0.18 0.02 280)",
      "card-foreground": "oklch(0.98 0 0)",
      primary: "oklch(0.75 0.25 310)",
      "primary-foreground": "oklch(0.98 0 0)",
      secondary: "oklch(0.7 0.22 180)",
      "secondary-foreground": "oklch(0.98 0 0)",
      muted: "oklch(0.25 0.02 280)",
      "muted-foreground": "oklch(0.7 0 0)",
      destructive: "oklch(0.55 0.22 10)",
      "destructive-foreground": "oklch(0.98 0 0)",
      border: "oklch(0.25 0.02 280)",
      accent: "oklch(0.65 0.28 280)",
      "accent-foreground": "oklch(0.98 0 0)",
    },
  },
  royal: {
    name: "Realeza Púrpura",
    colors: {
      background: "oklch(0.14 0.03 290)",
      foreground: "oklch(0.98 0 0)",
      card: "oklch(0.2 0.04 290)",
      "card-foreground": "oklch(0.98 0 0)",
      primary: "oklch(0.6 0.22 290)",
      "primary-foreground": "oklch(0.98 0 0)",
      secondary: "oklch(0.65 0.2 50)",
      "secondary-foreground": "oklch(0.98 0 0)",
      muted: "oklch(0.28 0.03 290)",
      "muted-foreground": "oklch(0.7 0 0)",
      destructive: "oklch(0.55 0.22 10)",
      "destructive-foreground": "oklch(0.98 0 0)",
      border: "oklch(0.28 0.03 290)",
      accent: "oklch(0.7 0.18 310)",
      "accent-foreground": "oklch(0.98 0 0)",
    },
  },
}

type GameState = "categories" | "setup" | "playing" | "finished" | "theme" | "custom-theme"
type PaletteName = keyof typeof COLOR_PALETTES

type CustomColors = {
  background: string
  foreground: string
  card: string
  "card-foreground": string
  primary: string
  "primary-foreground": string
  secondary: string
  "secondary-foreground": string
  muted: string
  "muted-foreground": string
  destructive: string
  "destructive-foreground": string
  border: string
  accent: string
  "accent-foreground": string
}

export default function ImpostorGame() {
  const [gameState, setGameState] = useState<GameState>("categories")
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [players, setPlayers] = useState<string[]>([])
  const [currentPlayer, setCurrentPlayer] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [newPlayerName, setNewPlayerName] = useState("")
  const [selectedWord, setSelectedWord] = useState("")
  const [impostorIndices, setImpostorIndices] = useState<number[]>([])
  const [firstPlayerIndex, setFirstPlayerIndex] = useState(0)
  const [currentPalette, setCurrentPalette] = useState<PaletteName>("mystery")
  const [previousGameState, setPreviousGameState] = useState<GameState>("categories")
  const [numImpostors, setNumImpostors] = useState(1)
  const [customColors, setCustomColors] = useState<CustomColors>({
    background: "#0f0f0f",
    foreground: "#ffffff",
    card: "#1a1a1a",
    "card-foreground": "#ffffff",
    primary: "#8b5cf6",
    "primary-foreground": "#ffffff",
    secondary: "#f59e0b",
    "secondary-foreground": "#ffffff",
    muted: "#262626",
    "muted-foreground": "#a3a3a3",
    destructive: "#ef4444",
    "destructive-foreground": "#ffffff",
    border: "#262626",
    accent: "#a855f7",
    "accent-foreground": "#ffffff",
  })
  const [savedThemes, setSavedThemes] = useState<Record<string, CustomColors>>({})

  // Cargar temas guardados al iniciar
  useEffect(() => {
    const saved = localStorage.getItem('custom-themes')
    if (saved) {
      try {
        setSavedThemes(JSON.parse(saved))
      } catch (error) {
        console.error('Error loading saved themes:', error)
      }
    }
  }, [])

  // Guardar temas en localStorage cuando cambien
  useEffect(() => {
    localStorage.setItem('custom-themes', JSON.stringify(savedThemes))
  }, [savedThemes])

  useEffect(() => {
    const root = document.documentElement
    if (gameState === "custom-theme") {
      Object.entries(customColors).forEach(([key, value]) => {
        root.style.setProperty(`--${key}`, value)
      })
    } else {
      const palette = COLOR_PALETTES[currentPalette]
      Object.entries(palette.colors).forEach(([key, value]) => {
        root.style.setProperty(`--${key}`, value)
      })
    }
  }, [currentPalette, customColors, gameState])

  const toggleCategory = (category: string) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== category))
    } else {
      setSelectedCategories([...selectedCategories, category])
    }
  }

  const getAvailableWords = () => {
    if (selectedCategories.length === 0) {
      return Object.values(WORD_CATEGORIES).flat()
    }
    return selectedCategories.flatMap((category) => WORD_CATEGORIES[category as keyof typeof WORD_CATEGORIES] || [])
  }

  const addPlayer = () => {
    if (newPlayerName.trim() && players.length < 20) {
      setPlayers([...players, newPlayerName.trim()])
      setNewPlayerName("")
    }
  }

  const removePlayer = (index: number) => {
    setPlayers(players.filter((_, i) => i !== index))
  }

  const startGame = () => {
    if (players.length < 3) return

    const availableWords = getAvailableWords()
    const randomWord = availableWords[Math.floor(Math.random() * availableWords.length)]

    const shuffledIndices = [...Array(players.length).keys()].sort(() => Math.random() - 0.5)
    const selectedImpostors = shuffledIndices.slice(0, numImpostors)

    const randomFirstPlayer = Math.floor(Math.random() * players.length)

    setSelectedWord(randomWord)
    setImpostorIndices(selectedImpostors)
    setFirstPlayerIndex(randomFirstPlayer)
    setCurrentPlayer(0)
    setIsFlipped(false)
    setGameState("playing")
  }

  const handleCardPress = () => {
    setIsFlipped(true)
  }

  const handleCardRelease = () => {
    setIsFlipped(false)
  }

  const nextPlayer = () => {
    if (currentPlayer < players.length - 1) {
      setCurrentPlayer(currentPlayer + 1)
      setIsFlipped(false)
    } else {
      setGameState("finished")
    }
  }

  const resetGame = () => {
    setCurrentPlayer(0)
    setIsFlipped(false)
    setSelectedWord("")
    setImpostorIndices([])
    setGameState("setup")
  }

  const isCurrentPlayerImpostor = impostorIndices.includes(currentPlayer)

  const openThemeSettings = () => {
    setPreviousGameState(gameState)
    setGameState("theme")
  }

  const closeThemeSettings = () => {
    setGameState(previousGameState)
  }

  const selectPalette = (paletteName: PaletteName) => {
    setCurrentPalette(paletteName)
  }

  const openCustomTheme = () => {
    setPreviousGameState(gameState)
    setGameState("custom-theme")
  }

  const closeCustomTheme = () => {
    setGameState(previousGameState)
  }

  const updateCustomColor = (colorKey: keyof CustomColors, value: string) => {
    setCustomColors(prev => ({
      ...prev,
      [colorKey]: value
    }))
  }

  const resetCustomColors = () => {
    const defaultColors: CustomColors = {
      background: "#0f0f0f",
      foreground: "#ffffff",
      card: "#1a1a1a",
      "card-foreground": "#ffffff",
      primary: "#8b5cf6",
      "primary-foreground": "#ffffff",
      secondary: "#f59e0b",
      "secondary-foreground": "#ffffff",
      muted: "#262626",
      "muted-foreground": "#a3a3a3",
      destructive: "#ef4444",
      "destructive-foreground": "#ffffff",
      border: "#262626",
      accent: "#a855f7",
      "accent-foreground": "#ffffff",
    }
    setCustomColors(defaultColors)
  }

  const applyCustomTheme = () => {
    // El tema personalizado ya se aplica automáticamente por el useEffect
    setGameState(previousGameState)
  }

  const saveCustomTheme = (name: string) => {
    if (name.trim()) {
      setSavedThemes(prev => ({
        ...prev,
        [name.trim()]: { ...customColors }
      }))
    }
  }

  const loadCustomTheme = (name: string) => {
    const theme = savedThemes[name]
    if (theme) {
      setCustomColors({ ...theme })
    }
  }

  const deleteCustomTheme = (name: string) => {
    setSavedThemes(prev => {
      const newThemes = { ...prev }
      delete newThemes[name]
      return newThemes
    })
  }

  if (gameState === "theme") {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-background">
        <Card className="w-full max-w-2xl bg-card border-border">
          <CardContent className="p-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Palette className="h-6 w-6 text-primary" />
                <h1 className="text-3xl font-bold text-primary text-balance">Seleccionar Paleta</h1>
              </div>
              <Button variant="ghost" size="icon" onClick={closeThemeSettings} className="hover:bg-muted">
                <X className="h-5 w-5" />
              </Button>
            </div>

            <p className="text-center text-muted-foreground mb-8 text-pretty">
              Elige una paleta de colores para personalizar la apariencia de tu juego
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {(Object.keys(COLOR_PALETTES) as PaletteName[]).map((paletteName) => {
                const palette = COLOR_PALETTES[paletteName]
                const isSelected = currentPalette === paletteName
                return (
                  <button
                    key={paletteName}
                    onClick={() => selectPalette(paletteName)}
                    className={`relative p-5 rounded-lg border-2 transition-all hover:scale-105 ${
                      isSelected
                        ? "border-primary shadow-lg shadow-primary/20"
                        : "border-border hover:border-primary/50"
                    }`}
                    style={{ backgroundColor: palette.colors.card }}
                  >
                    <div className="flex flex-col items-start gap-3">
                      <div className="w-full flex items-center justify-between">
                        <span className="font-bold text-lg" style={{ color: palette.colors["card-foreground"] }}>
                          {palette.name}
                        </span>
                        {isSelected && (
                          <div className="rounded-full p-1" style={{ backgroundColor: palette.colors.primary }}>
                            <Check className="h-4 w-4" style={{ color: palette.colors["primary-foreground"] }} />
                          </div>
                        )}
                      </div>

                      <div className="w-full flex gap-2">
                        <div className="h-10 flex-1 rounded" style={{ backgroundColor: palette.colors.primary }} />
                        <div className="h-10 flex-1 rounded" style={{ backgroundColor: palette.colors.secondary }} />
                        <div className="h-10 flex-1 rounded" style={{ backgroundColor: palette.colors.accent }} />
                      </div>
                    </div>
                  </button>
                )
              })}
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={openCustomTheme}
                className="flex-1 bg-background border-border hover:bg-muted"
                size="lg"
              >
                🎨 Tema Personalizado
              </Button>
              <Button
                onClick={closeThemeSettings}
                className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
                size="lg"
              >
                Aplicar y Continuar
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (gameState === "custom-theme") {
    const colorGroups = [
      {
        title: "Fondos y Texto",
        colors: [
          { key: "background" as keyof CustomColors, label: "Fondo Principal" },
          { key: "foreground" as keyof CustomColors, label: "Texto Principal" },
          { key: "card" as keyof CustomColors, label: "Fondo de Tarjetas" },
          { key: "card-foreground" as keyof CustomColors, label: "Texto de Tarjetas" },
        ]
      },
      {
        title: "Colores Principales",
        colors: [
          { key: "primary" as keyof CustomColors, label: "Color Principal" },
          { key: "primary-foreground" as keyof CustomColors, label: "Texto Principal" },
          { key: "secondary" as keyof CustomColors, label: "Color Secundario" },
          { key: "secondary-foreground" as keyof CustomColors, label: "Texto Secundario" },
        ]
      },
      {
        title: "Colores de Apoyo",
        colors: [
          { key: "muted" as keyof CustomColors, label: "Fondo Atenuado" },
          { key: "muted-foreground" as keyof CustomColors, label: "Texto Atenuado" },
          { key: "accent" as keyof CustomColors, label: "Color de Acento" },
          { key: "accent-foreground" as keyof CustomColors, label: "Texto de Acento" },
        ]
      },
      {
        title: "Estados Especiales",
        colors: [
          { key: "destructive" as keyof CustomColors, label: "Color Destructivo" },
          { key: "destructive-foreground" as keyof CustomColors, label: "Texto Destructivo" },
          { key: "border" as keyof CustomColors, label: "Color de Bordes" },
        ]
      }
    ]

    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-background">
        <Card className="w-full max-w-4xl bg-card border-border">
          <CardContent className="p-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Palette className="h-6 w-6 text-primary" />
                <h1 className="text-3xl font-bold text-primary text-balance">Tema Personalizado</h1>
              </div>
              <Button variant="ghost" size="icon" onClick={closeCustomTheme} className="hover:bg-muted">
                <X className="h-5 w-5" />
              </Button>
            </div>

            <p className="text-center text-muted-foreground mb-8 text-pretty">
              Personaliza los colores de tu tema con vista previa en tiempo real
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Panel de controles */}
              <div className="space-y-6">
                {colorGroups.map((group) => (
                  <div key={group.title} className="space-y-3">
                    <h3 className="text-lg font-semibold text-foreground">{group.title}</h3>
                    <div className="grid grid-cols-1 gap-3">
                      {group.colors.map((color) => (
                        <div key={color.key} className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                          <input
                            type="color"
                            value={customColors[color.key]}
                            onChange={(e) => updateCustomColor(color.key, e.target.value)}
                            className="w-12 h-8 rounded border border-border cursor-pointer"
                          />
                          <div className="flex-1">
                            <label className="text-sm font-medium text-foreground block">
                              {color.label}
                            </label>
                            <span className="text-xs text-muted-foreground font-mono">
                              {customColors[color.key]}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}

                {/* Guardar tema */}
                <div className="space-y-3 pt-4">
                  <div className="flex gap-3">
                    <Input
                      id="theme-name"
                      placeholder="Nombre del tema"
                      className="flex-1 bg-muted border-border text-foreground placeholder:text-muted-foreground"
                    />
                    <Button
                      onClick={() => {
                        const input = document.getElementById('theme-name') as HTMLInputElement
                        if (input?.value.trim()) {
                          saveCustomTheme(input.value.trim())
                          input.value = ''
                        }
                      }}
                      className="bg-primary text-primary-foreground hover:bg-primary/90"
                    >
                      💾 Guardar
                    </Button>
                  </div>

                  {/* Temas guardados */}
                  {Object.keys(savedThemes).length > 0 && (
                    <div className="space-y-2">
                      <h4 className="text-sm font-semibold text-foreground">Temas Guardados:</h4>
                      <div className="max-h-32 overflow-y-auto space-y-2">
                        {Object.entries(savedThemes).map(([name, theme]) => (
                          <div key={name} className="flex items-center gap-2 p-2 bg-muted rounded-lg">
                            <div className="flex gap-1 flex-1">
                              <div
                                className="w-4 h-4 rounded-full border border-border cursor-pointer"
                                style={{ backgroundColor: theme.primary }}
                                onClick={() => loadCustomTheme(name)}
                                title="Cargar tema"
                              />
                              <span className="text-sm text-foreground flex-1 truncate">{name}</span>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => deleteCustomTheme(name)}
                              className="h-6 w-6 p-0 text-muted-foreground hover:text-destructive"
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      onClick={resetCustomColors}
                      className="flex-1 bg-background border-border hover:bg-muted"
                    >
                      Restablecer
                    </Button>
                    <Button
                      onClick={applyCustomTheme}
                      className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
                    >
                      Aplicar Tema
                    </Button>
                  </div>
                </div>
              </div>

              {/* Panel de vista previa */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">Vista Previa</h3>

                {/* Card de ejemplo */}
                <Card className="bg-card border-border">
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xl font-bold text-primary">Ejemplo de Tarjeta</h4>
                        <div className="flex gap-2">
                          <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
                            Principal
                          </Button>
                          <Button size="sm" variant="secondary" className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
                            Secundario
                          </Button>
                        </div>
                      </div>

                      <p className="text-muted-foreground">
                        Este es un texto de ejemplo para mostrar cómo se ven los colores en diferentes elementos.
                      </p>

                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="border-border hover:bg-accent text-accent-foreground">
                          Acento
                        </Button>
                        <Button size="sm" variant="destructive" className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                          Destructivo
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Elementos de ejemplo */}
                <div className="space-y-3">
                  <div className="p-3 bg-muted rounded-lg">
                    <span className="text-sm text-muted-foreground">Texto atenuado en fondo atenuado</span>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-card border border-border rounded-lg">
                    <div className="w-4 h-4 bg-primary rounded-full"></div>
                    <span className="text-foreground">Elemento con indicador primario</span>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-card border border-border rounded-lg">
                    <div className="w-4 h-4 bg-secondary rounded-full"></div>
                    <span className="text-foreground">Elemento con indicador secundario</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (gameState === "categories") {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-background">
        <Card className="w-full max-w-2xl bg-card border-border">
          <CardContent className="p-8">
            <div className="flex justify-end mb-4">
              <Button variant="ghost" size="sm" onClick={openThemeSettings} className="hover:bg-muted">
                <Palette className="h-4 w-4 mr-2" />
                Tema
              </Button>
            </div>

            <h1 className="text-4xl font-bold text-center mb-2 text-primary text-balance">El Impostor</h1>
            <p className="text-center text-muted-foreground mb-8 text-pretty">
              Selecciona una o más categorías para el juego
            </p>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-8">
              {Object.keys(WORD_CATEGORIES).map((category) => {
                const isSelected = selectedCategories.includes(category)
                return (
                  <button
                    key={category}
                    onClick={() => toggleCategory(category)}
                    className={`relative p-4 rounded-lg border-2 transition-all hover:scale-105 ${
                      isSelected
                        ? "bg-primary border-primary text-primary-foreground"
                        : "bg-muted border-border text-foreground hover:border-primary/50"
                    }`}
                  >
                    <span className="font-semibold text-sm">{category}</span>
                    {isSelected && (
                      <div className="absolute top-2 right-2">
                        <Check className="h-4 w-4" />
                      </div>
                    )}
                  </button>
                )
              })}
            </div>

            <div className="text-center mb-6">
              <p className="text-sm text-muted-foreground">
                {selectedCategories.length === 0
                  ? "Ninguna categoría seleccionada (se usarán todas)"
                  : `${selectedCategories.length} categoría${selectedCategories.length > 1 ? "s" : ""} seleccionada${selectedCategories.length > 1 ? "s" : ""}`}
              </p>
            </div>

            <Button
              onClick={() => setGameState("setup")}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
              size="lg"
            >
              Continuar
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (gameState === "setup") {
    const maxImpostors = Math.max(1, players.length - 1)

    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-background">
        <Card className="w-full max-w-lg bg-card border-border">
          <CardContent className="p-8">
            <div className="flex justify-end mb-4">
              <Button variant="ghost" size="sm" onClick={openThemeSettings} className="hover:bg-muted">
                <Palette className="h-4 w-4 mr-2" />
                Tema
              </Button>
            </div>

            <h1 className="text-4xl font-bold text-center mb-2 text-primary text-balance">El Impostor</h1>
            <p className="text-center text-muted-foreground mb-6 text-pretty">
              Añade los nombres de los jugadores (mínimo 3)
            </p>

            <div className="mb-6 p-4 bg-muted rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-foreground">Categorías:</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setGameState("categories")}
                  className="h-8 px-2 text-xs hover:bg-background"
                >
                  <Settings className="h-3 w-3 mr-1" />
                  Cambiar
                </Button>
              </div>
              <div className="flex flex-wrap gap-1">
                {selectedCategories.length === 0 ? (
                  <span className="text-xs text-muted-foreground italic">Todas las categorías</span>
                ) : (
                  selectedCategories.map((cat) => (
                    <span key={cat} className="text-xs bg-primary/20 text-primary px-2 py-1 rounded">
                      {cat}
                    </span>
                  ))
                )}
              </div>
            </div>

            <div className="mb-6 p-4 bg-muted rounded-lg">
              <label className="text-sm font-medium text-foreground block mb-3">Cantidad de Impostores:</label>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setNumImpostors(Math.max(1, numImpostors - 1))}
                  disabled={numImpostors <= 1}
                  className="h-10 w-10 bg-background border-border hover:bg-primary/10 disabled:opacity-50"
                >
                  <span className="text-xl">-</span>
                </Button>
                <div className="flex-1 text-center">
                  <span className="text-3xl font-bold text-primary">{numImpostors}</span>
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setNumImpostors(Math.min(maxImpostors, numImpostors + 1))}
                  disabled={numImpostors >= maxImpostors}
                  className="h-10 w-10 bg-background border-border hover:bg-primary/10 disabled:opacity-50"
                >
                  <span className="text-xl">+</span>
                </Button>
              </div>
              {players.length >= 3 && (
                <p className="text-xs text-center text-muted-foreground mt-2">
                  Máximo: {maxImpostors} impostor{maxImpostors > 1 ? "es" : ""}
                </p>
              )}
            </div>

            <div className="flex gap-2 mb-6">
              <Input
                placeholder="Nombre del jugador"
                value={newPlayerName}
                onChange={(e) => setNewPlayerName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addPlayer()}
                className="flex-1 bg-muted border-border text-foreground placeholder:text-muted-foreground"
              />
              <Button
                onClick={addPlayer}
                size="icon"
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                <Plus className="h-5 w-5" />
              </Button>
            </div>

            {players.length > 0 && (
              <div className="mb-6 space-y-2 max-h-64 overflow-y-auto">
                {players.map((player, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <span className="font-medium text-foreground">{player}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removePlayer(index)}
                      className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}

            <Button
              onClick={startGame}
              disabled={players.length < 3}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
              size="lg"
            >
              Comenzar Juego
            </Button>

            {players.length < 3 && players.length > 0 && (
              <p className="text-center text-sm text-destructive mt-2">Necesitas al menos 3 jugadores</p>
            )}
          </CardContent>
        </Card>
      </div>
    )
  }

  if (gameState === "playing") {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-background">
        <div className="w-full max-w-md flex flex-col items-center">
          <div className="text-center mb-8">
            <div className="inline-block bg-muted px-4 py-2 rounded-full mb-4">
              <span className="text-muted-foreground text-sm">
                Jugador {currentPlayer + 1} de {players.length}
              </span>
            </div>
          </div>

          <div
            className={`flip-card w-72 aspect-[2.5/3.5] mb-6 ${isFlipped ? "flipped" : ""}`}
            onMouseDown={handleCardPress}
            onMouseUp={handleCardRelease}
            onMouseLeave={handleCardRelease}
            onTouchStart={handleCardPress}
            onTouchEnd={handleCardRelease}
          >
            <div className="flip-card-inner w-full h-full">
              <Card className="flip-card-front bg-card border-border cursor-pointer hover:border-primary transition-colors select-none">
                <CardContent className="h-full flex flex-col items-center justify-center p-6">
                  <h2 className="text-4xl font-bold text-primary mb-4 text-balance">{players[currentPlayer]}</h2>
                  <p className="text-muted-foreground text-center text-sm text-pretty">
                    Mantén presionada la tarjeta para revelar tu rol
                  </p>
                </CardContent>
              </Card>

              <Card className="flip-card-back bg-card border-border select-none">
                <CardContent className="h-full flex flex-col items-center justify-center p-6">
                  {isCurrentPlayerImpostor ? (
                    <>
                      <div className="text-6xl mb-3">🎭</div>
                      <h3 className="text-4xl font-bold text-destructive mb-3 text-balance">IMPOSTOR</h3>
                      <p className="text-muted-foreground text-center text-xs text-pretty">
                        Descubre la palabra sin ser descubierto
                      </p>
                    </>
                  ) : (
                    <>
                      <div className="text-6xl mb-3">🎯</div>
                      <h3 className="text-4xl font-bold text-secondary mb-3 text-balance">{selectedWord}</h3>
                      <p className="text-muted-foreground text-center text-xs text-pretty">
                        Describe la palabra sin decirla
                      </p>
                    </>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>

          <Button
            onClick={nextPlayer}
            className="w-full max-w-72 bg-primary text-primary-foreground hover:bg-primary/90"
            size="lg"
          >
            {currentPlayer < players.length - 1 ? "Siguiente Jugador" : "Finalizar Ronda"}
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <Card className="w-full max-w-lg bg-card border-border">
        <CardContent className="p-8 text-center">
          <div className="text-7xl mb-6">🎮</div>
          <h2 className="text-4xl font-bold text-primary mb-4 text-balance">¡A Jugar!</h2>
          <p className="text-2xl text-foreground mb-8 text-balance">
            Empieza: <span className="font-bold text-secondary">{players[firstPlayerIndex]}</span>
          </p>
          <Button onClick={resetGame} className="bg-primary text-primary-foreground hover:bg-primary/90" size="lg">
            Volver a Jugar
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
