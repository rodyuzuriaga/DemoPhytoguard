// lib/test_predict.ts
// Utilidad para testear el backend Flask desde Next.js/React (compatible con Vercel)
// Redimensiona la imagen a 640x640 (letterbox), la envía como archivo y recibe el JSON

import { v4 as uuidv4 } from "uuid";

export async function predictImageFromFile(file: File, backendUrl: string): Promise<any> {
  // 1. Generar un código único para la imagen
  const code = uuidv4();

  // 2. Guardar la imagen original en /images y en /images/upload con el código
  // NOTA: En Next.js puro (frontend) no puedes guardar en disco, pero puedes simularlo en memoria o usar una API route para backend
  // Aquí solo devolvemos el code para que el frontend lo use como identificador

  // 3. Redimensionar la imagen a 640x640 con letterbox usando un canvas (igual que minimal_preprocess del backend)
  const resizedBlob = await resizeImageToLetterbox(file, 640, 640)

  // 4. Crear FormData y adjuntar la imagen
  const formData = new FormData()
  formData.append('image', resizedBlob, code + '_' + file.name)
  formData.append('code', code) // Enviar el código al backend si quieres que lo use

  try {
    // 5. Enviar al backend Flask
    const response = await fetch(backendUrl, {
      method: 'POST',
      body: formData,
    })
    if (!response.ok) {
      // Si el backend está caído o responde error, devolvemos un flag especial
      return { backendOffline: true };
    }
    // 6. El backend debe devolver la imagen con boxes usando el mismo code en el nombre
    const result = await response.json();
    result.code = code; // Devolver el code para que el frontend lo use para guardar/mostrar
    return result;
  } catch (err) {
    // Si hay error de red, también devolvemos el flag
    return { backendOffline: true };
  }
}

// Utilidad para redimensionar y letterbox en el navegador (equivalente a minimal_preprocess del backend)
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
      // Calcular escala y posición para letterbox (igual que minimal_preprocess)
      const scale = targetW / Math.max(img.width, img.height)
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
// export const BACKEND_URL_AZURE = "https://phytoguard-backend.livelygrass-7ede0a85.canadacentral.azurecontainerapps.io/predict";

// Ejemplo de uso para probar en local:
// import { predictImageFromFile, BACKEND_URL_LOCAL } from "@/lib/test_predict";
// const file = ... // un File de input type="file"
// const result = await predictImageFromFile(file, BACKEND_URL_LOCAL);
// console.log(result);

// Si quieres probar con una imagen local en Node.js, puedes usar fs.readFile y un paquete como 'node-fetch' y 'form-data', pero en Next.js/React esto se hace desde el navegador.
