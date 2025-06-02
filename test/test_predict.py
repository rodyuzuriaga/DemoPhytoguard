import requests
import os
from PIL import Image
import io

# Ruta de la imagen de ejemplo
image_path = os.path.join("..", "images", "imagen-prueba.jpg")

# Crear carpetas para imágenes si no existen
os.makedirs(os.path.join("..", "images", "predict"), exist_ok=True)
os.makedirs(os.path.join("..", "images", "upload"), exist_ok=True)

# Guardar la imagen original en images/upload
with open(image_path, "rb") as f:
    with open(os.path.join("..", "images", "upload", os.path.basename(image_path)), "wb") as out_f:
        out_f.write(f.read())


# BACKEND_URL = "https://phytoguard-backend.livelygrass-7ede0a85.canadacentral.azurecontainerapps.io"
BACKEND_URL = "http://127.0.0.1:8000/predict"

try:
    with open(image_path, "rb") as img_file:
        files = {'image': (os.path.basename(image_path), img_file, 'image/jpeg')}
        response = requests.post(
            BACKEND_URL,
            files=files,
            timeout=120  # Por si la inferencia tarda
        )
    print("Status code:", response.status_code)
    print("\n--- Detalles de la respuesta ---")
    print("Headers:", response.headers)
    print("\nTexto bruto de la respuesta:")
    print(response.text[:500] + ("..." if len(response.text) > 500 else ""))
    if response.status_code != 200:
        print("\n❌ El backend respondió con un error HTTP.")
    try:
        data = response.json()
        print("\nRespuesta decodificada como JSON:")
        print(data)
        if not data.get("success"):
            print("❌ El backend respondió pero no fue exitoso.")
        else:
            print("✅ Comunicación exitosa y predicción realizada.")
            # Mostrar nombre de la enfermedad principal (si hay detecciones)
            if data["detections"]:
                det = data["detections"][0]
                print("Enfermedad detectada:", det.get("class_name_en", "N/A"))
                print("Precisión (confidence):", f"{det['confidence']*100:.2f}%" if 'confidence' in det else "N/A")
                print("Bounding box:", det["bbox"])
            print("\n--- Detecciones detalladas ---")
            for i, det in enumerate(data["detections"]):
                print(f"Detección #{i+1}:")
                print("  class_name_en:", det.get("class_name_en", "N/A"))
                print("  class_name_es:", det.get("class_name_es", "N/A"))
                print("  id:", det.get("id", "N/A"))
                print("  confianza:", f"{det['confidence']*100:.2f}%" if 'confidence' in det else "N/A")
                print("  bbox:", det.get("bbox", "N/A"))
            # Guardar imagen de salida en images/predict
            if data.get("image_with_boxes"):
                import base64
                img_bytes = base64.b64decode(data["image_with_boxes"])
                img = Image.open(io.BytesIO(img_bytes))
                output_name = os.path.splitext(os.path.basename(image_path))[0] + "_box.jpg"
                output_path = os.path.join("..", "images", "predict", output_name)
                img.save(output_path)
                print(f"\nImagen de salida guardada como {output_path}")
    except Exception as e:
        print("\n❌ Error al interpretar la respuesta como JSON:", e)
except Exception as e:
    print(f"\n❌ Error al conectar con el backend: {e}")
