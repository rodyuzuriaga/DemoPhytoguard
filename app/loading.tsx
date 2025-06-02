import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { image } = await request.json()

    if (!image) {
      return NextResponse.json({ error: "No se proporcionó ninguna imagen" }, { status: 400 })
    }

    // In a real application, you would:
    // 1. Convert the base64 image to a format your ML API expects
    // 2. Send the image to your ML API endpoint
    // 3. Process the response

    // For demo purposes, we'll return a mock response
    // In production, replace this with your actual API call

    // Simulate API processing time
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Mock response - this would come from your actual ML API
    const result = {
      fruta: "Manzana",
      estado: "Madura",
      enfermedad: "Sarna del manzano",
      tipo: "Fungus",
      descripcion:
        "La sarna del manzano es una enfermedad fúngica causada por Venturia inaequalis. Se caracteriza por lesiones oscuras y escamosas en la superficie de la fruta.",
      link: "https://www.example.com/apple-scab",
      recomendaciones: [
        "Aplicar fungicidas preventivos al inicio de la temporada",
        "Podar y destruir hojas infectadas para reducir la fuente de inóculo",
        "Mantener buena circulación de aire en el huerto",
      ],
    }

    return NextResponse.json(result)
  } catch (error) {
    console.error("Error analyzing fruit image:", error)
    return NextResponse.json({ error: "No se pudo analizar la imagen" }, { status: 500 })
  }
}

import { Loader2 } from "lucide-react"

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="h-12 w-12 text-green-600 dark:text-green-400 animate-spin" />
        <h2 className="text-xl font-medium text-green-800 dark:text-green-300">Cargando...</h2>
        <p className="text-green-600 dark:text-green-400">Preparando AgroScan AI para analizar tus frutas</p>
      </div>
    </div>
  )
}
