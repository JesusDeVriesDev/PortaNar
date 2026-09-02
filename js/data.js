// ---------------------------------------------------------------
// Colección PortaNar — 6 piezas con identidad nariñense.
// Cada pieza corresponde a un target de imagen reconocido con MindAR
// (mind-ar-js), generado a partir de porta1.png ... porta6.png con el
// compilador oficial: https://hiukim.github.io/mind-ar-js-doc/tools/compile
//
// IMPORTANTE: sube las 6 imágenes al compilador EN ESTE ORDEN exacto
// (Galeras, Laguna de la Cocha, Carnaval, Sombrero de Paja, Orquídeas,
// El Cuy), porque el índice de cada imagen en "targets.mind" (0..5) es
// el que se usa abajo como "targetIndex" y debe coincidir con el "id"
// de cada pieza. Coloca, junto a este index.html, una carpeta "markers"
// con: markers/targets.mind
// ---------------------------------------------------------------
export const PIEZAS = [
  {
    id: 0, archivo: "porta1", nombre: "Galeras, guardián de Pasto", lugar: "Volcán Galeras",
    accent: "var(--c0)",
    material: "Cartón reciclado teñido con café usado y carbón vegetal",
    colorBase: "Degradado de blanco natural a gris ceniza, con la silueta del volcán en negro carbón y un borde verde vegetal.",
    tecnica: "Silueta pintada a pincel sobre un fondo degradado",
    historia: "Los quillacingas, primeros pobladores de estas montañas, llamaban al volcán \"Urcunina\", montaña de fuego. Cuando llegaron los españoles, la silueta de su cima les recordó a las galeras, los barcos de remos del Mediterráneo, y de ahí nació el nombre que lleva hoy. A solo 9 km de Pasto, el Galeras es el volcán más activo de Colombia y el gran vigía de la ciudad: aparece en leyendas, poemas y en la vida diaria de quienes crecen a sus faldas. Desde 1985 sus laderas altas son Santuario de Flora y Fauna, un territorio que la propia ceniza volcánica ayuda a nutrir.",
    mensaje: "Galeras — guardián de Pasto",
    peso: "20 g", diametro: "≈ 9 cm", bio: "4–8 semanas",
    final: "100% cartón y colorantes vegetales: puede compostarse en casa o enterrarse en tierra húmeda. En 4 a 8 semanas se descompone por completo."
  },
  {
    id: 1, archivo: "porta2", nombre: "Laguna de la Cocha, espejo de los Andes", lugar: "Laguna de la Cocha",
    accent: "var(--c1)",
    material: "Cartón reciclado teñido con col morada y café usado",
    colorBase: "Turquesa degradado con ondas de agua en el centro y un borde de montañas grises.",
    tecnica: "Ondas talladas a pincel fino sobre la base turquesa",
    historia: "También llamada Lago Guamués, es el segundo espejo de agua natural más grande de Colombia. En su centro flota la Isla La Corota, la reserva natural más pequeña del sistema de parques nacionales del país y territorio sagrado para los pueblos quillacinga y kofán. La leyenda cuenta que una princesa derramó una totuma de agua como castigo de los dioses: la totuma vacía se convirtió en la isla, y el agua derramada dio origen a la laguna que hoy protege orquídeas silvestres, patos zambullidores y las neblinas que suben desde el páramo.",
    mensaje: "Laguna de la Cocha — espejo de los Andes",
    peso: "20 g", diametro: "≈ 9 cm", bio: "4–8 semanas",
    final: "100% cartón y colorantes vegetales: puede compostarse en casa o enterrarse en tierra húmeda. En 4 a 8 semanas se descompone por completo."
  },
  {
    id: 2, archivo: "porta3", nombre: "Carnaval de Negros y Blancos, patrimonio vivo", lugar: "Carnaval de Negros y Blancos",
    accent: "var(--c2)",
    material: "Cartón reciclado teñido con cúrcuma, ají y col morada",
    colorBase: "Amarillo vibrante estampado con patrones geométricos multicolor.",
    tecnica: "Estampado a mano con sellos de vegetales",
    historia: "Del 28 de diciembre al 7 de enero, Pasto se convierte en un solo taller colectivo. El Carnaval nació de los rituales agrarios de los pueblos pasto y quillacinga al sol, a la luna y a la Madre Tierra, y se transformó el 5 de enero de 1607, cuando la población esclavizada obtuvo un día libre y pintó su rostro de blanco como gesto de igualdad. De ahí nacieron el Día de Negros y el Día de Blancos, que hoy conviven con el Desfile Magno de carrozas monumentales. Desde 2009 la UNESCO lo reconoce como Patrimonio Cultural Inmaterial de la Humanidad.",
    mensaje: "Carnaval de Negros y Blancos — patrimonio cultural",
    peso: "20 g", diametro: "≈ 9 cm", bio: "4–8 semanas",
    final: "100% cartón y colorantes vegetales: puede compostarse en casa o enterrarse en tierra húmeda. En 4 a 8 semanas se descompone por completo."
  },
  {
    id: 3, archivo: "porta4", nombre: "Sombrero de Paja, tradición de Sandoná", lugar: "Sombrero de Paja Toquilla",
    accent: "var(--c3)",
    material: "Cartón reciclado sin teñir, con detalles de cebolla morada",
    colorBase: "Beige natural del cartón con líneas entrecruzadas en marrón, imitando un tejido.",
    tecnica: "Patrón de tejido dibujado a mano",
    historia: "En Sandoná, al occidente de Nariño, generaciones enteras tejen sombreros con iraca (Carludovica palmata), una fibra vegetal también llamada paja toquilla. La técnica llegó desde Ecuador hacia 1847 de la mano de Juan Vivanco y se extendió por el occidente nariñense hasta convertirse en el sustento de miles de familias. A comienzos del siglo XX, el padre José María Ordóñez impulsó que también las mujeres tejieran, un oficio que antes era solo de hombres. Cada sombrero puede tardar días en tejerse, hebra a hebra.",
    mensaje: "Sombrero de Paja — tradición artesanal",
    peso: "20 g", diametro: "≈ 9 cm", bio: "4–8 semanas",
    final: "100% cartón y colorantes vegetales: puede compostarse en casa o enterrarse en tierra húmeda. En 4 a 8 semanas se descompone por completo."
  },
  {
    id: 4, archivo: "porta5", nombre: "Orquídeas nariñenses, belleza silvestre", lugar: "Orquídeas de Nariño",
    accent: "var(--c4)",
    material: "Cartón reciclado teñido con col morada diluida",
    colorBase: "Rosa suave con la silueta de una orquídea en morado concentrado y un borde verde.",
    tecnica: "Silueta floral pintada a pincel",
    historia: "Colombia alberga más especies de orquídeas que cualquier otro país del mundo, y Nariño guarda una parte generosa de esa riqueza en sus bosques de niebla. La Sobralia gloriosa, una orquídea silvestre de flores grandes y efímeras, fue elegida por votación popular como una de las plantas emblema del departamento. Crece escondida entre el musgo y la neblina, y su presencia es señal de un bosque sano.",
    mensaje: "Orquídeas nariñenses — belleza natural",
    peso: "20 g", diametro: "≈ 9 cm", bio: "4–8 semanas",
    final: "100% cartón y colorantes vegetales: puede compostarse en casa o enterrarse en tierra húmeda. En 4 a 8 semanas se descompone por completo."
  },
  {
    id: 5, archivo: "porta6", nombre: "El Cuy, sabor de fiesta", lugar: "El Cuy",
    accent: "var(--c5)",
    material: "Cartón reciclado teñido con zanahoria y café usado",
    colorBase: "Naranja tostado con la silueta de un cuy asado en el centro y un borde marrón, como el dorado de la parrilla.",
    tecnica: "Silueta pintada a pincel imitando el tueste de la brasa",
    historia: "Los quillacingas, pastos y abades incluyeron al cuy en su alimentación desde tiempos inmemoriales, en el extremo sur del antiguo Tahuantinsuyo, el imperio inca. Cuando llegaron los españoles, que nunca habían visto el animal, lo llamaron \"conejillo de Indias\" y se lo llevaron a Europa como mascota; pero en Nariño su carne nunca dejó de ser un manjar. Hoy el cuy asado, preparado entre brasas tras un cuidadoso proceso de cría, es el plato con el que los pastusos agasajan a sus invitados en cumpleaños, grados y matrimonios: un gesto de cariño que se sirve entero, con papas y ají de maní.",
    mensaje: "El Cuy — sabor y tradición andina",
    peso: "20 g", diametro: "≈ 9 cm", bio: "4–8 semanas",
    final: "100% cartón y colorantes vegetales: puede compostarse en casa o enterrarse en tierra húmeda. En 4 a 8 semanas se descompone por completo."
  }
];
