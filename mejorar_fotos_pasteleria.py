import os
import glob
import json
from PIL import Image
from dotenv import load_dotenv

# 1. Cargar variables de entorno
load_dotenv()

api_key = os.environ.get("GEMINI_API_KEY")
if not api_key:
    print("⚠️ ADVERTENCIA: No se encontró GEMINI_API_KEY en las variables de entorno.")
    print("Asegúrate de exportar la variable o incluirla en un archivo .env:")
    print("export GEMINI_API_KEY=\"tu_clave_aqui\"")

try:
    from google import genai
    from google.genai import types
    has_genai = True
except ImportError:
    print("⚠️ No se encontró el paquete 'google-genai'. Ejecuta: pip install google-genai pillow python-dotenv")
    has_genai = False

IMAGES_DIR = os.path.join(os.path.dirname(__file__), "public", "products")
OUTPUT_JS = os.path.join(os.path.dirname(__file__), "src", "data", "products.js")

def analyze_and_enhance_pastry_images():
    print("✨ Iniciando procesamiento de fotografías de Pastelería 09 de Septiembre...")
    
    if not os.path.exists(IMAGES_DIR):
        print(f"❌ La carpeta {IMAGES_DIR} no existe.")
        return

    image_files = glob.glob(os.path.join(IMAGES_DIR, "*.JPG")) + \
                  glob.glob(os.path.join(IMAGES_DIR, "*.jpg")) + \
                  glob.glob(os.path.join(IMAGES_DIR, "*.jpeg"))

    print(f"📸 Se encontraron {len(image_files)} imágenes en total.")

    if has_genai and api_key:
        client = genai.Client(api_key=api_key)
        enhanced_products = []

        for idx, img_path in enumerate(image_files[:20], 1):
            filename = os.path.basename(img_path)
            print(f"  [{idx}/20] Analizando con Gemini: {filename}...")
            
            try:
                pil_image = Image.open(img_path)
                prompt = (
                    "Eres un chef pastelero de alta repostería boutique. "
                    "Analiza esta fotografía de postre/pastel y responde ÚNICAMENTE un objeto JSON válido "
                    "con la siguiente estructura exacta (sin markdown ni texto alrededor):\n"
                    "{\n"
                    '  "name": "Título de alta gastronomía en español",\n'
                    '  "category": "Una de estas opciones: Pasteles | Roles | Cupcakes | Tartas | Petit Fours",\n'
                    '  "price": 0.00,\n'
                    '  "description": "Una descripción apetitosa, elegante y poética de una sola oración sobre sus ingredientes y textura."\n'
                    "}"
                )

                response = client.models.generate_content(
                    model="gemini-2.5-flash",
                    contents=[pil_image, prompt]
                )

                response_text = response.text.strip()
                if response_text.startswith("```"):
                    response_text = response_text.split("```")[1]
                    if response_text.startswith("json"):
                        response_text = response_text[4:]
                response_text = response_text.strip()

                data = json.loads(response_text)
                data["id"] = idx
                data["image"] = f"/products/{filename}"
                enhanced_products.append(data)
                print(f"    ✓ {data['name']} (${data['price']} MXN) - {data['category']}")

            except Exception as e:
                print(f"    ❌ Error procesando {filename}: {e}")

        if enhanced_products:
            js_content = "export const products = " + json.dumps(enhanced_products, indent=2, ensure_ascii=False) + ";\n"
            with open(OUTPUT_JS, "w", encoding="utf-8") as f:
                f.write(js_content)
            print(f"🎉 Catálogo actualizado exitosamente en {OUTPUT_JS}")

if __name__ == "__main__":
    analyze_and_enhance_pastry_images()
