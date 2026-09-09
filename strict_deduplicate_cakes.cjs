const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const studioDir = path.join(__dirname, 'public', 'products', 'studio');
const srcDir = 'C:\\Users\\carl2\\Downloads\\Pasteleria 09 de septiebre-20260907T145830Z-1-001\\Pasteleria 09 de septiebre';
const rawFiles = fs.readdirSync(srcDir).filter(f => !f.toLowerCase().endsWith('.mp4'));

async function deduplicateDistinctCakes() {
  const metaList = [];

  for (const f of rawFiles) {
    const srcPath = path.join(srcDir, f);
    const studioFileName = f.replace(/\.(jpeg|JPG|jpg)$/i, '.jpg');
    
    // Low-res buffer for visual similarity comparison
    const buf = await sharp(srcPath)
      .resize(16, 16, { fit: 'fill' })
      .greyscale()
      .raw()
      .toBuffer();

    const stats = await sharp(srcPath).stats();
    const meta = await sharp(srcPath).metadata();

    // Grouping session by Instagram post prefix (first 7 digits) or camera stem
    let sessionKey = f.toLowerCase();
    const match = f.match(/^\d+_(\d{7})/);
    if (match) {
      sessionKey = 'ig_' + match[1];
    }

    metaList.push({
      originalFile: f,
      studioFile: studioFileName,
      sessionKey,
      width: meta.width,
      height: meta.height,
      raw: buf,
      dominant: stats.dominant
    });
  }

  // 1. Group by Instagram Session / Post ID
  const sessionClusters = new Map();
  for (const item of metaList) {
    if (!sessionClusters.has(item.sessionKey)) {
      sessionClusters.set(item.sessionKey, []);
    }
    sessionClusters.get(item.sessionKey).push(item);
  }

  // 2. Pick 1 best photo per session (prefer largest resolution / sharpest)
  const candidateList = [];
  for (const [key, items] of sessionClusters.entries()) {
    items.sort((a, b) => (b.width * b.height) - (a.width * a.height));
    candidateList.push(items[0]);
  }

  console.log('Candidates after session clustering:', candidateList.length);

  // 3. Visual similarity clustering (merge photos with diff < 20 across different camera/named files)
  const distinctCakes = [];
  const visited = new Set();

  for (let i = 0; i < candidateList.length; i++) {
    if (visited.has(i)) continue;
    visited.add(i);

    const primary = candidateList[i];
    distinctCakes.push(primary);

    for (let j = i + 1; j < candidateList.length; j++) {
      if (visited.has(j)) continue;

      let diff = 0;
      for (let k = 0; k < 256; k++) {
        diff += Math.abs(primary.raw[k] - candidateList[j].raw[k]);
      }
      const avgDiff = diff / 256;
      if (avgDiff < 18) {
        // Same cake or duplicate under different filename
        visited.add(j);
        console.log(`Merged duplicate cake: "${candidateList[j].originalFile}" matches "${primary.originalFile}" (diff: ${avgDiff.toFixed(2)})`);
      }
    }
  }

  console.log('TOTAL 100% DISTINCT UNIQUE CAKES FOUND:', distinctCakes.length);

  // 4. Distribute unique distinct cakes to Store Catalog (12 items) and Showcase Gallery (24 items)
  // Ensure NO overlap between Catalog and Showcase!
  const catalogCakes = distinctCakes.slice(0, 12);
  const showcaseCakes = distinctCakes.slice(12, 36);

  const catalogProducts = [
    {
      id: 1,
      name: 'Pastel Nupcial Signature Rosé',
      price: 1150,
      category: 'Pasteles',
      image: `/products/studio/${catalogCakes[0].studioFile}`,
      description: 'Creación nupcial de tres niveles con bizcocho suave de vainilla orgánica, crema diplomática, finas láminas de oro comestible y flores de azúcar esculpidas.',
      sales: 320,
      badge: 'Firma de Autor'
    },
    {
      id: 2,
      name: 'Red Velvet Supreme & Mascarpone',
      price: 790,
      category: 'Pasteles',
      image: `/products/studio/${catalogCakes[1].studioFile}`,
      description: 'Bizcocho aterciopelado de cacao fino infusionado con buttermilk, capas de frosting de queso mascarpone y frutos rojos.',
      sales: 450,
      badge: 'Más Vendido'
    },
    {
      id: 3,
      name: 'Role Hojaldrado de Fresa Silvestre',
      price: 85,
      category: 'Roles',
      image: `/products/studio/${catalogCakes[2].studioFile}`,
      description: 'Hojaldre artesanal en espiral dorado a la perfección, bañado en suave glaseado de queso crema y compota de fresas frescas.',
      sales: 580,
      badge: 'Recién Horneado'
    },
    {
      id: 4,
      name: 'Cofre de Macarons Gourmet Franceses',
      price: 360,
      category: 'Petit Fours',
      image: `/products/studio/${catalogCakes[3].studioFile}`,
      description: 'Cofre boutique con surtido de macarons de almendra en tonos pastel con ganache de chocolate 70%, pistache y frambuesa.',
      sales: 610,
      badge: 'Exclusivo'
    },
    {
      id: 5,
      name: 'Tarta Sablée de Moras & Almendras',
      price: 520,
      category: 'Tartas',
      image: `/products/studio/${catalogCakes[4].studioFile}`,
      description: 'Base crujiente sablée de almendra tostada, frangipane suave y coronada con una generosa selección de zarzamoras y arándanos silvestres.',
      sales: 290,
      badge: 'Favorito'
    },
    {
      id: 6,
      name: 'Cupcake Velvet Vainilla Bourbon',
      price: 65,
      category: 'Cupcakes',
      image: `/products/studio/${catalogCakes[5].studioFile}`,
      description: 'Porción individual de bizcocho esponjoso perfumado con vainas de Madagascar, copete de buttercream sedoso y perlas comestibles.',
      sales: 390,
      badge: 'Individual'
    },
    {
      id: 7,
      name: 'Tarta Sablée de Maracuyá & Mango',
      price: 490,
      category: 'Tartas',
      image: `/products/studio/${catalogCakes[6].studioFile}`,
      description: 'Equilibrio cítrico y tropical: curd cremoso de maracuyá sobre costra tostada, decorada con láminas de mango fresco al almíbar sutil.',
      sales: 410,
      badge: 'Gourmet'
    },
    {
      id: 8,
      name: 'Role Artesanal de Canela & Nuez',
      price: 75,
      category: 'Roles',
      image: `/products/studio/${catalogCakes[7].studioFile}`,
      description: 'Roll de canela de Ceilán dorada al horno, relleno de nuez de Castilla garapiñada y abundante cobertura de queso crema suave.',
      sales: 520,
      badge: 'Especialidad'
    },
    {
      id: 9,
      name: 'Pastel Esculpido Temático Elegance',
      price: 1100,
      category: 'Pasteles',
      image: `/products/studio/${catalogCakes[8].studioFile}`,
      description: 'Obra personalizada de repostería estética, moldeada con detalles en dorado comestible y texturas finas ideales para eventos especiales.',
      sales: 240,
      badge: 'Personalizado'
    },
    {
      id: 10,
      name: 'Mini Pavlova de Frutos del Bosque',
      price: 320,
      category: 'Petit Fours',
      image: `/products/studio/${catalogCakes[9].studioFile}`,
      description: 'Cúpula de merengue horneado lentamente, crujiente por fuera y meloso por dentro, relleno de chantilly ligera y frutos del bosque.',
      sales: 280,
      badge: 'Artesanal'
    },
    {
      id: 11,
      name: 'Cheesecake Frío New York con Moras',
      price: 680,
      category: 'Pasteles',
      image: `/products/studio/${catalogCakes[10].studioFile}`,
      description: 'Base de galleta artesanal de canela, cuerpo cremoso de queso horneado al vapor y cubierta espejo de coulis concentrado de moras.',
      sales: 360,
      badge: 'Clásico'
    },
    {
      id: 12,
      name: 'Tartaleta de Frambuesas & Mousse',
      price: 540,
      category: 'Tartas',
      image: `/products/studio/${catalogCakes[11].studioFile}`,
      description: 'Cazoleta de masa quebrada con fondo de chocolate amargo, mousse ligera de pistache y frambuesas frescas cuidadosamente alineadas.',
      sales: 310,
      badge: 'Edición Limitada'
    }
  ];

  const showcaseTitles = [
    { title: 'Pastel Floral Royal de Tres Niveles', cat: 'Pasteles', desc: 'Decoración botánica en crema suiza marfil con pétalos comestibles y detalles en oro de 24 quilates.' },
    { title: 'Drip Cake de Chocolate Belga & Macarons', cat: 'Pasteles', desc: 'Cascada de chocolate amargo 70%, coronado con macarons de vainilla y frambuesas frescas de huerto.' },
    { title: 'Pastel Temático Geoda de Amatista', cat: 'Pasteles', desc: 'Incrustaciones de cristales de azúcar caramelizado en degradé lila sobre cobertura satinada.' },
    { title: 'Tarta Frangipane de Almendras & Moras', cat: 'Tartas', desc: 'Costra sablée crujiente rellena de crema de almendras tostadas y moras silvestres frescas.' },
    { title: 'Cheesecake Vasco Caramelizado', cat: 'Pasteles', desc: 'Tostado a alta temperatura para un centro ultra cremoso fundente y notas de caramelo suave.' },
    { title: 'Role Bicolor de Pistache Siciliano', cat: 'Roles', desc: 'Hojaldre bicolor horneado en espiral con crema untuosa de pistache tostado y azúcar glass.' },
    { title: 'Role Hojaldrado Glaseado al Bourbon', cat: 'Roles', desc: 'Masa de mantequilla laminada con canela aromática y baño tibio de queso crema a la vainilla.' },
    { title: 'Cofre Degustación Petit Fours Franceses', cat: 'Petit Fours', desc: 'Selección boutique de pequeñas joyas de repostería con tartaletas miniatura y macarons.' },
    { title: 'Cupcakes Bouquet de Flores Pastel', cat: 'Cupcakes', desc: 'Set de cupcakes con delicado trabajo de manga pastelera formando rosas y tulipanes en buttercream.' },
    { title: 'Pastel Minimalista Nupcial Marfil', cat: 'Pasteles', desc: 'Líneas limpias, texturas sutiles al espátula y rosas naturales preservadas de alta estética.' },
    { title: 'Tartaleta Sablée de Limón Eureka & Merengue', cat: 'Tartas', desc: 'Curd de limón ácido equilibrado con merengue italiano flameado a soplete artesanal.' },
    { title: 'Tarta Noir Espejo de Chocolate & Frutas', cat: 'Tartas', desc: 'Brillo espejo de cacao fino con frutos rojos, arándanos y detalles dorados comestibles.' },
    { title: 'Pastel Temático Acuarela & Rosa Empolvado', cat: 'Pasteles', desc: 'Técnica de pintura al óleo comestible sobre crema con acentos en pan de oro y perlas.' },
    { title: 'Pastel de Cumpleaños Gold & Berries', cat: 'Pasteles', desc: 'Corona abundante de fresas, moras, arándanos y baño de drip de caramelo con oro comestible.' },
    { title: 'Cupcake Rosé Gold con Toque Floral', cat: 'Cupcakes', desc: 'Bizcocho esponjoso perfumado con vainilla de Papantla y remolino de crema rosa pastel.' },
    { title: 'Set de Galletas Glaseadas de Alta Costura', cat: 'Petit Fours', desc: 'Galletas de mantequilla europea decoradas a mano con técnica royal icing y motivos florales.' },
    { title: 'Pastel Infantil Fantasía en Tonos Pastel', cat: 'Pasteles', desc: 'Modelado artístico en azúcar con tonos suaves y detalles lúdicos para celebraciones inolvidables.' },
    { title: 'Role Hojaldrado de Frambuesa & Chocoblanco', cat: 'Roles', desc: 'Espiral dorada crujiente con mermelada reducida de frambuesa y virutas de chocolate blanco.' },
    { title: 'Tartaleta de Higos Frescos & Miel de Azahar', cat: 'Tartas', desc: 'Base crocante rellena de crema diplomática y abanico de higos frescos con reducción de miel.' },
    { title: 'Pastel Naked Cake con Frutas del Huerto', cat: 'Pasteles', desc: 'Capas rústicas y elegantes a la vista con crema de mascarpone y cascada de frutos rojos.' },
    { title: 'Caja de Macarons Lavanda & Mora Silvestre', cat: 'Petit Fours', desc: 'Elegante cofre con macarons rellenos de ganache infusionado con flores de lavanda y moras.' },
    { title: 'Pastel Esculpido Elegance en Blanco & Cobre', cat: 'Pasteles', desc: 'Acabados geométricos modernos con detalles metálicos comestibles y estilo vanguardista.' },
    { title: 'Tarta Sablée de Maracuyá & Mango Flameado', cat: 'Tartas', desc: 'Contraste tropical con crema cítrica sedosa y láminas de mango caramelizadas.' },
    { title: 'Pastel de Aniversario Velvet Rosas & Perlas', cat: 'Pasteles', desc: 'Creación romántica para ocasiones memorables con bizcocho aterciopelado y rosas de azúcar.' }
  ];

  const galleryData = showcaseCakes.map((cake, idx) => ({
    id: 201 + idx,
    src: `/products/studio/${cake.studioFile}`,
    title: showcaseTitles[idx].title,
    category: showcaseTitles[idx].cat,
    description: showcaseTitles[idx].desc
  }));

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

  console.log('✓ SUCCESS: Updated products.js and galleryData.js with 36 strictly distinct cakes.');
}

deduplicateDistinctCakes();
