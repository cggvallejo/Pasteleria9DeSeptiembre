const sharp = require('sharp');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');

const srcDir = 'C:\\Users\\carl2\\Downloads\\Pasteleria 09 de septiebre-20260907T145830Z-1-001\\Pasteleria 09 de septiebre';
const outDir = path.join(__dirname, 'public', 'products', 'studio');

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

// 1. Get all non-MP4 files
const rawFiles = fs.readdirSync(srcDir).filter(f => !f.toLowerCase().endsWith('.mp4'));

// Ensure absolute uniqueness by MD5 content hash
const hashes = new Map();
const uniqueFiles = [];

for (const file of rawFiles) {
  const filePath = path.join(srcDir, file);
  const data = fs.readFileSync(filePath);
  const hash = crypto.createHash('md5').update(data).digest('hex');
  if (!hashes.has(hash)) {
    hashes.set(hash, file);
    uniqueFiles.push(file);
  }
}

console.log('Total unique pastry photos found:', uniqueFiles.length);

async function processImage(filename) {
  const srcPath = path.join(srcDir, filename);
  const cleanName = filename.replace(/\.(jpeg|JPG|jpg)$/i, '.jpg');
  const destPath = path.join(outDir, cleanName);

  try {
    const meta = await sharp(srcPath).metadata();
    const width = meta.width;
    const height = meta.height;
    const aspect = width / height;
    const targetSize = 1080;

    if (aspect >= 0.82 && aspect <= 1.22) {
      // Direct cover fit with smart attention centering and gourmet studio lighting
      await sharp(srcPath)
        .resize(targetSize, targetSize, {
          fit: 'cover',
          position: 'attention'
        })
        .modulate({
          brightness: 1.05,
          saturation: 1.16
        })
        .sharpen({
          sigma: 1.3,
          m1: 1.0,
          m2: 2.2
        })
        .jpeg({ quality: 92, mozjpeg: true })
        .toFile(destPath);
    } else {
      // Tall or Wide: create studio bokeh depth of field background
      const bg = await sharp(srcPath)
        .resize(targetSize, targetSize, { fit: 'cover' })
        .blur(25)
        .modulate({ brightness: 0.88, saturation: 1.1 })
        .toBuffer();

      let fgWidth, fgHeight;
      if (aspect > 1) {
        fgWidth = Math.round(targetSize * 0.94);
        fgHeight = Math.round(fgWidth / aspect);
      } else {
        fgHeight = Math.round(targetSize * 0.94);
        fgWidth = Math.round(fgHeight * aspect);
      }

      const fg = await sharp(srcPath)
        .resize(fgWidth, fgHeight, { fit: 'inside' })
        .modulate({ brightness: 1.06, saturation: 1.18 })
        .sharpen({ sigma: 1.2, m1: 0.8, m2: 2.0 })
        .toBuffer();

      await sharp(bg)
        .composite([{
          input: fg,
          gravity: 'center'
        }])
        .sharpen({ sigma: 0.6 })
        .jpeg({ quality: 92, mozjpeg: true })
        .toFile(destPath);
    }
    return cleanName;
  } catch (err) {
    console.error('Error processing', filename, err.message);
    return null;
  }
}

async function runAll() {
  const processed = [];
  for (let i = 0; i < uniqueFiles.length; i++) {
    const f = uniqueFiles[i];
    const res = await processImage(f);
    if (res) processed.push(res);
    if ((i + 1) % 20 === 0 || i === uniqueFiles.length - 1) {
      console.log('Progress: ' + (i + 1) + '/' + uniqueFiles.length + ' photos processed.');
    }
  }
  console.log('SUCCESS! All ' + processed.length + ' studio product shoots generated in public/products/studio/');
}

runAll();
