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
  {
    id: 2,
    class_name_en: "Apple___Cedar_apple_rust",
    class_name_es: "Manzano___Roya del cedro-manzano",
    nombre_mostrar: "Roya del cedro-manzano",
    categoria: "Hongo",
    estado: "Infectada",
    afecta_a: ["Manzana"],
    nivel_severidad: "Media",
    descripcion: "Enfermedad fúngica causada por Gymnosporangium juniperi-virginianae. Requiere dos huéspedes (manzano y cedro/junípero) para completar su ciclo de vida.",
    sintomas: [
      "En manzanos: manchas amarillas/naranjas brillantes en las hojas, a menudo con pequeños puntos negros en el centro.",
      "Posteriormente, estructuras tubulares (aecios) en el envés de las hojas.",
      "Lesiones similares en frutos y ramitas jóvenes.",
      "En cedros: agallas globosas de color marrón-verdoso que en primavera desarrollan 'cuernos' gelatinosos naranjas."
    ],
    recomendaciones_organico: [
      "Eliminar cedros rojos orientales cercanos (si es posible, al menos a 1-2 km).",
      "Plantar variedades de manzano resistentes.",
      "Aplicaciones de azufre o caldo bordelés."
    ],
    tratamiento_quimico: [
      "Fungicidas como Miclobutanil, Fenbuconazol o Trifloxistrobina, aplicados preventivamente.",
      "Las aplicaciones deben coincidir con la liberación de esporas desde los cedros."
    ],
    causa: "Hongo Gymnosporangium juniperi-virginianae. Las esporas de las agallas del cedro infectan a los manzanos en primavera. Las esporas del manzano luego infectan a los cedros en verano/otoño.",
    medidas_preventivas: [
      "Interrupción del ciclo de vida eliminando uno de los huéspedes.",
      "Elección de variedades resistentes.",
      "Manejo de la distancia entre manzanos y cedros."
    ],
    plan_tratamiento: [
      "Primavera temprana: Inspeccionar cedros y considerar su eliminación o tratamiento.",
      "Desde la brotación del manzano: Aplicar fungicidas preventivos si hay cedros infectados cerca.",
      "Otoño: Inspeccionar manzanos para planificar estrategias del próximo año."
    ],
    link_experto: "https://www.extension.purdue.edu/extmedia/bp/bp-138-w.pdf",
    imagen: "https://broadleaftreeandshrub.com/wp-content/uploads/2023/08/CedarApple_Rust169.jpg"
  },
  {
    id: 3,
    class_name_en: "Apple___healthy",
    class_name_es: "Manzano___Sano",
    nombre_mostrar: "Manzano Sano",
    categoria: "Saludable",
    estado: "Sano",
    afecta_a: ["Manzana"],
    nivel_severidad: "N/A",
    descripcion: "La planta de manzano no presenta signos visibles de enfermedades fúngicas, bacterianas, virales o daños por plagas. Muestra un crecimiento vigoroso y saludable.",
    sintomas: [
      "Follaje de color verde uniforme y sin manchas.",
      "Ausencia de lesiones, cancros o pudriciones en ramas y tronco.",
      "Frutos (si presentes) de apariencia normal, sin manchas ni deformaciones.",
      "Crecimiento adecuado para la temporada y variedad."
    ],
    recomendaciones_organico: [
      "Mantener buenas prácticas de cultivo (riego, fertilización balanceada).",
      "Realizar podas de mantenimiento para asegurar buena ventilación.",
      "Monitoreo regular para detección temprana de problemas."
    ],
    tratamiento_quimico: [
      "No se requiere tratamiento químico para una planta sana.",
      "Se pueden considerar aplicaciones preventivas según el historial de enfermedades en la zona."
    ],
    causa: "Condiciones óptimas de cultivo, buen manejo agronómico y/o resistencia natural de la planta.",
    medidas_preventivas: [
      "Selección de variedades resistentes a enfermedades comunes.",
      "Mantenimiento de la sanidad del suelo.",
      "Control de malezas y plagas que puedan ser vectores de enfermedades."
    ],
    plan_tratamiento: [
      "Continuar con el monitoreo y las prácticas culturales preventivas.",
      "Asegurar un programa de nutrición balanceado.",
      "Realizar podas sanitarias anuales."
    ],
    link_experto: "https://extension.purdue.edu/extmedia/HHS/HHS-809-W.pdf",
    imagen: "https://hips.hearstapps.com/hmg-prod/images/apple-royalty-free-image-1745874889.pjpeg?crop=0.668xw:1.00xh;0.0459xw,0&resize=640:*"
  },
  {
    id: 4,
    class_name_en: "Blueberry___healthy",
    class_name_es: "Arándano___Sano",
    nombre_mostrar: "Arándano Sano",
    categoria: "Saludable",
    estado: "Sano",
    afecta_a: ["Arándano"],
    nivel_severidad: "N/A",
    descripcion: "La planta de arándano no muestra síntomas de enfermedades o estrés por plagas. Presenta un desarrollo normal y saludable.",
    sintomas: [
      "Hojas de color verde intenso (o rojizo según variedad y estación) sin manchas ni deformaciones.",
      "Tallos firmes y sin lesiones.",
      "Buen cuajado de frutos (si en temporada) y desarrollo normal de bayas."
    ],
    recomendaciones_organico: [
      "Mantener pH del suelo ácido (4.5-5.5).",
      "Uso de mulch orgánico para conservar humedad y controlar malezas.",
      "Riego adecuado, evitando encharcamiento."
    ],
    tratamiento_quimico: [
      "No necesario para plantas sanas.",
      "Fertilización química balanceada según análisis de suelo."
    ],
    causa: "Manejo adecuado del cultivo, condiciones ambientales favorables y/o resistencia de la variedad.",
    medidas_preventivas: [
      "Selección de variedades adaptadas al clima local y resistentes a enfermedades.",
      "Poda anual para mejorar la circulación de aire y la penetración de luz.",
      "Monitoreo de plagas y enfermedades."
    ],
    plan_tratamiento: [
      "Continuar con las buenas prácticas de manejo.",
      "Realizar análisis de suelo periódicos para ajustar fertilización y pH.",
      "Vigilar la aparición de síntomas para actuar tempranamente."
    ],
    link_experto: "https://extension.purdue.edu/extmedia/hhs/hhs-807-w.pdf",
    imagen: "https://annarosaskincare.com/wp-content/uploads/2021/07/Bla%CC%81ber-800x600-cp-bo%CC%81k-e1635086210854.jpeg"
  },
  {
    id: 5,
    class_name_en: "Cherry___Powdery_mildew",
    class_name_es: "Cerezo___Oídio del cerezo",
    nombre_mostrar: "Oídio del cerezo",
    categoria: "Hongo",
    estado: "Infectada",
    afecta_a: ["Cerezo"],
    nivel_severidad: "Media",
    descripcion: "Enfermedad fúngica común causada por Podosphaera clandestina, que afecta hojas, brotes jóvenes y frutos, cubriéndolos con un polvo blanquecino.",
    sintomas: [
      "Manchas blancas pulverulentas en la superficie de las hojas (haz y envés).",
      "Hojas jóvenes pueden enrollarse, distorsionarse o caer prematuramente.",
      "Brotes y frutos pueden cubrirse con el mismo polvo blanco.",
      "Los frutos infectados pueden desarrollar manchas ásperas (russeting) o agrietarse."
    ],
    recomendaciones_organico: [
      "Aplicar azufre mojable (cuidado con altas temperaturas).",
      "Bicarbonato de potasio o sodio con un surfactante.",
      "Aceite de neem o aceites hortícolas.",
      "Poda para mejorar la circulación de aire."
    ],
    tratamiento_quimico: [
      "Fungicidas específicos como inhibidores de la DMI (e.g., miclobutanil, tebuconazol) o estrobilurinas (e.g., trifloxistrobina).",
      "Aplicar al inicio de los síntomas y repetir según sea necesario."
    ],
    causa: "Hongo Podosphaera clandestina. Prospera en condiciones de alta humedad relativa y temperaturas moderadas. Las esporas se dispersan por el viento.",
    medidas_preventivas: [
      "Plantar variedades resistentes si están disponibles.",
      "Podar para aumentar la circulación de aire y la exposición al sol.",
      "Evitar el exceso de fertilización nitrogenada."
    ],
    plan_tratamiento: [
      "Inicio de temporada: Aplicaciones preventivas de fungicidas si la enfermedad fue severa el año anterior.",
      "Durante la temporada: Monitorear y aplicar fungicidas al primer signo.",
      "Post-cosecha: Limpieza de hojas caídas."
    ],
    link_experto: "https://www.extension.purdue.edu/extmedia/bp/bp-5-w.pdf",
    imagen: "https://bugwoodcloud.org/images/768x512/5608626.jpg"
  },
  {
    id: 6,
    class_name_en: "Cherry___healthy",
    class_name_es: "Cerezo___Sano",
    nombre_mostrar: "Cerezo Sano",
    categoria: "Saludable",
    estado: "Sano",
    afecta_a: ["Cerezo"],
    nivel_severidad: "N/A",
    descripcion: "La planta de cerezo está libre de signos visibles de enfermedad o infestación de plagas, mostrando un crecimiento y desarrollo óptimos.",
    sintomas: [
      "Follaje verde y lustroso, sin manchas, decoloraciones ni deformaciones.",
      "Corteza lisa y sin exudaciones anormales o cancros.",
      "Buen desarrollo de flores y frutos (en temporada)."
    ],
    recomendaciones_organico: [
      "Mantener un suelo bien drenado y fértil.",
      "Poda adecuada para la formación y producción, así como para la ventilación.",
      "Riego regular y apropiado."
    ],
    tratamiento_quimico: [
      "No se requiere para un árbol sano.",
      "Considerar tratamientos preventivos solo si hay alta presión de enfermedades específicas en la zona."
    ],
    causa: "Prácticas de cultivo adecuadas, condiciones ambientales favorables y/o resistencia intrínseca de la variedad.",
    medidas_preventivas: [
      "Elección de variedades resistentes a enfermedades comunes del cerezo.",
      "Manejo integrado de plagas.",
      "Evitar heridas innecesarias en el tronco y ramas."
    ],
    plan_tratamiento: [
      "Monitoreo continuo a lo largo de la temporada de crecimiento.",
      "Ajustar prácticas de riego y fertilización según las necesidades.",
      "Realizar podas de mantenimiento anuales."
    ],
    link_experto: "https://extension.purdue.edu/extmedia/HHS/HHS-805-W.pdf",
    imagen: "https://www.koppert.co.uk/content/_processed_/b/c/csm_Cherry-34_bf99ee21f6.jpg"
  },
  {
    id: 7,
    class_name_en: "Corn___Cercospora_leaf_spot Gray_leaf_spot",
    class_name_es: "Maíz___Mancha gris de la hoja (por Cercospora)",
    nombre_mostrar: "Mancha gris de la hoja del maíz",
    categoria: "Hongo",
    estado: "Infectada",
    afecta_a: ["Maíz"],
    nivel_severidad: "Media",
    descripcion: "Enfermedad fúngica causada por Cercospora zeae-maydis. Se caracteriza por lesiones rectangulares de color grisáceo a canela en las hojas, limitadas por las nervaduras.",
    sintomas: [
      "Lesiones iniciales pequeñas, necróticas, con halos cloróticos.",
      "Lesiones maduras largas (hasta 5 cm), estrechas, rectangulares, de color gris a canela.",
      "Las lesiones se desarrollan primero en las hojas inferiores y progresan hacia arriba.",
      "En casos severos, las hojas pueden secarse prematuramente."
    ],
    recomendaciones_organico: [
      "Rotación de cultivos con especies no hospedantes.",
      "Labranza para enterrar los residuos de maíz infectados.",
      "Uso de híbridos de maíz resistentes o tolerantes."
    ],
    tratamiento_quimico: [
      "Aplicación de fungicidas foliares (e.g., estrobilurinas, triazoles) si la enfermedad alcanza umbrales económicos.",
      "El momento de aplicación es crucial para la efectividad."
    ],
    causa: "Hongo Cercospora zeae-maydis. Sobrevive en residuos de maíz infectados. Condiciones cálidas y húmedas favorecen la infección. Esporas dispersadas por viento y salpicaduras de lluvia.",
    medidas_preventivas: [
      "Selección de híbridos con buena resistencia genética.",
      "Manejo de residuos de cosecha.",
      "Rotación de cultivos."
    ],
    plan_tratamiento: [
      "Evaluación de riesgo: Considerar historial, susceptibilidad del híbrido y clima.",
      "Exploración: Monitorear las plantas desde etapas vegetativas tardías.",
      "Aplicación de fungicida: Si es necesario, aplicar entre VT y R3."
    ],
    link_experto: "https://www.extension.purdue.edu/extmedia/bp/bp-56-w.pdf",
    imagen: "https://upload.wikimedia.org/wikipedia/commons/1/12/Gray_leaf_spot_Cercospora_zeae-maydis_5465607.png"
  },
  {
    id: 8,
    class_name_en: "Corn___Common_rust",
    class_name_es: "Maíz___Roya común del maíz",
    nombre_mostrar: "Roya común del maíz",
    categoria: "Hongo",
    estado: "Infectada",
    afecta_a: ["Maíz"],
    nivel_severidad: "Baja a Media",
    descripcion: "Causada por el hongo Puccinia sorghi, la roya común se manifiesta como pústulas pulverulentas de color canela a marrón rojizo en ambas superficies de las hojas.",
    sintomas: [
      "Pequeñas pústulas ovaladas o alargadas, de color marrón canela a marrón rojizo.",
      "Las pústulas pueden aparecer en ambas caras de la hoja, tallos y vainas foliares.",
      "Al romperse, las pústulas liberan un polvo de esporas.",
      "En infecciones severas, las hojas pueden amarillear y secarse."
    ],
    recomendaciones_organico: [
      "Plantar híbridos resistentes o tolerantes.",
      "Generalmente no requiere control específico en muchos híbridos modernos."
    ],
    tratamiento_quimico: [
      "Rara vez es económicamente justificable tratar la roya común con fungicidas.",
      "Si es necesario, fungicidas como triazoles o estrobilurinas pueden ser efectivos."
    ],
    causa: "Hongo Puccinia sorghi. Las esporas son transportadas por el viento. Temperaturas moderadas y alta humedad favorecen la infección.",
    medidas_preventivas: [
      "Uso de híbridos resistentes.",
      "Fechas de siembra tempranas pueden ayudar a escapar de la epidemia."
    ],
    plan_tratamiento: [
      "Monitoreo regular, especialmente en híbridos susceptibles.",
      "Evaluar la severidad y la etapa de crecimiento antes de considerar fungicidas.",
      "Priorizar la resistencia genética."
    ],
    link_experto: "https://www.extension.purdue.edu/extmedia/bp/bp-82-w.pdf",
    imagen: "https://ohioline.osu.edu/sites/ohioline/files/imce/Plant_Pathology/PLNTPTH-CER-02_Figure_1.png"
  },
  {
    id: 9,
    class_name_en: "Corn___Northern_Leaf_Blight",
    class_name_es: "Maíz___Tizón del norte de la hoja del maíz",
    nombre_mostrar: "Tizón del norte de la hoja del maíz",
    categoria: "Hongo",
    estado: "Infectada",
    afecta_a: ["Maíz"],
    nivel_severidad: "Media a Alta",
    descripcion: "Enfermedad fúngica causada por Exserohilum turcicum. Se caracteriza por lesiones grandes, elípticas, de color canela o grisáceo en las hojas.",
    sintomas: [
      "Lesiones largas (2.5 a 15 cm), elípticas o en forma de 'cigarro', de color gris verdoso a canela.",
      "Las lesiones comienzan en las hojas inferiores y progresan hacia arriba.",
      "Bajo condiciones de humedad, se puede observar esporulación oscura.",
      "Puede causar una defoliación significativa."
    ],
    recomendaciones_organico: [
      "Uso de híbridos de maíz con resistencia genética.",
      "Rotación de cultivos con no hospedantes.",
      "Labranza para reducir los residuos infectados."
    ],
    tratamiento_quimico: [
      "Aplicación de fungicidas foliares (e.g., estrobilurinas, triazoles) al inicio de la enfermedad en híbridos susceptibles.",
      "El umbral económico depende del precio del maíz y costo del fungicida."
    ],
    causa: "Hongo Exserohilum turcicum. Sobrevive en residuos de cosecha. Temperaturas moderadas y humedad prolongada favorecen la infección.",
    medidas_preventivas: [
      "Selección de híbridos resistentes.",
      "Manejo de rastrojo.",
      "Rotación de cultivos."
    ],
    plan_tratamiento: [
      "Evaluar la susceptibilidad del híbrido y condiciones ambientales.",
      "Monitorear las plantas, especialmente entre V12 y R2.",
      "Aplicar fungicidas si la enfermedad está presente en hojas superiores durante polinización."
    ],
    link_experto: "https://www.extension.purdue.edu/extmedia/bp/bp-84-w.pdf",
    imagen: "https://agrilife.org/texasrowcrops/files/2021/05/fig-1.png"
  },
  {
    id: 10,
    class_name_en: "Corn___healthy",
    class_name_es: "Maíz___Sano",
    nombre_mostrar: "Maíz Sano",
    categoria: "Saludable",
    estado: "Sano",
    afecta_a: ["Maíz"],
    nivel_severidad: "N/A",
    descripcion: "Planta de maíz vigorosa, sin evidencia de enfermedades foliares, del tallo o de la espiga. Desarrollo normal según la etapa fenológica.",
    sintomas: [
      "Hojas de color verde intenso, turgentes y sin lesiones.",
      "Tallo firme y sin pudriciones.",
      "Espigas bien desarrolladas y llenas (si en etapa reproductiva)."
    ],
    recomendaciones_organico: [
      "Mantenimiento de la fertilidad del suelo con abonos orgánicos.",
      "Control biológico de plagas.",
      "Rotación de cultivos."
    ],
    tratamiento_quimico: [
      "No se requiere para plantas sanas.",
      "Fertilización química basada en análisis de suelo."
    ],
    causa: "Buenas prácticas agrícolas, uso de híbridos resistentes, condiciones ambientales no propicias para patógenos, y buen manejo nutricional e hídrico.",
    medidas_preventivas: [
      "Selección de híbridos adaptados y con buen perfil de resistencia.",
      "Manejo adecuado del riego y drenaje.",
      "Control de malezas.",
      "Siembra en la época adecuada."
    ],
    plan_tratamiento: [
      "Continuar el monitoreo regular del cultivo.",
      "Aplicar nutrientes según las necesidades de la planta.",
      "Mantener un registro de las condiciones del cultivo."
    ],
    link_experto: "https://agry.purdue.edu/ext/corn/news/timeless/ExtremeCornMgmt.pdf",
    imagen: "https://chefsmandala.com/wp-content/uploads/2018/03/corn-600x338.jpg"
  },
  {
    id: 11,
    class_name_en: "Grape___Black_rot",
    class_name_es: "Vid___Pudrición negra de la vid",
    nombre_mostrar: "Pudrición negra de la vid",
    categoria: "Hongo",
    estado: "Infectada",
    afecta_a: ["Uva"],
    nivel_severidad: "Alta",
    descripcion: "Enfermedad fúngica devastadora causada por Guignardia bidwellii. Afecta hojas, brotes, zarcillos y, más críticamente, los frutos, que se momifican.",
    sintomas: [
      "En hojas: Manchas circulares marrones con un borde más oscuro, con pequeños puntos negros (picnidios).",
      "En brotes y zarcillos: Lesiones alargadas, negras y hundidas.",
      "En frutos: Mancha pálida que se agranda, volviéndose marrón y luego negra. Bayas se arrugan y momifican."
    ],
    recomendaciones_organico: [
      "Poda sanitaria.",
      "Eliminación de frutos momificados.",
      "Aplicaciones de caldo bordelés o cobre.",
      "Mejorar la circulación de aire."
    ],
    tratamiento_quimico: [
      "Fungicidas protectores y sistémicos (Mancozeb, Captan, miclobutanil, estrobilurinas).",
      "Aplicaciones tempranas y regulares, especialmente en periodos húmedos."
    ],
    causa: "Hongo Guignardia bidwellii. Sobrevive en frutos momificados y lesiones en sarmientos. Esporas liberadas con lluvia en primavera.",
    medidas_preventivas: [
      "Sanidad del viñedo: eliminar fuentes de inóculo.",
      "Selección de sitios con buena circulación de aire.",
      "Manejo adecuado de la canopia.",
      "Uso de variedades menos susceptibles."
    ],
    plan_tratamiento: [
      "Dormancia: Poda y eliminación de restos infectados.",
      "Brotación a floración: Aplicaciones preventivas de fungicidas.",
      "Después de floración: Continuar aplicaciones según clima.",
      "Post-cosecha: Limpieza."
    ],
    link_experto: "https://plantpathology.ca.uky.edu/sites/plantpathology.ca.uky.edu/files/PPFS-FR-S-16.pdf",
    imagen: "https://miro.medium.com/v2/resize:fit:567/1*sgWQbDoefh8124W-qReFcg.png"
  },
  {
    id: 12,
    class_name_en: "Grape___Esca_(Black_Measles)",
    class_name_es: "Vid___Esca (Yesca)",
    nombre_mostrar: "Esca (Yesca) de la vid",
    categoria: "Hongo", // Falls under string
    estado: "Infectada",
    afecta_a: ["Uva"],
    nivel_severidad: "Alta",
    descripcion: "Enfermedad de la madera causada por un complejo de hongos. Causa declive y muerte de la vid. Síntomas crónicos o apopléticos.",
    sintomas: [
      "Crónica: Hojas con manchas cloróticas/necróticas ('hojas de parra atigradas'), bayas con manchas ('black measles').",
      "Apoplética: Marchitamiento y muerte súbita.",
      "En madera: Necrosis central blanda (amadou) o punteado negro en xilema."
    ],
    recomendaciones_organico: [
      "Poda tardía (lloro).",
      "Protección de heridas de poda (Trichoderma o cobre).",
      "Eliminación de plantas muy afectadas."
    ],
    tratamiento_quimico: [
      "No existen tratamientos curativos efectivos.",
      "Algunos productos para proteger heridas de poda (tiofanato-metilo, tebuconazol)."
    ],
    causa: "Complejo de hongos que colonizan madera por heridas (poda). Estrés hídrico exacerba síntomas.",
    medidas_preventivas: [
      "Poda cuidadosa, minimizar heridas grandes.",
      "Desinfectar herramientas de poda.",
      "Evitar poda en tiempo húmedo.",
      "Manejo del riego."
    ],
    plan_tratamiento: [
      "Identificación: Marcar plantas con síntomas.",
      "Poda de renovación (riesgoso).",
      "Eliminación: Quitar plantas severamente afectadas.",
      "Prevención en nuevas plantaciones."
    ],
    link_experto: "https://www.burgundy-report.com/wp/wp-content/uploads/2005/09/esca_report.pdf",
    imagen: "https://upload.wikimedia.org/wikipedia/commons/c/cb/ESCA_Blattsymptom_1.JPG"
  },
  {
    id: 13,
    class_name_en: "Grape___Leaf_blight_(Isariopsis_Leaf_Spot)",
    class_name_es: "Vid___Mildiú de la vid (Mancha foliar por Isariopsis)",
    nombre_mostrar: "Mancha foliar por Isariopsis en Vid",
    categoria: "Hongo",
    estado: "Infectada",
    afecta_a: ["Uva"],
    nivel_severidad: "Media",
    descripcion: "Enfermedad fúngica causada por Pseudocercospora vitis. Provoca manchas en las hojas que pueden llevar a defoliación prematura.",
    sintomas: [
      "Manchas angulares/irregulares en hojas, inicialmente cloróticas, luego marrones/rojizas con halo amarillo.",
      "Lesiones delimitadas por nervaduras.",
      "En envés, estructuras fúngicas oscuras aterciopeladas.",
      "Defoliación prematura en casos severos."
    ],
    recomendaciones_organico: [
      "Mejorar circulación de aire (deshoje, manejo canopia).",
      "Eliminación de hojas caídas infectadas.",
      "Aplicaciones de cobre o azufre preventivas."
    ],
    tratamiento_quimico: [
      "Fungicidas para otras enfermedades foliares (Mancozeb, estrobilurinas, triazoles).",
      "Aplicaciones si la enfermedad aparece temprano y condiciones favorables."
    ],
    causa: "Hongo Pseudocercospora vitis. Sobrevive en hojas caídas. Esporas dispersadas por viento/lluvia. Clima cálido y húmedo.",
    medidas_preventivas: [
      "Manejo de la canopia para secado rápido.",
      "Sanidad del viñedo, destrucción/incorporación de hojas infectadas.",
      "Evitar exceso de nitrógeno."
    ],
    plan_tratamiento: [
      "Monitoreo de hojas a partir de mediados de temporada.",
      "Si hay síntomas y condiciones favorables, aplicar fungicidas.",
      "Rotación de fungicidas."
    ],
    link_experto: "https://content.ces.ncsu.edu/pdf/chapter-8-pest-management/2014-10-16/winegrapes8.pdf",
    imagen: "https://bugwoodcloud.org/images/768x512/5405317.jpg"
  },
  {
    id: 14,
    class_name_en: "Grape___healthy",
    class_name_es: "Vid___Sana",
    nombre_mostrar: "Vid Sana",
    categoria: "Saludable",
    estado: "Sano",
    afecta_a: ["Uva"],
    nivel_severidad: "N/A",
    descripcion: "La planta de vid (uva) no presenta signos visibles de enfermedades o plagas. Muestra un crecimiento vigoroso y saludable.",
    sintomas: [
      "Follaje de color verde uniforme y sin manchas ni deformaciones.",
      "Sarmientos firmes y con desarrollo adecuado.",
      "Racimos (si presentes) bien formados y bayas de apariencia normal."
    ],
    recomendaciones_organico: [
      "Poda adecuada para mantener la forma y ventilación.",
      "Riego equilibrado según necesidades.",
      "Manejo del suelo para buena fertilidad y drenaje."
    ],
    tratamiento_quimico: [
      "No se requiere tratamiento químico para una planta sana.",
      "Fertilización basada en análisis de suelo si es necesario."
    ],
    causa: "Condiciones óptimas de cultivo, buen manejo agronómico y/o resistencia natural de la variedad.",
    medidas_preventivas: [
      "Selección de variedades resistentes a enfermedades comunes.",
      "Manejo de la canopia para buena exposición solar y aireación.",
      "Control de malezas."
    ],
    plan_tratamiento: [
      "Continuar con el monitoreo y las prácticas culturales preventivas.",
      "Ajustar el riego y la fertilización según la etapa fenológica.",
      "Realizar podas de mantenimiento y producción."
    ],
    link_experto: "https://www.extension.purdue.edu/extmedia/HO/HO-221-W.pdf",
    imagen: "https://healthyfamilyproject.com/wp-content/uploads/2020/05/Grapes-background.jpg"
  },
  {
    id: 15,
    class_name_en: "Orange___Haunglongbing_(Citrus_greening)",
    class_name_es: "Naranjo___Huanglongbing (HLB) o Dragón amarillo / Enverdecimiento de los cítricos",
    nombre_mostrar: "Huanglongbing (HLB) en Naranjo",
    categoria: "Bacteria",
    estado: "Infectada",
    afecta_a: ["Naranja"],
    nivel_severidad: "Alta",
    descripcion: "Enfermedad bacteriana devastadora que afecta a todos los tipos de cítricos. Es transmitida por insectos psílidos y no tiene cura conocida, llevando al declive y muerte del árbol.",
    sintomas: [
      "Hojas con moteado asimétrico (manchas amarillas no uniformes).",
      "Frutos pequeños, deformes, con inversión de color (verdes en la base, naranjas en el ápice) y sabor amargo.",
      "Engrosamiento y corchificación de las nervaduras foliares.",
      "Caída prematura de frutos y hojas, muerte regresiva de ramas."
    ],
    recomendaciones_organico: [
      "Control del insecto vector (psílido asiático de los cítricos) mediante enemigos naturales o insecticidas orgánicos (aceite de neem, jabón potásico) con eficacia limitada.",
      "Eliminación rápida de árboles infectados para reducir la fuente de inóculo."
    ],
    tratamiento_quimico: [
      "No existe cura química para la bacteria en el árbol.",
      "Control intensivo del psílido vector con insecticidas sistémicos y de contacto.",
      "Investigación en curso sobre tratamientos termoterapéuticos o antibióticos (uso restringido)."
    ],
    causa: "Bacteria 'Candidatus Liberibacter asiaticus' (principalmente). Transmitida por el psílido asiático de los cítricos (Diaphorina citri).",
    medidas_preventivas: [
      "Uso de material de propagación certificado libre de HLB.",
      "Control estricto del psílido vector.",
      "Monitoreo constante y eliminación de árboles sintomáticos.",
      "Cuarentenas y regulaciones para evitar la dispersión."
    ],
    plan_tratamiento: [
      "Detección temprana mediante inspección visual y pruebas moleculares.",
      "Erradicación de árboles infectados.",
      "Manejo regional coordinado del psílido vector.",
      "Mejora de la nutrición para mantener el vigor del árbol (no cura, pero puede retrasar declive)."
    ],
    link_experto: "https://www.planthealthaustralia.com.au/wp-content/uploads/2024/01/Huanglongbing-FS.pdf",
    imagen: "https://gmoanswers.com/sites/default/files/oranges.jpg"
  },
  {
    id: 16,
    class_name_en: "Peach___Bacterial_spot",
    class_name_es: "Duraznero___Mancha bacteriana del duraznero",
    nombre_mostrar: "Mancha bacteriana del duraznero",
    categoria: "Bacteria",
    estado: "Infectada",
    afecta_a: ["Durazno"],
    nivel_severidad: "Media a Alta",
    descripcion: "Enfermedad causada por la bacteria Xanthomonas arboricola pv. pruni, que afecta hojas, frutos y ramitas, siendo más severa en condiciones cálidas y húmedas.",
    sintomas: [
      "En hojas: Manchas pequeñas, angulares, de color púrpura oscuro a marrón, que pueden caer dejando un efecto de 'perdigonada' (shot-hole). Defoliación en casos severos.",
      "En frutos: Lesiones superficiales hundidas, a menudo con grietas y exudaciones gomosas.",
      "En ramitas: Cancros oscuros y hundidos en brotes jóvenes."
    ],
    recomendaciones_organico: [
      "Aplicaciones de cobre durante la dormancia y a baja concentración durante la temporada (riesgo de fitotoxicidad).",
      "Poda para mejorar la circulación de aire.",
      "Selección de variedades resistentes."
    ],
    tratamiento_quimico: [
      "Bactericidas a base de cobre (hidróxido de cobre, oxicloruro de cobre).",
      "Antibióticos como oxitetraciclina (su uso puede estar restringido y generar resistencia).",
      "Aplicaciones preventivas antes de periodos lluviosos."
    ],
    causa: "Bacteria Xanthomonas arboricola pv. pruni. Sobrevive en cancros de ramitas, yemas y hojas caídas. Se dispersa por lluvia y viento.",
    medidas_preventivas: [
      "Plantar variedades con mayor tolerancia o resistencia.",
      "Poda sanitaria para eliminar madera infectada.",
      "Evitar el riego por aspersión que moja el follaje.",
      "Mantener un buen estado nutricional de los árboles."
    ],
    plan_tratamiento: [
      "Dormancia: Aplicación de cobre.",
      "Brotación y desarrollo temprano: Aplicaciones preventivas de bactericidas si las condiciones son favorables.",
      "Monitoreo constante y eliminación de partes muy afectadas."
    ],
    link_experto: "https://utia.tennessee.edu/publications/wp-content/uploads/sites/269/2023/10/SP277-I.pdf",
    imagen: "https://fruitscout.ca.uky.edu/files/4b_bact_ls_fruit_clemson_usda_bgwd_1436079_crpd.jpg?itok=kNzp65W2"
  },
  {
    id: 17,
    class_name_en: "Peach___healthy",
    class_name_es: "Duraznero___Sano",
    nombre_mostrar: "Duraznero Sano",
    categoria: "Saludable",
    estado: "Sano",
    afecta_a: ["Durazno"],
    nivel_severidad: "N/A",
    descripcion: "El árbol de durazno no muestra signos de enfermedades o plagas, con follaje vigoroso y desarrollo adecuado.",
    sintomas: [
      "Hojas de color verde intenso y uniforme, sin manchas ni deformaciones.",
      "Corteza lisa, sin cancros ni exudaciones anormales.",
      "Buen desarrollo de flores y frutos (en temporada)."
    ],
    recomendaciones_organico: [
      "Poda anual para formación, producción y sanidad.",
      "Fertilización balanceada según análisis de suelo.",
      "Riego adecuado, especialmente durante la fructificación."
    ],
    tratamiento_quimico: [
      "No se requiere para un árbol sano.",
      "Tratamientos preventivos (e.g., cobre en dormancia) si hay historial de enfermedades en la zona."
    ],
    causa: "Buenas prácticas de cultivo, selección de variedades adaptadas, condiciones ambientales favorables.",
    medidas_preventivas: [
      "Seleccionar variedades resistentes a enfermedades comunes.",
      "Manejo adecuado del suelo y del riego.",
      "Control de plagas que puedan ser vectores de enfermedades."
    ],
    plan_tratamiento: [
      "Monitoreo regular durante la temporada de crecimiento.",
      "Ajustar prácticas culturales según sea necesario.",
      "Mantener la sanidad del huerto."
    ],
    link_experto: "https://advancedhealth.b-cdn.net/wp-content/uploads/2022/07/58-July-Peach-handout.pdf",
    imagen: "https://easthilltreefarm.com/cdn/shop/products/peaches.jpg?v=1634828310"
  },
  {
    id: 18,
    class_name_en: "Pepper,_bell___Bacterial_spot",
    class_name_es: "Pimiento___Mancha bacteriana del pimiento",
    nombre_mostrar: "Mancha bacteriana del pimiento",
    categoria: "Bacteria",
    estado: "Infectada",
    afecta_a: ["Pimiento"],
    nivel_severidad: "Media a Alta",
    descripcion: "Enfermedad bacteriana común que afecta hojas, tallos y frutos del pimiento, favorecida por alta humedad y temperaturas cálidas.",
    sintomas: [
      "En hojas: Manchas pequeñas, acuosas, que se vuelven marrones o negras, a menudo con un halo amarillento. Pueden caer dejando un aspecto de 'perdigonada'.",
      "En frutos: Lesiones elevadas, ásperas, de apariencia costrosa.",
      "En tallos: Lesiones alargadas y oscuras."
    ],
    recomendaciones_organico: [
      "Uso de variedades resistentes.",
      "Rotación de cultivos (no plantar solanáceas por 2-3 años).",
      "Aplicaciones preventivas de bactericidas a base de cobre (con precaución por fitotoxicidad)."
    ],
    tratamiento_quimico: [
      "Bactericidas a base de cobre (hidróxido de cobre, sulfato de cobre tribásico) combinados con mancozeb para mejorar eficacia y reducir riesgo de resistencia.",
      "Algunos productos con antibióticos (estreptomicina, kasugamicina) pueden estar disponibles pero su uso es restringido."
    ],
    causa: "Varias especies de Xanthomonas (e.g., X. euvesicatoria, X. vesicatoria, X. perforans, X. gardneri). Sobrevive en semillas infectadas, restos de plantas y malezas solanáceas.",
    medidas_preventivas: [
      "Usar semillas certificadas libres de patógenos.",
      "Eliminar restos de cosecha y malezas hospedantes.",
      "Evitar el trabajo en el cultivo cuando el follaje está húmedo.",
      "Mejorar la circulación de aire entre plantas."
    ],
    plan_tratamiento: [
      "Inspección regular de plántulas y plantas en campo.",
      "Aplicación de bactericidas al primer signo de enfermedad si las condiciones son favorables.",
      "Manejo integrado combinando prácticas culturales y químicas."
    ],
    link_experto: "https://portal.ct.gov/-/media/caes/documents/publications/fact_sheets/plant_pathology_and_ecology/bacterialspotofpepper032912pdf.pdf?rev=10b70328af7e481c8eb4dc897bebeab3&hash=D12B617A35481774D7653FA332121E6D",
    imagen: "https://csassets.static.wvu.edu/o2gpsy/50d2bf3d-125f-4b45-9c03-487959bd8344/0862b40bec913b574f1f05f79f2805c7/figure-2-tattered%20appearance%20on%20the%20affected%20leaves-893x595.jpg"
  },
  {
    id: 19,
    class_name_en: "Pepper,_bell___healthy",
    class_name_es: "Pimiento___Sano",
    nombre_mostrar: "Pimiento Sano",
    categoria: "Saludable",
    estado: "Sano",
    afecta_a: ["Pimiento"],
    nivel_severidad: "N/A",
    descripcion: "Planta de pimiento sin síntomas de enfermedades o plagas, con buen desarrollo vegetativo y productivo.",
    sintomas: [
      "Hojas de color verde brillante, sin manchas ni deformaciones.",
      "Tallos firmes y erguidos.",
      "Flores y frutos desarrollándose normalmente."
    ],
    recomendaciones_organico: [
      "Suelo bien drenado y rico en materia orgánica.",
      "Riego regular sin encharcamiento.",
      "Fertilización equilibrada."
    ],
    tratamiento_quimico: [
      "No se requiere para plantas sanas.",
      "Fertilización complementaria si es necesario según análisis de suelo."
    ],
    causa: "Manejo adecuado del cultivo, uso de variedades resistentes, condiciones ambientales óptimas.",
    medidas_preventivas: [
      "Selección de variedades resistentes a enfermedades locales.",
      "Rotación de cultivos.",
      "Control de malezas y plagas vectores."
    ],
    plan_tratamiento: [
      "Monitoreo continuo.",
      "Mantener buenas prácticas de higiene en el cultivo.",
      "Asegurar una nutrición adecuada."
    ],
    link_experto: "https://ucanr.edu/sites/default/files/2025-04/FactSheet_FruitVeg_Bell%20Peppers_2021.03.02.pdf",
    imagen: "https://i.insider.com/5b9c24c7672e167cf6716bd8?width=700"
  },
  {
    id: 20,
    class_name_en: "Potato___Early_blight",
    class_name_es: "Papa___Tizón temprano de la papa",
    nombre_mostrar: "Tizón temprano de la papa",
    categoria: "Hongo",
    estado: "Infectada",
    afecta_a: ["Papa"],
    nivel_severidad: "Media",
    descripcion: "Enfermedad fúngica causada por Alternaria solani, que afecta principalmente las hojas y, en menor medida, los tubérculos.",
    sintomas: [
      "En hojas: Manchas oscuras, necróticas, con anillos concéntricos característicos ('ojo de buey' o 'diana'). Las lesiones suelen comenzar en las hojas inferiores.",
      "Defoliación prematura si la infección es severa.",
      "En tubérculos: Lesiones superficiales, oscuras, ligeramente hundidas, de textura corchosa."
    ],
    recomendaciones_organico: [
      "Rotación de cultivos (evitar solanáceas por 2-3 años).",
      "Eliminación de restos de cosecha infectados.",
      "Uso de variedades tolerantes.",
      "Aplicaciones de fungicidas a base de cobre o Bacillus subtilis."
    ],
    tratamiento_quimico: [
      "Fungicidas protectores como mancozeb, clorotalonil.",
      "Fungicidas sistémicos o translaminar como azoxistrobina, piraclostrobina, difenoconazol.",
      "Aplicar preventivamente o al inicio de los síntomas."
    ],
    causa: "Hongo Alternaria solani. Sobrevive en restos de plantas infectadas, suelo y tubérculos semilla. Se dispersa por viento y salpicaduras de agua.",
    medidas_preventivas: [
      "Usar tubérculos semilla certificados y sanos.",
      "Mantener una buena nutrición de la planta, especialmente potasio.",
      "Evitar el estrés hídrico.",
      "Controlar malezas solanáceas."
    ],
    plan_tratamiento: [
      "Monitoreo regular del cultivo, especialmente después del cierre de hileras.",
      "Aplicación de fungicidas según modelos de predicción o umbrales de enfermedad.",
      "Rotación de fungicidas con diferentes modos de acción para evitar resistencia."
    ],
    link_experto: "https://www.canr.msu.edu/psbp/resources/early-blight-bulletin.pdf",
    imagen: "https://vegpath.plantpath.wisc.edu/wp-content/uploads/sites/210/2023/11/potato-early-blight-leaves.jpg"
  },
  {
    id: 21,
    class_name_en: "Potato___Late_blight",
    class_name_es: "Papa___Tizón tardío de la papa",
    nombre_mostrar: "Tizón tardío de la papa",
    categoria: "Hongo", // Falls under string
    estado: "Infectada",
    afecta_a: ["Papa"],
    nivel_severidad: "Alta",
    descripcion: "Enfermedad devastadora causada por el oomiceto Phytophthora infestans, capaz de destruir un cultivo en poco tiempo bajo condiciones favorables.",
    sintomas: [
      "En hojas y tallos: Lesiones grandes, irregulares, de color verde pálido a marrón oscuro, a menudo con apariencia acuosa. En condiciones de humedad, se observa un crecimiento blanquecino (esporangios) en el envés de las hojas.",
      "Olor característico a podrido en campos muy afectados.",
      "En tubérculos: Pudrición firme, de color marrón rojizo, que avanza desde la superficie hacia el interior."
    ],
    recomendaciones_organico: [
      "Uso de variedades resistentes (aunque la resistencia puede ser superada por nuevas razas del patógeno).",
      "Eliminación de fuentes de inóculo (plantas voluntarias, pilas de descarte).",
      "Aplicaciones preventivas de fungicidas a base de cobre."
    ],
    tratamiento_quimico: [
      "Fungicidas protectores (mancozeb, clorotalonil).",
      "Fungicidas sistémicos y translaminar específicos (cymoxanil, propamocarb, mandipropamid, fluopicolide, dimetomorf).",
      "Programa de aspersiones preventivas y curativas, guiado por sistemas de alerta."
    ],
    causa: "Oomiceto Phytophthora infestans. Sobrevive en tubérculos infectados (semilla, pilas de descarte, plantas voluntarias). Se dispersa rápidamente por viento y lluvia en condiciones frescas y húmedas.",
    medidas_preventivas: [
      "Usar tubérculos semilla certificados y sanos.",
      "Destruir plantas voluntarias y pilas de descarte antes de la emergencia del cultivo.",
      "Asegurar buen aporque para proteger los tubérculos.",
      "Seguir los sistemas de alerta de tizón tardío."
    ],
    plan_tratamiento: [
      "Monitoreo intensivo, especialmente durante periodos de riesgo.",
      "Aplicación de fungicidas preventivos antes de la aparición de síntomas si hay riesgo.",
      "Manejo agresivo con fungicidas curativos al primer signo.",
      "Destrucción del follaje antes de la cosecha para evitar infección de tubérculos."
    ],
    link_experto: "https://barron.extension.wisc.edu/files/2023/02/Potato-Late-Blight.pdf",
    imagen: "https://www.openaccessgovernment.org/wp-content/uploads/2018/12/dreamstime_xxl_116012675.jpg"
  },
  {
    id: 22,
    class_name_en: "Potato___healthy",
    class_name_es: "Papa___Sana",
    nombre_mostrar: "Papa Sana",
    categoria: "Saludable",
    estado: "Sano",
    afecta_a: ["Papa"],
    nivel_severidad: "N/A",
    descripcion: "Planta de papa creciendo vigorosamente, sin signos de enfermedades foliares o problemas en tubérculos.",
    sintomas: [
      "Follaje verde y turgente, sin manchas, mildiu o necrosis.",
      "Desarrollo adecuado de la planta según su ciclo.",
      "Tubérculos (si visibles o cosechados) firmes, con piel intacta y sin pudriciones."
    ],
    recomendaciones_organico: [
      "Suelo bien drenado, fértil y con buen contenido de materia orgánica.",
      "Rotación de cultivos.",
      "Uso de tubérculos semilla certificados."
    ],
    tratamiento_quimico: [
      "No se requiere para plantas sanas.",
      "Fertilización balanceada basada en análisis de suelo."
    ],
    causa: "Buenas prácticas de manejo, uso de material de siembra sano, condiciones ambientales desfavorables para patógenos.",
    medidas_preventivas: [
      "Selección de variedades resistentes a enfermedades prevalentes.",
      "Manejo adecuado del riego para evitar exceso de humedad.",
      "Control de insectos vectores de virus."
    ],
    plan_tratamiento: [
      "Monitoreo regular del cultivo.",
      "Mantener la sanidad del suelo.",
      "Prácticas de cosecha y almacenamiento adecuadas para prevenir enfermedades post-cosecha."
    ],
    link_experto: "https://europatat.eu/wp-content/uploads/2024/04/Literature-review-Potato-nutrition_final-publication.pdf",
    imagen: "https://teamboma.com/member/uploads2/depositphotos-84942502-stock-photo-potatoes-on-wooden-background.jpg"
  },
  {
    id: 23,
    class_name_en: "Raspberry___healthy",
    class_name_es: "Frambuesa___Sana",
    nombre_mostrar: "Frambuesa Sana",
    categoria: "Saludable",
    estado: "Sano",
    afecta_a: ["Frambuesa"],
    nivel_severidad: "N/A",
    descripcion: "Planta de frambuesa sin síntomas de enfermedades o estrés por plagas, mostrando un crecimiento saludable.",
    sintomas: [
      "Cañas vigorosas y de color normal.",
      "Hojas verdes, sin manchas, óxido o mildiu.",
      "Buen desarrollo de flores y frutos."
    ],
    recomendaciones_organico: [
      "Suelo bien drenado y ligeramente ácido.",
      "Poda anual para eliminar cañas viejas y mejorar la ventilación.",
      "Mulch para conservar humedad y controlar malezas."
    ],
    tratamiento_quimico: [
      "No necesario para plantas sanas.",
      "Fertilización según necesidades del suelo."
    ],
    causa: "Manejo adecuado, selección de variedades resistentes, buenas condiciones de crecimiento.",
    medidas_preventivas: [
      "Plantar en un sitio con buena circulación de aire y exposición solar.",
      "Comprar plantas certificadas libres de virus.",
      "Riego adecuado, evitando mojar el follaje excesivamente."
    ],
    plan_tratamiento: [
      "Monitoreo regular.",
      "Poda y raleo adecuados.",
      "Manejo de la fertilidad del suelo."
    ],
    link_experto: "https://www.purdue.edu/hla/sites/yardandgarden/wp-content/uploads/sites/2/2016/10/HO-44.pdf",
    imagen: "https://www.frotzfruits.com/wp-content/uploads/2021/10/FRAMBUESA-FROTZ-ETIQUETA.jpg"
  },
  {
    id: 24,
    class_name_en: "Soybean___healthy",
    class_name_es: "Soja___Sana",
    nombre_mostrar: "Soja Sana",
    categoria: "Saludable",
    estado: "Sano",
    afecta_a: ["Soja"],
    nivel_severidad: "N/A",
    descripcion: "Planta de soja con desarrollo normal, libre de síntomas de enfermedades o deficiencias nutricionales.",
    sintomas: [
      "Follaje verde y uniforme.",
      "Buen desarrollo de nódulos radiculares (si aplica).",
      "Desarrollo adecuado de vainas y granos."
    ],
    recomendaciones_organico: [
      "Rotación de cultivos.",
      "Manejo adecuado de la densidad de siembra.",
      "Inoculación con Bradyrhizobium japonicum si es necesario."
    ],
    tratamiento_quimico: [
      "No se requiere para plantas sanas.",
      "Fertilización basada en análisis de suelo y requerimientos del cultivo."
    ],
    causa: "Buenas prácticas agrícolas, uso de variedades resistentes, condiciones climáticas favorables.",
    medidas_preventivas: [
      "Selección de variedades con resistencia a enfermedades clave.",
      "Tratamiento de semillas con fungicidas si hay presión de enfermedades de plántula.",
      "Manejo de malezas."
    ],
    plan_tratamiento: [
      "Monitoreo del cultivo durante todas las etapas de desarrollo.",
      "Ajuste de prácticas de manejo según las condiciones.",
      "Cosecha oportuna."
    ],
    link_experto: "https://www.n2africa.org/sites/default/files/r386%20N2Africa%20Tanzania%20soybean%20booklet.pdf",
    imagen: "https://www.world-grain.com/ext/resources/2022/04/12/Soybean_AdobeStock_28241089_E.jpg?height=667&t=1713359046&width=1080"
  },
  {
    id: 25,
    class_name_en: "Squash___Powdery_mildew",
    class_name_es: "Calabaza___Oídio de la calabaza",
    nombre_mostrar: "Oídio de la calabaza",
    categoria: "Hongo",
    estado: "Infectada",
    afecta_a: ["Calabaza"],
    nivel_severidad: "Media a Alta",
    descripcion: "Enfermedad fúngica muy común en cucurbitáceas, caracterizada por un crecimiento blanco y pulverulento en hojas, tallos y pecíolos.",
    sintomas: [
      "Manchas blancas y pulverulentas en la superficie de las hojas (generalmente primero en el haz).",
      "Las hojas afectadas pueden volverse amarillas, marrones y secarse.",
      "Reducción del vigor de la planta y del tamaño y calidad de los frutos."
    ],
    recomendaciones_organico: [
      "Uso de variedades resistentes o tolerantes.",
      "Aplicaciones de azufre mojable (cuidado con altas temperaturas y sensibilidad de algunas variedades).",
      "Bicarbonato de potasio, aceite de neem, o fungicidas biológicos (e.g., Bacillus subtilis)."
    ],
    tratamiento_quimico: [
      "Fungicidas específicos como inhibidores de DMI (miclobutanil, tebuconazol), estrobilurinas (azoxistrobina), o productos con otros modos de acción (quinoxifen, metrafenona).",
      "Aplicar al primer signo de la enfermedad y rotar fungicidas."
    ],
    causa: "Principalmente Podosphaera xanthii (syn. Sphaerotheca fuliginea) y Erysiphe cichoracearum. Favorecida por alta humedad (no necesariamente lluvia) y temperaturas moderadas.",
    medidas_preventivas: [
      "Plantar en lugares con buena circulación de aire y exposición solar.",
      "Espaciamiento adecuado entre plantas.",
      "Evitar el exceso de fertilización nitrogenada.",
      "Eliminar restos de plantas infectadas al final de la temporada."
    ],
    plan_tratamiento: [
      "Inspección regular del cultivo, especialmente hojas más viejas.",
      "Aplicación de fungicidas preventivos u curativos tempranos.",
      "Manejo de la resistencia a fungicidas mediante rotación de productos."
    ],
    link_experto: "https://buttercupsquashnz.wordpress.com/wp-content/uploads/2018/07/crop-food-research-pamphlet-2001-powdery-mildew-in-squash.pdf",
    imagen: "https://www.garden.eco/wp-content/uploads/2017/11/title-powdery-mildew-can-stopped.jpg.jpg"
  },
  {
    id: 26,
    class_name_en: "Strawberry___Leaf_scorch",
    class_name_es: "Fresa___Quemadura de la hoja de la fresa",
    nombre_mostrar: "Quemadura de la hoja de la fresa",
    categoria: "Hongo",
    estado: "Infectada",
    afecta_a: ["Fresa"],
    nivel_severidad: "Media",
    descripcion: "Enfermedad fúngica causada por Diplocarpon earlianum, que produce manchas púrpuras en las hojas y puede afectar el vigor de la planta.",
    sintomas: [
      "Manchas pequeñas, irregulares, de color púrpura oscuro en el haz de las hojas.",
      "Las manchas pueden fusionarse, y el tejido central puede volverse marrón.",
      "En infecciones severas, las hojas pueden parecer quemadas y morir.",
      "Pecíolos y cálices también pueden ser afectados."
    ],
    recomendaciones_organico: [
      "Plantar variedades resistentes.",
      "Renovación de plantaciones (eliminar hojas viejas después de la cosecha).",
      "Mejorar la circulación de aire.",
      "Aplicaciones de fungicidas a base de cobre (con precaución)."
    ],
    tratamiento_quimico: [
      "Fungicidas protectores como captan, tiofanato-metilo.",
      "Algunas estrobilurinas (piraclostrobina) o inhibidores de DMI pueden ser efectivos.",
      "Aplicar preventivamente en primavera y después de la renovación."
    ],
    causa: "Hongo Diplocarpon earlianum. Sobrevive en hojas infectadas (vivas o muertas). Las esporas se dispersan por salpicaduras de lluvia.",
    medidas_preventivas: [
      "Mantener un buen espaciamiento entre plantas.",
      "Evitar el riego por aspersión o regar temprano en el día para que las hojas se sequen rápido.",
      "Eliminar y destruir hojas infectadas.",
      "Fertilización balanceada."
    ],
    plan_tratamiento: [
      "Inspección en primavera para detectar primeros síntomas.",
      "Aplicación de fungicidas si la enfermedad fue un problema el año anterior o si las condiciones son favorables.",
      "Manejo post-cosecha de las hojas."
    ],
    link_experto: "https://s3.amazonaws.com/assets.cce.cornell.edu/attachments/21543/strawleafscorchfs.pdf?1490125224",
    imagen: "https://content.ces.ncsu.edu/media/images/17531_IMG_2131.jpg"
  },
  {
    id: 27,
    class_name_en: "Strawberry___healthy",
    class_name_es: "Fresa___Sana",
    nombre_mostrar: "Fresa Sana",
    categoria: "Saludable",
    estado: "Sano",
    afecta_a: ["Fresa"],
    nivel_severidad: "N/A",
    descripcion: "Planta de fresa vigorosa, sin signos de enfermedades foliares, de raíz o de fruto.",
    sintomas: [
      "Hojas verdes, brillantes y bien desarrolladas.",
      "Coronas sanas y sin pudriciones.",
      "Producción adecuada de flores y frutos de buena calidad."
    ],
    recomendaciones_organico: [
      "Suelo bien drenado, rico en materia orgánica y con pH adecuado (ligeramente ácido).",
      "Mulch para controlar malezas, conservar humedad y mantener limpios los frutos.",
      "Rotación de cultivos."
    ],
    tratamiento_quimico: [
      "No se requiere para plantas sanas.",
      "Fertilización según análisis de suelo."
    ],
    causa: "Buenas prácticas de cultivo, uso de plantas sanas certificadas, selección de variedades adaptadas.",
    medidas_preventivas: [
      "Comprar plantas de viveros reputados, libres de enfermedades.",
      "Mantener buena circulación de aire.",
      "Riego adecuado, preferiblemente por goteo."
    ],
    plan_tratamiento: [
      "Monitoreo regular de plagas y enfermedades.",
      "Renovación de camas de fresas según sea necesario.",
      "Manejo adecuado de la fertilidad."
    ],
    link_experto: "https://www.wifss.ucdavis.edu/wp-content/uploads/2016/10/Strawberries_PDF.pdf",
    imagen: "https://hips.hearstapps.com/hmg-prod/images/how-to-grow-strawberries-1675303673.jpg"
  },
  {
    id: 28,
    class_name_en: "Tomato___Bacterial_spot",
    class_name_es: "Tomate___Mancha bacteriana del tomate",
    nombre_mostrar: "Mancha bacteriana del tomate",
    categoria: "Bacteria",
    estado: "Infectada",
    afecta_a: ["Tomate"],
    nivel_severidad: "Media a Alta",
    descripcion: "Enfermedad bacteriana que causa lesiones en hojas, tallos y frutos, favorecida por clima cálido y húmedo.",
    sintomas: [
      "En hojas: Manchas pequenas, oscuras, acuosas, a menudo con un halo amarillento. Las lesiones pueden ser irregulares o angulares.",
      "En frutos: Manchas pequenas, elevadas, con apariencia de costra, a veces con un halo acuoso.",
      "Defoliación y reducción del rendimiento en casos severos."
    ],
    recomendaciones_organico: [
      "Uso de variedades resistentes.",
      "Rotación de cultivos (evitar solanáceas por 2-3 años).",
      "Aplicaciones preventivas de bactericidas a base de cobre (con precaución)."
    ],
    tratamiento_quimico: [
      "Bactericidas a base de cobre (hidróxido de cobre, oxicloruro de cobre) a menudo mezclados con mancozeb.",
      "Productos a base de Actigard (acibenzolar-S-metil) pueden inducir resistencia sistémica.",
      "Manejo de la resistencia bacteriana alternando productos."
    ],
    causa: "Varias especies de Xanthomonas (principalmente X. perforans, X. vesicatoria, X. euvesicatoria, X. gardneri). Sobrevive en semillas, restos de plantas y malezas solanáceas.",
    medidas_preventivas: [
      "Usar semillas y trasplantes certificados libres de patógenos.",
      "Eliminar restos de cosecha y malezas.",
      "Evitar trabajar en plantas mojadas.",
      "Riego por goteo preferible al riego por aspersión."
    ],
    plan_tratamiento: [
      "Inspección regular de síntomas.",
      "Aplicación de bactericidas al inicio de la enfermedad si las condiciones son favorables.",
      "Combinar métodos culturais y químicos."
    ],
    link_experto: "https://portal.ct.gov/-/media/caes/documents/publications/fact_sheets/plant_pathology_and_ecology/2018/bacterialspotoftomatopdf.pdf?rev=28d3976398d446409ed74bad27273d50&hash=1F46E408C31BE23F3BEF9B991ABC0A35",
    imagen: "https://d3qz1qhhp9wxfa.cloudfront.net/growingproduce/wp-content/uploads/2019/08/bacterial_spot_tomato.jpg"
  },
  {
    id: 29,
    class_name_en: "Tomato___Early_blight",
    class_name_es: "Tomate___Tizón temprano del tomate",
    nombre_mostrar: "Tizón temprano del tomate",
    categoria: "Hongo",
    estado: "Infectada",
    afecta_a: ["Tomate"],
    nivel_severidad: "Media",
    descripcion: "Enfermedad fúngica común (Alternaria solani) que afecta hojas, tallos y frutos, generalmente comenzando en las hojas inferiores.",
    sintomas: [
      "Manchas oscuras en las hojas con anillos concéntricos distintivos ('ojo de buey').",
      "Las hojas afectadas amarillean y caen.",
      "Lesiones oscuras y hundidas en tallos ('collar rot' en plántulas).",
      "Pudrición oscura y correosa en el extremo del tallo de los frutos."
    ],
    recomendaciones_organico: [
      "Rotación de cultivos.",
      "Eliminación de restos de plantas infectadas.",
      "Uso de variedades tolerantes.",
      "Fungicidas a base de cobre o Bacillus subtilis."
    ],
    tratamiento_quimico: [
      "Fungicidas protectores como mancozeb, clorotalonil.",
      "Fungicidas sistémicos/translaminar como azoxistrobina, piraclostrobina, difenoconazol.",
      "Aplicar preventivamente o al inicio de los síntomas."
    ],
    causa: "Hongo Alternaria solani. Sobrevive en restos de plantas, suelo y semillas. Favorecido por clima cálido y húmedo.",
    medidas_preventivas: [
      "Usar semillas y trasplantes sanos.",
      "Mantener buena circulación de aire (poda, espaciamiento).",
      "Evitar el estrés de las plantas (riego y fertilización adecuados).",
      "Mulching para reducir salpicaduras de esporas del suelo."
    ],
    plan_tratamiento: [
      "Monitoreo regular, especialmente de hojas inferiores.",
      "Aplicación de fungicidas según sea necesario, rotando modos de acción.",
      "Eliminación de plantas severamente afectadas."
    ],
    link_experto: "https://portal.ct.gov/-/media/caes/documents/publications/fact_sheets/plant_pathology_and_ecology/earlyblightoftomato032912pdf.pdf?rev=94a01f12251e46a79678a28e981a3bb2&hash=95D8D7EA2A35C0D0665A452E4BD094D0",
    imagen: "https://bpb-us-e1.wpmucdn.com/blogs.cornell.edu/dist/8/5755/files/2019/09/tomato-early-blight1x2400.jpg"
  },
  {
    id: 30,
    class_name_en: "Tomato___Late_blight",
    class_name_es: "Tomate___Tizón tardío del tomate",
    nombre_mostrar: "Tizón tardío del tomate",
    categoria: "Hongo", // Falls under string
    estado: "Infectada",
    afecta_a: ["Tomate"],
    nivel_severidad: "Alta",
    descripcion: "Enfermedad devastadora causada por Phytophthora infestans, capaz de destruir rápidamente el cultivo en condiciones frescas y húmedas.",
    sintomas: [
      "Lesiones grandes, acuosas, de color verde oscuro a marrón en hojas y tallos.",
      "Crecimiento de moho blanquecino en el envés de las hojas bajo alta humedad.",
      "Pudrición firme, de color marrón oscuro, en los frutos.",
      "Olor característico a podrido en infestaciones severas."
    ],
    recomendaciones_organico: [
      "Uso de variedades resistentes (con precaución, la resistencia puede ser superada).",
      "Eliminación de fuentes de inóculo (plantas voluntarias de papa/tomate).",
      "Aplicaciones preventivas de fungicidas a base de cobre."
    ],
    tratamiento_quimico: [
      "Programa de aspersión con fungicidas protectores (clorotalonil, mancozeb) y sistémicos/translaminar (cymoxanil, propamocarb, mandipropamid, fluopicolide).",
      "Seguir los sistemas de alerta y predicción de la enfermedad."
    ],
    causa: "Oomiceto Phytophthora infestans. Se propaga por esporas transportadas por el viento y la lluvia. Requiere alta humedad y temperaturas frescas.",
    medidas_preventivas: [
      "Comprar trasplantes sanos y certificados.",
      "Destruir plantas voluntarias y restos de cosecha infectados.",
      "Asegurar buena circulación de aire.",
      "Evitar el riego por aspersión tardío en el día."
    ],
    plan_tratamiento: [
      "Monitoreo intensivo, especialmente durante períodos de riesgo.",
      "Aplicación de fungicidas preventivos antes de la aparición de síntomas si hay riesgo.",
      "Manejo agresivo con fungicidas curativos al primer signo.",
      "Destrucción de plantas infectadas para limitar la propagación."
    ],
    link_experto: "https://plantpathology.ces.ncsu.edu/wp-content/uploads/2013/06/Tomato_late_blight_ki.pdf?fwd=no",
    imagen: "https://www.missouribotanicalgarden.org/Portals/0/Gardening/Gardening%20Help/images/Pests/Pest2377.jpg"
  },
  {
    id: 31,
    class_name_en: "Tomato___Leaf_Mold",
    class_name_es: "Tomate___Moho de la hoja del tomate",
    nombre_mostrar: "Moho de la hoja del tomate",
    categoria: "Hongo",
    estado: "Infectada",
    afecta_a: ["Tomate"],
    nivel_severidad: "Media",
    descripcion: "Enfermedad fúngica (Passalora fulva) que afecta principalmente las hojas del tomate, común en condiciones de alta humedad, como en invernaderos.",
    sintomas: [
      "Manchas de color amarillo pálido o verde claro en el haz de las hojas.",
      "Crecimiento de moho aterciopelado de color oliva a marrón en el envés de las hojas, correspondiente a las manchas del haz.",
      "Las hojas severamente afectadas pueden enrollarse, marchitarse y caer."
    ],
    recomendaciones_organico: [
      "Uso de variedades resistentes.",
      "Mejorar la ventilación y reducir la humedad (especialmente en invernaderos).",
      "Poda de hojas inferiores para mejorar la circulación del aire.",
      "Aplicaciones de fungicidas a base de cobre o azufre (con precaución)."
    ],
    tratamiento_quimico: [
      "Fungicidas como clorotalonil, mancozeb.",
      "Algunos fungicidas sistémicos pueden ser efectivos, pero la resistencia es un problema.",
      "Alternar modos de acción de los fungicidas."
    ],
    causa: "Hongo Passalora fulva (syn. Fulvia fulva). Favorecido por alta humedad relativa (>85%) y temperaturas moderadas.",
    medidas_preventivas: [
      "Seleccionar variedades resistentes.",
      "Asegurar un buen espaciamiento entre plantas.",
      "Manejo de la humedad en invernaderos (ventilación, evitar condensación).",
      "Riego en la base de la planta, evitando mojar el follaje."
    ],
    plan_tratamiento: [
      "Monitoreo regular, especialmente en condiciones de alta humedad.",
      "Aplicación de fungicidas al detectar los primeros síntomas.",
      "Eliminación de hojas muy infectadas."
    ],
    link_experto: "https://rvpadmin.cce.cornell.edu/uploads/doc_128.pdf",
    imagen: "https://bpb-us-e1.wpmucdn.com/blogs.cornell.edu/dist/8/5755/files/2021/02/image002-1.jpg"
  },
  {
    id: 32,
    class_name_en: "Tomato___Septoria_leaf_spot",
    class_name_es: "Tomate___Septoria del tomate (Mancha foliar por Septoria)",
    nombre_mostrar: "Mancha foliar por Septoria en Tomate",
    categoria: "Hongo",
    estado: "Infectada",
    afecta_a: ["Tomate"],
    nivel_severidad: "Media",
    descripcion: "Enfermedad fúngica (Septoria lycopersici) que causa numerosas manchas pequenas en las hojas, llevando a defoliación.",
    sintomas: [
      "Manchas pequenas (1-3 mm), circulares, con centros de color gris o canela y bordes marrones oscuros.",
      "Presencia de pequenos puntos negros (picnidios del hongo) en el centro de las lesiones.",
      "Las lesiones aparecen primero en las hojas inferiores y progresan hacia arriba.",
      "Defoliación severa puede exponer los frutos a quemaduras solares."
    ],
    recomendaciones_organico: [
      "Rotación de cultivos (3 años sin solanáceas).",
      "Eliminación de restos de plantas infectadas.",
      "Mulching para reducir salpicaduras de esporas.",
      "Fungicidas a base de cobre o Bacillus subtilis."
    ],
    tratamiento_quimico: [
      "Fungicidas protectores como clorotalonil, mancozeb.",
      "Algunas estrobilurinas o inhibidores de DMI pueden ser efectivos.",
      "Aplicar al inicio de los síntomas y repetir según sea necesario."
    ],
    causa: "Hongo Septoria lycopersici. Sobrevive en restos de plantas infectadas, malezas solanáceas y, a veces, en semillas. Favorecido por clima húmedo y temperaturas moderadas.",
    medidas_preventivas: [
      "Usar semillas y trasplantes sanos.",
      "Mejorar la circulación de aire (espaciamiento, poda).",
      "Evitar el riego por aspersión o regar temprano.",
      "Control de malezas solanáceas."
    ],
    plan_tratamiento: [
      "Monitoreo regular, especialmente de hojas inferiores.",
      "Aplicación de fungicidas cuando la enfermedad aparece y las condiciones son favorables.",
      "Eliminación de hojas muy infectadas para reducir el inóculo."
    ],
    link_experto: "https://portal.ct.gov/-/media/caes/documents/publications/fact_sheets/plant_pathology_and_ecology/septorialeafspotoftomato063008rpdf.pdf?rev=41c9655b310e4dd1b28a08c7cabe878c&hash=BC43D7AF85FE90FEF3B7CB4742AFE15B",
    imagen: "https://www.missouribotanicalgarden.org/Portals/0/Gardening/Gardening%20Help/images/Pests/Septoria_Leaf_Spot_of_Tomato186.jpg"
  },
  {
    id: 33,
    class_name_en: "Tomato___Spider_mites Two-spotted_spider_mite",
    class_name_es: "Tomate___Ácaros (Araña roja)",
    nombre_mostrar: "Ácaros (Araña roja) en Tomate",
    categoria: "Ácaro",
    estado: "Infestada",
    afecta_a: ["Tomate"],
    nivel_severidad: "Media a Alta",
    descripcion: "Pequenos arácnidos (Tetranychus urticae) que se alimentan de la savia de las plantas, causando punteado en las hojas y, en infestaciones severas, la formación de telarañas.",
    sintomas: [
      "Punteado fino de color amarillo o blanco en el haz de las hojas.",
      "Las hojas pueden adquirir un aspecto bronceado o plateado.",
      "En infestaciones fuertes, se observan finas telarañas en hojas y brotes.",
      "Los ácaros son diminutos y se encuentran principalmente en el envés de las hojas (visibles con lupa)."
    ],
    recomendaciones_organico: [
      "Liberación de ácaros depredadores (e.g., Phytoseiulus persimilis).",
      "Aspersiones con agua jabonosa o aceite de neem.",
      "Mantener alta humedad puede ayudar a reducir su reproducción (con cuidado de no favorecer hongos)."
    ],
    tratamiento_quimico: [
      "Acaricidas específicos (e.g., abamectina, spiromesifen, etoxazol, bifenezato).",
      "Es crucial rotar los modos de acción para evitar la resistencia, que es común en esta plaga.",
      "Asegurar buena cobertura del envés de las hojas."
    ],
    causa: "Ácaro Tetranychus urticae (araña roja de dos manchas). Favorecido por condiciones cálidas y secas. Rápido ciclo de vida.",
    medidas_preventivas: [
      "Monitoreo regular, especialmente en condiciones secas y cálidas.",
      "Evitar el estrés hídrico de las plantas.",
      "Control de malezas que puedan hospedar ácaros.",
      "Evitar el uso excesivo de insecticidas de amplio espectro que eliminan enemigos naturales."
    ],
    plan_tratamiento: [
      "Detección temprana mediante inspección del envés de las hojas.",
      "Aplicación de acaricidas cuando las poblaciones comienzan a aumentar.",
      "Considerar el control biológico como primera opción si es viable."
    ],
    link_experto: "https://thescipub.com/pdf/ajabssp.2024.8.15.pdf",
    imagen: "https://plantpath.ifas.ufl.edu/u-scout/tomato/images/spider-mite-damage/22161DD2C3964DF39A98F053EB87FBF3/7-22.png"
  },
  {
    id: 34,
    class_name_en: "Tomato___Target_Spot",
    class_name_es: "Tomate___Mancha diana del tomate (Corynespora)",
    nombre_mostrar: "Mancha diana del tomate (Corynespora)",
    categoria: "Hongo",
    estado: "Infectada",
    afecta_a: ["Tomate"],
    nivel_severidad: "Media",
    descripcion: "Enfermedad fúngica causada por Corynespora cassiicola, que produce lesiones características en hojas, tallos y frutos.",
    sintomas: [
      "En hojas: Manchas necróticas de color marrón claro a oscuro, a menudo con anillos concéntricos que le dan un aspecto de 'diana'. Las lesiones pueden tener un halo amarillo.",
      "En frutos: Lesiones hundidas, oscuras, que pueden agrietarse.",
      "Defoliación en casos severos."
    ],
    recomendaciones_organico: [
      "Rotación de cultivos.",
      "Eliminación de restos de plantas infectadas.",
      "Mejorar la circulación de aire.",
      "Fungicidas a base de cobre pueden ofrecer cierta protección."
    ],
    tratamiento_quimico: [
      "Fungicidas protectores como mancozeb, clorotalonil.",
      "Algunas estrobilurinas (azoxistrobina) o triazoles pueden ser efectivos.",
      "Aplicar preventivamente o al inicio de los síntomas."
    ],
    causa: "Hongo Corynespora cassiicola. Amplio rango de hospedantes. Sobrevive en restos de plantas y se dispersa por viento y salpicaduras de agua. Favorecido por clima cálido y húmedo.",
    medidas_preventivas: [
      "Usar semillas y trasplantes sanos.",
      "Mantener buena sanidad en el cultivo.",
      "Evitar el estrés de las plantas.",
      "Controlar malezas hospedantes."
    ],
    plan_tratamiento: [
      "Monitoreo regular del cultivo.",
      "Aplicación de fungicidas si la enfermedad es detectada y las condiciones son favorables.",
      "Rotación de fungicidas para manejar la resistencia."
    ],
    link_experto: "https://apps.lucidcentral.org/pppw_v10/pdf/web_mini/tomato_target_spot_163.pdf",
    imagen: "https://apps.lucidcentral.org/pppw_v10/images/entities/tomato_target_spot_163/img_3478a.jpg"
  },
  {
    id: 35,
    class_name_en: "Tomato___Tomato_Yellow_Leaf_Curl_Virus",
    class_name_es: "Tomate___Virus del enrollamiento amarillo de la hoja (TYLCV)",
    nombre_mostrar: "Virus del enrollamiento amarillo de la hoja del tomate (TYLCV)",
    categoria: "Virus",
    estado: "Infectada",
    afecta_a: ["Tomate"],
    nivel_severidad: "Alta",
    descripcion: "Enfermedad viral devastadora transmitida por la mosca blanca (Bemisia tabaci). Causa severo enanismo, enrollamiento y amarillamiento de las hojas.",
    sintomas: [
      "Enrollamiento hacia arriba de los bordes de las hojas, que se vuelven coriáceas.",
      "Amarillamiento internerval o generalizado de las hojas.",
      "Achaparramiento severo de la planta, especialmente si la infección es temprana.",
      "Reducción drástica en el cuajado y tamano de los frutos."
    ],
    recomendaciones_organico: [
      "Control del vector (mosca blanca) mediante barreras físicas (mallas anti-insectos), trampas pegajosas amarillas, y enemigos naturales (con eficacia limitada en altas poblaciones).",
      "Eliminación inmediata de plantas infectadas."
    ],
    tratamiento_quimico: [
      "No hay tratamiento curativo para el virus en la planta.",
      "Control intensivo de la mosca blanca vector con insecticidas sistémicos y de contacto (e.g., neonicotinoides, piretroides, reguladores de crecimiento de insectos).",
      "Es crucial rotar insecticidas para manejar la resistencia del vector."
    ],
    causa: "Varias especies de Begomovirus, siendo TYLCV uno de los más importantes. Transmitido de manera persistente por la mosca blanca Bemisia tabaci.",
    medidas_preventivas: [
      "Uso de variedades de tomate resistentes o tolerantes al TYLCV.",
      "Producción de plántulas en semilleros protegidos con mallas anti-insectos.",
      "Control de mosca blanca en cultivos adyacentes y malezas hospedantes.",
      "Establecer periodos libres de hospederos."
    ],
    plan_tratamiento: [
      "Prevención mediante el manejo integrado del vector.",
      "Eliminación rápida de plantas con síntomas para reducir la fuente de virus.",
      "Protección de cultivos jóvenes con insecticidas o barreras físicas."
    ],
    link_experto: "https://www.ctahr.hawaii.edu/oc/freepubs/pdf/pd-70.pdf",
    imagen: "https://www.cabidigitallibrary.org/cms/10.1079/cabicompendium.55402/asset/c58572e1-ec72-4daf-900d-a4e9ac308f7f/assets/graphic/attat1a.jpg"
  },
  {
    id: 36,
    class_name_en: "Tomato___Tomato_mosaic_virus",
    class_name_es: "Tomate___Virus del mosaico del tomate (TMV)",
    nombre_mostrar: "Virus del mosaico del tomate (TMV)",
    categoria: "Virus",
    estado: "Infectada",
    afecta_a: ["Tomate"],
    nivel_severidad: "Media",
    descripcion: "Virus altamente infeccioso y estable (Tobamovirus) que causa síntomas de mosaico en las hojas y puede afectar el desarrollo de la planta y los frutos.",
    sintomas: [
      "Patrón de mosaico con áreas de color verde claro y oscuro en las hojas.",
      "Deformación de hojas (rizado, encrespamiento, filiformismo).",
      "Enanismo de la planta.",
      "Posible necrosis en hojas, tallos o frutos, dependiendo de la cepa del virus y las condiciones.",
      "Reducción en la calidad y cantidad de frutos."
    ],
    recomendaciones_organico: [
      "Uso de variedades resistentes.",
      "Eliminación de plantas infectadas.",
      "Desinfección de herramientas y manos (e.g., con leche descremada o fosfato trisódico).",
      "Evitar el uso de tabaco cerca de las plantas de tomate."
    ],
    tratamiento_quimico: [
      "No hay tratamiento químico curativo para las plantas infectadas por virus.",
      "El control se enfoca en la prevención y sanidad."
    ],
    causa: "Virus del mosaico del tomate (TMV) y virus relacionados como el Virus del mosaico del tabaco. Se transmite mecánicamente por contacto (manos, herramientas, ropa contaminada), y a veces por semilla.",
    medidas_preventivas: [
      "Usar semillas certificadas libres de virus o tratarlas térmicamente.",
      "Lavar bien las manos y desinfectar herramientas antes y durante el manejo de las plantas.",
      "No fumar ni usar productos de tabaco al trabajar con tomates.",
      "Controlar malezas hospedantes."
    ],
    plan_tratamiento: [
      "Identificación y eliminación cuidadosa de plantas sintomáticas.",
      "Prácticas estrictas de higiene durante todo el ciclo del cultivo.",
      "Rotación de cultivos no es efectiva ya que el virus puede persistir en restos vegetales."
    ],
    link_experto: "https://www.hilarispublisher.com/open-access/the-impact-of-tomato-mosaic-virus-on-crop-yields-and-agricultural-practices.pdf",
    imagen: "https://blogs.ifas.ufl.edu/stlucieco/files/2023/03/1-29.png"
  },
  {
    id: 37,
    class_name_en: "Tomato___healthy",
    class_name_es: "Tomate___Sano",
    nombre_mostrar: "Tomate Sano",
    categoria: "Saludable",
    estado: "Sano",
    afecta_a: ["Tomate"],
    nivel_severidad: "N/A",
    descripcion: "Planta de tomate sin signos de enfermedades, plagas o deficiencias nutricionales, mostrando un crecimiento y desarrollo vigoroso.",
    sintomas: [
      "Follaje de color verde uniforme, sin manchas, mosaicos o deformaciones.",
      "Tallos fuertes y bien desarrollados.",
      "Buen cuajado de frutos y desarrollo normal de los mismos."
    ],
    recomendaciones_organico: [
      "Suelo bien preparado, con buen drenaje y rico en materia orgánica.",
      "Riego regular y adecuado a las necesidades de la planta.",
      "Fertilización balanceada."
    ],
    tratamiento_quimico: [
      "No se requiere para plantas sanas.",
      "Fertilización complementaria según análisis de suelo si es necesario."
    ],
    causa: "Manejo óptimo del cultivo, uso de variedades resistentes o tolerantes, condiciones ambientales favorables.",
    medidas_preventivas: [
      "Selección de variedades adaptadas y con resistencia a enfermedades locales.",
      "Rotación de cultivos.",
      "Uso de trasplantes sanos.",
      "Manejo adecuado de la ventilación y humedad."
    ],
    plan_tratamiento: [
      "Monitoreo constante del cultivo.",
      "Mantener prácticas de higiene para evitar la introducción de patógenos.",
      "Asegurar una nutrición equilibrada y un riego adecuado."
    ],
    link_experto: "https://ctga.org/wp-content/uploads/2022/11/health4.pdf",
    imagen: "https://mejorconsalud.as.com/wp-content/uploads/2018/07/tomate.jpg"
  }
];
