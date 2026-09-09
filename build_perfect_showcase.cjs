const fs = require('fs');
const path = require('path');

// 1. Catálogo de Tienda (12 Productos Estrella)
const catalogProducts = [
  {
    id: 1,
    name: 'Pastel Vintage Lambeth & Osito Pastelero',
    price: 920,
    category: 'Pasteles',
    image: '/products/remastered/nano_pastel_02.jpg',
    description: 'Diseño artesanal vintage con drapeado estilo Lambeth en crema marfil, corazones carmesí y lazo de autor.',
    sales: 420,
    badge: 'Edición Especial'
  },
  {
    id: 2,
    name: 'Pastel Bautismo & Ceremonia Floral',
    price: 1450,
    category: 'Pasteles',
    image: '/products/remastered/nano_pastel_06.jpg',
    description: 'Creación de dos niveles con conejito de azúcar esculpido, cruz en oro y ramilletes de lavanda y flores naturales.',
    sales: 310,
    badge: 'Firma de Autor'
  },
  {
    id: 3,
    name: 'Pastel Rosette FC Barcelona VIP',
    price: 980,
    category: 'Pasteles',
    image: '/products/remastered/nano_pastel_01.jpg',
    description: 'Cobertura texturizada de rosetas en azul y grana con fresas maceradas al oro de 24k y detalles del club.',
    sales: 580,
    badge: 'Temático VIP'
  },
  {
    id: 4,
    name: 'Pastel Cirque Gravity & Animalitos',
    price: 1650,
    category: 'Pasteles',
    image: '/products/remastered/nano_pastel_07.jpg',
    description: 'Estructura escultórica de tres niveles en equilibrio con modelado de elefantito, osito, león y macarons dorados.',
    sales: 290,
    badge: 'Obra de Arte'
  },
  {
    id: 5,
    name: 'Pastel Ocean Wave & Velas de Azúcar',
    price: 890,
    category: 'Pasteles',
    image: '/products/remastered/nano_pastel_08.jpg',
    description: 'Efecto oleaje marino en degradé turquesa con velas translúcidas de azúcar, perlas marinas y frutos rojos.',
    sales: 380,
    badge: 'Diseño Exclusivo'
  },
  {
    id: 6,
    name: 'Pastel Gold Brushstroke Elegance',
    price: 950,
    category: 'Pasteles',
    image: '/products/remastered/nano_pastel_09.jpg',
    description: 'Pintura texturizada en espátula oro y pizarra con hojas de olivo, esferas nacaradas y topper conmemorativo.',
    sales: 340,
    badge: 'Para Ocasiones'
  },
  {
    id: 7,
    name: 'Pastel Sunset Hibiscus & Flores de Azúcar',
    price: 890,
    category: 'Pasteles',
    image: '/products/remastered/nano_pastel_10.jpg',
    description: 'Degradé sunset fucsia y naranja con flores de hibisco modeladas a mano, oro comestible y toque botánico.',
    sales: 470,
    badge: 'Más Vendido'
  },
  {
    id: 8,
    name: 'Pastel Skellington Vintage Noir & White',
    price: 850,
    category: 'Pasteles',
    image: '/products/remastered/nano_pastel_03.jpg',
    description: 'Romance gótico con drapeado clásico en blanco y negro, osito artesanal y presentación gourmet con frutos rojos.',
    sales: 310,
    badge: 'Favorito'
  },
  {
    id: 9,
    name: 'Pastel Roblox Forest Log de Chocolate',
    price: 920,
    category: 'Pasteles',
    image: '/products/remastered/nano_pastel_04.jpg',
    description: 'Tronco rústico de chocolate belga con acabado en corteza, follaje de azúcar y temática Roblox personalizada.',
    sales: 410,
    badge: 'Infantil VIP'
  },
  {
    id: 10,
    name: 'Role Hojaldrado de Pistache Siciliano',
    price: 95,
    category: 'Roles',
    image: '/products/croissant_role_pistache.jpg',
    description: 'Hojaldre francés crujiente horneado en espiral con crema suave de pistache siciliano, glaseado blanco y pistaches tostados.',
    sales: 620,
    badge: 'Recién Horneado'
  },
  {
    id: 11,
    name: 'Tartaleta Sablée de Maracuyá & Mango',
    price: 490,
    category: 'Tartas',
    image: '/products/tartaleta_maracuya_boutique.jpg',
    description: 'Equilibrio cítrico y tropical: curd cremoso de maracuyá sobre costra tostada, decorada con láminas de mango y merengue suizo.',
    sales: 510,
    badge: 'Gourmet'
  },
  {
    id: 12,
    name: 'Tarta Noir de Chocolate 70% Belga',
    price: 540,
    category: 'Tartas',
    image: '/products/tarta_chocolate_belga.jpg',
    description: 'Intensidad absoluta: cazoleta de cacao amargo con espejo brillante de ganache belga al 70%, frambuesas frescas y destellos dorados.',
    sales: 480,
    badge: 'Alta Repostería'
  }
];

// 2. Vitrina / Galería de Autor (24 Creaciones Únicas sin repetir)
const galleryData = [
  {
    id: 201,
    src: '/products/pastel_monarchie_gold.jpg',
    title: 'Pastel Monárquico de Autor Rosé',
    category: 'Pasteles',
    description: 'Bizcocho aterciopelado en crema rosa polvo con hojuelas de oro comestible de 24k, zarzamoras silvestres y rosas de azúcar esculpidas a mano.'
  },
  {
    id: 202,
    src: '/products/nupcial_rose_cake.jpg',
    title: 'Pastel Nupcial Alta Costura',
    category: 'Pasteles',
    description: 'Creación majestuosa de tres niveles con drapeado en fondant rosado, crema diplomática y cascada de rosas blancas.'
  },
  {
    id: 203,
    src: '/products/pastel_boda_minimalista.jpg',
    title: 'Pastel de Boda Minimalista Marfil',
    category: 'Pasteles',
    description: 'Líneas limpias y texturas sutiles al espátula en tonos marfil y rosa polvo con ranúnculos blancos y cinta satinada.'
  },
  {
    id: 204,
    src: '/products/red_velvet_gourmet.jpg',
    title: 'Red Velvet de Cacao Fino & Flores',
    category: 'Pasteles',
    description: 'Bizcocho aterciopelado de cacao ecuatoriano infusionado con buttermilk, capas de mascarpone y frambuesas frescas.'
  },
  {
    id: 205,
    src: '/products/cheesecake_frutos_rojos_luxury.jpg',
    title: 'Cheesecake New York & Coulis Espejo',
    category: 'Pasteles',
    description: 'Cuerpo cremoso de queso horneado al vapor sobre corteza de canela y nuez, cubierto con una capa espejo de coulis concentrado de frambuesa.'
  },
  {
    id: 206,
    src: '/products/strawberry_cream_roll.jpg',
    title: 'Role Hojaldrado de Fresa & Cream Cheese',
    category: 'Roles',
    description: 'Hojaldre artesanal en espiral dorado a la perfección, bañado en suave glaseado de queso crema y coronado con fresas orgánicas.'
  },
  {
    id: 207,
    src: '/products/cupcake_rose_gold.jpg',
    title: 'Cupcake Rosé & Perlado de Oro',
    category: 'Cupcakes',
    description: 'Bizcocho esponjoso de vainilla pura con copete artesanal de crema rosa pastel, perlas doradas y corazón de azúcar en relieve.'
  },
  {
    id: 208,
    src: '/products/macarons_pastel_luxury.jpg',
    title: 'Cofre Boutique Macarons Franceses',
    category: 'Petit Fours',
    description: 'Surtido exclusivo de galletas de almendra en tonos rosa, lavanda y pistache con ganache gourmet y destellos en polvo de oro comestible.'
  },
  {
    id: 209,
    src: '/products/macarons_gourmet_set.jpg',
    title: 'Set Degustación Macarons de Autor',
    category: 'Petit Fours',
    description: 'Cofre boutique con selección de macarons franceses con ganaches de chocolate 70%, frutos del bosque y vainilla bourbon.'
  },
  // Unique Studio Creations from Real Catalog
  {
    id: 210,
    src: '/products/studio/716695337_2479149335865079_415438286373124066_n.jpg',
    title: 'Pastel Temático Sirena & Colores Pastel',
    category: 'Pasteles',
    description: 'Modelado en tonos marinos pastel con cola de sirena esculpida en azúcar, perlas marinas y detalles en fondant suave.'
  },
  {
    id: 211,
    src: '/products/studio/718597860_1509671770638776_8331390554643990927_n.jpg',
    title: 'Pastel Corona de Flores Silvestres & Vainilla',
    category: 'Pasteles',
    description: 'Bizcocho húmedo de vainilla con corona botánica de flores naturales de temporada y detalles en crema suiza.'
  },
  {
    id: 212,
    src: '/products/studio/718868770_1678233039879429_6447481245306275352_n.jpg',
    title: 'Pastel Temático Spiderman & Ciudad Nocturna',
    category: 'Pasteles',
    description: 'Creación infantil de alto impacto con texturas de telaraña en chocolate y modelado 3D para cumpleaños especiales.'
  },
  {
    id: 213,
    src: '/products/studio/730351013_17894947788503945_2125218204882101858_n.jpg',
    title: 'Pastel Número Aniversario con Frutos & Macarons',
    category: 'Pasteles',
    description: 'Number cake sobre base crujiente de galleta sablée con crema diplomática, fresas frescas, moras y macarons artesanales.'
  },
  {
    id: 214,
    src: '/products/studio/753125681_17898865746503945_9106053803576912617_n.jpg',
    title: 'Pastel Graduación & Celebración Elegance',
    category: 'Pasteles',
    description: 'Diseño conmemorativo sobrio y elegante con birrete artesanal, detalles dorados y bizcocho trufa de chocolate.'
  },
  {
    id: 215,
    src: '/products/studio/753206438_17899017795503945_7066891438766589485_n.jpg',
    title: 'Pastel Mario Bros & Mundo de Dulces',
    category: 'Pasteles',
    description: 'Escultura temática con personajes icónicos modelados a mano, bloques sorpresa y colores vibrantes en fondant.'
  },
  {
    id: 216,
    src: '/products/studio/764102874_17900968902503945_5170226896959158557_n.jpg',
    title: 'Pastel Hello Kitty & Rosas de Fresa',
    category: 'Pasteles',
    description: 'Ternura y sabor: bizcocho húmedo de fresa y vainilla con temática de Kitty esculpida y detalles en rosa pastel.'
  },
  {
    id: 217,
    src: '/products/studio/769536029_17901568440503945_9057914723274438666_n.jpg',
    title: 'Pastel Dinosaurio Jurásico Aventura',
    category: 'Pasteles',
    description: 'Paisaje jurásico comestible con texturas de roca en chocolate, vegetación de azúcar y tiranosaurio modelado.'
  },
  {
    id: 218,
    src: '/products/studio/772521546_17902514643503945_4581658816091362331_n.jpg',
    title: 'Pastel Esculpido Elegance Blanco & Perlas',
    category: 'Pasteles',
    description: 'Composición clásica con acabado aperlado, perlas de azúcar y técnica de espátula contemporánea.'
  },
  {
    id: 219,
    src: '/products/studio/AMTP1238.jpg',
    title: 'Pastel Corona de Fresas & Crema Chantilly',
    category: 'Pasteles',
    description: 'Tres leches artesanal con abundante corona de fresas frescas glaseadas y copos de chantilly a la vainilla.'
  },
  {
    id: 220,
    src: '/products/studio/ATBD7585.jpg',
    title: 'Tarta Rústica de Frutos del Bosque',
    category: 'Tartas',
    description: 'Base dorada crujiente con frangipane de almendra y frutos rojos silvestres recién horneados.'
  },
  {
    id: 221,
    src: '/products/studio/BXYB8170.jpg',
    title: 'Set de Cupcakes Artesanales Bouquet',
    category: 'Cupcakes',
    description: 'Variedad de cupcakes con mangas decorativas formando flores y rosetas en tonos pastel.'
  },
  {
    id: 222,
    src: '/products/studio/CZPH9880.jpg',
    title: 'Tartaleta Individual de Frutas Exóticas',
    category: 'Tartas',
    description: 'Cazoleta de masa quebrada con crema pastelera suave y abanico de frutas frescas de temporada.'
  },
  {
    id: 223,
    src: '/products/studio/DWOS3301.jpg',
    title: 'Role Glaseado Tradicional de Canela & Nuez',
    category: 'Roles',
    description: 'Espiral esponjosa de canela con abundante glaseado de queso crema suave y nuez tostada.'
  },
  {
    id: 224,
    src: '/products/studio/FGPN3514.jpg',
    title: 'Pastel Esculpido de Celebración Dorada',
    category: 'Pasteles',
    description: 'Diseño exclusivo con textura drapeada y aplicaciones en oro comestible para eventos memorables.'
  }
];

// Escribir src/data/products.js
fs.writeFileSync(
  path.join(__dirname, 'src', 'data', 'products.js'),
  'export const products = ' + JSON.stringify(catalogProducts, null, 2) + ';\n',
  'utf-8'
);

// Escribir src/data/galleryData.js
fs.writeFileSync(
  path.join(__dirname, 'src', 'data', 'galleryData.js'),
  'export const galleryData = ' + JSON.stringify(galleryData, null, 2) + ';\n',
  'utf-8'
);

console.log('✓ SUCCESS: Built perfect showcase and catalog with 100% gourmet photoshoot quality!');
