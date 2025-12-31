import { NextRequest, NextResponse } from 'next/server'
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)

const modelsToTry = [
  'gemini-2.0-flash-exp',
  'gemini-1.5-flash',
  'gemini-1.5-pro',
  'gemini-1.0-pro'
]

export async function POST(request: NextRequest) {
  try {
    const { prompt } = await request.json()

    if (!prompt || typeof prompt !== 'string' || prompt.length > 200 || prompt.length < 1) {
      return NextResponse.json(
        { error: 'Prompt inválido' },
        { status: 400 }
      )
    }

    let lastError: any = null

    for (const modelName of modelsToTry) {
      try {
        console.log(`🔄 Intentando con modelo: ${modelName}`)

        const model = genAI.getGenerativeModel({
          model: modelName,
          safetySettings: [
            {
              category: HarmCategory.HARM_CATEGORY_HARASSMENT,
              threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
            },
            {
              category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
              threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
            },
            {
              category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
              threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
            },
            {
              category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
              threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
            },
          ],
        })

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

        const result = await model.generateContent(fullPrompt)
        const response = await result.response
        const text = response.text()

        if (!text || text.trim().length === 0) {
          throw new Error('Respuesta vacía')
        }

        // Parsear la respuesta y limpiar las palabras
        const newWords = text.split(',')
          .map(word => word.trim())
          .filter(word => word.length > 0 && word.length < 25) // Permitir nombres más largos
          .filter(word => /^[a-zA-ZáéíóúñÁÉÍÓÚÑ\s]+$/.test(word)) // Permitir mayúsculas y espacios para nombres
          .map(word => word.toLowerCase().trim()) // Convertir a minúsculas después de validar
          .filter((word, index, arr) => arr.indexOf(word) === index) // Eliminar duplicados
          .slice(0, 10) // Máximo 10 palabras

        if (newWords.length === 0) {
          throw new Error('No se pudieron procesar palabras válidas')
        }

        console.log(`✅ ¡Éxito con modelo ${modelName}! Se generaron ${newWords.length} elementos`)
        return NextResponse.json({
          success: true,
          words: newWords,
          model: modelName
        })

      } catch (modelError) {
        console.warn(`❌ Error con modelo ${modelName}:`, modelError.message)
        lastError = modelError
        continue // Probar siguiente modelo
      }
    }

    // Si ningún modelo funcionó
    console.error('❌ Todos los modelos fallaron:', lastError?.message)
    return NextResponse.json(
      {
        error: 'Error conectando con Gemini AI',
        details: 'Todos los modelos disponibles fallaron. Revisa tu API key y conexión.'
      },
      { status: 500 }
    )

  } catch (error) {
    console.error('❌ Error en API route:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}






