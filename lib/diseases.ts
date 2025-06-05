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
  imagen?: string;
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
    link_experto: "https://www.canr.msu.edu/ipm/diseases/apple_scab",
    imagen: "https://media.istockphoto.com/id/1198930372/es/foto/manchas-y-grietas-necróticas-causaron-costra-de-manzana-venturia-inaequalis-en-una-manzana.jpg?s=612x612&w=0&k=20&c=xPpxUPKI72EJhPHRWXbgLWjp2v879C_VRRLLNW44VMQ="
  },
  {
    id: 1,
    class_name_en: "Apple___Black_rot",
    class_name_es: "Manzano___Pudrición negra del manzano",
    nombre_mostrar: "Pudrición negra del manzano",
    categoria: "Hongo",
    estado: "Infectada",
    afecta_a: ["Manzana"],
    nivel_severidad: "Alta",
    descripcion: "Causada por el hongo Botryosphaeria obtusa, esta enfermedad afecta frutas, hojas y madera. Puede causar pérdidas significativas si no se controla.",
    sintomas: [
      "Lesiones negras y hundidas en la fruta, a menudo comenzando en el extremo calicino.",
      "Frutas momificadas que permanecen en el árbol.",
      "Manchas foliares de 'ojo de rana' (lesiones púrpuras que se vuelven marrones con un centro más claro).",
      "Cancros en ramas y tronco."
    ],
    recomendaciones_organico: [
      "Poda sanitaria de ramas y cancros infectados.",
      "Eliminación de frutas momificadas y restos de poda.",
      "Aplicación de caldos sulfocálcicos durante la dormancia."
    ],
    tratamiento_quimico: [
      "Fungicidas como Captan o Tiofanato-metilo aplicados según calendario.",
      "Mancozeb puede ser efectivo en aplicaciones preventivas."
    ],
    causa: "Hongo Botryosphaeria obtusa, que sobrevive en madera muerta y frutos momificados. Las esporas se dispersan por lluvia y viento, infectando a través de heridas.",
    medidas_preventivas: [
      "Mantener la sanidad del huerto eliminando fuentes de inóculo.",
      "Proteger heridas de poda.",
      "Asegurar buena circulación de aire."
    ],
    plan_tratamiento: [
      "Invierno: Poda sanitaria y aplicación de fungicida de dormancia.",
      "Primavera/Verano: Aplicaciones de fungicidas preventivos y curativos según presión de la enfermedad.",
      "Monitoreo constante para detectar primeros síntomas."
    ],
    link_experto: "http://extension.cropsciences.illinois.edu/fruitveg/pdfs/806_Black_Rot_of_Apple-20015.pdf",
    imagen: "https://eyouagro.com/nitropack_static/GhaDBUVOndLsFPXiTFGggwyXxhpvLBrk/assets/images/optimized/rev-ce48c26/eyouagro.com/wp-content/uploads/2021/08/pests-apple-scab-opt-edited.jpg"
  },
  // ...agrega aquí los objetos de cada clase...
];

// ---
// Notas extras:
// - No incluyas la fecha de análisis ni la confianza aquí, eso es dinámico y lo pone el frontend según el resultado del backend.
// - El nombre de la imagen de salida debe generarse en el frontend como `${nombre_original}_box.jpg` para evitar sobrescribir archivos.
// - Si hay muchos usuarios, puedes guardar las imágenes en una carpeta por usuario/sesión o usar un identificador único (ej: timestamp o uuid).
