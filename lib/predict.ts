// lib/test_predict.ts
// Utilidad para testear el backend Flask desde Next.js/React (compatible con Vercel)
// Redimensiona la imagen a 640x640 (letterbox), la envía como archivo y recibe el JSON

export async function predictImageFromFile(file: File, backendUrl: string): Promise<any> {
  // 1. Redimensionar la imagen a 640x640 con letterbox usando un canvas
  const resizedBlob = await resizeImageToLetterbox(file, 640, 640)

  // 2. Crear FormData y adjuntar la imagen
  const formData = new FormData()
  formData.append('image', resizedBlob, file.name)

  // 3. Enviar al backend Flask
  const response = await fetch(backendUrl, {
    method: 'POST',
    body: formData,
  })
  if (!response.ok) {
    throw new Error('Error en la petición al backend')
  }
  return await response.json()
}

// Utilidad para redimensionar y letterbox en el navegador
async function resizeImageToLetterbox(file: File, targetW: number, targetH: number): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const img = new window.Image()
    img.onload = () => {
      const canvas = document.createElement('canvas')
      canvas.width = targetW
      canvas.height = targetH
      const ctx = canvas.getContext('2d')!
      ctx.fillStyle = 'black'
      ctx.fillRect(0, 0, targetW, targetH)
      // Calcular escala y posición para letterbox
      const scale = Math.min(targetW / img.width, targetH / img.height)
      const newW = img.width * scale
      const newH = img.height * scale
      const offsetX = (targetW - newW) / 2
      const offsetY = (targetH - newH) / 2
      ctx.drawImage(img, offsetX, offsetY, newW, newH)
      canvas.toBlob((blob) => {
        if (blob) resolve(blob)
        else reject(new Error('No se pudo convertir a blob'))
      }, 'image/jpeg', 0.95)
    }
    img.onerror = reject
    img.src = URL.createObjectURL(file)
  })
}

// URLs de backend para cambiar fácilmente
export const BACKEND_URL_LOCAL = "http://127.0.0.1:8000/predict";
export const BACKEND_URL_CONTENEDOR = "http://localhost:8000/predict";
// export const BACKEND_URL_AZURE = "https://phytoguard-backend.livelygrass-7ede0a85.canadacentral.azurecontainerapps.io/predict";

// Ejemplo de uso para probar en local:
// import { predictImageFromFile, BACKEND_URL_LOCAL } from "@/lib/test_predict";
// const file = ... // un File de input type="file"
// const result = await predictImageFromFile(file, BACKEND_URL_LOCAL);
// console.log(result);

// Si quieres probar con una imagen local en Node.js, puedes usar fs.readFile y un paquete como 'node-fetch' y 'form-data', pero en Next.js/React esto se hace desde el navegador.
