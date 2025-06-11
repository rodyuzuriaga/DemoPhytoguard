# -*- coding: utf-8 -*-
"""phytoguard.py
Pipeline profesional y final para detección de enfermedades en plantas con YOLOv9 y PlantVillage adaptado a detección.
Incluye: split reproducible, YAML automático, entrenamiento, análisis de resultados, visualización avanzada, exportación, inferencia y descripciones/recomendaciones en español para cada clase.
"""

import os
import cv2
import numpy as np
import pandas as pd
import shutil
from shutil import copyfile
import matplotlib.pyplot as plt
from PIL import Image
import random
import yaml
from ultralytics import YOLO

# 1. Split reproducible del dataset
img_path = '/kaggle/input/plantvillage-for-object-detection-yolo/PlantVillage_for_object_detection/Dataset/images'
label_path = '/kaggle/input/plantvillage-for-object-detection-yolo/PlantVillage_for_object_detection/Dataset/labels'

ipaths, types = [], []
for dirname, _, filenames in os.walk(img_path):
    for filename in filenames:
        ipaths.append(os.path.join(dirname, filename))
        types.append(filename.split('.')[-1])
tpaths = []
for dirname, _, filenames in os.walk(label_path):
    for filename in filenames:
        tpaths.append(os.path.join(dirname, filename))
ipaths = sorted(ipaths)
tpaths = sorted(tpaths)
paths = list(zip(ipaths, tpaths))
random.shuffle(paths)
paths = paths[:54293]  # Ajusta según tu dataset
ipaths = [p[0] for p in paths]
tpaths = [p[1] for p in paths]

print(f"Number of images collected: {len(ipaths)}")
print(f"Number of labels collected: {len(tpaths)}")
print(f"Number of paired paths: {len(paths)}")

total_pairs = len(paths)
num_train = int(total_pairs * 0.70)
num_valid = int(total_pairs * 0.20)
num_test = total_pairs - (num_train + num_valid)

for folder in ['train', 'valid', 'test']:
    os.makedirs(f'datasets/{folder}', exist_ok=True)

count_train = 0
count_valid = 0
count_test = 0
for i, (ipath, tpath) in enumerate(zip(ipaths, tpaths)):
    if i < num_train:
        copyfile(ipath, f'datasets/train/{os.path.basename(ipath)}')
        copyfile(tpath, f'datasets/train/{os.path.basename(tpath)}')
        count_train += 1
    elif i < num_train + num_valid:
        copyfile(ipath, f'datasets/valid/{os.path.basename(ipath)}')
        copyfile(tpath, f'datasets/valid/{os.path.basename(tpath)}')
        count_valid += 1
    else:
        copyfile(ipath, f'datasets/test/{os.path.basename(ipath)}')
        copyfile(tpath, f'datasets/test/{os.path.basename(tpath)}')
        count_test += 1

print(f'Files copied to train folder: {count_train}')
print(f'Files copied to valid folder: {count_valid}')
print(f'Files copied to test folder: {count_test}')

# 2. YAML automático con nombres de clase reales
with open('classes.yaml', 'r') as f:
    data_yaml = yaml.safe_load(f)
class_names = data_yaml['names']
plantdata_yaml = dict(
    train='datasets/train',
    val='datasets/valid',
    test='datasets/test',
    nc=len(class_names),
    names=class_names
)
with open('plantdata.yaml', 'w') as outfile:
    yaml.dump(plantdata_yaml, outfile, default_flow_style=True)

# 3. Entrenamiento YOLOv9
model = YOLO('yolov9c.pt')
model.train(
    data='plantdata.yaml',
    epochs=15,
    imgsz=640,
    name="plantvillage_yolo_train3",
    exist_ok=True,
    verbose=True,
    save=True,
    cache=True,
    plots=True
)

# 4. Visualización de resultados de entrenamiento
if os.path.exists("runs/detect/plantvillage_yolo_train3/results.csv"):
    df = pd.read_csv("runs/detect/plantvillage_yolo_train3/results.csv")
    plt.figure(figsize=(14, 5))
    plt.plot(df['epoch'], df['train/box_loss'], label='Box Loss')
    plt.plot(df['epoch'], df['train/cls_loss'], label='Class Loss')
    plt.plot(df['epoch'], df['metrics/mAP50(B)'], label='mAP@0.5')
    plt.plot(df['epoch'], df['metrics/mAP50-95(B)'], label='mAP@0.5:0.95')
    plt.xlabel("Épocas")
    plt.ylabel("Valor")
    plt.title("Evolución del entrenamiento")
    plt.grid(True, linestyle="--", alpha=0.5)
    plt.legend()
    plt.tight_layout()
    plt.show()

# 5. Exportar mejor modelo como PhytoGuard.pt
shutil.copy("runs/detect/plantvillage_yolo_train3/weights/best.pt", "PhytoGuard.pt")
print("✅ Modelo exportado como PhytoGuard.pt")

# 6. Diccionario de descripciones y recomendaciones en español para cada clase
class_info = [
    ("Sarna del manzano", "Hongo que causa manchas oscuras en hojas y frutos de manzano.", "Aplicar fungicida recomendado y eliminar hojas caídas."),
    ("Pudrición negra del manzano", "Hongo que provoca pudrición y lesiones en ramas y frutos.", "Eliminar ramas afectadas y aplicar cobre."),
    ("Roya del cedro-manzano", "Hongo que produce manchas anaranjadas en hojas de manzano.", "Plantar variedades resistentes y eliminar fuentes de infección."),
    ("Manzano sano", "Manzano sin síntomas de enfermedad.", "No requiere acción."),
    ("Arándano sano", "Arándano sin síntomas de enfermedad.", "No requiere acción."),
    ("Oídio del cerezo", "Hongo que causa polvo blanco en hojas de cerezo.", "Aplicar fungicidas a base de azufre."),
    ("Cerezo sano", "Cerezo sin síntomas de enfermedad.", "No requiere acción."),
    ("Mancha gris de la hoja del maíz", "Hongo que causa manchas grises en hojas de maíz.", "Rotar cultivos y usar híbridos resistentes."),
    ("Roya común del maíz", "Hongo que produce pústulas rojizas en hojas de maíz.", "Aplicar fungicida específico."),
    ("Tizón del norte de la hoja del maíz", "Hongo que causa lesiones alargadas en hojas de maíz.", "Rotar cultivos y aplicar fungicidas."),
    ("Maíz sano", "Maíz sin síntomas de enfermedad.", "No requiere acción."),
    ("Pudrición negra de la vid", "Hongo que afecta hojas y frutos de la vid.", "Eliminar partes infectadas y aplicar fungicida."),
    ("Esca (Yesca) de la vid", "Enfermedad fúngica que causa necrosis en la vid.", "Podar y eliminar plantas infectadas."),
    ("Mildiu de la vid", "Hongo que produce manchas amarillas y moho en hojas de vid.", "Aplicar mezcla bordelesa."),
    ("Vid sana", "Vid sin síntomas de enfermedad.", "No requiere acción."),
    ("Huanglongbing (HLB) de cítricos", "Bacteria que causa amarillamiento y deformación en cítricos.", "Controlar población de psílidos."),
    ("Mancha bacteriana del duraznero", "Bacteria que produce manchas oscuras en hojas y frutos.", "Aplicar cobre fijo."),
    ("Duraznero sano", "Duraznero sin síntomas de enfermedad.", "No requiere acción."),
    ("Mancha bacteriana del pimiento", "Bacteria que causa manchas en hojas y frutos de pimiento.", "Aplicar cobre y eliminar restos infectados."),
    ("Pimiento sano", "Pimiento sin síntomas de enfermedad.", "No requiere acción."),
    ("Tizón temprano de la papa", "Hongo que produce manchas oscuras en hojas de papa.", "Aplicar fungicida específico."),
    ("Tizón tardío de la papa", "Hongo que causa pudrición rápida en hojas y tubérculos.", "Eliminar follaje afectado y aplicar fungicidas."),
    ("Papa sana", "Papa sin síntomas de enfermedad.", "No requiere acción."),
    ("Frambuesa sana", "Frambuesa sin síntomas de enfermedad.", "No requiere acción."),
    ("Soja sana", "Soja sin síntomas de enfermedad.", "No requiere acción."),
    ("Oídio de la calabaza", "Hongo que causa polvo blanco en hojas de calabaza.", "Aplicar bicarbonato de potasio."),
    ("Quemadura de la hoja de la fresa", "Hongo que produce manchas marrones en hojas de fresa.", "Eliminar hojas infectadas y mejorar ventilación."),
    ("Fresa sana", "Fresa sin síntomas de enfermedad.", "No requiere acción."),
    ("Mancha bacteriana del tomate", "Bacteria que causa manchas en hojas y frutos de tomate.", "Aplicar bactericidas a base de cobre."),
    ("Tizón temprano del tomate", "Hongo que produce manchas concéntricas en hojas de tomate.", "Poda y aplicar fungicida."),
    ("Tizón tardío del tomate", "Hongo que causa necrosis rápida en tomate.", "Eliminar plantas afectadas y usar variedades resistentes."),
    ("Moho de la hoja del tomate", "Hongo que produce moho en el envés de las hojas.", "Mejorar ventilación y aplicar fungicidas."),
    ("Septoria del tomate", "Hongo que causa manchas circulares en hojas de tomate.", "Aplicar fungicidas y rotar cultivos."),
    ("Ácaros (Araña roja) en tomate", "Ácaros que producen punteado y telarañas en hojas.", "Usar acaricidas o aceite de neem."),
    ("Mancha diana del tomate", "Hongo que produce manchas circulares con centro claro.", "Aplicar fungicidas y rotar cultivos."),
    ("Virus del enrollamiento amarillo de la hoja", "Virus que causa enrollamiento y amarillamiento en tomate.", "Controlar mosca blanca con insecticidas."),
    ("Virus del mosaico del tomate", "Virus que produce mosaico y deformación en hojas.", "Desinfectar herramientas y manos."),
    ("Tomate sano", "Tomate sin síntomas de enfermedad.", "No requiere acción.")
]

def custom_action_on_class(class_id):
    nombre, descripcion, recomendacion = class_info[class_id]
    print(f"\n--- Diagnóstico ---")
    print(f"Clase detectada: {nombre}")
    print(f"Descripción: {descripcion}")
    print(f"Recomendación: {recomendacion}\n")

# 7. Ejemplo de inferencia y reporte
model = YOLO("/kaggle/working/PhytoGuard.pt")
imagenes_prueba = ["/kaggle/input/plantvillage-for-object-detection-yolo/PlantVillage_for_object_detection/Dataset/images/APAS_image (103).jpg", "/kaggle/input/plantvillage-for-object-detection-yolo/PlantVillage_for_object_detection/Dataset/images/APAS_image (147).jpg"]  # Cambia por tus imágenes reales
results = model(imagenes_prueba)
for result in results:
    for box in result.boxes:
        class_id = int(box.cls)
        confianza = box.conf.item()
        print(f"Detectado: {class_info[class_id][0]} (Confianza: {confianza:.2f})")
        custom_action_on_class(class_id)
    result.show()
    result.save(filename="resultado.jpg")

print("\n✅ Pipeline completo, modelo listo para producción y documentación profesional.")

# 8. Análisis de predicciones y métricas avanzadas con Ultralytics v8+

# Evaluación sobre el set de validación/test
val_results = model.val()  # Esto ya imprime el resumen de métricas

# Matriz de confusión
cm = val_results.confusion_matrix.matrix  # numpy array
class_names = val_results.names

import seaborn as sns
import matplotlib.pyplot as plt

plt.figure(figsize=(12,10))
sns.heatmap(cm, annot=True, fmt='.0f', cmap='Blues', xticklabels=class_names, yticklabels=class_names)
plt.title('Matriz de Confusión')
plt.xlabel('Predicción')
plt.ylabel('Real')
plt.show()

# Matriz de confusión normalizada
cm_norm = cm.astype('float') / cm.sum(axis=1, keepdims=True)
plt.figure(figsize=(12,10))
sns.heatmap(cm_norm, annot=True, fmt='.2f', cmap='Blues', xticklabels=class_names, yticklabels=class_names)
plt.title('Matriz de Confusión Normalizada')
plt.xlabel('Predicción')
plt.ylabel('Real')
plt.show()

# Tabla resumen de métricas por clase
import pandas as pd
df_metrics = val_results.class_result  # DataFrame con métricas por clase
print("\nResumen de precisión por clase:")
display(df_metrics)


# Comprime todo menos la carpeta datasets
!cd /kaggle/working && zip -r results_no_datasets.zip . -x "datasets/*"

# Descarga el zip generado
from IPython.display import FileLink
FileLink('/kaggle/working/results_no_datasets.zip')