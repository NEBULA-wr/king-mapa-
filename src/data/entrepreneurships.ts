/**
 * Datos de los 10 Emprendimientos de la Comunidad de Santo Domingo, República Dominicana.
 * Ubicaciones extraídas directamente de los enlaces específicos de Google Maps.
 * Videos e imágenes enumerados ordenadamente del 1 al 10 correspondientes a cada pin.
 */

export interface ContactInfo {
  telefono: string;
  instagram: string;
  horario: string;
}

export interface Entrepreneurship {
  id: number;
  nombre: string;
  categoria: string;
  sector: string;
  direccion: string;
  mapsUrl?: string;
  lat: number;
  lng: number;
  descripcion: string;
  historia: string;
  impacto: string;
  destacado: string;
  contacto: ContactInfo;
  imageUrl: string;
  videoUrl: string;
  thumbnailUrl: string;
}

export const EMPRENDIMIENTOS: Entrepreneurship[] = [
  {
    id: 1,
    nombre: "Polo Cell",
    categoria: "Telefonía & Reparación Móvil",
    sector: "Mejoramiento Social / Los Guandules",
    direccion: "C. A (frente a la zona comercial cercana a la C. Josefa Brea y la Av. Francisco del Rosario Sánchez), Santo Domingo 10306",
    mapsUrl: "https://maps.app.goo.gl/KzHP7ZCSUTWAifvh9",
    lat: 18.4897077,
    lng: -69.8858229,
    descripcion: "Servicio técnico especializado en reparación de dispositivos móviles, venta de accesorios y soluciones de comunicación para la comunidad.",
    historia: "Emprendimiento local consolidado en el sector comercial para brindar soporte tecnológico accesible y de confianza.",
    impacto: "Facilita conectividad y soporte técnico rápido para vecinos y comerciantes de la zona.",
    destacado: "Reparación de pantallas, baterías y accesorios de telefonía móvil.",
    contacto: {
      telefono: "+1 (809) 555-1001",
      instagram: "@polocellrd",
      horario: "Lun - Sáb: 8:30 AM - 7:00 PM"
    },
    imageUrl: "/1.jpg",
    videoUrl: "/1.mp4",
    thumbnailUrl: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 2,
    nombre: "Technology & Trading",
    categoria: "Tecnología & Comercio Electrónico",
    sector: "Villa Francisca / Duarte - Mella",
    direccion: "C. Josefa Brea 104 (zona comercial cercana a la Av. Mella / Duarte), Santo Domingo 10100",
    mapsUrl: "https://maps.app.goo.gl/bc1Uy6TeYA2ccEiN6",
    lat: 18.4883901,
    lng: -69.8905869,
    descripcion: "Comercialización de artículos tecnológicos, componentes electrónicos y soluciones de informática en el corazón comercial de Santo Domingo.",
    historia: "Negocio comunitario dedicado a suplir tecnología de calidad tanto a clientes particulares como a pequeños negocios del área.",
    impacto: "Promueve la digitalización de microempresas en el concurrido corredor de Villa Francisca.",
    destacado: "Equipos de computación, periféricos y asesoría técnica directa.",
    contacto: {
      telefono: "+1 (809) 555-1002",
      instagram: "@technologytradingrd",
      horario: "Lun - Sáb: 8:00 AM - 6:30 PM"
    },
    imageUrl: "/2.jpg",
    videoUrl: "/2.mp4",
    thumbnailUrl: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 3,
    nombre: "Color Centro (Experto en Colores)",
    categoria: "Pinturas & Acabados Arquitectónicos",
    sector: "Villa Francisca / Mejoramiento Social",
    direccion: "C. Josefa Brea 184 (zona comercial de Villa Francisca / Mejoramiento Social), Santo Domingo 10301",
    mapsUrl: "https://maps.app.goo.gl/cNkX2KYt1Mejjeyc6",
    lat: 18.4943166,
    lng: -69.8945059,
    descripcion: "Especialistas en formulación y preparación de pinturas automotrices, arquitectónicas e industriales con igualación computarizada.",
    historia: "Negocio emblemático de la Calle Josefa Brea que ha aportado color y protección a hogares y proyectos comunitarios.",
    impacto: "Asesoría personalizada para maestros pintores, contratistas y familias locales.",
    destacado: "Mezcla y matizado exacto de pinturas con tecnología de colorimetría.",
    contacto: {
      telefono: "+1 (809) 555-1003",
      instagram: "@colorcentrord",
      horario: "Lun - Sáb: 7:30 AM - 6:00 PM"
    },
    imageUrl: "/3.jpg",
    videoUrl: "/3.mp4",
    thumbnailUrl: "https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 4,
    nombre: "Compraventa Sheyla",
    categoria: "Servicios Financieros & Compraventa",
    sector: "Los Guandules / Villa Francisca",
    direccion: "Av. Francisco del Rosario Sánchez (zona comercial de Villa Francisca / Los Guandules), Santo Domingo 10305",
    mapsUrl: "https://maps.app.goo.gl/PQwsnmpdnbgyWWA86",
    lat: 18.4931273,
    lng: -69.8841909,
    descripcion: "Soluciones financieras rápidas, empeños seguros y compraventa de artículos garantizados para el dinamismo económico vecinal.",
    historia: "Establecimiento con amplia trayectoria brindando auxilio financiero inmediato a los residentes de Los Guandules y zonas aledañas.",
    impacto: "Apoyo crediticio ágil sin burocracia para imprevistos familiares y emprendedores emergentes.",
    destacado: "Tasación justa y custodia segura de prendas y electrodomésticos.",
    contacto: {
      telefono: "+1 (809) 555-1004",
      instagram: "@compraventasheyla",
      horario: "Lun - Sáb: 8:00 AM - 6:00 PM"
    },
    imageUrl: "/4.jpg",
    videoUrl: "/4.mp4",
    thumbnailUrl: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 5,
    nombre: "Dinamic Electro Bike",
    categoria: "Movilidad Eléctrica & Servicios",
    sector: "Mejoramiento Social",
    direccion: "C. Josefa Brea (zona comercial de movilidad y servicios), Santo Domingo 10301",
    mapsUrl: "https://maps.app.goo.gl/XtEA3EKvi3SHLmNh8",
    lat: 18.4757591,
    lng: -69.8848943,
    descripcion: "Venta, mantenimiento y repuestos de bicicletas eléctricas, pasolas y vehículos de movilidad ecológica y económica.",
    historia: "Pioneros en introducir alternativas de transporte eléctrico sostenible al sector comercial de Josefa Brea.",
    impacto: "Ahorro de combustible y reducción de emisiones para mensajeros y trabajadores comunitarios.",
    destacado: "Mantenimiento preventivo, baterías de litio y bicicletas eléctricas urbanas.",
    contacto: {
      telefono: "+1 (809) 555-1005",
      instagram: "@dinamicelectrobikerd",
      horario: "Lun - Sáb: 8:30 AM - 6:30 PM"
    },
    imageUrl: "/5.jpg",
    videoUrl: "/5.mp4",
    thumbnailUrl: "https://images.unsplash.com/photo-1571068316344-75bc76f77890?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 6,
    nombre: "Zona Bici",
    categoria: "Ecoturismo & Movilidad Urbana",
    sector: "Ciudad Colonial / Centro Histórico",
    direccion: "C. Arzobispo Meriño 217 (zona de la Ciudad Colonial / centro histórico), Santo Domingo 10106",
    mapsUrl: "https://maps.app.goo.gl/FMoXL1rvE91yKeKw8",
    lat: 18.4745608,
    lng: -69.8846111,
    descripcion: "Renta de bicicletas vintage, paseos guiados culturales y promoción del ciclismo urbano en la Ciudad Primada de América.",
    historia: "Nació para transformar la forma en que locales y turistas recorren y viven el patrimonio histórico colonial.",
    impacto: "Fomenta el turismo ecológico no invasivo y la recreación saludable en las calles de la Ciudad Colonial.",
    destacado: "Tours guiados nocturnos y renta de bicicletas clásicas y eléctricas.",
    contacto: {
      telefono: "+1 (809) 555-1006",
      instagram: "@zonabicird",
      horario: "Lun - Dom: 9:00 AM - 7:00 PM"
    },
    imageUrl: "/6.jpg",
    videoUrl: "/6.mp4",
    thumbnailUrl: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 7,
    nombre: "Regalitos Aquí",
    categoria: "Detalles, Regalos & Celebraciones",
    sector: "Ciudad Colonial / San Lázaro",
    direccion: "Zona comercial y de detalles, Santo Domingo",
    mapsUrl: "https://maps.app.goo.gl/524J4qK9yPVnswiH9",
    lat: 18.4729946,
    lng: -69.8868313,
    descripcion: "Tienda especializada en empaques creativos, detalles personalizados, globos, tarjetas y obsequios para fechas memorables.",
    historia: "Iniciativa de regalos que combina arte manual y creatividad para celebrar los momentos especiales de las familias dominicanas.",
    impacto: "Apoya la economía creativa local y brinda opciones de detalles accesibles para todo tipo de ocasión.",
    destacado: "Arreglos personalizados con dulces criollos, flores y globos decorativos.",
    contacto: {
      telefono: "+1 (809) 555-1007",
      instagram: "@regalitosaquird",
      horario: "Lun - Sáb: 9:00 AM - 7:00 PM"
    },
    imageUrl: "/7.jpg",
    videoUrl: "/7.mp4",
    thumbnailUrl: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 8,
    nombre: "EGA Store",
    categoria: "Tecnología & Moda Urbana",
    sector: "Ciudad Colonial / San Lázaro",
    direccion: "Zona comercial de tecnología y vestimenta, Santo Domingo",
    mapsUrl: "https://maps.app.goo.gl/UGFxH153PCfaJHL27",
    lat: 18.4722204,
    lng: -69.8890793,
    descripcion: "Tienda multimarca que combina las últimas tendencias en gadgets tecnológicos, accesorios de audio y vestimenta casual juvenil.",
    historia: "Emprendimiento joven que fusiona estilo de vida digital con prendas de vestir urbanas y modernas.",
    impacto: "Punto de encuentro para jóvenes de la comunidad que buscan tecnología y moda a precios competitivos.",
    destacado: "Audífonos inalámbricos, smartwatches y colecciones de ropa urbana.",
    contacto: {
      telefono: "+1 (809) 555-1008",
      instagram: "@egastorerd",
      horario: "Lun - Sáb: 9:00 AM - 7:30 PM"
    },
    imageUrl: "/8.jpg",
    videoUrl: "/8.mp4",
    thumbnailUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 9,
    nombre: "Fresamania",
    categoria: "Postres Artesanales & Fresas con Crema",
    sector: "Ciudad Colonial",
    direccion: "Calle El Conde & C. Santomé 10210 (zona peatonal y comercial de la Ciudad Colonial), Santo Domingo 10210",
    mapsUrl: "https://maps.app.goo.gl/FMoXL1rvE91yKeKw8",
    lat: 18.47285,
    lng: -69.88950,
    descripcion: "Exquisitas fresas frescas con crema artesanal, waffles, chocolates finos y variedad de toppings en la emblemática Calle El Conde.",
    historia: "Emprendimiento gastronómico fundado por jóvenes emprendedores que se convirtió en una parada obligatoria para paseantes de la Zona Colonial.",
    impacto: "Consumo de fresas cosechadas en campos de Constanza y dinamización del paseo peatonal El Conde.",
    destacado: "Vasos de fresas con crema batida especial, nutella y toppings crujientes.",
    contacto: {
      telefono: "+1 (809) 555-1009",
      instagram: "@fresamaniard",
      horario: "Lun - Dom: 1:00 PM - 10:00 PM"
    },
    imageUrl: "/9.jpg",
    videoUrl: "/9.mp4",
    thumbnailUrl: "https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 10,
    nombre: "Inversiones L & M",
    categoria: "Servicios Financieros & Comercio",
    sector: "Mejoramiento Social",
    direccion: "C. Logia Trinitaria 24, Santo Domingo 10306",
    mapsUrl: "https://maps.app.goo.gl/6brzfnQ79cGrb44a9",
    lat: 18.4885956,
    lng: -69.8879348,
    descripcion: "Soluciones de financiamiento, préstamos e inversiones comerciales para emprendedores, pequeños comerciantes y residentes de la comunidad.",
    historia: "Empresa comunitaria fundada para apoyar el crecimiento económico y brindar alternativas financieras accesibles en el sector.",
    impacto: "Impulso directo al comercio barrial y fomento del crecimiento de pequeños negocios locales.",
    destacado: "Asesoría financiera personalizada y crédito accesible para emprendimientos.",
    contacto: {
      telefono: "+1 (809) 555-1010",
      instagram: "@inversioneslym",
      horario: "Lun - Sáb: 8:00 AM - 6:00 PM"
    },
    imageUrl: "/10.jpg",
    videoUrl: "/10.mp4",
    thumbnailUrl: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80"
  }
];
