"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { 
  X, Plus, Check, Palette, Sparkles, Loader2, Edit,
  Heart, Sun, Waves, Grape, Leaf, Circle, Moon,
  Package, Globe, CircleDot, Gamepad2, PawPrint, Pizza,
  Star, Film, Wrench, Briefcase, Smartphone, Car, Rainbow,
  FolderOpen, UserSearch, Users, Target, RefreshCw, Gamepad, Drama,
  Sparkles as SparklesIcon, PenTool, Box, CreditCard, MessageSquare,
  Mic, Hand, AlertCircle, Flame
} from "lucide-react"

// Helper function to generate a stable hash from string
const hashString = (str: string): number => {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash // Convert to 32bit integer
  }
  return Math.abs(hash)
}

// Doodle icon wrapper component with hand-drawn effect
const DoodleIcon = ({ icon: Icon, size = 24, className = "", randomRotate = true, thick = false, uniqueId = "", style = {} }: { icon: any, size?: number, className?: string, randomRotate?: boolean, thick?: boolean, uniqueId?: string, style?: React.CSSProperties }) => {
  // Generate a unique identifier combining icon name, size, and optional uniqueId
  const iconName = Icon.name || 'icon'
  const uniqueKey = `${iconName}-${size}-${uniqueId || ''}`
  
  // Create a more robust hash for better distribution
  const hash = hashString(uniqueKey)
  
  // Generate rotation class (0-4)
  const randomIndex = hash % 5
  const randomClass = randomRotate ? `doodle-icon-random-${randomIndex + 1}` : ""
  const thickClass = thick ? 'doodle-icon-thick' : ''
  
  // Generate unique animation delay (0-8 seconds) with better distribution
  const delayHash = hashString(`${uniqueKey}-delay`)
  const animationDelay = `${(delayHash % 800) / 100}s` // 0.00s to 7.99s
  
  // Generate unique animation duration (3-6.5 seconds) with better distribution
  const durationHash = hashString(`${uniqueKey}-duration`)
  const animationDuration = `${3 + (durationHash % 350) / 100}s` // 3.00s to 6.49s
  
  return (
    <Icon 
      className={`doodle-icon ${thickClass} stroke-[2.5] ${randomClass} ${className}`}
      size={size}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={thick ? 3 : 2.5}
      style={{
        ...style,
        animationDelay: animationDelay,
        animationDuration: animationDuration,
      }}
    />
  )
}

// Doodle decorations component
const DoodleStars = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden">
    <div className="absolute top-[10%] left-[5%] opacity-40 animate-[twinkle_3s_ease-in-out_infinite]">
      <DoodleIcon icon={Star} size={24} uniqueId="star-1" />
    </div>
    <div className="absolute top-[15%] right-[10%] opacity-30 animate-[twinkle_2s_ease-in-out_infinite_0.5s]">
      <DoodleIcon icon={Sparkles} size={20} uniqueId="star-2" />
    </div>
    <div className="absolute bottom-[20%] left-[8%] opacity-35 animate-[twinkle_2.5s_ease-in-out_infinite_1s]">
      <DoodleIcon icon={Star} size={18} uniqueId="star-3" />
    </div>
    <div className="absolute top-[40%] right-[5%] opacity-25 animate-[twinkle_3.5s_ease-in-out_infinite_0.3s]">
      <DoodleIcon icon={Sparkles} size={24} uniqueId="star-4" />
    </div>
    <div className="absolute bottom-[30%] right-[15%] opacity-30 animate-[twinkle_2.8s_ease-in-out_infinite_0.8s]">
      <DoodleIcon icon={Star} size={20} uniqueId="star-5" />
    </div>
    <div className="absolute top-[60%] left-[3%] opacity-35 animate-[twinkle_3.2s_ease-in-out_infinite_1.2s]">
      <DoodleIcon icon={Sparkles} size={18} uniqueId="star-6" />
    </div>
  </div>
)

const DoodleCircles = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden">
    <div className="absolute top-[5%] left-[15%] opacity-30 text-primary">
      <DoodleIcon icon={Circle} size={12} uniqueId="circle-1" />
    </div>
    <div className="absolute top-[25%] right-[8%] opacity-40 text-secondary">
      <DoodleIcon icon={Circle} size={16} uniqueId="circle-2" />
    </div>
    <div className="absolute bottom-[15%] left-[10%] opacity-30 text-accent">
      <DoodleIcon icon={Circle} size={8} uniqueId="circle-3" />
    </div>
    <div className="absolute bottom-[40%] right-[12%] opacity-25 text-primary">
      <DoodleIcon icon={Circle} size={12} uniqueId="circle-4" />
    </div>
  </div>
)

const WORD_CATEGORIES = {
  Geografía: [
    "Uruguay",
    "Argentina",
    "Brasil",
    "Chile",
    "España",
    "Italia",
    "Francia",
    "Japón",
    "Australia",
    "Antártida",
    "Montevideo",
    "Buenos Aires",
    "Santiago",
    "Madrid",
    "París",
    "Roma",
    "Nueva York",
    "Tokio",
    "Río de Janeiro",
    "Londres",
    "Andes",
    "Himalaya",
    "Amazonas",
    "Nilo",
    "Danubio",
    "Sahara",
    "Patagonia",
    "Caribe",
    "Isla de Pascua",
    "Gibraltar",
  ],

  "Jugadores de fútbol": [
    "Lionel Messi",
    "Cristiano Ronaldo",
    "Luis Suárez",
    "Diego Maradona",
    "Pelé",
    "Neymar",
    "Kylian Mbappé",
    "Erling Haaland",
    "Zinedine Zidane",
    "Ronaldinho",
    "Ronaldo Nazário",
    "Andrés Iniesta",
    "Xavi",
    "Sergio Ramos",
    "Virgil van Dijk",
    "Gianluigi Buffon",
    "Manuel Neuer",
    "Iker Casillas",
    "Kevin De Bruyne",
    "Luka Modrić",
    "Karim Benzema",
    "Robert Lewandowski",
    "Mohamed Salah",
    "Sadio Mané",
    "Harry Kane",
    "Antoine Griezmann",
    "Paulo Dybala",
    "Edinson Cavani",
    "Sergio Agüero",
    "Ángel Di María",
  ],
"Videojuegos": [
  "Minecraft",
  "Fortnite",
  "GTA",
  "FIFA",
  "Call of Duty",
  "Counter-Strike",
  "League of Legends",
  "Valorant",
  "Among Us",
  "Roblox",
  "The Sims",
  "Zelda",
  "Mario",
  "Pokémon",
  "Final Fantasy",
  "God of War",
  "Red Dead Redemption",
  "Elden Ring",
  "Dark Souls",
  "Rocket League",
  "Clash Royale",
  "Candy Crush",
  "Hades",
  "Hollow Knight",
  "Stardew Valley",
  "Fall Guys",
  "Overwatch",
  "Apex Legends",
  "PUBG",
  "Cyberpunk 2077",
],

  Animales: [
    "Gato",
    "Perro",
    "Caballo",
    "Vaca",
    "Oveja",
    "León",
    "Tigre",
    "Elefante",
    "Jirafa",
    "Cebra",
    "Lobo",
    "Oso",
    "Zorro",
    "Mono",
    "Pingüino",
    "Águila",
    "Búho",
    "Serpiente",
    "Cocodrilo",
    "Tortuga",
    "Delfín",
    "Ballena",
    "Tiburón",
    "Pulpo",
    "Medusa",
    "Rana",
    "Abeja",
    "Mariposa",
    "Araña",
    "Camaleón",
  ],

  "Comidas y bebidas": [
    "Asado",
    "Milanesa",
    "Empanadas",
    "Chivito",
    "Pizza",
    "Hamburguesa",
    "Pasta",
    "Sushi",
    "Tacos",
    "Paella",
    "Ramen",
    "Ensalada",
    "Helado",
    "Chocolate",
    "Dulce de leche",
    "Alfajor",
    "Croissant",
    "Donut",
    "Pancake",
    "Arepas",
    "Ceviche",
    "Risotto",
    "Guiso",
    "Sopa",
    "Café",
    "Té",
    "Mate",
    "Vino",
    "Cerveza",
    "Jugo",
  ],

  "Personas famosas": [
    "Shakira",
    "Taylor Swift",
    "Bad Bunny",
    "Beyoncé",
    "Michael Jackson",
    "Freddie Mercury",
    "Elvis Presley",
    "Adele",
    "Ed Sheeran",
    "Dua Lipa",
    "Walt Disney",
    "Steve Jobs",
    "Elon Musk",
    "Albert Einstein",
    "Stephen Hawking",
    "Marie Curie",
    "Frida Kahlo",
    "Pablo Picasso",
    "Leonardo da Vinci",
    "Pablo Neruda",
    "Gabriel García Márquez",
    "J. K. Rowling",
    "George R. R. Martin",
    "Charles Chaplin",
    "Marilyn Monroe",
    "Tom Hanks",
    "Leonardo DiCaprio",
    "Meryl Streep",
    "Dwayne Johnson",
    "Keanu Reeves",
  ],

  "Películas y series": [
    "Harry Potter",
    "El Señor de los Anillos",
    "Star Wars",
    "Marvel",
    "Batman",
    "Spider-Man",
    "Game of Thrones",
    "Breaking Bad",
    "Stranger Things",
    "The Office",
    "Friends",
    "The Simpsons",
    "Toy Story",
    "Frozen",
    "Shrek",
    "Jurassic Park",
    "Titanic",
    "Avatar",
    "Matrix",
    "Inception",
    "El Padrino",
    "Rocky",
    "Coco",
    "Moana",
    "Naruto",
    "Dragon Ball",
    "One Piece",
    "Attack on Titan",
    "La Casa de Papel",
    "El Juego del Calamar",
  ],

  "Objetos cotidianos": [
    "Llave",
    "Paraguas",
    "Mochila",
    "Billetera",
    "Cargador",
    "Botella",
    "Vaso",
    "Taza",
    "Cuchara",
    "Tenedor",
    "Cuchillo",
    "Plato",
    "Cepillo de dientes",
    "Pasta dental",
    "Toalla",
    "Almohada",
    "Manta",
    "Silla",
    "Mesa",
    "Lámpara",
    "Control remoto",
    "Auriculares",
    "Reloj",
    "Espejo",
    "Cuaderno",
    "Lapicera",
    "Tijeras",
    "Cinta adhesiva",
    "Linterna",
    "Candado",
  ],

  Profesiones: [
    "Médico",
    "Enfermero",
    "Profesor",
    "Abogado",
    "Arquitecto",
    "Ingeniero",
    "Programador",
    "Diseñador",
    "Chef",
    "Mesero",
    "Piloto",
    "Azafata",
    "Policía",
    "Bombero",
    "Paramédico",
    "Periodista",
    "Fotógrafo",
    "Músico",
    "Actor",
    "Pintor",
    "Carpintero",
    "Electricista",
    "Plomero",
    "Mecánico",
    "Dentista",
    "Veterinario",
    "Psicólogo",
    "Contador",
    "Vendedor",
    "Emprendedor",
  ],

  "Marcas y apps": [
    "Google",
    "Apple",
    "Samsung",
    "Microsoft",
    "Amazon",
    "Netflix",
    "Spotify",
    "YouTube",
    "Instagram",
    "TikTok",
    "WhatsApp",
    "Facebook",
    "X (Twitter)",
    "Gmail",
    "Google Maps",
    "Uber",
    "Airbnb",
    "Mercado Libre",
    "PayPal",
    "Visa",
    "Mastercard",
    "PlayStation",
    "Xbox",
    "Nintendo",
    "Steam",
    "Zoom",
    "Slack",
    "Discord",
    "Twitch",
    "ChatGPT",
  ],

  Transporte: [
    "Auto",
    "Ómnibus",
    "Tren",
    "Subte",
    "Bicicleta",
    "Moto",
    "Camión",
    "Taxi",
    "Avión",
    "Helicóptero",
    "Barco",
    "Ferry",
    "Yate",
    "Velero",
    "Kayak",
    "Patineta",
    "Monopatín",
    "Scooter",
    "Tractor",
    "Cohete",
  ],

  "Naturaleza y clima": [
    "Sol",
    "Luna",
    "Estrella",
    "Planeta",
    "Nieve",
    "Lluvia",
    "Nube",
    "Tormenta",
    "Viento",
    "Arcoíris",
    "Relámpago",
    "Volcán",
    "Montaña",
    "Río",
    "Océano",
    "Bosque",
    "Desierto",
    "Glaciar",
    "Cascada",
    "Lago",
  ],
};


const DEFAULT_CATEGORIES = WORD_CATEGORIES

const COLOR_PALETTES = {
  // Chicle Rosa - Dulce y juguetón
  bubblegum: {
    name: "Chicle Rosa",
    icon: Heart,
    colors: {
      background: "oklch(0.95 0.03 350)",
      foreground: "oklch(0.25 0.05 350)",
      card: "oklch(0.99 0.01 350)",
      "card-foreground": "oklch(0.25 0.05 350)",
      primary: "oklch(0.70 0.20 350)",
      "primary-foreground": "oklch(0.99 0 0)",
      secondary: "oklch(0.75 0.15 30)",
      "secondary-foreground": "oklch(0.25 0.05 30)",
      muted: "oklch(0.92 0.02 350)",
      "muted-foreground": "oklch(0.50 0.03 350)",
      destructive: "oklch(0.60 0.25 25)",
      "destructive-foreground": "oklch(0.99 0 0)",
      border: "oklch(0.80 0.10 350)",
      accent: "oklch(0.80 0.18 320)",
      "accent-foreground": "oklch(0.25 0.05 320)",
    },
  },
  // Limonada - Fresco y alegre
  lemonade: {
    name: "Limonada",
    icon: Sun,
    colors: {
      background: "oklch(0.97 0.04 95)",
      foreground: "oklch(0.30 0.08 80)",
      card: "oklch(0.99 0.02 95)",
      "card-foreground": "oklch(0.30 0.08 80)",
      primary: "oklch(0.80 0.18 85)",
      "primary-foreground": "oklch(0.25 0.08 85)",
      secondary: "oklch(0.75 0.15 145)",
      "secondary-foreground": "oklch(0.25 0.08 145)",
      muted: "oklch(0.94 0.03 95)",
      "muted-foreground": "oklch(0.50 0.05 95)",
      destructive: "oklch(0.65 0.22 25)",
      "destructive-foreground": "oklch(0.99 0 0)",
      border: "oklch(0.85 0.12 85)",
      accent: "oklch(0.78 0.16 50)",
      "accent-foreground": "oklch(0.25 0.08 50)",
    },
  },
  // Playa Tropical - Refrescante y divertido
  tropical: {
    name: "Playa Tropical",
    icon: Waves,
    colors: {
      background: "oklch(0.95 0.04 200)",
      foreground: "oklch(0.25 0.06 200)",
      card: "oklch(0.99 0.02 200)",
      "card-foreground": "oklch(0.25 0.06 200)",
      primary: "oklch(0.72 0.18 195)",
      "primary-foreground": "oklch(0.99 0 0)",
      secondary: "oklch(0.75 0.18 25)",
      "secondary-foreground": "oklch(0.25 0.06 25)",
      muted: "oklch(0.92 0.03 200)",
      "muted-foreground": "oklch(0.50 0.04 200)",
      destructive: "oklch(0.60 0.22 15)",
      "destructive-foreground": "oklch(0.99 0 0)",
      border: "oklch(0.80 0.12 195)",
      accent: "oklch(0.80 0.15 170)",
      "accent-foreground": "oklch(0.25 0.06 170)",
    },
  },
  // Uva Mágica - Misterioso pero divertido
  grape: {
    name: "Uva Mágica",
    icon: Grape,
    colors: {
      background: "oklch(0.94 0.04 300)",
      foreground: "oklch(0.28 0.08 300)",
      card: "oklch(0.98 0.02 300)",
      "card-foreground": "oklch(0.28 0.08 300)",
      primary: "oklch(0.65 0.22 300)",
      "primary-foreground": "oklch(0.99 0 0)",
      secondary: "oklch(0.72 0.18 350)",
      "secondary-foreground": "oklch(0.25 0.06 350)",
      muted: "oklch(0.90 0.03 300)",
      "muted-foreground": "oklch(0.50 0.05 300)",
      destructive: "oklch(0.60 0.22 15)",
      "destructive-foreground": "oklch(0.99 0 0)",
      border: "oklch(0.78 0.12 300)",
      accent: "oklch(0.70 0.20 270)",
      "accent-foreground": "oklch(0.99 0 0)",
    },
  },
  // Menta Fresca - Relajante y suave
  mint: {
    name: "Menta Fresca",
    icon: Leaf,
    colors: {
      background: "oklch(0.96 0.03 165)",
      foreground: "oklch(0.28 0.06 165)",
      card: "oklch(0.99 0.015 165)",
      "card-foreground": "oklch(0.28 0.06 165)",
      primary: "oklch(0.72 0.16 165)",
      "primary-foreground": "oklch(0.20 0.06 165)",
      secondary: "oklch(0.78 0.12 280)",
      "secondary-foreground": "oklch(0.25 0.06 280)",
      muted: "oklch(0.93 0.02 165)",
      "muted-foreground": "oklch(0.50 0.04 165)",
      destructive: "oklch(0.62 0.20 20)",
      "destructive-foreground": "oklch(0.99 0 0)",
      border: "oklch(0.82 0.10 165)",
      accent: "oklch(0.75 0.14 200)",
      "accent-foreground": "oklch(0.25 0.06 200)",
    },
  },
  // Naranja Dulce - Cálido y energético
  tangerine: {
    name: "Naranja Dulce",
    icon: Circle,
    colors: {
      background: "oklch(0.96 0.035 55)",
      foreground: "oklch(0.30 0.08 40)",
      card: "oklch(0.99 0.02 55)",
      "card-foreground": "oklch(0.30 0.08 40)",
      primary: "oklch(0.75 0.18 45)",
      "primary-foreground": "oklch(0.20 0.06 45)",
      secondary: "oklch(0.70 0.20 15)",
      "secondary-foreground": "oklch(0.99 0 0)",
      muted: "oklch(0.93 0.025 55)",
      "muted-foreground": "oklch(0.50 0.05 55)",
      destructive: "oklch(0.58 0.22 10)",
      "destructive-foreground": "oklch(0.99 0 0)",
      border: "oklch(0.82 0.12 50)",
      accent: "oklch(0.80 0.15 80)",
      "accent-foreground": "oklch(0.25 0.06 80)",
    },
  },
  // Noche Estrellada - Oscuro pero juguetón
  midnight: {
    name: "Noche Estrellada",
    icon: Moon,
    colors: {
      background: "oklch(0.15 0.03 280)",
      foreground: "oklch(0.95 0.01 280)",
      card: "oklch(0.20 0.04 280)",
      "card-foreground": "oklch(0.95 0.01 280)",
      primary: "oklch(0.75 0.20 320)",
      "primary-foreground": "oklch(0.15 0.03 280)",
      secondary: "oklch(0.70 0.18 200)",
      "secondary-foreground": "oklch(0.15 0.03 280)",
      muted: "oklch(0.28 0.03 280)",
      "muted-foreground": "oklch(0.75 0.01 280)",
      destructive: "oklch(0.60 0.22 15)",
      "destructive-foreground": "oklch(0.95 0.01 280)",
      border: "oklch(0.35 0.04 280)",
      accent: "oklch(0.72 0.18 270)",
      "accent-foreground": "oklch(0.15 0.03 280)",
    },
  },
  // Fuego Nocturno - Oscuro con tonos cálidos y juguetones
  ember: {
    name: "Fuego Nocturno",
    icon: Flame,
    colors: {
      background: "oklch(0.12 0.04 25)",
      foreground: "oklch(0.96 0.02 25)",
      card: "oklch(0.18 0.05 30)",
      "card-foreground": "oklch(0.96 0.02 25)",
      primary: "oklch(0.70 0.22 35)",
      "primary-foreground": "oklch(0.12 0.04 25)",
      secondary: "oklch(0.65 0.20 50)",
      "secondary-foreground": "oklch(0.12 0.04 25)",
      muted: "oklch(0.25 0.04 25)",
      "muted-foreground": "oklch(0.70 0.02 25)",
      destructive: "oklch(0.58 0.24 10)",
      "destructive-foreground": "oklch(0.96 0.02 25)",
      border: "oklch(0.32 0.05 30)",
      accent: "oklch(0.68 0.18 40)",
      "accent-foreground": "oklch(0.12 0.04 25)",
    },
  },
}

type GameState = "categories" | "setup" | "playing" | "finished" | "theme" | "edit-custom-category"
type PaletteName = keyof typeof COLOR_PALETTES


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
  // Cargar tema desde localStorage o usar default
  const [currentPalette, setCurrentPalette] = useState<PaletteName>(() => {
    if (typeof window !== 'undefined') {
      const savedPalette = localStorage.getItem('selected-palette')
      if (savedPalette && savedPalette in COLOR_PALETTES) {
        return savedPalette as PaletteName
      }
    }
    return "bubblegum"
  })
  const [previousGameState, setPreviousGameState] = useState<GameState>("categories")
  const [numImpostors, setNumImpostors] = useState(1)
  const [customCategories, setCustomCategories] = useState<Record<string, string[]>>({})
  const [editingCategoryName, setEditingCategoryName] = useState("")
  const [editingCategoryWords, setEditingCategoryWords] = useState<string[]>([])
  const [aiPrompt, setAiPrompt] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [isEditingExisting, setIsEditingExisting] = useState(false)

  // Cargar categorías personalizadas al iniciar
  useEffect(() => {
    const savedCustomCategories = localStorage.getItem('custom-categories')
    if (savedCustomCategories) {
      try {
        setCustomCategories(JSON.parse(savedCustomCategories))
      } catch (error) {
        console.error('Error loading custom categories:', error)
      }
    }
  }, [])


  // Guardar categorías personalizadas en localStorage cuando cambien
  useEffect(() => {
    localStorage.setItem('custom-categories', JSON.stringify(customCategories))
  }, [customCategories])

  // Aplicar colores del tema actual
  useEffect(() => {
    const root = document.documentElement
    const palette = COLOR_PALETTES[currentPalette]
    Object.entries(palette.colors).forEach(([key, value]) => {
      root.style.setProperty(`--${key}`, value)
    })
  }, [currentPalette])

  // Guardar tema en localStorage cuando cambie
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('selected-palette', currentPalette)
    }
  }, [currentPalette])

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
    if (!prompt.trim() || prompt.length > 200) return

    setIsGenerating(true)

    try {
      console.log('🚀 Llamando a API route para generar palabras...')

      const response = await fetch('/api/generate-words', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      })

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }

      const data = await response.json()

      if (data.error) {
        throw new Error(data.error)
      }

      if (!data.words || !Array.isArray(data.words)) {
        throw new Error('Respuesta inválida del servidor')
      }

      // Agregar las nuevas palabras a las existentes (sin duplicados)
      setEditingCategoryWords(prev => {
        const combined = [...prev]
        data.words.forEach((word: string) => {
          if (!combined.includes(word)) {
            combined.push(word)
          }
        })
        return combined.slice(0, 20) // Limitar a 20 palabras máximo
      })

      console.log(`✅ ¡Éxito! Se generaron ${data.words.length} elementos usando ${data.model}`)
      alert(`✅ ¡Éxito! Se generaron ${data.words.length} elementos para "${prompt}" usando ${data.model}`)

    } catch (error) {
      console.error('❌ Error llamando a la API:', error)

      // En caso de error, agregar palabras de respaldo
      const fallbackWords = [
        "casa", "perro", "gato", "árbol", "libro",
        "sol", "luna", "agua", "fuego", "tierra"
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

      alert('🚫 Error conectando con el servidor de IA\n\nSe agregaron palabras de ejemplo en su lugar.\n\nVerifica que:\n• El servidor esté funcionando\n• La API key de Gemini esté configurada en el servidor\n• Tu conexión a internet funcione')
    }

    setIsGenerating(false)
  }




  if (gameState === "theme") {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-background relative overflow-hidden">
        <DoodleStars />
        <DoodleCircles />
        <Card className="w-full max-w-2xl relative z-10">
          <CardContent className="p-4 md:p-8">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <DoodleIcon icon={Palette} size={32} thick className="animate-[bounce-soft_2s_ease-in-out_infinite]" uniqueId="theme-header" />
                <h1 className="text-2xl md:text-3xl font-title font-bold text-primary">Elige tu estilo</h1>
              </div>
              <Button variant="ghost" size="icon" onClick={() => {
                setGameState(previousGameState)
              }}>
                <X className="h-5 w-5" />
              </Button>
            </div>

            <p className="text-center text-muted-foreground mb-8 text-lg flex items-center justify-center gap-2">
              ¡Personaliza los colores de tu juego!
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {(Object.keys(COLOR_PALETTES) as PaletteName[]).map((paletteName) => {
                const palette = COLOR_PALETTES[paletteName]
                const isSelected = currentPalette === paletteName
                return (
                  <button
                    key={paletteName}
                    onClick={() => selectPalette(paletteName)}
                    className={`relative p-5 transition-all duration-200 ${
                      isSelected
                        ? "rounded-[30px_10px_30px_10px/10px_30px_10px_30px] border-[3px] border-primary shadow-[6px_6px_0_0_var(--primary)] translate-x-[-3px] translate-y-[-3px] -rotate-1"
                        : "rounded-[25px_8px_25px_8px/8px_25px_8px_25px] border-2 border-border hover:border-primary/50 hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[4px_4px_0_0_var(--border)]"
                    }`}
                    style={{ backgroundColor: palette.colors.card }}
                  >
                    <div className="flex flex-col items-start gap-3">
                      <div className="w-full flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {palette.icon && (
                            <DoodleIcon 
                              icon={palette.icon} 
                              size={20} 
                              className="stroke-[2.5]"
                              uniqueId={`palette-${paletteName}`}
                              style={{ stroke: palette.colors["card-foreground"] }}
                            />
                          )}
                          <span className="font-title font-bold text-lg" style={{ color: palette.colors["card-foreground"] }}>
                            {palette.name}
                          </span>
                        </div>
                        {isSelected && (
                          <div className="rounded-full p-1.5 animate-[bounce-soft_1s_ease-in-out_infinite]" style={{ backgroundColor: palette.colors.primary }}>
                            <Check className="h-4 w-4" style={{ color: palette.colors["primary-foreground"] }} />
                          </div>
                        )}
                      </div>

                      <div className="w-full flex gap-2">
                        <div className="h-10 flex-1 rounded-[10px_3px_10px_3px/3px_10px_3px_10px] border-2 border-white/20" style={{ backgroundColor: palette.colors.primary }} />
                        <div className="h-10 flex-1 rounded-[10px_3px_10px_3px/3px_10px_3px_10px] border-2 border-white/20" style={{ backgroundColor: palette.colors.secondary }} />
                        <div className="h-10 flex-1 rounded-[10px_3px_10px_3px/3px_10px_3px_10px] border-2 border-white/20" style={{ backgroundColor: palette.colors.accent }} />
                      </div>
                    </div>
                  </button>
                )
              })}
            </div>

            <div className="mt-6">
              <Button
                onClick={closeThemeSettings}
                className="w-full"
                size="lg"
              >
                ¡Listo! →
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }


  if (gameState === "edit-custom-category") {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-background relative overflow-hidden">
        <DoodleStars />
        <Card className="w-full max-w-4xl relative z-10">
          <CardContent className="p-4 md:p-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <DoodleIcon icon={PenTool} size={32} thick className="animate-[wiggle_1s_ease-in-out_infinite]" uniqueId="edit-header" />
                <h1 className="text-2xl md:text-3xl font-title font-bold text-primary">
                  {isEditingExisting ? "Editar Categoría" : "Nueva Categoría"}
                </h1>
              </div>
              <Button variant="ghost" size="icon" onClick={cancelEditCategory}>
                <X className="h-5 w-5" />
              </Button>
            </div>

            <div className="space-y-6">
              {/* Nombre de la categoría */}
              <div>
                <label className="text-lg font-title font-bold text-foreground mb-3 block flex items-center gap-2">
                  <DoodleIcon icon={PenTool} size={20} className="stroke-[2.5]" uniqueId="edit-label" />
                  Nombre de la categoría:
                </label>
                <Input
                  placeholder="Ej: Personajes de Anime, Comidas Típicas..."
                  value={editingCategoryName}
                  onChange={(e) => setEditingCategoryName(e.target.value)}
                />
              </div>

              {/* Generación con IA */}
              <div className="bg-muted/30 p-5 rounded-[20px_8px_20px_8px/8px_20px_8px_20px] border-[3px] border-dashed border-border">
                <h3 className="text-lg font-title font-bold text-foreground mb-3 flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-secondary animate-[twinkle_2s_ease-in-out_infinite]" />
                  Asistente Mágico ✨
                </h3>
                <p className="text-muted-foreground mb-4">
                  ¡Deja que la IA te sugiera palabras automáticamente!
                </p>

                <div className="flex flex-col gap-3">
                  <Textarea
                    placeholder="Describe el tema para generar palabras...&#10;&#10;Ejemplos:&#10;'personajes de Naruto'&#10;'tipos de verduras'&#10;'marcas de autos deportivos'"
                    value={aiPrompt}
                    onChange={(e) => setAiPrompt(e.target.value.slice(0, 200))}
                    disabled={isGenerating}
                  />
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                      {aiPrompt.length}/200 caracteres
                    </span>
                    <Button
                      onClick={() => generateWordsWithAI(aiPrompt)}
                      disabled={!aiPrompt.trim() || aiPrompt.length > 200 || isGenerating}
                      className="gap-2"
                    >
                      {isGenerating ? (
                        <Loader2 className="h-5 w-5 animate-spin" />
                      ) : (
                        <Sparkles className="h-5 w-5" />
                      )}
                      {isGenerating ? "Generando..." : "¡Generar!"}
                    </Button>
                  </div>
                </div>
              </div>

              {/* Lista de palabras */}
              <div>
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
                  <h3 className="text-lg font-title font-bold text-foreground flex items-center gap-2">
                    <DoodleIcon icon={Box} size={20} className="stroke-[2.5]" uniqueId="words-header" />
                    Palabras ({editingCategoryWords.length})
                  </h3>
                  <div className="flex w-full sm:w-auto gap-2">
                    <Input
                      id="add-word-input"
                      placeholder="Nueva palabra..."
                      className="flex-1 sm:w-48"
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
                      variant="secondary"
                      className="gap-2"
                    >
                      <Plus className="h-4 w-4" />
                      Agregar
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 max-h-72 overflow-y-auto p-2">
                  {editingCategoryWords.map((word, index) => (
                    <div 
                      key={index} 
                      className="flex items-center gap-2 p-3 bg-muted rounded-[15px_5px_15px_5px/5px_15px_5px_15px] border-2 border-border group hover:border-primary/50 transition-all"
                      style={{ transform: `rotate(${(index % 3 - 1) * 0.5}deg)` }}
                    >
                      <Input
                        value={word}
                        onChange={(e) => updateWordInCategory(index, e.target.value)}
                        className="flex-1 h-9 text-sm border-0 bg-transparent p-1 focus:bg-background/50"
                      />
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        onClick={() => removeWordFromCategory(index)}
                        className="opacity-50 group-hover:opacity-100 text-muted-foreground hover:text-destructive"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>

                {editingCategoryWords.length === 0 && (
                  <div className="text-center py-12 text-muted-foreground">
                    <div className="flex justify-center mb-4">
                      <DoodleIcon icon={Box} size={48} thick className="opacity-50" uniqueId="empty-state" />
                    </div>
                    <p className="text-lg font-title">No hay palabras aún</p>
                    <p className="text-sm">Usa el asistente mágico o agrega palabras manualmente</p>
                  </div>
                )}
              </div>

              {/* Botones de acción */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <Button
                  variant="outline"
                  onClick={cancelEditCategory}
                  className="flex-1"
                  size="lg"
                >
                  Cancelar
                </Button>
                <Button
                  onClick={saveCustomCategory}
                  disabled={!editingCategoryName.trim() || editingCategoryWords.length === 0}
                  className="flex-1"
                  size="lg"
                >
                  {isEditingExisting ? "Guardar Cambios ✓" : "Crear Categoría ✓"}
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
      <div className="min-h-screen flex items-center justify-center p-4 bg-background relative overflow-hidden">
        <DoodleStars />
        <DoodleCircles />
        <Card className="w-full max-w-2xl relative z-10">
          <CardContent className="p-4 md:p-8">
            <div className="flex justify-end mb-2">
              <Button variant="ghost" size="sm" onClick={openThemeSettings} className="gap-2">
                <Palette className="h-4 w-4" />
                Tema
              </Button>
            </div>

            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <DoodleIcon icon={Drama} size={64} thick className="animate-[bounce-soft_2s_ease-in-out_infinite]" uniqueId="categories-title" />
              </div>
              <h1 className="text-4xl md:text-5xl font-title font-bold text-primary mb-2">El Impostor</h1>
              <p className="text-muted-foreground text-lg flex items-center justify-center gap-2">
                ¡Elige las categorías para jugar!
              </p>
            </div>

            {/* Categorías Default */}
            <div className="mb-8">
              <h3 className="text-xl font-title font-bold text-foreground mb-4 flex items-center gap-2">
                <DoodleIcon icon={Package} size={24} className="stroke-[2.5]" uniqueId="predefined-header" />
                Categorías Predefinidas
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {Object.keys(DEFAULT_CATEGORIES).map((category, index) => {
                  const isSelected = selectedCategories.includes(category)
                  const categoryIcons = [Globe, CircleDot, Gamepad2, PawPrint, Pizza, Star, Film, Wrench, Briefcase, Smartphone, Car, Rainbow]
                  const CategoryIcon = categoryIcons[index % categoryIcons.length]
                  return (
                    <button
                      key={category}
                      onClick={() => toggleCategory(category)}
                      className={`cursor-pointer relative p-4 text-left transition-all duration-200 ${
                        isSelected
                          ? "rounded-[100px_10px_100px_10px/10px_100px_10px_100px] bg-primary text-primary-foreground border-[3px] border-primary-foreground/30 shadow-[4px_4px_0_0_rgba(0,0,0,0.3)] translate-x-[-2px] translate-y-[-2px] rotate-[-1deg]"
                          : "rounded-[80px_8px_80px_8px/8px_80px_8px_80px] bg-muted border-[2px] border-border hover:border-primary/50 hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[3px_3px_0_0_var(--border)]"
                      }`}
                      style={{ transform: isSelected ? `rotate(${-1 + (index % 3) * 0.5}deg) translateX(-2px) translateY(-2px)` : `rotate(${(index % 3 - 1) * 0.3}deg)` }}
                    >
                      <DoodleIcon icon={CategoryIcon} size={18} className="inline-block mr-2 stroke-[2.5]" uniqueId={`category-${category}-${index}`} />
                      <span className="font-bold text-sm">{category}</span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Categorías Personalizadas */}
            {Object.keys(customCategories).length > 0 && (
              <div className="mb-8">
                <h3 className="text-xl font-title font-bold text-foreground mb-4 flex items-center gap-2">
                  <DoodleIcon icon={SparklesIcon} size={24} className="stroke-[2.5]" uniqueId="custom-header" />
                  Tus Categorías
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {Object.entries(customCategories).map(([categoryName, words], index) => {
                    const isSelected = selectedCategories.includes(categoryName)
                    return (
                      <div key={categoryName} className="relative">
                        <button
                          onClick={() => toggleCategory(categoryName)}
                          className={`relative w-full p-4 text-left transition-all duration-200 ${
                            isSelected
                              ? "rounded-[100px_10px_100px_10px/10px_100px_10px_100px] bg-primary text-primary-foreground border-[3px] border-primary-foreground/30 shadow-[4px_4px_0_0_rgba(0,0,0,0.3)] rotate-[-1deg]"
                              : "rounded-[80px_8px_80px_8px/8px_80px_8px_80px] bg-muted border-[2px] border-border hover:border-primary/50 hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[3px_3px_0_0_var(--border)]"
                          }`}
                          style={{ transform: `rotate(${(index % 3 - 1) * 0.5}deg)` }}
                        >
                          <div className="flex flex-col">
                            <span className="font-bold text-sm flex items-center gap-1">
                              <DoodleIcon icon={Star} size={14} className="stroke-[2.5]" uniqueId={`custom-cat-${categoryName}-${index}`} />
                              {categoryName}
                            </span>
                            <span className={`text-xs mt-1 ${isSelected ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>
                              {words.length} palabras
                            </span>
                          </div>
                        </button>
                        <div className="absolute -top-2 -right-2 flex gap-1 z-10">
                          <Button
                            variant="ghost"
                            size="icon-sm"
                            onClick={(e) => {
                              e.stopPropagation()
                              openEditCustomCategory(categoryName)
                            }}
                            className="h-7 w-7 bg-secondary text-secondary-foreground hover:bg-secondary/90 rounded-full shadow-md"
                          >
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon-sm"
                            onClick={(e) => {
                              e.stopPropagation()
                              deleteCustomCategory(categoryName)
                            }}
                            className="h-7 w-7 bg-destructive text-destructive-foreground hover:bg-destructive/90 rounded-full shadow-md"
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
            <div className="bg-muted/30 p-6 rounded-[25px_10px_25px_10px/10px_25px_10px_25px] border-[3px] border-dashed border-border text-center mb-8 hover:border-primary/50 transition-all">
              <div className="flex justify-center mb-3">
                <DoodleIcon icon={Palette} size={40} thick className="animate-[wiggle_2s_ease-in-out_infinite]" uniqueId="create-category" />
              </div>
              <h3 className="text-lg font-title font-bold text-foreground mb-2">
                ¡Crea tu propia categoría!
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Agrega palabras personalizadas o usa la IA
              </p>
              <Button onClick={openCreateCustomCategory} className="gap-2">
                <Plus className="h-5 w-5" />
                Crear Categoría
              </Button>
            </div>

            <div className="text-center mb-6">
              <p className={`text-sm py-2 px-4 rounded-full flex items-center gap-2 justify-center ${selectedCategories.length === 0 ? 'bg-muted/50' : 'bg-primary/20 text-primary-foreground'}`}>
                {selectedCategories.length === 0 ? (
                  <>
                    <DoodleIcon icon={Gamepad} size={16} className="stroke-[2.5]" uniqueId="all-categories" />
                    Se usarán todas las categorías
                  </>
                ) : (
                  <>
                    <Check className="h-4 w-4" />
                    {selectedCategories.length} categoría{selectedCategories.length > 1 ? "s" : ""} seleccionada{selectedCategories.length > 1 ? "s" : ""}
                  </>
                )}
              </p>
            </div>

            <Button
              onClick={() => setGameState("setup")}
              className="w-full"
              size="lg"
            >
              ¡Continuar! →
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (gameState === "setup") {
    const maxImpostors = Math.max(1, players.length - 1)

    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-background relative overflow-hidden">
        <DoodleStars />
        <DoodleCircles />
        <Card className="w-full max-w-lg relative z-10">
          <CardContent className="p-4 md:p-8">
            <div className="flex justify-end mb-2">
              <Button variant="ghost" size="sm" onClick={openThemeSettings} className="gap-2">
                <Palette className="h-4 w-4" />
                Tema
              </Button>
            </div>

            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <DoodleIcon icon={Gamepad} size={56} thick className="animate-[shake_0.5s_ease-in-out_infinite]" uniqueId="setup-title" />
              </div>
              <h1 className="text-4xl font-title font-bold text-primary mb-2">El Impostor</h1>
              <p className="text-muted-foreground text-lg flex items-center justify-center gap-2">
                ¡Agrega los jugadores! (mínimo 3)
                <DoodleIcon icon={Users} size={20} className="stroke-[2.5]" uniqueId="setup-subtitle" />
              </p>
            </div>

            <div className="mb-6 p-4 bg-muted/50 rounded-[20px_8px_20px_8px/8px_20px_8px_20px] border-2 border-border">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-bold text-foreground flex items-center gap-2">
                  <DoodleIcon icon={FolderOpen} size={18} className="stroke-[2.5]" uniqueId="setup-categories" />
                  Categorías:
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setGameState("categories")}
                  className="h-8 px-3 text-xs gap-1"
                >
                  <PenTool className="h-3 w-3" />
                  Cambiar
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {selectedCategories.length === 0 ? (
                  <span className="text-xs text-muted-foreground italic bg-background/50 px-3 py-1 rounded-full flex items-center gap-1">
                    <DoodleIcon icon={Gamepad} size={14} className="stroke-[2.5]" uniqueId="setup-all-categories" />
                    Todas las categorías
                  </span>
                ) : (
                  selectedCategories.map((cat) => (
                    <span key={cat} className="text-xs bg-primary/20 text-primary px-3 py-1 rounded-full font-bold">
                      {cat}
                    </span>
                  ))
                )}
              </div>
            </div>

            <div className="mb-6 p-4 bg-muted/50 rounded-[20px_8px_20px_8px/8px_20px_8px_20px] border-2 border-border">
              <label className="text-sm font-bold text-foreground block mb-4 flex items-center gap-2">
                <DoodleIcon icon={UserSearch} size={18} className="stroke-[2.5]" uniqueId="impostors-label" />
                Cantidad de Impostores:
              </label>
              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setNumImpostors(Math.max(1, numImpostors - 1))}
                  disabled={numImpostors <= 1}
                  className="h-12 w-12"
                >
                  <span className="text-2xl">−</span>
                </Button>
                <div className="flex-1 text-center">
                  <span className="text-5xl font-title font-bold text-primary">{numImpostors}</span>
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setNumImpostors(Math.min(maxImpostors, numImpostors + 1))}
                  disabled={numImpostors >= maxImpostors}
                  className="h-12 w-12"
                >
                  <span className="text-2xl">+</span>
                </Button>
              </div>
              {players.length >= 3 && (
                <p className="text-xs text-center text-muted-foreground mt-3 flex items-center justify-center gap-1">
                  Máximo: {maxImpostors} impostor{maxImpostors > 1 ? "es" : ""}
                  <DoodleIcon icon={Gamepad} size={14} className="stroke-[2.5]" uniqueId="impostors-max" />
                </p>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <Input
                placeholder="Nombre del jugador..."
                value={newPlayerName}
                onChange={(e) => setNewPlayerName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addPlayer()}
              />
              <Button onClick={addPlayer} className="gap-2 px-6">
                <Plus className="h-5 w-5" />
                <span className="sm:hidden">Agregar</span>
              </Button>
            </div>

            {players.length > 0 && (
              <div className="mb-6 space-y-2 max-h-48 overflow-y-auto p-2">
                {players.map((player, index) => (
                  <div 
                    key={index} 
                    className="flex items-center justify-between p-3 bg-muted rounded-[15px_5px_15px_5px/5px_15px_5px_15px] border-2 border-border group hover:border-primary/50 transition-all"
                    style={{ transform: `rotate(${(index % 3 - 1) * 0.3}deg)` }}
                  >
                    <span className="font-bold text-foreground flex items-center gap-2">
                      <DoodleIcon icon={Users} size={18} className="stroke-[2.5]" uniqueId={`player-${index}-${player}`} />
                      {player}
                    </span>
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      onClick={() => removePlayer(index)}
                      className="opacity-50 group-hover:opacity-100 text-muted-foreground hover:text-destructive"
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
              className="w-full gap-2"
              size="lg"
            >
              <DoodleIcon icon={Gamepad} size={20} className="stroke-[2.5]" uniqueId="start-game-btn" />
              ¡Comenzar Juego!
            </Button>

            {players.length < 3 && players.length > 0 && (
              <p className="text-center text-sm text-destructive mt-3 animate-[shake_0.5s_ease-in-out] flex items-center justify-center gap-1">
                Necesitas al menos 3 jugadores
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    )
  }

  if (gameState === "playing") {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-background relative overflow-hidden">
        <DoodleStars />
        <DoodleCircles />
        <div className="w-full max-w-md flex flex-col items-center relative z-10">
          <div className="text-center mb-8">
            <div className="inline-block bg-muted px-5 py-2 rounded-full border-2 border-border mb-4">
              <span className="text-muted-foreground font-bold">
                👤 Jugador {currentPlayer + 1} de {players.length}
              </span>
            </div>
          </div>

          <div
            className={`flip-card w-full max-w-xs sm:max-w-sm aspect-[2.5/3.5] mb-8 ${isFlipped ? "flipped" : ""}`}
            onMouseDown={handleCardPress}
            onMouseUp={handleCardRelease}
            onMouseLeave={handleCardRelease}
            onTouchStart={handleCardPress}
            onTouchEnd={handleCardRelease}
          >
            <div className="flip-card-inner w-full h-full">
              {/* Front of card */}
              <div className="flip-card-front absolute w-full h-full rounded-[20px] border-[4px] border-foreground/80 bg-card shadow-[8px_8px_0_0_var(--primary)] cursor-pointer hover:shadow-[10px_10px_0_0_var(--primary)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all select-none overflow-hidden">
                <div className="absolute inset-4 border-2 border-dashed border-muted rounded-xl" />
                <div className="h-full flex flex-col items-center justify-center p-8 relative">
                  <div className="mb-6 animate-[bounce-soft_2s_ease-in-out_infinite]">
                    <DoodleIcon icon={CreditCard} size={64} thick uniqueId="card-front" />
                  </div>
                  <h2 className="text-3xl md:text-4xl font-title font-bold text-primary mb-4 text-center">{players[currentPlayer]}</h2>
                  <p className="text-muted-foreground text-center text-sm flex items-center justify-center gap-1">
                    <Hand className="h-4 w-4" />
                    Mantén presionado para revelar tu rol
                  </p>
                </div>
                {/* Corner decorations */}
                <span className="absolute top-3 left-3 text-2xl opacity-50">✦</span>
                <span className="absolute top-3 right-3 text-2xl opacity-50">✦</span>
                <span className="absolute bottom-3 left-3 text-2xl opacity-50">✦</span>
                <span className="absolute bottom-3 right-3 text-2xl opacity-50">✦</span>
              </div>

              {/* Back of card */}
              <div className="flip-card-back absolute w-full h-full rounded-[20px] border-[4px] border-foreground/80 bg-card shadow-[8px_8px_0_0_var(--primary)] select-none overflow-hidden">
                <div className="absolute inset-4 border-2 border-dashed border-muted rounded-xl" />
                <div className="h-full flex flex-col items-center justify-center p-8 relative">
                  {isCurrentPlayerImpostor ? (
                    <>
                      <div className="mb-4 animate-[shake_0.3s_ease-in-out_infinite]">
                        <DoodleIcon icon={UserSearch} size={72} thick uniqueId="card-back-impostor" />
                      </div>
                      <h3 className="text-4xl font-title font-bold text-destructive mb-4">¡IMPOSTOR!</h3>
                      <p className="text-muted-foreground text-center text-sm flex items-center justify-center gap-1">
                        Descubre la palabra sin ser descubierto
                      </p>
                    </>
                  ) : (
                    <>
                      <div className="mb-4 animate-[twinkle_2s_ease-in-out_infinite]">
                        <DoodleIcon icon={Target} size={72} thick uniqueId="card-back-word" />
                      </div>
                      <h3 className="text-3xl md:text-4xl font-title font-bold text-secondary mb-4 text-center">{selectedWord}</h3>
                      <p className="text-muted-foreground text-center text-sm flex items-center justify-center gap-1">
                        <MessageSquare className="h-4 w-4" />
                        Describe la palabra sin decirla
                      </p>
                    </>
                  )}
                </div>
                {/* Corner decorations */}
                <span className="absolute top-3 left-3 text-2xl opacity-50">★</span>
                <span className="absolute top-3 right-3 text-2xl opacity-50">★</span>
                <span className="absolute bottom-3 left-3 text-2xl opacity-50">★</span>
                <span className="absolute bottom-3 right-3 text-2xl opacity-50">★</span>
              </div>
            </div>
          </div>

          <Button
            onClick={nextPlayer}
            className="w-full max-w-xs sm:max-w-sm gap-2"
            size="lg"
          >
            {currentPlayer < players.length - 1 ? (
              <>
                →
                Siguiente Jugador
              </>
            ) : (
              <>
                <Check className="h-5 w-5" />
                Finalizar Ronda
              </>
            )}
          </Button>
        </div>
      </div>
    )
  }

  // Finished state
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background relative overflow-hidden">
      <DoodleStars />
      <DoodleCircles />
      <Card className="w-full max-w-lg relative z-10">
        <CardContent className="p-8 text-center">
          <div className="flex justify-center mb-6 animate-[bounce-soft_1s_ease-in-out_infinite]">
            <DoodleIcon icon={Gamepad} size={72} thick uniqueId="finished-icon" />
          </div>
          <h2 className="text-4xl font-title font-bold text-primary mb-6">¡A Jugar!</h2>
          <p className="text-2xl text-foreground mb-8 flex items-center justify-center gap-2">
            Empieza: <span className="font-bold text-secondary inline-flex items-center gap-1 animate-[wiggle_0.5s_ease-in-out_infinite]">
              <Mic className="h-6 w-6" />
              {players[firstPlayerIndex]}
            </span>
          </p>
          <Button onClick={resetGame} size="lg" className="gap-2">
            <RefreshCw className="h-5 w-5" />
            Volver a Jugar
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
