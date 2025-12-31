"use client"

import { useEffect } from 'react'

// Lazy load Google Analytics para no bloquear el render inicial
export function GoogleAnalytics() {
  useEffect(() => {
    // Cargar GTM después de la hidratación para no bloquear LCP
    const loadGTM = () => {
      // Configurar gtag global
      window.dataLayer = window.dataLayer || [];
      function gtag(...args: any[]) {
        window.dataLayer.push(args);
      }

      // Configurar GTM
      gtag('js', new Date());
      gtag('config', 'G-6KWCZZKQMJ', {
        page_title: document.title,
        page_location: window.location.href,
      });

      // Cargar el script de GTM
      const script = document.createElement('script');
      script.src = 'https://www.googletagmanager.com/gtag/js?id=G-6KWCZZKQMJ';
      script.async = true;
      document.head.appendChild(script);
    };

    // Cargar GTM después de un pequeño delay para priorizar el contenido
    const timer = setTimeout(loadGTM, 100);

    return () => clearTimeout(timer);
  }, []);

  return null; // No renderizar nada, solo configurar
}

// Extender window para TypeScript
declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}

// Función personalizada de GA que usa gtag directamente
export function sendGAEvent(eventName: string, parameters?: Record<string, any>) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, parameters || {});
  }
}

// ==========================================
// EVENTOS DE PARTIDA
// ==========================================

// Cuando se inicia una nueva partida
export function trackGameStart(data: {
  playerCount: number
  impostorCount: number
  categoriesCount: number
  categories: string[]
  isCustomCategoryUsed: boolean
}) {
  sendGAEvent("game_start", {
    player_count: data.playerCount,
    impostor_count: data.impostorCount,
    categories_count: data.categoriesCount,
    categories: data.categories.slice(0, 5).join(", "), // Primeras 5 categorías
    has_custom_category: data.isCustomCategoryUsed,
  })
}

// Cuando termina una partida (todos vieron sus cartas)
export function trackGameComplete(data: {
  playerCount: number
  impostorCount: number
  selectedWord: string
}) {
  sendGAEvent("game_complete", {
    player_count: data.playerCount,
    impostor_count: data.impostorCount,
    word: data.selectedWord,
  })
}

// Cuando se reinicia/juega de nuevo
export function trackGameRestart() {
  sendGAEvent("game_restart")
}

// ==========================================
// EVENTOS DE CATEGORÍAS
// ==========================================

// Cuando se selecciona/deselecciona una categoría
export function trackCategoryToggle(data: {
  categoryName: string
  isSelected: boolean
  isCustom: boolean
}) {
  sendGAEvent("category_toggle", {
    category_name: data.categoryName,
    action: data.isSelected ? "select" : "deselect",
    is_custom: data.isCustom,
  })
}

// Cuando se crea una categoría personalizada
export function trackCustomCategoryCreate(data: {
  categoryName: string
  wordCount: number
  usedAI: boolean
}) {
  sendGAEvent("custom_category_create", {
    category_name: data.categoryName,
    word_count: data.wordCount,
    used_ai: data.usedAI,
  })
}

// Cuando se edita una categoría personalizada
export function trackCustomCategoryEdit(data: {
  categoryName: string
  wordCount: number
}) {
  sendGAEvent("custom_category_edit", {
    category_name: data.categoryName,
    word_count: data.wordCount,
  })
}

// Cuando se elimina una categoría personalizada
export function trackCustomCategoryDelete(categoryName: string) {
  sendGAEvent("custom_category_delete", {
    category_name: categoryName,
  })
}

// ==========================================
// EVENTOS DE IA
// ==========================================

// Cuando se genera palabras con IA
export function trackAIGeneration(data: {
  prompt: string
  wordCount: number
  success: boolean
}) {
  sendGAEvent("ai_word_generation", {
    prompt: data.prompt.substring(0, 100), // Limitar longitud
    word_count: data.wordCount,
    success: data.success,
  })
}

// ==========================================
// EVENTOS DE TEMA/UI
// ==========================================

// Cuando se cambia el tema de colores
export function trackThemeChange(data: {
  themeName: string
  previousTheme: string
}) {
  sendGAEvent("theme_change", {
    theme_name: data.themeName,
    previous_theme: data.previousTheme,
  })
}

// ==========================================
// EVENTOS DE PWA
// ==========================================

// Cuando se muestra el prompt de instalación
export function trackPWAInstallPromptShown() {
  sendGAEvent("pwa_install_prompt_shown")
}

// Cuando el usuario acepta instalar la PWA
export function trackPWAInstallAccepted() {
  sendGAEvent("pwa_install_accepted")
}

// Cuando el usuario rechaza instalar la PWA
export function trackPWAInstallDismissed() {
  sendGAEvent("pwa_install_dismissed")
}

// Cuando se muestran las instrucciones de iOS
export function trackIOSInstructionsShown() {
  sendGAEvent("ios_install_instructions_shown")
}

// ==========================================
// EVENTOS DE NAVEGACIÓN
// ==========================================

// Cuando el usuario ve la pantalla de información
export function trackInfoPopupView() {
  sendGAEvent("info_popup_view")
}

// Cuando cambia de sección/estado del juego
export function trackScreenView(screenName: string) {
  sendGAEvent("screen_view", {
    screen_name: screenName,
  })
}

// ==========================================
// EVENTOS DE JUGADORES
// ==========================================

// Cuando se agrega un jugador
export function trackPlayerAdd(playerCount: number) {
  sendGAEvent("player_add", {
    current_player_count: playerCount,
  })
}

// Cuando se ajusta el número de impostores
export function trackImpostorCountChange(data: {
  newCount: number
  playerCount: number
}) {
  sendGAEvent("impostor_count_change", {
    new_count: data.newCount,
    player_count: data.playerCount,
  })
}

// ==========================================
// EVENTOS DE ENGAGEMENT
// ==========================================

// Tiempo en pantalla (para medir engagement)
export function trackEngagement(data: {
  screenName: string
  durationSeconds: number
}) {
  sendGAEvent("user_engagement", {
    screen_name: data.screenName,
    engagement_time_msec: data.durationSeconds * 1000,
  })
}

// Cuando un jugador ve su carta
export function trackCardView(data: {
  playerIndex: number
  isImpostor: boolean
}) {
  sendGAEvent("card_view", {
    player_index: data.playerIndex + 1,
    is_impostor: data.isImpostor,
  })
}
