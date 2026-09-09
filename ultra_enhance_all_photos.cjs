const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const srcDir = 'C:\\Users\\carl2\\Downloads\\Pasteleria 09 de septiebre-20260907T145830Z-1-001\\Pasteleria 09 de septiebre';
const outDir = path.join(__dirname, 'public', 'products', 'studio');

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const rawFiles = fs.readdirSync(srcDir).filter(f => !f.toLowerCase().endsWith('.mp4'));

console.log('Starting Ultra Studio Enhancement Pipeline on all', rawFiles.length, 'photos...');

async function processUltraStudio(filename) {
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
      // Direct high-res framing with studio lighting & tone curve
      await sharp(srcPath)
        .resize(targetSize, targetSize, {
          fit: 'cover',
          position: 'attention'
        })
        .modulate({
          brightness: 1.05,
          saturation: 1.22,
          hue: 0
        })
        .linear(1.08, -6) // S-curve contrast boost
        .sharpen({
          sigma: 1.4,
          m1: 1.2,
          m2: 2.8
        })
        .jpeg({ quality: 94, mozjpeg: true })
        .toFile(destPath);
    } else {
      // Tall or Wide: Luxury Studio Bokeh Composition
      const bg = await sharp(srcPath)
        .resize(targetSize, targetSize, { fit: 'cover' })
        .blur(32)
        .modulate({ brightness: 0.86, saturation: 1.15 })
        .linear(1.05, -5)
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
        .modulate({ brightness: 1.06, saturation: 1.24 })
        .linear(1.08, -6)
        .sharpen({ sigma: 1.3, m1: 1.0, m2: 2.4 })
        .toBuffer();

      await sharp(bg)
        .composite([{
          input: fg,
          gravity: 'center'
        }])
        .sharpen({ sigma: 0.7 })
        .jpeg({ quality: 94, mozjpeg: true })
        .toFile(destPath);
    }
    return cleanName;
  } catch (err) {
    console.error('Error enhancing', filename, err.message);
    return null;
  }
}

async function run() {
  let count = 0;
  for (let i = 0; i < rawFiles.length; i++) {
    const res = await processUltraStudio(rawFiles[i]);
    if (res) count++;
    if ((i + 1) % 25 === 0 || i === rawFiles.length - 1) {
      console.log(`Ultra studio enhancement: ${i + 1}/${rawFiles.length} photos processed.`);
    }
  }
  console.log(`✓ FINISHED: Ultra studio quality applied to all ${count} images in public/products/studio/`);
}

run();
