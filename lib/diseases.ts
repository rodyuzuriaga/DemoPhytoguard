// Plantilla base para la librería de enfermedades (TypeScript)
// Compatible con Next.js y pensada para integración dinámica con el backend y el frontend

export interface DiseaseInfo {
  id: number; // ID numérico único (igual que el backend)
  class_name_en: string; // Nombre en inglés (igual que el backend)
  class_name_es: string; // Nombre en español
  nombre_mostrar: string; // Nombre amigable para mostrar en la UI
  categoria: "Hongo" | "Bacteria" | "Virus" | "Ácaro" | "Deficiencia" | string;
  estado: string; // Ej: Infectada, Sano
  afecta_a: string[]; // Ej: ["Manzana", "Uva"]
  nivel_severidad: "Alta" | "Media" | "Baja" | string;
  descripcion: string;
  sintomas: string[];
  recomendaciones_organico: string[];
  tratamiento_quimico: string[];
  causa: string;
  medidas_preventivas: string[];
  plan_tratamiento: string[];
  link_experto: string;
}

// Ejemplo de uso:
export const DISEASES: DiseaseInfo[] = [
  {
    id: 0,
    class_name_en: "Apple___Apple_scab",
    class_name_es: "Manzano___Roña del manzano",
    nombre_mostrar: "Roña del manzano",
    categoria: "Hongo",
    estado: "Infectada",
    afecta_a: ["Manzana"],
    nivel_severidad: "Alta",
    descripcion: "Enfermedad fúngica causada por Venturia inaequalis. Se caracteriza por lesiones oscuras y escamosas en la superficie de la fruta y las hojas.",
    sintomas: [
      "Manchas circulares de color verde oliva a negro",
      "Lesiones escamosas",
      "Deformación de frutos jóvenes"
    ],
    recomendaciones_organico: [
      "Aplicar extracto de cola de caballo (rico en sílice) como preventivo",
      "Utilizar bicarbonato de sodio diluido (1 cucharada por litro de agua)",
      "Aplicar aceite de neem como fungicida natural"
    ],
    tratamiento_quimico: [
      "Aplicar fungicidas a base de cobre (oxicloruro de cobre)",
      "Utilizar fungicidas sistémicos como Difenoconazol",
      "Aplicar fungicidas protectores como Mancozeb"
    ],
    causa: "Hongos patógenos que se desarrollan en condiciones de alta humedad y temperaturas moderadas. La infección se propaga por esporas transportadas por el viento, agua o insectos.",
    medidas_preventivas: [
      "Mantener buena circulación de aire entre plantas",
      "Evitar mojar el follaje al regar",
      "Eliminar y destruir hojas y frutos infectados"
    ],
    plan_tratamiento: [
      "Fase 1: Tratamiento Inicial - Aplicar fungicida Captan (2g/L) cada 7-10 días durante las primeras 3 semanas.",
      "Fase 2: Control Cultural - Podar y eliminar todas las ramas y hojas afectadas. Quemar o desechar lejos del huerto.",
      "Fase 3: Prevención - Aplicar tratamiento preventivo en primavera antes de la apertura de yemas con cobre."
    ],
    link_experto: "https://www.example.com/apple-scab"
  }
  // ...agrega aquí los objetos de cada clase...
];

// ---
// Notas extras:
// - No incluyas la fecha de análisis ni la confianza aquí, eso es dinámico y lo pone el frontend según el resultado del backend.
// - El nombre de la imagen de salida debe generarse en el frontend como `${nombre_original}_box.jpg` para evitar sobrescribir archivos.
// - Si hay muchos usuarios, puedes guardar las imágenes en una carpeta por usuario/sesión o usar un identificador único (ej: timestamp o uuid).
