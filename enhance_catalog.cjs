const fs = require('fs');
const path = require('path');

const imgDir = path.join(__dirname, 'public', 'products');
const allFiles = fs.readdirSync(imgDir).filter(f => f.match(/^[A-Z]{4}\d{4}\.JPG$/i));

console.log(`Encontradas ${allFiles.length} imágenes únicas en public/products/`);

// 12 fotos para el catálogo (ProductSection)
const catalogFiles = allFiles.slice(0, 12);

const catalogItems = [
  {
    id: 1,
    name: 'Pastel Nupcial de Alta Costura',
    price: 950.00,
    category: 'Pasteles',
    image: `/products/${catalogFiles[0]}`,
    description: 'Creación majestuosa de tres niveles con bizcocho suave de vainilla orgánica, relleno de crema diplomática y delicado drapeado en fondant rosado.',
    sales: 180
  },
  {
    id: 2,
    name: 'Tarta de Moras & Crema de Almendras',
    price: 520.00,
    category: 'Tartas',
    image: `/products/${catalogFiles[1]}`,
    description: 'Base crujiente sablée de almendra tostada, frangipane suave y coronada con una generosa selección de zarzamoras y arándanos silvestres.',
    sales: 240
  },
  {
    id: 3,
    name: 'Red Velvet de Cacao Fino & Flores',
    price: 780.00,
    category: 'Pasteles',
    image: `/products/${catalogFiles[2]}`,
    description: 'Bizcocho aterciopelado de cacao ecuatoriano infusionado con buttermilk, capas de frosting de queso crema al mascarpone y pétalos de azúcar.',
    sales: 420
  },
  {
    id: 4,
    name: 'Role Hojaldrado de Fresa Silvestre',
    price: 85.00,
    category: 'Roles',
    image: `/products/${catalogFiles[3]}`,
    description: 'Masas hojaldradas horneadas en espiral con mantequilla europea, compota natural de fresas de huerto y baño de glacé aromatizado.',
    sales: 310
  },
  {
    id: 5,
    name: 'Cupcake Velvet con Vainilla Bourbon',
    price: 65.00,
    category: 'Cupcakes',
    image: `/products/${catalogFiles[4]}`,
    description: 'Porción individual de bizcocho esponjoso perfumado con vainas de Madagascar, copete de buttercream sedoso y perlado comestible.',
    sales: 150
  },
  {
    id: 6,
    name: 'Tarta Sablée de Maracuyá & Mango',
    price: 490.00,
    category: 'Tartas',
    image: `/products/${catalogFiles[5]}`,
    description: 'Equilibrio cítrico y tropical: curd cremoso de maracuyá sobre costra tostada, decorada con láminas de mango fresco al almíbar sutil.',
    sales: 580
  },
  {
    id: 7,
    name: 'Role Artesanal de Canela & Nuez',
    price: 75.00,
    category: 'Roles',
    image: `/products/${catalogFiles[6]}`,
    description: 'Roll de canela de Ceilán dorada al horno, relleno de nuez de Castilla garapiñada y abundante cobertura de queso crema suave.',
    sales: 290
  },
  {
    id: 8,
    name: 'Pastel Esculpido Temático Elegance',
    price: 1100.00,
    category: 'Pasteles',
    image: `/products/${catalogFiles[7]}`,
    description: 'Obra personalizada de repostería estética, moldeada con detalles en dorado comestible y texturas finas ideales para eventos especiales.',
    sales: 390
  },
  {
    id: 9,
    name: 'Mini Pavlova de Frutos del Bosque',
    price: 320.00,
    category: 'Petit Fours',
    image: `/products/${catalogFiles[8]}`,
    description: 'Cúpula de merengue horneado lentamente, crujiente por fuera y meloso por dentro, relleno de chantilly ligera y frutos del bosque.',
    sales: 210
  },
  {
    id: 10,
    name: 'Macarons Gourmet de Lavanda & Cacao',
    price: 360.00,
    category: 'Petit Fours',
    image: `/products/${catalogFiles[9]}`,
    description: 'Galletas tradicionales de harina de almendra con cáscara perfecta, rellenas de ganache de chocolate 70% e infusión de lavanda.',
    sales: 340
  },
  {
    id: 11,
    name: 'Cheesecake Frío de Frutos del Bosque',
    price: 680.00,
    category: 'Pasteles',
    image: `/products/${catalogFiles[10]}`,
    description: 'Base de galleta artesanal de canela, cuerpo cremoso de queso horneado al vapor y cubierta espejo de coulis concentrado de moras.',
    sales: 95
  },
  {
    id: 12,
    name: 'Tartaleta de Frambuesas & Mousse',
    price: 540.00,
    category: 'Tartas',
    image: `/products/${catalogFiles[11]}`,
    description: 'Cazoleta de masa quebrada con fondo de chocolate amargo, mousse ligera de pistache y frambuesas frescas cuidadosamente alineadas.',
    sales: 270
  }
];

fs.writeFileSync(
  path.join(__dirname, 'src', 'data', 'products.js'),
  'export const products = ' + JSON.stringify(catalogItems, null, 2) + ';\n',
  'utf-8'
);

console.log('✓ Catalog products updated in src/data/products.js');
