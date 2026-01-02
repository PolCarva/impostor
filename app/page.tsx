"use client"

"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import {
  X, Plus, Check, Palette, Sparkles, Loader2, Edit,
  Heart, Sun, Waves, Grape, Leaf, Circle, Moon,
  Package, Globe, CircleDot, Gamepad2, PawPrint, Pizza,
  Star, Film, Wrench, Briefcase, Smartphone, Car, Rainbow,
  FolderOpen, UserSearch, Users, Target, RefreshCw, Gamepad,
  Sparkles as SparklesIcon, PenTool, Box, CreditCard, MessageSquare,
  Mic, Hand, AlertCircle, Flame, BookOpen, Download, Share, HelpCircle,
  Coffee, Compass, Crown, Lightbulb, ChevronLeft, ChevronRight, ChevronUp, ChevronDown, Zap, Shuffle
} from "lucide-react"
import {
  trackGameStart,
  trackGameComplete,
  trackGameRestart,
  trackCategoryToggle,
  trackCustomCategoryCreate,
  trackCustomCategoryEdit,
  trackCustomCategoryDelete,
  trackAIGeneration,
  trackThemeChange,
  trackPWAInstallAccepted,
  trackPWAInstallDismissed,
  trackIOSInstructionsShown,
  trackInfoPopupView,
  trackScreenView,
  trackPlayerAdd,
  trackImpostorCountChange,
  trackCardView,
} from "@/components/google-analytics"

// Interfaz para el evento de instalación PWA
interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

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

// Impostor Icon Component - renders app/icon.svg with currentColor and DoodleIcon styles
const ImpostorIcon = ({ size = 48, className = "", uniqueId = "", randomRotate = true, thick = false, style = {} }: { size?: number, className?: string, uniqueId?: string, randomRotate?: boolean, thick?: boolean, style?: React.CSSProperties }) => {
  // Generate a unique identifier for consistent styling
  const uniqueKey = `impostor-icon-${size}-${uniqueId || ''}`
  
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
    <div
      className={`doodle-icon ${thickClass} ${randomClass} ${className}`}
      style={{
        width: size,
        height: size,
        display: 'inline-block',
        color: 'currentColor',
        ...style,
        animationDelay: animationDelay,
        animationDuration: animationDuration,
      }}
    >
      <div
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: 'currentColor',
          WebkitMaskImage: 'url(/icon.svg)',
          WebkitMaskRepeat: 'no-repeat',
          WebkitMaskPosition: 'center',
          WebkitMaskSize: 'contain',
          maskImage: 'url(/icon.svg)',
          maskRepeat: 'no-repeat',
          maskPosition: 'center',
          maskSize: 'contain',
        }}
      />
    </div>
  )
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
  "PUBG"
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
    "Charles Chaplin",
    "Marilyn Monroe",
    "Tom Hanks",
    "Leonardo DiCaprio",
    "Meryl Streep",
    "Dwayne Johnson",
    "Emilia Merines",
    "Duki",
    "Pablo Escobar",
    "Luli Pampín"
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
    "Lilo y Stitch",
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

  "Abstracto": [
    "Amor",
    "Muerte",
    "Vida",
    "Sueño",
    "Cielo",
    "Metamorfosis",
    "Triángulo",
    "Cuadrado",
    "Círculo",
    "Caerse",
    "Volar",
    "Libertad",
    "Tiempo",
    "Esperanza",
    "Misterio",
    "Oscuridad",
    "Luz",
    "Destino",
    "Infinito",
    "Realidad",
    "Ilusión",
    "Caos",
    "Silencio",
    "Soledad",
    "Felicidad",
    "Tristeza",
    "Memoria",
    "Pensamiento",
    "Fuerza",
    "Calma",
    "Sabiduría",
    "Desafío"
  ],
};


const DEFAULT_CATEGORIES = WORD_CATEGORIES

const GAME_MODES: Record<GameMode, GameModeConfig> = {
  classic: {
    name: "Clásico",
    description: "El modo original: un impostor debe descubrir la palabra secreta",
    icon: UserSearch,
    minPlayers: 3,
  },
  lost: {
    name: "El Perdido",
    description: "Un jugador tiene una palabra diferente y no lo sabe",
    icon: Compass,
    minPlayers: 4,
  },
  jester: {
    name: "Bufón",
    description: "Un jugador gana si es eliminado por el grupo",
    icon: Crown,
    minPlayers: 4,
  },
  chaos: {
    name: "Locura",
    description: "Con probabilidad aleatoria, todos pueden ser impostores, nadie será impostor pero todos tendrán palabras diferentes, o nadie será impostor pero todos compartirán la misma palabra",
    icon: Zap,
    minPlayers: 3,
  },
  random: {
    name: "Aleatorio",
    description: "Elige aleatoriamente entre todos los modos de juego disponibles. ¡Nadie sabrá cuál está activo!",
    icon: Shuffle,
    minPlayers: 3,
  },
}

const COLOR_PALETTES = {
  // 📓 Papel de Cuaderno - Minimalista blanco y negro
  notebook: {
    name: "Papel de Cuaderno",
    icon: BookOpen,
    colors: {
      background: "oklch(0.98 0.002 0)",
      foreground: "oklch(0.15 0 0)",
      card: "oklch(1 0 0)",
      "card-foreground": "oklch(0.15 0 0)",
      primary: "oklch(0.15 0 0)",
      "primary-foreground": "oklch(0.98 0.002 0)",
      secondary: "oklch(0.55 0.002 0)",
      "secondary-foreground": "oklch(0.15 0 0)",
      muted: "oklch(0.95 0.002 0)",
      "muted-foreground": "oklch(0.40 0 0)",
      destructive: "oklch(0.35 0 0)",
      "destructive-foreground": "oklch(0.98 0.002 0)",
      border: "oklch(0.85 0.002 0)",
      accent: "oklch(0.5 0.2 240)",
      "accent-foreground": "oklch(0.98 0.002 0)",
    },
  },
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

type GameMode = "classic" | "lost" | "jester" | "chaos" | "random"

interface GameModeConfig {
  name: string
  description: string
  icon: any
  minPlayers: number
}


export default function ImpostorGame() {
  const [gameState, setGameState] = useState<GameState>("categories")
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [players, setPlayers] = useState<string[]>([])
  const [currentPlayer, setCurrentPlayer] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [playersSeenCard, setPlayersSeenCard] = useState<boolean[]>([])
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
    return "notebook"
  })
  const [previousGameState, setPreviousGameState] = useState<GameState>("categories")
  const [numImpostors, setNumImpostors] = useState(1)
  const [customCategories, setCustomCategories] = useState<Record<string, string[]>>({})
  const [selectedGameMode, setSelectedGameMode] = useState<GameMode>("classic")
  const [actualGameMode, setActualGameMode] = useState<GameMode>("classic") // Modo real cuando está en modo random
  const [lostPlayerIndex, setLostPlayerIndex] = useState<number>(-1)
  const [lostPlayerWord, setLostPlayerWord] = useState("")
  const [jesterPlayerIndex, setJesterPlayerIndex] = useState<number>(-1)
  const [chaosAllImpostors, setChaosAllImpostors] = useState(false)
  const [chaosAllDifferentWords, setChaosAllDifferentWords] = useState(false)
  const [chaosAllSameWord, setChaosAllSameWord] = useState(false)
  const [chaosPlayerWords, setChaosPlayerWords] = useState<Record<number, string>>({})
  const [editingCategoryName, setEditingCategoryName] = useState("")
  const [editingCategoryWords, setEditingCategoryWords] = useState<string[]>([])
  const [aiPrompt, setAiPrompt] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [isEditingExisting, setIsEditingExisting] = useState(false)
  const [originalCategoryName, setOriginalCategoryName] = useState("")
  
  // PWA Install States
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [isInstallable, setIsInstallable] = useState(false)
  const [isIOS, setIsIOS] = useState(false)
  const [isStandalone, setIsStandalone] = useState(false)
  const [showIOSInstructions, setShowIOSInstructions] = useState(false)
  const [showInfoPopup, setShowInfoPopup] = useState(false)
  const [showGameModesInfo, setShowGameModesInfo] = useState(false)

  // Tracking: si se usó IA para generar palabras en la categoría actual
  const usedAIForCurrentCategory = useRef(false)
  
  // Custom Alert State
  const [customAlert, setCustomAlert] = useState<{
    show: boolean
    type: 'success' | 'error'
    title: string
    message: string
  }>({ show: false, type: 'success', title: '', message: '' })

  const showAlert = (type: 'success' | 'error', title: string, message: string) => {
    setCustomAlert({ show: true, type, title, message })
  }

  const hideAlert = () => {
    setCustomAlert(prev => ({ ...prev, show: false }))
  }

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
    
    // Track initial screen view
    trackScreenView('categories')
  }, [])

  // PWA Install Detection
  useEffect(() => {
    // Detectar si es iOS
    const isIOSDevice = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream
    setIsIOS(isIOSDevice)

    // Detectar si ya está instalado como PWA
    const isInStandaloneMode = window.matchMedia('(display-mode: standalone)').matches || 
                               (window.navigator as any).standalone === true
    setIsStandalone(isInStandaloneMode)

    // Escuchar el evento beforeinstallprompt (Chrome, Edge, etc.)
    const handleBeforeInstallPrompt = (e: Event) => {
      // Solo guardamos el evento para poder mostrarlo manualmente si es necesario
      setDeferredPrompt(e as BeforeInstallPromptEvent)
      // No llamamos a preventDefault() para permitir el banner nativo del navegador
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)

    // Detectar cuando la app fue instalada
    window.addEventListener('appinstalled', () => {
      setIsInstallable(false)
      setDeferredPrompt(null)
      setIsStandalone(true)
    })

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
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
    const isCurrentlySelected = selectedCategories.includes(category)
    const isCustom = category in customCategories
    
    // Track category toggle
    trackCategoryToggle({
      categoryName: category,
      isSelected: !isCurrentlySelected,
      isCustom: isCustom,
    })
    
    if (isCurrentlySelected) {
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
      const newPlayers = [...players, newPlayerName.trim()]
      setPlayers(newPlayers)
      setNewPlayerName("")
      
      // Track player added
      trackPlayerAdd(newPlayers.length)
    }
  }

  const removePlayer = (index: number) => {
    setPlayers(players.filter((_, i) => i !== index))
  }

  const movePlayerUp = (index: number) => {
    if (index > 0) {
      const newPlayers = [...players]
      ;[newPlayers[index], newPlayers[index - 1]] = [newPlayers[index - 1], newPlayers[index]]
      setPlayers(newPlayers)
    }
  }

  const movePlayerDown = (index: number) => {
    if (index < players.length - 1) {
      const newPlayers = [...players]
      ;[newPlayers[index], newPlayers[index + 1]] = [newPlayers[index + 1], newPlayers[index]]
      setPlayers(newPlayers)
    }
  }

  const startGame = () => {
    // Si está en modo random, elegir un modo aleatorio
    let gameModeToUse: GameMode = selectedGameMode
    if (selectedGameMode === "random") {
      const availableModes: GameMode[] = ["classic", "lost", "jester", "chaos"]
      gameModeToUse = availableModes[Math.floor(Math.random() * availableModes.length)]
      setActualGameMode(gameModeToUse)
    } else {
      setActualGameMode(selectedGameMode)
    }

    if (players.length < GAME_MODES[selectedGameMode].minPlayers) return

    // Get available words based on selected categories
    const availableWords = getAvailableWords()
    const categoriesToUse = selectedCategories.length === 0
      ? [...Object.keys(DEFAULT_CATEGORIES), ...Object.keys(customCategories)]
      : selectedCategories

    // Select a random category from the available ones
    const selectedCategory = categoriesToUse[Math.floor(Math.random() * categoriesToUse.length)]

    // Get words from the selected category
    let categoryWords
    if (DEFAULT_CATEGORIES[selectedCategory as keyof typeof DEFAULT_CATEGORIES]) {
      categoryWords = DEFAULT_CATEGORIES[selectedCategory as keyof typeof DEFAULT_CATEGORIES] || []
    } else {
      categoryWords = customCategories[selectedCategory] || []
    }

    // If category is empty, fallback to all available words
    if (categoryWords.length === 0) {
      categoryWords = availableWords
    }

    // Select the main word from this category
    const randomWord = categoryWords[Math.floor(Math.random() * categoryWords.length)]

    const shuffledIndices = [...Array(players.length).keys()].sort(() => Math.random() - 0.5)
    const selectedImpostors = shuffledIndices.slice(0, numImpostors)

    const randomFirstPlayer = Math.floor(Math.random() * players.length)

    // Reset special roles
    setLostPlayerIndex(-1)
    setLostPlayerWord("")
    setJesterPlayerIndex(-1)
    setChaosAllImpostors(false)
    setChaosAllDifferentWords(false)
    setChaosAllSameWord(false)
    setChaosPlayerWords({})

    // Modo Locura: con probabilidad 1/6 o 50% si es random, activar escenarios especiales
    if (actualGameMode === "chaos") {
      const chaosRoll = Math.floor(Math.random() * 10) // 0-9

      // Probabilidad 50% si venimos de modo Aleatorio, sino 1/10 normal
      const forceSpecialScenario = selectedGameMode === "random" && Math.random() < 0.5
      if (forceSpecialScenario || chaosRoll === 0) {
        // Decidir aleatoriamente entre: todos impostores, todos palabras diferentes, o nadie impostor
        const chaosType = Math.floor(Math.random() * 3) // 0, 1 o 2

        if (chaosType === 0) {
          // Escenario 1: TODOS son impostores
          setChaosAllImpostors(true)
          setChaosAllDifferentWords(false)
          setChaosAllSameWord(false)
          // Todos los jugadores son impostores
          setImpostorIndices([...Array(players.length).keys()])
          // Mantener la palabra seleccionada para que los impostores la descubran
          setSelectedWord(randomWord)
        } else if (chaosType === 1) {
          // Escenario 2: NADIE es impostor, pero TODOS tienen palabras diferentes
          setChaosAllImpostors(false)
          setChaosAllDifferentWords(true)
          setChaosAllSameWord(false)
          // Nadie es impostor
          setImpostorIndices([])

          // Asignar palabras diferentes a cada jugador
          const playerWords: Record<number, string> = {}
          const usedWords = new Set<string>()

          // Obtener más palabras si es necesario (asegurarse de tener suficientes)
          let extendedWordPool = [...availableWords]
          while (extendedWordPool.length < players.length) {
            const additionalWords = getAvailableWords().filter(word => !extendedWordPool.includes(word))
            extendedWordPool = [...extendedWordPool, ...additionalWords]
          }

          for (let i = 0; i < players.length; i++) {
            // Buscar una palabra que no haya sido usada
            let availableWordsForPlayer = extendedWordPool.filter(word => !usedWords.has(word))
            if (availableWordsForPlayer.length === 0) {
              // Fallback: usar cualquier palabra disponible
              availableWordsForPlayer = extendedWordPool
              usedWords.clear()
            }

            const randomWordForPlayer = availableWordsForPlayer[Math.floor(Math.random() * availableWordsForPlayer.length)]
            playerWords[i] = randomWordForPlayer
            usedWords.add(randomWordForPlayer)
          }

          setChaosPlayerWords(playerWords)
          // No hay palabra seleccionada cuando todos tienen palabras diferentes
          setSelectedWord("")
        } else {
          // Escenario 3: NADIE es impostor, TODOS comparten la misma palabra
          setChaosAllImpostors(false)
          setChaosAllDifferentWords(false)
          setChaosAllSameWord(true)
          // Nadie es impostor
          setImpostorIndices([])
          // Todos comparten la misma palabra
          setSelectedWord(randomWord)
        }
        setFirstPlayerIndex(randomFirstPlayer)
        setCurrentPlayer(0)
        setIsFlipped(false)
        setPlayersSeenCard(new Array(players.length).fill(false))
        setGameState("playing")

        // Track game start
        const hasCustomCategory = categoriesToUse.some(cat => cat in customCategories)
        trackGameStart({
          playerCount: players.length,
          impostorCount: chaosType === 0 ? players.length : 0, // 0: todos impostores, 1: nadie impostor (palabras diferentes), 2: nadie impostor (misma palabra)
          categoriesCount: categoriesToUse.length,
          categories: categoriesToUse,
          isCustomCategoryUsed: hasCustomCategory,
        })
        trackScreenView('playing')
        return
      }
    }

    // Assign special roles based on game mode
    if (actualGameMode === "lost") {
      // Select a player who gets a different word (not an impostor)
      const nonImpostorIndices = shuffledIndices.filter(i => !selectedImpostors.includes(i))
      const lostIndex = nonImpostorIndices[Math.floor(Math.random() * nonImpostorIndices.length)]
      setLostPlayerIndex(lostIndex)

      // Get a different word from the SAME category
      let differentWord
      const availableDifferentWords = categoryWords.filter(word => word !== randomWord)
      if (availableDifferentWords.length > 0) {
        differentWord = availableDifferentWords[Math.floor(Math.random() * availableDifferentWords.length)]
      } else {
        // Fallback: if only one word in category, use any other word from available words (but try to avoid the main word)
        const fallbackWords = availableWords.filter(word => word !== randomWord)
        differentWord = fallbackWords[Math.floor(Math.random() * fallbackWords.length)]
      }
      setLostPlayerWord(differentWord)
    } else if (actualGameMode === "jester") {
      // Select a jester (not an impostor)
      const nonImpostorIndices = shuffledIndices.filter(i => !selectedImpostors.includes(i))
      const jesterIndex = nonImpostorIndices[Math.floor(Math.random() * nonImpostorIndices.length)]
      setJesterPlayerIndex(jesterIndex)
    }

    setSelectedWord(randomWord)
    setImpostorIndices(selectedImpostors)
    setFirstPlayerIndex(randomFirstPlayer)
    setCurrentPlayer(0)
    setIsFlipped(false)
    setPlayersSeenCard(new Array(players.length).fill(false)) // Inicializar array para trackear qué jugadores vieron sus cartas
    setGameState("playing")

    // Track game start
    const hasCustomCategory = categoriesToUse.some(cat => cat in customCategories)

    trackGameStart({
      playerCount: players.length,
      impostorCount: numImpostors,
      categoriesCount: categoriesToUse.length,
      categories: categoriesToUse,
      isCustomCategoryUsed: hasCustomCategory,
    })

    trackScreenView('playing')
  }

  const handleCardPress = () => {
    setIsFlipped(true)
    setPlayersSeenCard(prev => {
      const newSeen = [...prev]
      newSeen[currentPlayer] = true // Marcar que este jugador ya vio su carta
      return newSeen
    })

    // Track card view
    trackCardView({
      playerIndex: currentPlayer,
      isImpostor: impostorIndices.includes(currentPlayer),
    })
  }

  const handleCardRelease = () => {
    setIsFlipped(false)
  }

  const nextPlayer = () => {
    if (currentPlayer < players.length - 1) {
      setCurrentPlayer(currentPlayer + 1)
      setIsFlipped(false)
      // No necesitamos resetear playersSeenCard aquí, mantenemos el historial
    } else {
      setGameState("finished")

      // Track game complete
      trackGameComplete({
        playerCount: players.length,
        impostorCount: impostorIndices.length,
        selectedWord: selectedWord,
      })

      trackScreenView('finished')
    }
  }

  const previousPlayer = () => {
    if (currentPlayer > 0) {
      setCurrentPlayer(currentPlayer - 1)
      // Cuando vas hacia atrás, la carta debe estar en su estado original
      // para evitar mostrar la respuesta accidentalmente
      setIsFlipped(false)
      // playersSeenCard se mantiene, así que si el jugador ya vio su carta antes,
      // podrá continuar sin tener que darla vuelta nuevamente
    }
  }

  const resetGame = () => {
    setCurrentPlayer(0)
    setIsFlipped(false)
    setPlayersSeenCard([])
    setSelectedWord("")
    setImpostorIndices([])
    setGameState("setup")

    // Track game restart
    trackGameRestart()
    trackScreenView('setup')
  }

  const isCurrentPlayerImpostor = impostorIndices.includes(currentPlayer)

  const getCurrentPlayerRole = () => {
    // Modo Locura: todos impostores
    if (chaosAllImpostors) return "impostor"

    // Modo Locura: todos palabras diferentes (nadie es impostor)
    if (chaosAllDifferentWords) return "normal"

    // Modo Locura: nadie es impostor, todos comparten la misma palabra
    if (chaosAllSameWord) return "normal"

    if (impostorIndices.includes(currentPlayer)) return "impostor"
    if (currentPlayer === lostPlayerIndex) return "lost"
    if (currentPlayer === jesterPlayerIndex) return "jester"
    return "normal"
  }

  const getCurrentPlayerWord = () => {
    // Modo Locura: todos palabras diferentes
    if (chaosAllDifferentWords && chaosPlayerWords[currentPlayer]) {
      return chaosPlayerWords[currentPlayer]
    }

    if (currentPlayer === lostPlayerIndex) return lostPlayerWord
    return selectedWord
  }

  const openThemeSettings = () => {
    setPreviousGameState(gameState)
    setGameState("theme")
  }

  const closeThemeSettings = () => {
    setGameState(previousGameState)
  }

  const selectPalette = (paletteName: PaletteName) => {
    const previousPalette = currentPalette
    setCurrentPalette(paletteName)
    
    // Track theme change
    if (previousPalette !== paletteName) {
      trackThemeChange({
        themeName: paletteName,
        previousTheme: previousPalette,
      })
    }
  }

  // Función para instalar PWA
  const handleInstallClick = async () => {
    if (isIOS) {
      // En iOS mostramos las instrucciones
      setShowIOSInstructions(true)
      trackIOSInstructionsShown()
      return
    }

    if (!deferredPrompt) return

    // Mostrar el prompt de instalación
    deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice
    
    if (outcome === 'accepted') {
      setIsInstallable(false)
      trackPWAInstallAccepted()
    } else {
      trackPWAInstallDismissed()
    }
    setDeferredPrompt(null)
  }

  const deleteCustomCategory = (categoryName: string) => {
    // Track delete before removing
    trackCustomCategoryDelete(categoryName)
    
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
    setOriginalCategoryName("") // Limpiar el nombre original al crear nueva
    setEditingCategoryWords([])
    setAiPrompt("")
    setIsEditingExisting(false)
    usedAIForCurrentCategory.current = false
    setGameState("edit-custom-category")
    trackScreenView('create_custom_category')
  }

  const openEditCustomCategory = (categoryName: string) => {
    const words = customCategories[categoryName] || []
    setEditingCategoryName(categoryName)
    setOriginalCategoryName(categoryName) // Guardar el nombre original
    setEditingCategoryWords([...words])
    setAiPrompt("")
    setIsEditingExisting(true)
    usedAIForCurrentCategory.current = false
    setGameState("edit-custom-category")
    trackScreenView('edit_custom_category')
  }

  const saveCustomCategory = () => {
    if (editingCategoryName.trim() && editingCategoryWords.length > 0) {
      const newName = editingCategoryName.trim()
      
      // Track create/edit
      if (isEditingExisting) {
        trackCustomCategoryEdit({
          categoryName: newName,
          wordCount: editingCategoryWords.length,
        })
      } else {
        trackCustomCategoryCreate({
          categoryName: newName,
          wordCount: editingCategoryWords.length,
          usedAI: usedAIForCurrentCategory.current,
        })
      }
      
      setCustomCategories(prev => {
        const updated = { ...prev }
        
        // Si estamos editando una categoría existente y el nombre cambió, eliminar la anterior
        if (isEditingExisting && originalCategoryName && originalCategoryName !== newName) {
          delete updated[originalCategoryName]
        }
        
        // Agregar o actualizar la categoría con el nuevo nombre
        updated[newName] = [...editingCategoryWords]
        
        return updated
      })
      
      // Limpiar el nombre original después de guardar
      setOriginalCategoryName("")
      setGameState("categories")
      trackScreenView('categories')
    }
  }

  const cancelEditCategory = () => {
    setOriginalCategoryName("") // Limpiar el nombre original al cancelar
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
    if (newWord.trim() && !editingCategoryWords.some((word, i) => i !== index && word.trim() === newWord.trim())) {
      setEditingCategoryWords(prev => prev.map((word, i) => i === index ? newWord : word))
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
      showAlert('success', '¡Palabras generadas!', `Se generaron ${data.words.length} elementos para "${prompt}"`)
      
      // Track AI generation success
      usedAIForCurrentCategory.current = true
      trackAIGeneration({
        prompt: prompt,
        wordCount: data.words.length,
        success: true,
      })

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

      showAlert('error', 'Error de conexión', 'No se pudo conectar con el servidor de IA. Se agregaron palabras de ejemplo en su lugar.')
      
      // Track AI generation failure
      trackAIGeneration({
        prompt: prompt,
        wordCount: 0,
        success: false,
      })
    }

    setIsGenerating(false)
  }




  if (gameState === "theme") {
    return (
      <div
        className="min-h-screen flex items-center justify-center p-4 bg-background relative overflow-hidden"
        style={{ contain: 'layout style paint' }}
      >
        <DoodleStars />
        <DoodleCircles />
        <Card className="w-full max-w-2xl relative z-10 flex flex-col max-h-[90vh]">
          <CardContent className="p-4 md:p-6 flex flex-col flex-1 min-h-0">
            <div className="flex items-center justify-between mb-4 shrink-0">
              <div className="flex items-center gap-2">
                <DoodleIcon icon={Palette} size={28} thick className="animate-[bounce-soft_2s_ease-in-out_infinite]" uniqueId="theme-header" />
                <h2 className="text-xl md:text-2xl font-title font-bold text-primary">Elige tu estilo</h2>
              </div>
              <Button variant="ghost" size="icon" onClick={() => {
                setGameState(previousGameState)
              }} aria-label="Cerrar selector de temas">
                <X className="h-5 w-5" />
              </Button>
            </div>

            <p className="text-center text-muted-foreground mb-4 text-sm md:text-base shrink-0">
              ¡Personaliza los colores de tu juego!
            </p>

            {/* Contenido scrolleable */}
            <div className="flex-1 overflow-y-auto pr-2 -mr-2 min-h-0 overflow-x-hidden">
              <div className="grid pt-4 grid-cols-1 md:grid-cols-2 gap-3 px-1">
                {(Object.keys(COLOR_PALETTES) as PaletteName[]).map((paletteName) => {
                  const palette = COLOR_PALETTES[paletteName]
                  const isSelected = currentPalette === paletteName
                  return (
                    <button
                      key={paletteName}
                      onClick={() => selectPalette(paletteName)}
                      className={`relative p-4 transition-all duration-200 ${
                        isSelected
                          ? "rounded-[30px_10px_30px_10px/10px_30px_10px_30px] border-[3px] border-primary md:shadow-[6px_6px_0_0_var(--primary)] md:translate-x-[-3px] md:translate-y-[-3px] -rotate-1"
                          : "rounded-[25px_8px_25px_8px/8px_25px_8px_25px] border-2 border-border hover:border-primary/50 md:hover:translate-x-[-2px] md:hover:translate-y-[-2px] md:hover:shadow-[4px_4px_0_0_var(--border)]"
                      }`}
                      style={{ backgroundColor: palette.colors.card }}
                    >
                      <div className="flex flex-col items-start gap-2">
                        <div className="w-full flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            {palette.icon && (
                              <DoodleIcon 
                                icon={palette.icon} 
                                size={18} 
                                className="stroke-[2.5]"
                                uniqueId={`palette-${paletteName}`}
                                style={{ stroke: palette.colors["card-foreground"] }}
                              />
                            )}
                            <span className="font-title font-bold text-base" style={{ color: palette.colors["card-foreground"] }}>
                              {palette.name}
                            </span>
                          </div>
                          {isSelected && (
                            <div className="rounded-full p-1 animate-[bounce-soft_1s_ease-in-out_infinite]" style={{ backgroundColor: palette.colors.primary }}>
                              <Check className="h-3 w-3" style={{ color: palette.colors["primary-foreground"] }} />
                            </div>
                          )}
                        </div>

                        <div className="w-full flex gap-1.5">
                          <div className="h-8 flex-1 rounded-[10px_3px_10px_3px/3px_10px_3px_10px] border-2 border-white/20" style={{ backgroundColor: palette.colors.primary }} />
                          <div className="h-8 flex-1 rounded-[10px_3px_10px_3px/3px_10px_3px_10px] border-2 border-white/20" style={{ backgroundColor: palette.colors.secondary }} />
                          <div className="h-8 flex-1 rounded-[10px_3px_10px_3px/3px_10px_3px_10px] border-2 border-white/20" style={{ backgroundColor: palette.colors.accent }} />
                        </div>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Footer fijo con CTA */}
            <div className="shrink-0 pt-4 border-t border-border/50 mt-4">
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
      <div
        className="min-h-screen flex items-center justify-center p-4 bg-background relative overflow-hidden"
        style={{ contain: 'layout style paint' }}
      >
        <DoodleStars />
        
        {/* Modal de alerta custom */}
        {customAlert.show && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
            <Card className={`w-full max-w-sm border-[3px] ${customAlert.type === 'success' ? 'border-secondary' : 'border-destructive'}`}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-title font-bold text-foreground flex items-center gap-2">
                    {customAlert.type === 'success' ? (
                      <DoodleIcon icon={Check} size={24} thick className="text-secondary" uniqueId="alert-success-edit" />
                    ) : (
                      <DoodleIcon icon={AlertCircle} size={24} thick className="text-destructive" uniqueId="alert-error-edit" />
                    )}
                    {customAlert.title}
                  </h3>
                  <Button variant="ghost" size="icon" onClick={hideAlert} aria-label="Cerrar alerta">
                    <X className="h-5 w-5" />
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground mb-6">
                  {customAlert.message}
                </p>
                <Button 
                  onClick={hideAlert} 
                  className={`w-full ${customAlert.type === 'success' ? 'bg-secondary hover:bg-secondary/90' : 'bg-destructive hover:bg-destructive/90'}`}
                >
                  ¡Entendido!
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
        
        <Card className="w-full max-w-4xl relative z-10 flex flex-col max-h-[90vh]">
          <CardContent className="p-4 md:p-6 flex flex-col flex-1 min-h-0">
            <div className="flex items-center justify-between mb-4 shrink-0">
              <div className="flex items-center gap-2">
                <DoodleIcon icon={PenTool} size={28} thick className="animate-[wiggle_1s_ease-in-out_infinite]" uniqueId="edit-header" />
                <h2 className="text-xl md:text-2xl font-title font-bold text-primary">
                  {isEditingExisting ? "Editar Categoría" : "Nueva Categoría"}
                </h2>
              </div>
              <Button variant="ghost" size="icon" onClick={cancelEditCategory} aria-label="Cancelar edición">
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Contenido scrolleable */}
            <div className="flex-1 overflow-y-auto pr-2 -mr-2 min-h-0">
            <div className="space-y-4">
              {/* Nombre de la categoría */}
              <div>
                <label className="text-sm font-title font-bold text-foreground mb-2 flex items-center gap-2">
                  <DoodleIcon icon={PenTool} size={18} className="stroke-[2.5]" uniqueId="edit-label" />
                  Nombre de la categoría:
                </label>
                <Input
                  id="category-name-input"
                  name="category-name"
                  placeholder="Ej: Personajes de Anime, Comidas Típicas..."
                  value={editingCategoryName}
                  onChange={(e) => setEditingCategoryName(e.target.value)}
                  className="text-sm"
                />
              </div>

              {/* Generación con IA */}
              <div className="bg-muted/30 p-4 rounded-[20px_8px_20px_8px/8px_20px_8px_20px] border-[3px] border-dashed border-border">
                <h3 className="text-base font-title font-bold text-foreground mb-2 flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-secondary animate-[twinkle_2s_ease-in-out_infinite]" />
                  Asistente Mágico ✨
                </h3>
                <p className="text-sm text-muted-foreground mb-3">
                  ¡Deja que la IA te sugiera palabras automáticamente!
                </p>

                <div className="flex flex-col gap-2">
                  <Textarea
                    id="ai-prompt-textarea"
                    name="ai-prompt"
                    placeholder="Describe el tema para generar palabras...&#10;&#10;Ejemplos:&#10;'personajes de Naruto'&#10;'tipos de verduras'&#10;'marcas de autos deportivos'"
                    value={aiPrompt}
                    onChange={(e) => setAiPrompt(e.target.value.slice(0, 200))}
                    disabled={isGenerating}
                    className="text-sm min-h-[80px]"
                  />
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-muted-foreground">
                      {aiPrompt.length}/200 caracteres
                    </span>
                    <Button
                      onClick={() => generateWordsWithAI(aiPrompt)}
                      disabled={!aiPrompt.trim() || aiPrompt.length > 200 || isGenerating}
                      className="gap-2"
                      size="sm"
                    >
                      {isGenerating ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Sparkles className="h-4 w-4" />
                      )}
                      {isGenerating ? "Generando..." : "¡Generar!"}
                    </Button>
                  </div>
                </div>
              </div>

              {/* Lista de palabras */}
              <div>
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-3">
                  <h3 className="text-sm font-title font-bold text-foreground flex items-center gap-2">
                    <DoodleIcon icon={Box} size={18} className="stroke-[2.5]" uniqueId="words-header" />
                    Palabras ({editingCategoryWords.length})
                  </h3>
                  <div className="flex w-full sm:w-auto gap-2">
                    <Input
                      id="add-word-input"
                      placeholder="Nueva palabra..."
                      className="flex-1 sm:w-40 text-sm h-9"
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
                      className="gap-1"
                      size="sm"
                    >
                      <Plus className="h-3 w-3" />
                      Agregar
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 p-2">
                  {editingCategoryWords.map((word, index) => (
                    <div 
                      key={index} 
                      className="flex items-center gap-1.5 p-2 bg-muted rounded-[15px_5px_15px_5px/5px_15px_5px_15px] border-2 border-border group hover:border-primary/50 transition-all"
                      style={{ transform: `rotate(${(index % 3 - 1) * 0.5}deg)` }}
                    >
                      <Input
                        id={`word-input-${index}`}
                        name={`word-${index}`}
                        value={word}
                        onChange={(e) => updateWordInCategory(index, e.target.value)}
                        className="flex-1 h-8 text-xs border-0 bg-transparent p-1 focus:bg-background/50"
                      />
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        onClick={() => removeWordFromCategory(index)}
                        className="opacity-50 group-hover:opacity-100 text-muted-foreground hover:text-destructive h-7 w-7"
                        aria-label="Eliminar palabra"
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>

                {editingCategoryWords.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    <div className="flex justify-center mb-3">
                      <DoodleIcon icon={Box} size={40} thick className="opacity-50" uniqueId="empty-state" />
                    </div>
                    <p className="text-base font-title">No hay palabras aún</p>
                    <p className="text-xs">Usa el asistente mágico o agrega palabras manualmente</p>
                  </div>
                )}
              </div>
            </div>
            </div>

            {/* Footer fijo con botones de acción */}
            <div className="shrink-0 pt-4 border-t border-border/50 mt-4">
              <div className="flex flex-col sm:flex-row gap-3">
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
      <div
        className="min-h-screen flex items-center justify-center p-4 bg-background relative overflow-hidden"
        style={{ contain: 'layout style paint' }}
      >
        <DoodleStars />
        <DoodleCircles />
        
        {/* Modal de alerta custom */}
        {customAlert.show && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
            <Card className={`w-full max-w-sm border-[3px] ${customAlert.type === 'success' ? 'border-secondary' : 'border-destructive'}`}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-title font-bold text-foreground flex items-center gap-2">
                    {customAlert.type === 'success' ? (
                      <DoodleIcon icon={Check} size={24} thick className="text-secondary" uniqueId="alert-success" />
                    ) : (
                      <DoodleIcon icon={AlertCircle} size={24} thick className="text-destructive" uniqueId="alert-error" />
                    )}
                    {customAlert.title}
                  </h3>
                  <Button variant="ghost" size="icon" onClick={hideAlert} aria-label="Cerrar alerta">
                    <X className="h-5 w-5" />
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground mb-6">
                  {customAlert.message}
                </p>
                <Button 
                  onClick={hideAlert} 
                  className={`w-full ${customAlert.type === 'success' ? 'bg-secondary hover:bg-secondary/90' : 'bg-destructive hover:bg-destructive/90'}`}
                >
                  ¡Entendido!
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Modal de información de modos de juego */}
        {showGameModesInfo && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
            <Card className="w-full max-w-2xl max-h-[90vh] flex flex-col">
              <CardContent className="p-4 md:p-6 flex flex-col flex-1 min-h-0 overflow-hidden">
                <div className="flex items-center justify-between mb-4 shrink-0">
                  <h3 className="text-xl md:text-2xl font-title font-bold text-foreground flex items-center gap-2">
                    <DoodleIcon icon={Gamepad2} size={28} thick className="animate-[bounce-soft_2s_ease-in-out_infinite]" uniqueId="modes-info-header" />
                    Modos de Juego
                  </h3>
                  <Button variant="ghost" size="icon" onClick={() => setShowGameModesInfo(false)} aria-label="Cerrar información de modos">
                    <X className="h-5 w-5" />
                  </Button>
                </div>

                <div className="flex-1 overflow-y-auto pr-2 -mr-2 min-h-0">
                  <div className="space-y-4 text-left">
                    {(Object.entries(GAME_MODES) as [GameMode, GameModeConfig][]).map(([modeKey, modeConfig]) => (
                      <div key={modeKey} className="bg-muted/30 p-4 rounded-[20px_8px_20px_8px/8px_20px_8px_20px] border-2 border-border">
                        <div className="flex items-start gap-3 mb-3">
                          <DoodleIcon
                            icon={modeConfig.icon}
                            size={24}
                            className="stroke-[2.5] mt-1 shrink-0"
                            uniqueId={`mode-info-${modeKey}`}
                          />
                          <div className="flex-1">
                            <h4 className="text-lg font-title font-bold text-foreground mb-1">{modeConfig.name}</h4>
                            <p className="text-sm text-muted-foreground mb-2">{modeConfig.description}</p>
                            <p className="text-xs text-muted-foreground font-medium">Mínimo {modeConfig.minPlayers} jugadores</p>
                          </div>
                        </div>

                        <div className="text-sm text-foreground space-y-2">
                          {modeKey === "classic" && (
                            <>
                              <p className="flex items-start gap-2">
                                <DoodleIcon icon={Users} size={20} className="stroke-[2.5] mt-0.5 shrink-0" uniqueId={`classic-how-${modeKey}`} />
                                <span><strong>Cómo se juega:</strong> Todos los jugadores comparten una palabra secreta, excepto el impostor que debe descubrirla sin ser descubierto.</span>
                              </p>
                              <p className="flex items-start gap-2">
                                <DoodleIcon icon={Target} size={20} className="stroke-[2.5] mt-0.5 shrink-0" uniqueId={`classic-win-${modeKey}`} />
                                <span><strong>Cómo ganar:</strong> Los jugadores honestos ganan si identifican al impostor. El impostor gana si adivina la palabra sin ser descubierto.</span>
                              </p>
                              <p className="flex items-start gap-2">
                                <DoodleIcon icon={Lightbulb} size={20} className="stroke-[2.5] mt-0.5 shrink-0" uniqueId={`classic-strategy-${modeKey}`} />
                                <span><strong>Estrategia:</strong> Da pistas claras pero no directas sobre la palabra. Observa inconsistencias en las pistas de los demás.</span>
                              </p>
                            </>
                          )}

                          {modeKey === "lost" && (
                            <>
                              <p className="flex items-start gap-2">
                                <DoodleIcon icon={Users} size={20} className="stroke-[2.5] mt-0.5 shrink-0" uniqueId={`lost-how-${modeKey}`} />
                                <span><strong>Cómo se juega:</strong> Un jugador (El Perdido) tiene una palabra completamente diferente pero no lo sabe. Los impostores deben descubrir la palabra común del grupo.</span>
                              </p>
                              <p className="flex items-start gap-2">
                                <DoodleIcon icon={Target} size={20} className="stroke-[2.5] mt-0.5 shrink-0" uniqueId={`lost-win-${modeKey}`} />
                                <span><strong>Cómo ganar:</strong> Los jugadores honestos (incluyendo El Perdido) ganan si identifican correctamente a los impostores.</span>
                              </p>
                              <p className="flex items-start gap-2">
                                <DoodleIcon icon={Lightbulb} size={20} className="stroke-[2.5] mt-0.5 shrink-0" uniqueId={`lost-strategy-${modeKey}`} />
                                <span><strong>Estrategia:</strong> El Perdido dará pistas confusas sin saber por qué. Los demás deben observar quién parece perdido o da pistas incoherentes.</span>
                              </p>
                            </>
                          )}

                          {modeKey === "jester" && (
                            <>
                              <p className="flex items-start gap-2">
                                <DoodleIcon icon={Users} size={20} className="stroke-[2.5] mt-0.5 shrink-0" uniqueId={`jester-how-${modeKey}`} />
                                <span><strong>Cómo se juega:</strong> Un jugador (El Bufón) conoce la palabra pero tiene un objetivo secreto: convencer al grupo de que lo elimine.</span>
                              </p>
                              <p className="flex items-start gap-2">
                                <DoodleIcon icon={Target} size={20} className="stroke-[2.5] mt-0.5 shrink-0" uniqueId={`jester-win-${modeKey}`} />
                                <span><strong>Cómo ganar:</strong> El Bufón gana si es votado para ser eliminado. Los demás ganan si identifican correctamente al impostor.</span>
                              </p>
                              <p className="flex items-start gap-2">
                                <DoodleIcon icon={Lightbulb} size={20} className="stroke-[2.5] mt-0.5 shrink-0" uniqueId={`jester-strategy-${modeKey}`} />
                                <span><strong>Estrategia:</strong> El Bufón debe dar pistas plausibles pero sospechosas. Los demás deben identificar quién parece estar jugando para ser eliminado.</span>
                              </p>
                            </>
                          )}

                          {modeKey === "chaos" && (
                            <>
                              <p className="flex items-start gap-2">
                                <DoodleIcon icon={Users} size={20} className="stroke-[2.5] mt-0.5 shrink-0" uniqueId={`chaos-how-${modeKey}`} />
                                <span>
                                  <strong>Cómo se juega:</strong> Con probabilidad de 1/10, puede activarse uno de tres escenarios especiales:
                                  <br />
                                  1. Todos los jugadores son impostores
                                  <br />
                                  2. Nadie es impostor pero todos tienen palabras diferentes
                                  <br />
                                  3. Nadie es impostor pero todos comparten la misma palabra
                                </span>
                              </p>
                              <p className="flex items-start gap-2">
                                <DoodleIcon icon={Target} size={20} className="stroke-[2.5] mt-0.5 shrink-0" uniqueId={`chaos-win-${modeKey}`} />
                                <span><strong>Cómo ganar:</strong> Igual que el modo clásico, con la particularidad de que cada tanto TODOS DICEN INCOHERENCIAS Y NADIE ENTIENDE NADA!</span>
                              </p>
                              <p className="flex items-start gap-2">
                                <DoodleIcon icon={Lightbulb} size={20} className="stroke-[2.5] mt-0.5 shrink-0" uniqueId={`chaos-strategy-${modeKey}`} />
                                <span><strong>Estrategia:</strong> Mantén la calma y observa las inconsistencias. En el modo locura, las dinámicas cambian completamente, así que adapta tu estrategia según el escenario que creas que estáactivado.</span>
                              </p>
                            </>
                          )}

                          {modeKey === "random" && (
                            <>
                              <p className="flex items-start gap-2">
                                <DoodleIcon icon={Users} size={20} className="stroke-[2.5] mt-0.5 shrink-0" uniqueId={`random-how-${modeKey}`} />
                                <span><strong>Cómo se juega:</strong> El sistema elige aleatoriamente entre Clásico, Perdido, Bufón y Locura. Ni el organizador ni los jugadores saben qué modo está activo hasta que comienza el juego.</span>
                              </p>
                              <p className="flex items-start gap-2">
                                <DoodleIcon icon={Target} size={20} className="stroke-[2.5] mt-0.5 shrink-0" uniqueId={`random-win-${modeKey}`} />
                                <span><strong>Cómo ganar:</strong> Depende del modo elegido aleatoriamente. ¡Descubre las reglas mientras juegas!</span>
                              </p>
                              <p className="flex items-start gap-2">
                                <DoodleIcon icon={Lightbulb} size={20} className="stroke-[2.5] mt-0.5 shrink-0" uniqueId={`random-strategy-${modeKey}`} />
                                <span><strong>Estrategia:</strong> Mantén la mente abierta y observa atentamente. Cualquier cosa puede pasar en el modo aleatorio.</span>
                              </p>
                            </>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="shrink-0 pt-4 border-t border-border/50 mt-4">
                  <Button onClick={() => setShowGameModesInfo(false)} className="w-full" size="lg">
                    ¡Entendido!
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Modal de instrucciones para iOS */}
        {showIOSInstructions && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <Card className="w-full max-w-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-title font-bold text-foreground flex items-center gap-2">
                    <DoodleIcon icon={Smartphone} size={24} thick uniqueId="ios-modal" />
                    Instalar en iPhone/iPad
                  </h3>
                  <Button variant="ghost" size="icon" onClick={() => setShowIOSInstructions(false)} aria-label="Cerrar instrucciones de instalación">
                    <X className="h-5 w-5" />
                  </Button>
                </div>
                <div className="space-y-4 text-sm text-muted-foreground">
                  <div className="flex items-start gap-3">
                    <span className="shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">1</span>
                    <p>Toca el botón <Share className="inline h-4 w-4 mx-1" /> <strong>Compartir</strong> en la barra de Safari</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">2</span>
                    <p>Desliza hacia abajo y toca <strong>"Agregar a pantalla de inicio"</strong></p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">3</span>
                    <p>Toca <strong>"Agregar"</strong> y ¡listo!</p>
                  </div>
                </div>
                <Button onClick={() => setShowIOSInstructions(false)} className="w-full mt-6">
                  ¡Entendido!
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Modal de información sobre el juego */}
        {showInfoPopup && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
            <Card className="w-full max-w-2xl max-h-[90vh] flex flex-col">
              <CardContent className="p-4 md:p-6 flex flex-col flex-1 min-h-0 overflow-hidden">
                <div className="flex items-center justify-between mb-4 shrink-0">
                  <h3 className="text-xl md:text-2xl font-title font-bold text-foreground flex items-center gap-2">
                    <DoodleIcon icon={HelpCircle} size={28} thick className="animate-[bounce-soft_2s_ease-in-out_infinite]" uniqueId="info-popup-header" />
                    Sobre El Impostor
                  </h3>
                  <Button variant="ghost" size="icon" onClick={() => setShowInfoPopup(false)} aria-label="Cerrar información del juego">
                    <X className="h-5 w-5" />
                  </Button>
                </div>
                
                <div className="flex-1 overflow-y-auto pr-2 -mr-2 min-h-0">
                  <div className="space-y-4 text-left">
                    <div>
                      <h2 className="text-lg font-title font-bold text-foreground mb-2">¿Qué es el juego del Impostor?</h2>
                      <p className="text-sm text-foreground mb-3">
                        El Impostor es un juego de fiesta gratis donde todos los jugadores reciben una palabra secreta, excepto uno: el impostor.
                        El impostor debe descubrir cuál es la palabra sin ser descubierto, mientras los demás intentan identificarlo.
                        Es similar a Among Us pero con palabras, perfecto para grupos de amigos, familia y reuniones.
                      </p>
                    </div>

                    {/* Sección de apoyo/donación */}
                    <div className="bg-orange-50 dark:bg-orange-950/20 p-4 rounded-[20px_8px_20px_8px/8px_20px_8px_20px] border-2 border-orange-200 dark:border-orange-800/50">
                      <h3 className="text-lg font-title font-bold text-foreground mb-2 flex items-center gap-2">
                        <Heart className="h-5 w-5 text-red-500" />
                        ¿Te gusta el juego?
                      </h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        El Impostor es completamente gratuito. Si quieres apoyar el desarrollo y mantenerlo vivo,
                        ¡tu contribución es bienvenida!
                      </p>

                      {/* Opciones de donación */}
                      <div className="space-y-2 mb-3">
                        <p className="text-xs font-bold text-muted-foreground mb-2">Opciones de apoyo:</p>

                        {/* MercadoPago - Uruguay */}
                        <Button
                          variant="outline"
                          className="w-full gap-2 bg-blue-50 hover:bg-blue-100 border-blue-300 text-blue-700 hover:text-blue-800 dark:bg-blue-950/30 dark:hover:bg-blue-950/50 dark:border-blue-700 dark:text-blue-300 dark:hover:text-blue-200"
                          onClick={() => window.open('https://link.mercadopago.com.uy/pablocarvalhogimenez', '_blank')}
                        >
                          <CreditCard className="h-4 w-4" />
                          Donar con <b>MercadoPago</b> (UYU)
                        </Button>

                        {/* Buy Me a Coffee - Internacional */}
                        <div className="pt-2 border-t border-border/50">
                          <Button
                            variant="outline"
                            className="w-full gap-2 bg-orange-100 hover:bg-orange-200 border-orange-300 text-orange-800 hover:text-orange-900 dark:bg-orange-900/30 dark:hover:bg-orange-900/50 dark:border-orange-700 dark:text-orange-200 dark:hover:text-orange-100"
                            onClick={() => window.open('https://buymeacoffee.com/pablocarvalho', '_blank')}
                          >
                            <Coffee className="h-4 w-4" />
                            ¡Apóyame con un café!
                          </Button>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h2 className="text-lg font-title font-bold text-foreground mb-2">¿Cómo se juega al Impostor?</h2>
                      <p className="text-sm text-foreground mb-3">
                        Cada jugador mira su carta en secreto. Todos excepto el impostor ven la palabra secreta. 
                        Por turnos, cada jugador da una pista sobre la palabra sin decirla directamente. 
                        Después de las rondas, todos votan para descubrir quién es el impostor. 
                        Se necesitan mínimo 3 jugadores y es más divertido con grupos de 5 a 10 personas.
                      </p>
                    </div>
                    
                    <div>
                      <h2 className="text-lg font-title font-bold text-foreground mb-2">Características del juego</h2>
                      <p className="text-sm text-foreground mb-3">
                        Juego de deducción social completamente gratis, sin descargas necesarias. 
                        Disponible directamente en tu navegador, perfecto para fiestas de cumpleaños, reuniones familiares y momentos con amigos. 
                        Puedes crear tus propias categorías personalizadas o usar las predefinidas. 
                        Juego de palabras interactivo para grupos de 3 a 20 jugadores.
                      </p>
                      <p className="text-sm text-foreground">
                        ¿Buscas más juegos del creador? El Impostor es similar a otros juegos de deducción como
                        <a href="https://www.roblox.com/games/6284583030/Among-Us" target="_blank" rel="noopener noreferrer" className="text-primary font-bold hover:underline mx-1">Among Us</a>
                        pero con palabras. Si te gusta Wordle, también puedes probar
                        <a href="https://www.wordleinfinito.com" target="_blank" rel="noopener noreferrer" className="text-primary font-bold hover:underline mx-1">Wordle Infinito</a>,
                        otro de mis juegos. Esta web fue creada con ♥ por:
                        <a href="https://pablocarvalho.dev" target="_blank" rel="noopener noreferrer" className="text-primary font-bold hover:underline ml-1">Pablo Carvalho</a>.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="shrink-0 pt-4 border-t border-border/50 mt-4">
                  <Button onClick={() => setShowInfoPopup(false)} className="w-full" size="lg">
                    ¡Entendido!
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
        
        <Card className="w-full max-w-2xl relative z-10 flex flex-col max-h-[90vh]">
          <CardContent className="p-4 md:p-6 flex flex-col flex-1 min-h-0">
            <div className="flex justify-between items-center mb-2 shrink-0 gap-2">
              {/* Botón de instalación PWA - Solo para iOS */}
              {!isStandalone && isIOS ? (
                <Button onClick={handleInstallClick} size="sm" className="gap-2 bg-primary hover:bg-primary/90 text-primary-foreground shadow-[3px_3px_0_0_var(--border)] border-2 border-foreground/20">
                  <DoodleIcon icon={Download} size={18} className="stroke-[2.5]" uniqueId="download-btn" />
                  Descargar App
                </Button>
              ) : <div />}
              <Button variant="ghost" size="sm" onClick={openThemeSettings} className="gap-2">
                <Palette className="h-4 w-4" />
                Tema
              </Button>
            </div>

            <div className="text-center mb-4 shrink-0 relative">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  setShowInfoPopup(true)
                  trackInfoPopupView()
                }}
                className="absolute top-0 right-0 h-8 w-8 rounded-full bg-muted hover:bg-primary/20 border-2 border-border hover:border-primary/50 transition-all shadow-md"
                aria-label="Información sobre el juego"
              >
                <HelpCircle className="h-4 w-4 text-muted-foreground hover:text-primary" />
              </Button>
              <div className="flex justify-center mb-2">
                <ImpostorIcon size={48} className="animate-[bounce-soft_2s_ease-in-out_infinite]" uniqueId="categories-title" />
              </div>
              <h2 className="text-3xl md:text-4xl font-title font-bold text-primary mb-2">El Impostor <span className="sr-only">- Juego de Fiesta Gratis</span></h2>

              {/* Selector de Modo Compacto */}
              <div className="mb-3">
                <div className="flex items-center justify-center gap-1 mb-2">
                  <span className="text-xs text-muted-foreground font-medium">Modo de Juego</span>
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    onClick={() => setShowGameModesInfo(true)}
                    className="h-4 w-4 rounded-full bg-muted/50 hover:bg-primary/20"
                    aria-label="Información sobre modos de juego"
                  >
                    <HelpCircle className="h-3 w-3 text-muted-foreground hover:text-primary" />
                  </Button>
                </div>
                <div className="flex flex-col gap-1">
                  {/* Primera fila: 3 modos */}
                  <div className="flex justify-center gap-1 px-1">
                    {(['classic', 'lost', 'jester'] as GameMode[]).map((modeKey) => {
                      const modeConfig = GAME_MODES[modeKey]
                      const isSelected = selectedGameMode === modeKey
                      return (
                        <button
                          key={modeKey}
                          onClick={() => setSelectedGameMode(modeKey)}
                          className={`flex items-center gap-1 px-1.5 py-1 rounded-full text-xs transition-all duration-200 border whitespace-nowrap ${
                            isSelected
                              ? "bg-primary text-primary-foreground border-primary-foreground/30"
                              : "bg-muted text-muted-foreground border-border hover:border-primary/50 hover:text-primary"
                          }`}
                        >
                          <DoodleIcon
                            icon={modeConfig.icon}
                            size={12}
                            className={`stroke-[2.5] ${isSelected ? 'text-primary-foreground' : 'text-muted-foreground'}`}
                            uniqueId={`mode-compact-${modeKey}`}
                          />
                          <span className="font-medium">{modeConfig.name}</span>
                          {isSelected && (
                            <div className="rounded-full p-0.5 animate-[bounce-soft_1s_ease-in-out_infinite]">
                              <Check className="h-2 w-2 text-primary-foreground" />
                            </div>
                          )}
                        </button>
                      )
                    })}
                  </div>
                  {/* Segunda fila: 2 modos */}
                  <div className="flex justify-center gap-1 px-1">
                    {(['chaos', 'random'] as GameMode[]).map((modeKey) => {
                      const modeConfig = GAME_MODES[modeKey]
                      const isSelected = selectedGameMode === modeKey
                      return (
                        <button
                          key={modeKey}
                          onClick={() => setSelectedGameMode(modeKey)}
                          className={`flex items-center gap-1 px-1.5 py-1 rounded-full text-xs transition-all duration-200 border whitespace-nowrap ${
                            isSelected
                              ? "bg-primary text-primary-foreground border-primary-foreground/30"
                              : "bg-muted text-muted-foreground border-border hover:border-primary/50 hover:text-primary"
                          }`}
                        >
                          <DoodleIcon
                            icon={modeConfig.icon}
                            size={12}
                            className={`stroke-[2.5] ${isSelected ? 'text-primary-foreground' : 'text-muted-foreground'}`}
                            uniqueId={`mode-compact-${modeKey}`}
                          />
                          <span className="font-medium">{modeConfig.name}</span>
                          {isSelected && (
                            <div className="rounded-full p-0.5 animate-[bounce-soft_1s_ease-in-out_infinite]">
                              <Check className="h-2 w-2 text-primary-foreground" />
                            </div>
                          )}
                        </button>
                      )
                    })}
                  </div>
                </div>
              </div>

              <p className="text-muted-foreground text-sm md:text-base flex items-center justify-center gap-2">
                ¡Elige las categorías para jugar!
              </p>
            </div>

            {/* Contenido scrolleable */}
            <div className="flex-1 overflow-y-auto overflow-x-hidden pr-2 -mr-2 min-h-0">
              {/* Categorías Default */}
              <div className="mb-4 overflow-hidden">
                <h3 className="text-lg font-title font-bold text-foreground mb-2 flex items-center gap-2">
                  <DoodleIcon icon={Package} size={20} className="stroke-[2.5]" uniqueId="predefined-header" />
                  Categorías Predefinidas
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 px-1">
                  {Object.keys(DEFAULT_CATEGORIES).map((category, index) => {
                    const isSelected = selectedCategories.includes(category)
                    const categoryIcons = [Globe, CircleDot, Gamepad2, PawPrint, Pizza, Star, Film, Wrench, Briefcase, Smartphone, Car, Rainbow]
                    const CategoryIcon = categoryIcons[index % categoryIcons.length]
                    return (
                      <button
                        key={category}
                        onClick={() => toggleCategory(category)}
                        className={`cursor-pointer relative p-2.5 text-left transition-all duration-200 ${
                          isSelected
                            ? "rounded-[100px_10px_100px_10px/10px_100px_10px_100px] bg-primary text-primary-foreground border-[3px] border-primary-foreground/30 md:shadow-[4px_4px_0_0_rgba(0,0,0,0.3)] md:translate-x-[-2px] md:translate-y-[-2px] -rotate-1"
                            : "rounded-[80px_8px_80px_8px/8px_80px_8px_80px] bg-muted border-2 border-border hover:border-primary/50 md:hover:translate-x-[-2px] md:hover:translate-y-[-2px] md:hover:shadow-[3px_3px_0_0_var(--border)]"
                        }`}
                        style={{ transform: isSelected ? `rotate(${-1 + (index % 3) * 0.5}deg)` : `rotate(${(index % 3 - 1) * 0.3}deg)` }}
                      >
                        <DoodleIcon icon={CategoryIcon} size={16} className="inline-block mr-1.5 stroke-[2.5]" uniqueId={`category-${category}-${index}`} />
                        <span className="font-bold text-xs">{category}</span>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Categorías Personalizadas */}
              {Object.keys(customCategories).length > 0 && (
                <div className="mb-4 overflow-hidden">
                  <h3 className="text-lg font-title font-bold text-foreground mb-2 flex items-center gap-2">
                    <DoodleIcon icon={SparklesIcon} size={20} className="stroke-[2.5]" uniqueId="custom-header" />
                    Tus Categorías
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2 px-1">
                    {Object.entries(customCategories).map(([categoryName, words], index) => {
                      const isSelected = selectedCategories.includes(categoryName)
                      return (
                        <div key={categoryName} className="relative">
                          <button
                            onClick={() => toggleCategory(categoryName)}
                            className={`relative w-full p-2.5 text-left transition-all duration-200 ${
                              isSelected
                                ? "rounded-[100px_10px_100px_10px/10px_100px_10px_100px] bg-primary text-primary-foreground border-[3px] border-primary-foreground/30 md:shadow-[4px_4px_0_0_rgba(0,0,0,0.3)] -rotate-1"
                                : "rounded-[80px_8px_80px_8px/8px_80px_8px_80px] bg-muted border-2 border-border hover:border-primary/50 md:hover:translate-x-[-2px] md:hover:translate-y-[-2px] md:hover:shadow-[3px_3px_0_0_var(--border)]"
                            }`}
                            style={{ transform: `rotate(${(index % 3 - 1) * 0.5}deg)` }}
                          >
                            <div className="flex flex-col">
                              <span className="font-bold text-xs flex items-center gap-1">
                                <DoodleIcon icon={Star} size={12} className="stroke-[2.5]" uniqueId={`custom-cat-${categoryName}-${index}`} />
                                {categoryName}
                              </span>
                              <span className={`text-[10px] mt-0.5 ${isSelected ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>
                                {words.length} palabras
                              </span>
                            </div>
                          </button>
                          <div className="absolute -top-1.5 -right-1.5 flex gap-1 z-10">
                            <Button
                              variant="ghost"
                              size="icon-sm"
                              onClick={(e) => {
                                e.stopPropagation()
                                openEditCustomCategory(categoryName)
                              }}
                              className="h-6 w-6 bg-secondary text-destructive-foreground hover:bg-secondary/90 rounded-full shadow-md"
                              aria-label={`Editar categoría ${categoryName}`}
                            >
                              <Edit className="h-2.5 w-2.5" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon-sm"
                              onClick={(e) => {
                                e.stopPropagation()
                                deleteCustomCategory(categoryName)
                              }}
                              className="h-6 w-6 bg-destructive text-destructive-foreground hover:bg-destructive/90 rounded-full shadow-md"
                              aria-label={`Eliminar categoría ${categoryName}`}
                            >
                              <X className="h-2.5 w-2.5" />
                            </Button>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}

              {/* Crear Nueva Categoría Personalizada */}
              <div className="bg-muted/30 p-4 rounded-[25px_10px_25px_10px/10px_25px_10px_25px] border-[3px] border-dashed border-border text-center mb-4 hover:border-primary/50 transition-all">
                <div className="flex justify-center mb-2">
                  <DoodleIcon icon={Palette} size={32} thick className="animate-[wiggle_2s_ease-in-out_infinite]" uniqueId="create-category" />
                </div>
                <h3 className="text-base font-title font-bold text-foreground mb-1">
                  ¡Crea tu propia categoría!
                </h3>
                <p className="text-xs text-muted-foreground mb-3">
                  Agrega palabras personalizadas o usa la IA
                </p>
                <Button onClick={openCreateCustomCategory} className="gap-2" size="sm">
                  <Plus className="h-4 w-4" />
                  Crear Categoría
                </Button>
              </div>
            </div>

            {/* Footer fijo con info y CTA */}
            <div className="shrink-0 pt-4 border-t border-border/50">
              <div className="text-center mb-4">
                <p className={`text-xs py-1.5 px-3 rounded-full flex items-center gap-2 justify-center ${selectedCategories.length === 0 ? 'bg-muted/50' : 'bg-primary/20'}`}>
                  {selectedCategories.length === 0 ? (
                    <>
                      <DoodleIcon icon={Gamepad} size={14} className="stroke-[2.5]" uniqueId="all-categories" />
                      Se usarán todas las categorías
                    </>
                  ) : (
                    <>
                      <Check className="h-3 w-3" />
                      {selectedCategories.length} categoría{selectedCategories.length > 1 ? "s" : ""} seleccionada{selectedCategories.length > 1 ? "s" : ""}
                    </>
                  )}
                </p>
              </div>


              <Button
                onClick={() => {
                  setGameState("setup")
                  trackScreenView('setup')
                }}
                className="w-full"
                size="lg"
              >
                ¡Continuar! →
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (gameState === "setup") {
    const maxImpostors = Math.max(1, players.length - (actualGameMode === "lost" || actualGameMode === "jester" ? 2 : 1))

    return (
      <div
        className="min-h-screen flex items-center justify-center p-4 bg-background relative overflow-hidden"
        style={{ contain: 'layout style paint' }}
      >
        <DoodleStars />
        <DoodleCircles />
        <Card className="w-full max-w-lg relative z-10 flex flex-col max-h-[90vh]">
          <CardContent className="p-4 md:p-6 flex flex-col flex-1 min-h-0">
            <div className="flex justify-end mb-2 shrink-0">
              <Button variant="ghost" size="sm" onClick={openThemeSettings} className="gap-2">
                <Palette className="h-4 w-4" />
                Tema
              </Button>
            </div>

            <div className="text-center mb-4 shrink-0">
              <div className="flex justify-center mb-2">
                <ImpostorIcon size={48} className="animate-[shake_0.5s_ease-in-out_infinite]" uniqueId="setup-title" />
              </div>
              <h2 className="text-3xl md:text-4xl font-title font-bold text-primary mb-1">El Impostor</h2>
              <p className="text-muted-foreground text-sm md:text-base flex items-center justify-center gap-2">
                ¡Agrega los jugadores! (mínimo 3)
                <DoodleIcon icon={Users} size={18} className="stroke-[2.5]" uniqueId="setup-subtitle" />
              </p>
            </div>

            {/* Contenido scrolleable */}
            <div className="flex-1 overflow-y-auto overflow-x-hidden pr-2 -mr-2 min-h-0">
              <div className="mb-4 p-3 bg-muted/50 rounded-[20px_8px_20px_8px/8px_20px_8px_20px] border-2 border-border">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-foreground flex items-center gap-2">
                    <DoodleIcon icon={FolderOpen} size={16} className="stroke-[2.5]" uniqueId="setup-categories" />
                    Categorías:
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setGameState("categories")}
                    className="h-7 px-2 text-xs gap-1"
                  >
                    <PenTool className="h-3 w-3" />
                    Cambiar
                  </Button>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {selectedCategories.length === 0 ? (
                    <span className="text-xs text-muted-foreground italic bg-background/50 px-2 py-1 rounded-full flex items-center gap-1">
                      <DoodleIcon icon={Gamepad} size={12} className="stroke-[2.5]" uniqueId="setup-all-categories" />
                      Todas las categorías
                    </span>
                  ) : (
                    selectedCategories.map((cat) => (
                      <span key={cat} className="text-xs bg-primary/20 text-primary px-2 py-1 rounded-full font-bold">
                        {cat}
                      </span>
                    ))
                  )}
                </div>
              </div>

              {/* Sección principal: Agregar Jugadores */}
              <div className="mb-4 p-4 bg-primary/10 rounded-[25px_10px_25px_10px/10px_25px_10px_25px] border-[3px] border-primary/30">
                <label className="text-base font-title font-bold text-foreground mb-3 flex items-center gap-2">
                  <DoodleIcon icon={Users} size={20} thick className="stroke-[2.5]" uniqueId="players-label" />
                  Agregar Jugadores
                </label>
                
                <div className="flex flex-col sm:flex-row gap-2 mb-3 overflow-hidden px-1 items-center">
                  <div className="flex-1 min-w-0">
                    <Input
                      id="player-name-input"
                      name="player-name"
                      placeholder="Nombre del jugador..."
                      value={newPlayerName}
                      onChange={(e) => setNewPlayerName(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && addPlayer()}
                      className="text-base w-full h-11"
                    />
                  </div>
                  <Button onClick={addPlayer} className="gap-2 px-6 shrink-0" size="lg">
                    <Plus className="h-5 w-5" />
                    Agregar
                  </Button>
                </div>

                {players.length > 0 && (
                  <div className="space-y-2 max-h-64 overflow-y-auto p-2">
                    {players.map((player, index) => (
                      <div
                        key={`${player}-${index}`}
                        className="flex items-center justify-between p-3 bg-muted rounded-[15px_5px_15px_5px/5px_15px_5px_15px] border-2 border-border group hover:border-primary/50 transition-all duration-300 ease-in-out"
                        style={{
                          transform: `rotate(${(index % 3 - 1) * 0.3}deg)`,
                          animation: 'slideIn 0.3s ease-out'
                        }}
                      >
                        <div className="flex items-center gap-2">
                          <div className="flex flex-col gap-0.5">
                            <Button
                              variant="ghost"
                              size="icon-sm"
                              onClick={() => movePlayerUp(index)}
                              disabled={index === 0}
                              className="opacity-50 group-hover:opacity-100 text-muted-foreground hover:text-primary h-6 w-6 transition-all duration-200 disabled:opacity-25 p-0"
                              aria-label="Mover arriba"
                            >
                              <ChevronUp className="h-3 w-3" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon-sm"
                              onClick={() => movePlayerDown(index)}
                              disabled={index === players.length - 1}
                              className="opacity-50 group-hover:opacity-100 text-muted-foreground hover:text-primary h-6 w-6 transition-all duration-200 disabled:opacity-25 p-0"
                              aria-label="Mover abajo"
                            >
                              <ChevronDown className="h-3 w-3" />
                            </Button>
                          </div>
                          <span className="font-bold text-base text-foreground flex items-center gap-2">
                            <DoodleIcon icon={Users} size={18} className="stroke-[2.5]" uniqueId={`player-${index}-${player}`} />
                            {player}
                          </span>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          onClick={() => removePlayer(index)}
                          className="opacity-50 group-hover:opacity-100 text-muted-foreground hover:text-destructive h-7 w-7 transition-all duration-200"
                          aria-label="Eliminar jugador"
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Sección de Modo Seleccionado */}
              <div className="mb-4 p-3 bg-primary/10 rounded-[20px_8px_20px_8px/8px_20px_8px_20px] border-[3px] border-primary/30">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <DoodleIcon icon={GAME_MODES[selectedGameMode].icon} size={20} thick className="stroke-[2.5]" uniqueId="setup-mode-icon" />
                    <span className="text-sm font-title font-bold text-foreground">
                      Modo: {GAME_MODES[selectedGameMode].name}
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setGameState("categories")}
                    className="h-7 px-2 text-xs gap-1"
                  >
                    <PenTool className="h-3 w-3" />
                    Cambiar
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  {GAME_MODES[selectedGameMode].description}
                </p>
              </div>

              {/* Sección secundaria: Configurar Impostores (más pequeña) */}
              <div className="mb-4 p-2.5 bg-muted/30 rounded-[15px_5px_15px_5px/5px_15px_5px_15px] border-2 border-border/50">
                <label className="text-xs font-bold text-muted-foreground flex items-center gap-1.5 mb-2">
                  <DoodleIcon icon={UserSearch} size={14} className="stroke-[2.5]" uniqueId="impostors-label" />
                  Impostores:
                </label>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => {
                      const newCount = Math.max(1, numImpostors - 1)
                      setNumImpostors(newCount)
                      trackImpostorCountChange({ newCount, playerCount: players.length })
                    }}
                    disabled={numImpostors <= 1}
                    className="h-8 w-8"
                    aria-label="Disminuir número de impostores"
                  >
                    <span className="text-lg">−</span>
                  </Button>
                  <div className="flex-1 text-center">
                    <span className="text-2xl font-title font-bold text-primary">{numImpostors}</span>
                  </div>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => {
                      const newCount = Math.min(maxImpostors, numImpostors + 1)
                      setNumImpostors(newCount)
                      trackImpostorCountChange({ newCount, playerCount: players.length })
                    }}
                    disabled={numImpostors >= maxImpostors}
                    className="h-8 w-8"
                    aria-label="Aumentar número de impostores"
                  >
                    <span className="text-lg">+</span>
                  </Button>
                </div>
                {players.length >= 3 && (
                  <p className="text-[10px] text-center text-muted-foreground mt-1.5 flex items-center justify-center gap-1">
                    Máx: {maxImpostors} impostor{maxImpostors > 1 ? "es" : ""}
                  </p>
                )}
              </div>
            </div>

            {/* Footer fijo con CTA */}
            <div className="shrink-0 pt-4 border-t border-border/50">
              {players.length < GAME_MODES[selectedGameMode].minPlayers && players.length > 0 && (
                <p className="text-center text-xs text-destructive mb-3 animate-[shake_0.5s_ease-in-out] flex items-center justify-center gap-1">
                  Necesitas al menos {GAME_MODES[selectedGameMode].minPlayers} jugadores para este modo
                </p>
              )}
              <Button
                onClick={startGame}
                disabled={players.length < GAME_MODES[selectedGameMode].minPlayers}
                className="w-full gap-2"
                size="lg"
              >
                <DoodleIcon icon={Gamepad} size={20} className="stroke-[2.5]" uniqueId="start-game-btn" />
                ¡Comenzar Juego!
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (gameState === "playing") {
    return (
      <div
        className="min-h-screen flex items-center justify-center p-4 bg-background relative overflow-hidden"
        style={{ contain: 'layout style paint' }}
      >
        <DoodleStars />
        <DoodleCircles />
        <div className="w-full max-w-md flex flex-col items-center relative z-10">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-muted px-5 py-2 rounded-full border-2 border-border mb-4">
              <DoodleIcon icon={Users} size={20} className="stroke-[2.5] text-muted-foreground" uniqueId={`player-indicator-${currentPlayer}`} />
              <span className="text-muted-foreground font-bold">
                Jugador {currentPlayer + 1} de {players.length}
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
              <div className="flip-card-front absolute w-full h-full rounded-[20px] border-4 border-foreground/80 bg-card shadow-[8px_8px_0_0_var(--primary)] cursor-pointer hover:shadow-[10px_10px_0_0_var(--primary)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all select-none overflow-hidden">
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
              <div className="flip-card-back absolute w-full h-full rounded-[20px] border-4 border-foreground/80 bg-card shadow-[8px_8px_0_0_var(--primary)] select-none overflow-hidden">
                <div className="absolute inset-4 border-2 border-dashed border-muted rounded-xl" />
                <div className="h-full flex flex-col items-center justify-center p-8 relative">
                  {(() => {
                    const playerRole = getCurrentPlayerRole()
                    const playerWord = getCurrentPlayerWord()

                    if (playerRole === "impostor") {
                      return (
                        <>
                          <div className="mb-4 animate-[shake_0.3s_ease-in-out_infinite]">
                            <DoodleIcon icon={UserSearch} size={72} thick uniqueId="card-back-impostor" />
                          </div>
                          <h3 className="text-4xl font-title font-bold text-destructive mb-4">¡IMPOSTOR!</h3>
                          <p className="text-muted-foreground text-center text-sm flex items-center justify-center gap-1">
                            Descubre la palabra sin ser descubierto
                          </p>
                        </>
                      )
                    } else if (playerRole === "lost") {
                      return (
                        <>
                          <div className="mb-4 animate-[twinkle_2s_ease-in-out_infinite]">
                            <DoodleIcon icon={Target} size={72} thick uniqueId="card-back-lost" />
                          </div>
                          <h3 className="text-3xl md:text-4xl font-title font-bold text-secondary mb-4 text-center">{playerWord}</h3>
                          <p className="text-muted-foreground text-center text-sm flex items-center justify-center gap-1">
                            <MessageSquare className="h-4 w-4" />
                            Describe la palabra sin decirla
                          </p>
                        </>
                      )
                    } else if (playerRole === "jester") {
                      return (
                        <>
                          <div className="mb-4 animate-[twinkle_2s_ease-in-out_infinite]">
                            <DoodleIcon icon={Crown} size={72} thick uniqueId="card-back-jester" />
                          </div>
                          <h3 className="text-4xl font-title font-bold text-purple-500 mb-2 text-center">¡ERES EL BUFÓN!</h3>
                          <h4 className="text-3xl md:text-4xl font-title font-bold text-secondary mb-4 text-center">{selectedWord}</h4>
                          <div className="text-center">
                            <p className="text-muted-foreground text-center text-sm font-bold mb-1">
                              TU OBJETIVO SECRETO:
                            </p>
                            <p className="text-destructive text-center text-base font-bold mb-2">
                              ¡GANAS SI TE ELIMINAN!
                            </p>
                            <p className="text-muted-foreground text-center text-xs">
                              Convence al grupo de que te vote
                            </p>
                          </div>
                          <p className="text-muted-foreground text-center text-sm flex items-center justify-center gap-1 mt-4">
                            <MessageSquare className="h-4 w-4" />
                            Describe la palabra sin decirla
                          </p>
                        </>
                      )
                    } else {
                      return (
                        <>
                          <div className="mb-4 animate-[twinkle_2s_ease-in-out_infinite]">
                            <DoodleIcon icon={Target} size={72} thick uniqueId="card-back-word" />
                          </div>
                          <h3 className="text-3xl md:text-4xl font-title font-bold text-secondary mb-4 text-center">{playerWord}</h3>
                          <p className="text-muted-foreground text-center text-sm flex items-center justify-center gap-1">
                            <MessageSquare className="h-4 w-4" />
                            Describe la palabra sin decirla
                          </p>
                        </>
                      )
                    }
                  })()}
                </div>
                {/* Corner decorations */}
                <span className="absolute top-3 left-3 text-2xl opacity-50">★</span>
                <span className="absolute top-3 right-3 text-2xl opacity-50">★</span>
                <span className="absolute bottom-3 left-3 text-2xl opacity-50">★</span>
                <span className="absolute bottom-3 right-3 text-2xl opacity-50">★</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full max-w-xs sm:max-w-sm">
            <Button
              onClick={previousPlayer}
              disabled={currentPlayer === 0}
              variant="outline"
              size="icon"
              className="shrink-0"
              aria-label="Jugador anterior"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            <Button
              onClick={nextPlayer}
              disabled={!playersSeenCard[currentPlayer] && currentPlayer < players.length - 1}
              className="flex-1 gap-2"
              size="lg"
            >
              {currentPlayer < players.length - 1 ? (
                <>
                  Continuar
                  <ChevronRight className="h-4 w-4" />
                </>
              ) : (
                <>
                  <Check className="h-4 w-4" />
                  Finalizar
                </>
              )}
            </Button>
          </div>

          {!playersSeenCard[currentPlayer] && currentPlayer < players.length - 1 && (
            <p className="text-center text-xs text-muted-foreground mt-2">
              Debes dar vuelta la carta primero
            </p>
          )}
        </div>
      </div>
    )
  }

  // Finished state
  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 bg-background relative overflow-hidden"
      style={{ contain: 'layout style paint' }}
    >
      <DoodleStars />
      <DoodleCircles />
      <Card className="w-full max-w-lg relative z-10">
        <CardContent className="p-8 text-center">
          <div className="flex justify-center mb-6 animate-[bounce-soft_1s_ease-in-out_infinite]">
            <DoodleIcon icon={Gamepad} size={72} thick uniqueId="finished-icon" />
          </div>
          <h2 className="text-4xl font-title font-bold text-primary mb-4">¡A Jugar!</h2>

          {/* Información específica del modo de juego */}
          <div className="mb-6 p-4 bg-muted/50 rounded-[20px_8px_20px_8px/8px_20px_8px_20px] border-2 border-border">
            <div className="text-center mb-4">
              <h3 className="text-lg font-title font-bold text-foreground flex items-center justify-center gap-2">
                <DoodleIcon icon={GAME_MODES[selectedGameMode].icon} size={20} className="stroke-[2.5]" uniqueId="mode-finished" />
                Modo: {GAME_MODES[selectedGameMode].name}{selectedGameMode === "random" ? " 🤫" : ""}
              </h3>
            </div>

            {actualGameMode === "classic" && selectedGameMode !== "random" && (
              <div className="space-y-2 text-sm text-muted-foreground">
                <p className="flex justify-center gap-2">
                  <DoodleIcon icon={UserSearch} size={16} className="stroke-[2.5] text-destructive" uniqueId="classic-impostor" />
                  <strong className="text-destructive">{impostorIndices.length} Impostor{impostorIndices.length > 1 ? "es" : ""}</strong>
                  debe{impostorIndices.length > 1 ? "n" : ""} descubrir la palabra
                </p>
                <p>• Los demás jugadores comparten la palabra secreta</p>
                <p>• ¡Gana el equipo que identifique correctamente!</p>
              </div>
            )}

            {actualGameMode === "lost" && selectedGameMode !== "random" && (
              <div className="space-y-2 text-sm text-muted-foreground">
                <p className="flex justify-center gap-2">
                  <DoodleIcon icon={Compass} size={16} className="stroke-[2.5] text-orange-500" uniqueId="lost-player" />
                  <strong className="text-orange-500">Uno de los jugadores tiene una palabra diferente</strong>
                </p>
                <p className="flex justify-center gap-2">
                  <DoodleIcon icon={UserSearch} size={16} className="stroke-[2.5] text-destructive" uniqueId="lost-impostor" />
                  <strong className="text-destructive">{impostorIndices.length} Impostor{impostorIndices.length > 1 ? "es" : ""}</strong>
                  debe{impostorIndices.length > 1 ? "n" : ""} descubrir la palabra
                </p>
                <p>• ¡El Perdido no sabe que tiene palabra diferente!</p>
                <p>• ¡Gana el equipo que identifique correctamente!</p>
              </div>
            )}

            {actualGameMode === "jester" && selectedGameMode !== "random" && (
              <div className="space-y-2 text-sm text-muted-foreground">
                <p className="flex justify-center gap-2">
                  <DoodleIcon icon={Crown} size={16} className="stroke-[2.5] text-purple-500" uniqueId="jester-player" />
                  <strong className="text-purple-500">Uno de los jugadores es el Bufón</strong>
                </p>
                <p className="flex justify-center gap-2">
                  <DoodleIcon icon={UserSearch} size={16} className="stroke-[2.5] text-destructive" uniqueId="jester-impostor" />
                  <strong className="text-destructive">{impostorIndices.length} Impostor{impostorIndices.length > 1 ? "es" : ""}</strong>
                  debe{impostorIndices.length > 1 ? "n" : ""} descubrir la palabra
                </p>
                <p>• ¡El Bufón gana si es eliminado por el grupo!</p>
                <p>• Los demás deben identificar correctamente al impostor</p>
              </div>
            )}

            {actualGameMode === "chaos" && selectedGameMode !== "random" && (
              <div className="space-y-2 text-sm text-muted-foreground">
                {chaosAllImpostors ? (
                  <>
                    <p className="flex justify-center gap-2">
                      <DoodleIcon icon={Zap} size={16} className="stroke-[2.5] text-destructive" uniqueId="chaos-all-impostors" />
                      <strong className="text-destructive">¡MODO LOCURA ACTIVADO!</strong>
                    </p>
                    <p className="flex justify-center gap-2">
                      <DoodleIcon icon={UserSearch} size={16} className="stroke-[2.5] text-destructive" uniqueId="chaos-impostors" />
                      <strong className="text-destructive">¡TODOS son impostores!</strong>
                    </p>
                    <p>• Todos deben descubrir la palabra sin ser descubiertos</p>
                    <p>• ¡Cada uno por su cuenta!</p>
                  </>
                ) : chaosAllDifferentWords ? (
                  <>
                    <p className="flex justify-center gap-2">
                      <DoodleIcon icon={Zap} size={16} className="stroke-[2.5] text-secondary" uniqueId="chaos-all-different" />
                      <strong className="text-secondary">¡MODO LOCURA ACTIVADO!</strong>
                    </p>
                    <p className="flex justify-center gap-2">
                      <DoodleIcon icon={Target} size={16} className="stroke-[2.5] text-secondary" uniqueId="chaos-words" />
                      <strong className="text-secondary">¡TODOS tienen palabras diferentes!</strong>
                    </p>
                    <p>• Nadie es impostor, pero cada uno tiene una palabra única</p>
                    <p>• ¡Descubre quién tiene qué palabra!</p>
                  </>
                ) : chaosAllSameWord ? (
                  <>
                    <p className="flex justify-center gap-2">
                      <DoodleIcon icon={Zap} size={16} className="stroke-[2.5] text-green-500" uniqueId="chaos-all-same" />
                      <strong className="text-green-500">¡MODO LOCURA ACTIVADO!</strong>
                    </p>
                    <p className="flex justify-center gap-2">
                      <DoodleIcon icon={Target} size={16} className="stroke-[2.5] text-green-500" uniqueId="chaos-same-word" />
                      <strong className="text-green-500">¡NADIE es impostor, todos comparten la misma palabra!</strong>
                    </p>
                    <p>• Todos tienen la misma palabra secreta</p>
                    <p>• ¡Trabajen juntos para describirla!</p>
                  </>
                ) : (
                  <>
                    <p className="flex justify-center gap-2">
                      <DoodleIcon icon={UserSearch} size={16} className="stroke-[2.5] text-destructive" uniqueId="chaos-normal-impostor" />
                      <strong className="text-destructive">{impostorIndices.length} Impostor{impostorIndices.length > 1 ? "es" : ""}</strong>
                      debe{impostorIndices.length > 1 ? "n" : ""} descubrir la palabra
                    </p>
                    <p>• Los demás jugadores comparten la palabra secreta</p>
                    <p>• ¡Gana el equipo que identifique correctamente!</p>
                    <p className="text-xs italic mt-2">💡 El modo Locura puede activarse aleatoriamente</p>
                  </>
                )}
              </div>
            )}

            {selectedGameMode === "random" && (
              <div className="space-y-2 text-sm text-muted-foreground">
                <p className="flex justify-center gap-2">
                  <DoodleIcon icon={Shuffle} size={16} className="stroke-[2.5] text-purple-500" uniqueId="random-mode" />
                  <strong className="text-purple-500">Modo Aleatorio Activo</strong>
                </p>
                <p>• Se ha elegido aleatoriamente uno de los modos disponibles</p>
                <p>• ¡Descubre las reglas mientras juegas!</p>
                <p className="text-xs italic mt-2">🎲 El modo específico permanece secreto para todos</p>
              </div>
            )}
          </div>

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

      {/* SEO Content - Hidden from users but visible to search engines */}
      <div className="sr-only">
        <article>
          <h1>El Impostor - El Juego del Verano 2026</h1>

          <section>
            <h2>¿Qué es El Impostor?</h2>
            <p>
              El Impostor es el juego del verano 2026, un divertido juego de fiesta gratuito que combina elementos de deducción social con juegos de palabras.
              Inspirado en juegos populares como Among Us, El Impostor lleva la experiencia de encontrar al traidor a un formato completamente verbal,
              perfecto para reuniones familiares, fiestas de cumpleaños y encuentros con amigos.
            </p>

            <h3>Juego de Deducción Social para Grupos</h3>
            <p>
              Diseñado específicamente para grupos de 3 a 20 jugadores, El Impostor crea momentos inolvidables donde la comunicación y la observación
              son las claves para ganar. Un jugador es seleccionado aleatoriamente como el impostor, mientras que todos los demás comparten
              una palabra secreta común. El objetivo del impostor es descubrir cuál es esa palabra sin delatarse, mientras que los demás
              jugadores deben identificar quién es el impostor entre ellos.
            </p>
          </section>

          <section>
            <h2>¿Cómo Jugar al Impostor?</h2>
            <p>
              El juego del verano 2026 sigue reglas simples pero efectivas. Primero, todos los jugadores seleccionan las categorías de palabras
              que quieren usar. El juego incluye categorías predefinidas como geografía, deportes, comida, profesiones, películas, videojuegos
              y muchas más. También puedes crear tus propias categorías personalizadas con la ayuda de inteligencia artificial integrada.
            </p>

            <h3>Preparación del Juego</h3>
            <p>
              Una vez seleccionadas las categorías, el sistema elige aleatoriamente una palabra secreta de entre todas las disponibles.
              Todos los jugadores, excepto el impostor, ven esta palabra en sus dispositivos. El impostor ve únicamente que es el impostor,
              sin conocer la palabra secreta. El juego determina automáticamente cuántos impostores participan (1 por defecto, hasta 3
              en grupos grandes).
            </p>

            <h3>Rondas de Deducción</h3>
            <p>
              Por turnos, cada jugador da pistas sobre la palabra secreta sin decirla directamente. Los jugadores honestos dan pistas
              que ayuden a los demás a entender la palabra, mientras que el impostor debe dar pistas falsas o confusas para despistar
              al grupo. Después de que todos hayan hablado, se realiza una votación para eliminar al sospechoso de ser el impostor.
              Si el impostor es identificado correctamente, ganan los jugadores honestos. Si no, el impostor gana la ronda.
            </p>
          </section>

          <section>
            <h2>Características Principales</h2>

            <h3>Juego Completamente Gratuito</h3>
            <p>
              El Impostor es totalmente gratuito, sin compras dentro de la aplicación ni limitaciones. Juega tantas partidas como quieras,
              crea categorías personalizadas ilimitadas y disfruta de todas las funciones sin costo alguno. Solo necesitas un navegador web moderno.
            </p>

            <h3>Sin Descargas Necesarias</h3>
            <p>
              Accede al juego directamente desde tu navegador web. Compatible con ordenadores, tablets y teléfonos móviles.
              También disponible como aplicación web progresiva (PWA) que se puede instalar en dispositivos móviles para una experiencia nativa.
            </p>

            <h3>Categorías Personalizables</h3>
            <p>
              Más de 10 categorías predefinidas con cientos de palabras cada una, desde geografía y deportes hasta películas y profesiones.
              Crea tus propias categorías personalizadas con palabras específicas para tu grupo de amigos o temática de evento.
              La inteligencia artificial integrada te ayuda a generar palabras automáticamente para cualquier tema que imagines.
            </p>

            <h3>Juego Multijugador Local</h3>
            <p>
              Diseñado para jugar en el mismo espacio físico, El Impostor fomenta la interacción real entre jugadores. Perfecto para
              reuniones familiares, fiestas de oficina, cumpleaños y cualquier ocasión donde quieras conectar con las personas
              que te rodean de manera divertida y memorable.
            </p>
          </section>

          <section>
            <h2>Consejos para Jugar Mejor</h2>

            <h3>Para Jugadores Honestos</h3>
            <p>
              Da pistas claras pero no directas sobre la palabra. Por ejemplo, si la palabra es "elefante", podrías decir "es un animal grande
              con trompa" en lugar de decir directamente características obvias. Observa atentamente las pistas de los demás jugadores
              y busca inconsistencias que delaten al impostor.
            </p>

            <h3>Para el Impostor</h3>
            <p>
              El impostor debe dar pistas que suenen plausibles pero que no ayuden realmente al grupo. Imita el estilo de los demás jugadores
              y evita dar pistas demasiado vagas o demasiado específicas. Tu objetivo es confundir sin parecer sospechoso.
            </p>

            <h3>Estrategias Generales</h3>
            <p>
              Juega con grupos de 5-8 jugadores para el mejor equilibrio. En grupos más pequeños es más fácil identificar al impostor,
              mientras que en grupos muy grandes puede ser difícil seguir todas las pistas. Experimenta con diferentes categorías
              para mantener el juego fresco e interesante.
            </p>
          </section>

          <section>
            <h2>¿Por qué El Impostor es el Juego del Verano 2026?</h2>
            <p>
              En un mundo cada vez más digital, El Impostor trae de vuelta la alegría de los juegos de mesa tradicionales combinados
              con la innovación tecnológica. Es perfecto para el verano 2026 porque une a las personas en momentos de diversión compartida,
              fomenta la comunicación y crea recuerdos inolvidables. Ya sea en una reunión familiar, una fiesta con amigos o un encuentro
              casual, El Impostor garantiza risas y conexión real entre los participantes.
            </p>

            <p>
              Más allá de ser solo un juego, El Impostor es una herramienta para fortalecer vínculos sociales en la era digital.
              Mientras otros juegos nos mantienen aislados frente a pantallas, este juego nos reúne alrededor de una experiencia compartida,
              recordándonos la importancia de la interacción humana genuina.
            </p>
          </section>

          <section>
            <h2>Juegos Similares y Alternativas</h2>
            <p>
              Si te gusta El Impostor, también disfrutarás de juegos como Among Us, Mafia, Werewolf, o juegos de mesa como
              Coup, The Resistance o Deception: Murder in Hong Kong. Para juegos de palabras, también puedes probar
              Wordle Infinito, otro juego creado por el mismo desarrollador.
            </p>
          </section>
        </article>
      </div>
    </div>
  )
}
