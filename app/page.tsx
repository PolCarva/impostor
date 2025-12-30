"use client"

import { useState, useEffect } from "react"
import { GoogleGenerativeAI } from "@google/generative-ai"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { X, Plus, Check, Settings, Palette, Sparkles, Loader2, Edit } from "lucide-react"

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
  Naturaleza: ["Sol", "Luna", "Estrella", "Planeta", "Nieve", "Lluvia", "Nube", "Arcoíris", "Relámpago", "Volcán"],
  Abstractos: ["Amor", "Amistad", "Familia", "Trabajo", "Escuela", "Universidad", "Libertad", "Justicia", "Paz"],
}

const DEFAULT_CATEGORIES = WORD_CATEGORIES

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

type GameState = "categories" | "setup" | "playing" | "finished" | "theme" | "custom-theme" | "edit-custom-category"
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
  const [customCategories, setCustomCategories] = useState<Record<string, string[]>>({})
  const [editingCategoryName, setEditingCategoryName] = useState("")
  const [editingCategoryWords, setEditingCategoryWords] = useState<string[]>([])
  const [aiPrompt, setAiPrompt] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [isEditingExisting, setIsEditingExisting] = useState(false)

  // Cargar temas y categorías personalizadas al iniciar
  useEffect(() => {
    const savedThemes = localStorage.getItem('custom-themes')
    if (savedThemes) {
      try {
        setSavedThemes(JSON.parse(savedThemes))
      } catch (error) {
        console.error('Error loading saved themes:', error)
      }
    }

    const savedCustomCategories = localStorage.getItem('custom-categories')
    if (savedCustomCategories) {
      try {
        setCustomCategories(JSON.parse(savedCustomCategories))
      } catch (error) {
        console.error('Error loading custom categories:', error)
      }
    }
  }, [])

  // Guardar temas en localStorage cuando cambien
  useEffect(() => {
    localStorage.setItem('custom-themes', JSON.stringify(savedThemes))
  }, [savedThemes])

  // Guardar categorías personalizadas en localStorage cuando cambien
  useEffect(() => {
    localStorage.setItem('custom-categories', JSON.stringify(customCategories))
  }, [customCategories])

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
      const defaultWords = Object.values(DEFAULT_CATEGORIES).flat()
      const customWords = Object.values(customCategories).flat()
      return [...defaultWords, ...customWords]
    }

    const selectedWords = selectedCategories.flatMap((category) => {
      if (DEFAULT_CATEGORIES[category as keyof typeof DEFAULT_CATEGORIES]) {
        return DEFAULT_CATEGORIES[category as keyof typeof DEFAULT_CATEGORIES] || []
      }
      return customCategories[category] || []
    })

    return selectedWords
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


  const deleteCustomCategory = (categoryName: string) => {
    setCustomCategories(prev => {
      const newCategories = { ...prev }
      delete newCategories[categoryName]
      return newCategories
    })
    // Si la categoría eliminada estaba seleccionada, quitarla de las seleccionadas
    setSelectedCategories(prev => prev.filter(cat => cat !== categoryName))
  }

  const openCreateCustomCategory = () => {
    setEditingCategoryName("")
    setEditingCategoryWords([])
    setAiPrompt("")
    setIsEditingExisting(false)
    setGameState("edit-custom-category")
  }

  const openEditCustomCategory = (categoryName: string) => {
    const words = customCategories[categoryName] || []
    setEditingCategoryName(categoryName)
    setEditingCategoryWords([...words])
    setAiPrompt("")
    setIsEditingExisting(true)
    setGameState("edit-custom-category")
  }

  const saveCustomCategory = () => {
    if (editingCategoryName.trim() && editingCategoryWords.length > 0) {
      setCustomCategories(prev => ({
        ...prev,
        [editingCategoryName.trim()]: [...editingCategoryWords]
      }))
      setGameState("categories")
    }
  }

  const cancelEditCategory = () => {
    setGameState("categories")
  }

  const addWordToCategory = (word: string) => {
    if (word.trim() && !editingCategoryWords.includes(word.trim())) {
      setEditingCategoryWords(prev => [...prev, word.trim()])
    }
  }

  const removeWordFromCategory = (index: number) => {
    setEditingCategoryWords(prev => prev.filter((_, i) => i !== index))
  }

  const updateWordInCategory = (index: number, newWord: string) => {
    if (newWord.trim() && !editingCategoryWords.some((word, i) => i !== index && word === newWord.trim())) {
      setEditingCategoryWords(prev => prev.map((word, i) => i === index ? newWord.trim() : word))
    }
  }

  const generateWordsWithAI = async (prompt: string) => {
    if (!prompt.trim() || prompt.length > 100) return

    // Verificar que la API key esté configurada
    if (!process.env.NEXT_PUBLIC_GEMINI_API_KEY) {
      alert('❌ API Key no configurada\n\nPor favor configura tu API key de Gemini:\n1. Ve a: https://makersuite.google.com/app/apikey\n2. Crea una API key gratuita\n3. Agrega al archivo .env.local:\n   NEXT_PUBLIC_GEMINI_API_KEY=tu_clave_aqui\n\n¡Sin la API key, la IA no funcionará!')
      return
    }

    setIsGenerating(true)

    // Lista de modelos a probar - basado en código que funciona en producción
    // Prioridad: modelo probado -> alternativas
    const modelsToTry = ["gemini-2.5-flash", "gemini-1.5-flash", "gemini-pro", "gemini-1.0-pro"]

    let success = false

    for (const modelName of modelsToTry) {
      try {
        console.log(`🔄 Probando modelo: ${modelName}`)

        // Intentar crear el cliente de diferentes maneras
        let genAI
        try {
          // Método 1: Cliente básico
          genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY!)
        } catch (clientError) {
          console.warn(`❌ Error creando cliente para ${modelName}:`, clientError.message)
          continue
        }

        let model
        try {
          model = genAI.getGenerativeModel({ model: modelName })
        } catch (modelError) {
          console.warn(`❌ Error obteniendo modelo ${modelName}:`, modelError.message)
          continue
        }

        const fullPrompt = `Genera exactamente 10 elementos específicos y concretos relacionados con: "${prompt}"

INSTRUCCIONES IMPORTANTES:
- Si es una categoría específica (ej: "personajes de Naruto", "tubérculos", "capitales de países", "marcas de autos"), genera EJEMPLOS REALES Y ESPECÍFICOS de esa categoría
- Si es un tema general (ej: "colores", "animales", "profesiones"), genera palabras relacionadas con ese tema

EJEMPLOS:
- "personajes de Naruto" → Naruto,Sasuke,Sakura,Kakashi,Hinata,Neji,Gaara,Lee,Itachi,Madara
- "tubérculos" → papa,boniato,yuca,malanga,ñame,batata,camote,jícama,oca,cebada
- "capitales de países" → Madrid,París,Londres,Berlín,Roma,Madrid,Tokio,Pekín,Moscú,Sídney
- "marcas de autos" → Toyota,Ford,BMW,Volkswagen,Honda,Nissan,Mercedes,Audi,Chevrolet,Ferrari
- "meses del año" → enero,febrero,marzo,abril,mayo,junio,julio,agosto,septiembre,octubre
- "colores primarios" → rojo,azul,amarillo,verde,naranja,morado,rosa,negro,blanco,gris

SOLO devuelve los 10 elementos separados por comas, sin numeración, sin explicaciones adicionales.`

        let result
        try {
          result = await model.generateContent(fullPrompt)
        } catch (generationError) {
          console.warn(`❌ Error generando contenido con ${modelName}:`, generationError.message)
          continue
        }

        let response
        try {
          response = await result.response
        } catch (responseError) {
          console.warn(`❌ Error obteniendo respuesta de ${modelName}:`, responseError.message)
          continue
        }

        const text = response.text()
        console.log(`📄 Respuesta de ${modelName}:`, text)

        // Parsear la respuesta y limpiar las palabras
        const newWords = text.split(',')
          .map(word => word.trim())
          .filter(word => word.length > 0 && word.length < 25) // Permitir nombres más largos
          .filter(word => /^[a-zA-ZáéíóúñÁÉÍÓÚÑ\s]+$/.test(word)) // Permitir mayúsculas y espacios para nombres
          .map(word => word.toLowerCase().trim()) // Convertir a minúsculas después de validar
          .filter((word, index, arr) => arr.indexOf(word) === index) // Eliminar duplicados
          .slice(0, 10) // Máximo 10 palabras

        if (newWords.length === 0) {
          console.warn(`⚠️ No se pudieron parsear palabras de la respuesta de ${modelName}`)
          continue
        }

        // Agregar las nuevas palabras a las existentes (sin duplicados)
        setEditingCategoryWords(prev => {
          const combined = [...prev]
          newWords.forEach(word => {
            if (!combined.includes(word)) {
              combined.push(word)
            }
          })
          return combined.slice(0, 20) // Limitar a 20 palabras máximo
        })

        console.log(`✅ ¡Éxito con modelo ${modelName}! Se agregaron ${newWords.length} palabras:`, newWords)
        alert(`✅ ¡Éxito! Se generaron ${newWords.length} elementos para "${prompt}" usando ${modelName}`)
        success = true
        break // Salir del loop si funcionó

      } catch (modelError) {
        console.error(`💥 Error completo con ${modelName}:`, modelError)
        continue // Intentar con el siguiente modelo
      }
    }

    // Si ningún modelo funcionó, usar fallback
    if (!success) {
      console.error('🚫 Error generating words with AI: Todos los modelos fallaron')

      // En caso de error, agregar palabras de respaldo
      const fallbackWords = [
        "Casa", "Perro", "Gato", "Árbol", "Libro",
        "Sol", "Luna", "Agua", "Fuego", "Tierra",
        "Aire", "Tiempo", "Amor", "Paz", "Alegría"
      ]
      setEditingCategoryWords(prev => {
        const combined = [...prev]
        fallbackWords.forEach(word => {
          if (!combined.includes(word)) {
            combined.push(word)
          }
        })
        return combined.slice(0, 20)
      })

      // Mostrar mensaje de error al usuario
      alert('🚫 Error de conexión con Gemini AI\n\nSe agregaron palabras de ejemplo en su lugar.\n\nPosibles soluciones:\n• Verifica que tu API key sea correcta\n• Asegúrate de que esté en .env.local (no .env)\n• Confirma que creaste la key en Google AI Studio\n• Revisa tu conexión a internet\n\nSi el problema persiste, la funcionalidad manual sigue funcionando perfectamente.')
    }

    setIsGenerating(false)
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
          <CardContent className="p-2 md:p-6 lg:p-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Palette className="h-6 w-6 text-primary" />
                <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-primary text-balance">Seleccionar Paleta</h1>
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
          <CardContent className="p-2 md:p-6 lg:p-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Palette className="h-6 w-6 text-primary" />
                <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-primary text-balance">Tema Personalizado</h1>
              </div>
              <Button variant="ghost" size="icon" onClick={closeCustomTheme} className="hover:bg-muted">
                <X className="h-5 w-5" />
              </Button>
            </div>

            <p className="text-center text-muted-foreground mb-8 text-pretty">
              Personaliza los colores de tu tema con vista previa en tiempo real
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 lg:gap-8">
              {/* Panel de controles */}
              <div className="space-y-4 md:space-y-6">
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

  if (gameState === "edit-custom-category") {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-background">
        <Card className="w-full max-w-4xl bg-card border-border">
          <CardContent className="p-2 md:p-6 lg:p-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <h1 className="text-3xl font-bold text-primary text-balance">
                  {isEditingExisting ? "Editar Categoría" : "Crear Nueva Categoría"}
                </h1>
              </div>
              <Button variant="ghost" size="icon" onClick={cancelEditCategory} className="hover:bg-muted">
                <X className="h-5 w-5" />
              </Button>
            </div>

            <div className="space-y-6">
              {/* Nombre de la categoría */}
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Nombre de la categoría:
                </label>
                <Input
                  placeholder="Ej: Personajes Familiares, Dibujos Animados..."
                  value={editingCategoryName}
                  onChange={(e) => setEditingCategoryName(e.target.value)}
                  className="bg-background border-border text-base"
                />
              </div>

              {/* Generación con IA */}
              <div className="bg-muted/30 p-4 rounded-lg border border-border">
                <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                  <Sparkles className="h-5 w-5" />
                  Asistente de IA (Opcional)
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Usa la IA para generar sugerencias de palabras automáticamente
                </p>

                <div className="flex gap-2">
                  <Input
                    placeholder="Ej: 'personajes de Naruto', 'tubérculos', 'capitales de países', 'marcas de autos'..."
                    value={aiPrompt}
                    onChange={(e) => setAiPrompt(e.target.value.slice(0, 100))}
                    className="flex-1 bg-background border-border"
                    disabled={isGenerating}
                  />
                  <div className="flex gap-2">
                    <Button
                      onClick={() => generateWordsWithAI(aiPrompt)}
                      disabled={!aiPrompt.trim() || aiPrompt.length > 100 || isGenerating}
                      className="bg-primary text-primary-foreground hover:bg-primary/90"
                      title="Generar palabras con IA"
                    >
                      {isGenerating ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Sparkles className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                  {!process.env.NEXT_PUBLIC_GEMINI_API_KEY && (
                    <div className="text-xs text-orange-600 bg-orange-50 p-2 rounded border border-orange-200">
                      ⚠️ API key de Gemini no configurada. La IA no funcionará hasta que agregues NEXT_PUBLIC_GEMINI_API_KEY en .env.local
                    </div>
                  )}
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  {aiPrompt.length}/100 caracteres
                </div>
              </div>

              {/* Lista de palabras */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-semibold text-foreground">
                    Palabras ({editingCategoryWords.length})
                  </h3>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Input
                      id="add-word-input"
                      placeholder="Nueva palabra..."
                      className="flex-1 bg-background border-border"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          const input = e.target as HTMLInputElement
                          addWordToCategory(input.value)
                          input.value = ''
                        }
                      }}
                    />
                    <Button
                      onClick={() => {
                        const input = document.getElementById('add-word-input') as HTMLInputElement
                        if (input?.value) {
                          addWordToCategory(input.value)
                          input.value = ''
                        }
                      }}
                      className="bg-secondary text-secondary-foreground hover:bg-secondary/90 px-4 py-2"
                    >
                      <Plus className="h-4 w-4 mr-1 sm:mr-2" />
                      <span className="hidden sm:inline">Agregar</span>
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 max-h-96 overflow-y-auto">
                  {editingCategoryWords.map((word, index) => (
                    <div key={index} className="flex items-center gap-1 p-2 bg-muted rounded-lg">
                      <Input
                        value={word}
                        onChange={(e) => updateWordInCategory(index, e.target.value)}
                        className="flex-1 h-8 text-sm bg-background border-border"
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeWordFromCategory(index)}
                        className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive"
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>

                {editingCategoryWords.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    <p>No hay palabras aún.</p>
                    <p className="text-sm">Usa la IA o agrega palabras manualmente.</p>
                  </div>
                )}
              </div>

              {/* Botones de acción */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <Button
                  variant="outline"
                  onClick={cancelEditCategory}
                  className="flex-1 bg-background border-border hover:bg-muted py-3 text-base"
                >
                  Cancelar
                </Button>
                <Button
                  onClick={saveCustomCategory}
                  disabled={!editingCategoryName.trim() || editingCategoryWords.length === 0}
                  className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 py-3 text-base"
                >
                  {isEditingExisting ? "Guardar Cambios" : "Crear Categoría"}
                </Button>
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
          <CardContent className="p-2 md:p-6 lg:p-8">
            <div className="flex justify-end">
              <Button variant="ghost" size="sm" onClick={openThemeSettings} className="hover:bg-muted">
                <Palette className="h-4 w-4 mr-2" />
                Tema
              </Button>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-2 text-primary text-balance">El Impostor</h1>
            <p className="text-center text-muted-foreground mb-6 md:mb-8 text-pretty text-sm md:text-base">
              Selecciona una o más categorías para el juego
            </p>

            {/* Categorías Default */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-foreground mb-3">Categorías Predefinidas</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 md:gap-3">
                {Object.keys(DEFAULT_CATEGORIES).map((category) => {
                  const isSelected = selectedCategories.includes(category)
                  return (
                    <button
                      key={category}
                      onClick={() => toggleCategory(category)}
                      className={`relative p-3 md:p-4 rounded-lg border-2 transition-all hover:scale-105 active:scale-95 ${
                        isSelected
                          ? "bg-primary border-primary text-primary-foreground"
                          : "bg-muted border-border text-foreground hover:border-primary/50"
                      }`}
                    >
                      <span className="font-semibold text-sm">{category}</span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Categorías Personalizadas */}
            {Object.keys(customCategories).length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-foreground mb-3">Categorías Personalizadas</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 md:gap-3">
                  {Object.entries(customCategories).map(([categoryName, words]) => {
                    const isSelected = selectedCategories.includes(categoryName)
                    return (
                      <div key={categoryName} className="relative">
                        <button
                          onClick={() => toggleCategory(categoryName)}
                          className={`relative w-full p-4 rounded-lg border-2 transition-all hover:scale-105 ${
                            isSelected
                              ? "bg-primary border-primary text-primary-foreground"
                              : "bg-muted border-border text-foreground hover:border-primary/50"
                          }`}
                        >
                          <div className="flex items-center gap-2 justify-center">
                            <span className="font-semibold text-sm">{categoryName}</span>
                          </div>
                          <div className="text-xs text-foreground mt-1">
                            {words.length} palabras
                          </div>
                        </button>
                         <div className="absolute -top-2 -right-2 flex gap-1">
                           <Button
                             variant="ghost"
                             size="sm"
                             onClick={(e) => {
                               e.stopPropagation()
                               openEditCustomCategory(categoryName)
                             }}
                             className="h-6 w-6 p-0 bg-secondary text-secondary-foreground hover:bg-secondary/90 rounded-full"
                             title="Editar categoría"
                           >
                             <Edit className="h-3 w-3" />
                           </Button>
                           <Button
                             variant="ghost"
                             size="sm"
                             onClick={(e) => {
                               e.stopPropagation()
                               deleteCustomCategory(categoryName)
                             }}
                             className="h-6 w-6 p-0 bg-destructive text-destructive-foreground hover:bg-destructive/90 rounded-full"
                             title="Eliminar categoría"
                           >
                             <X className="h-3 w-3" />
                           </Button>
                         </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

             {/* Crear Nueva Categoría Personalizada */}
             <div className="bg-muted/30 p-6 rounded-lg border-2 border-dashed border-border text-center">
               <h3 className="text-lg font-semibold text-foreground mb-2">
                 Crear Nueva Categoría Personalizada
               </h3>
               <p className="text-sm text-muted-foreground mb-4">
                 Crea tu propia categoría con palabras personalizadas
               </p>
               <Button
                 onClick={openCreateCustomCategory}
                 className="bg-primary text-primary-foreground hover:bg-primary/90"
                 size="lg"
               >
                 <Plus className="h-5 w-5 mr-2" />
                 Crear Categoría
               </Button>
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
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-4 text-lg"
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
          <CardContent className="p-2 md:p-6 lg:p-8">
            <div className="flex justify-end">
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

            <div className="flex flex-col sm:flex-row gap-2 mb-6">
              <Input
                placeholder="Nombre del jugador"
                value={newPlayerName}
                onChange={(e) => setNewPlayerName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addPlayer()}
                className="flex-1 bg-muted border-border text-foreground placeholder:text-muted-foreground text-base py-3"
              />
              <Button
                onClick={addPlayer}
                className="bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-3 text-base"
              >
                <Plus className="h-5 w-5 mr-2" />
                <span className="hidden sm:inline">Agregar</span>
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
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 py-4 text-lg"
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
            className={`flip-card w-full max-w-xs sm:max-w-sm md:w-72 aspect-[2.5/3.5] mb-6 ${isFlipped ? "flipped" : ""}`}
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
            className="w-full max-w-xs sm:max-w-sm md:max-w-72 bg-primary text-primary-foreground hover:bg-primary/90 py-4 text-lg"
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
          <div className="text-5xl sm:text-6xl md:text-7xl mb-4 sm:mb-6">🎮</div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary mb-4 text-balance">¡A Jugar!</h2>
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
