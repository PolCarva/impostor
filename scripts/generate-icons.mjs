import sharp from 'sharp';
import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = join(__dirname, '..', 'public');

// Leer el PNG favicon
const faviconPath = join(publicDir, 'favicon.png');

// Función para generar iconos PNG
async function generateIcon(size, filename, options = {}) {
  const { padding = 0, background = { r: 255, g: 255, b: 255, alpha: 0 } } = options;
  
  const iconSize = size - (padding * 2);
  
  let sharpInstance = sharp(faviconPath)
    .resize(iconSize, iconSize, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } });
  
  if (padding > 0) {
    sharpInstance = sharpInstance.extend({
      top: padding,
      bottom: padding,
      left: padding,
      right: padding,
      background
    });
  }
  
  await sharpInstance.png().toFile(join(publicDir, filename));
  console.log(`✓ Generated ${filename} (${size}x${size})`);
}

// Función para generar iconos maskable (con padding para safe zone)
async function generateMaskableIcon(size, filename) {
  // Los iconos maskable necesitan un padding del ~10% para la safe zone
  const padding = Math.round(size * 0.1);
  const iconSize = size - (padding * 2);
  
  // Fondo blanco para maskable
  await sharp({
    create: {
      width: size,
      height: size,
      channels: 4,
      background: { r: 250, g: 250, b: 250, alpha: 1 }
    }
  })
  .composite([{
    input: await sharp(faviconPath)
      .resize(iconSize, iconSize, { fit: 'contain' })
      .toBuffer(),
    gravity: 'center'
  }])
  .png()
  .toFile(join(publicDir, filename));
  
  console.log(`✓ Generated ${filename} (${size}x${size}) [maskable]`);
}

// Función para generar SVG desde PNG
async function generateSVG() {
  // Convertir PNG a SVG embebido (base64)
  const pngBuffer = await sharp(faviconPath)
    .resize(512, 512, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
    .png()
    .toBuffer();
  
  const base64 = pngBuffer.toString('base64');
  const svgWithEmbedded = `<svg width="512" height="512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
  <image href="data:image/png;base64,${base64}" width="512" height="512" preserveAspectRatio="xMidYMid meet"/>
</svg>`;
  
  writeFileSync(join(publicDir, 'icon.svg'), svgWithEmbedded);
  console.log(`✓ Generated icon.svg`);
  
  // También generar para app/icon.svg (Next.js App Router)
  const appDir = join(__dirname, '..', 'app');
  writeFileSync(join(appDir, 'icon.svg'), svgWithEmbedded);
  console.log(`✓ Generated app/icon.svg`);
}

async function main() {
  console.log('🎨 Generating PWA icons from favicon.png...\n');
  
  try {
    // Generar SVG primero
    await generateSVG();
    
    // Iconos normales
    await generateIcon(192, 'icon-192.png');
    await generateIcon(512, 'icon-512.png');
    
    // Iconos maskable (con safe zone)
    await generateMaskableIcon(192, 'icon-maskable-192.png');
    await generateMaskableIcon(512, 'icon-maskable-512.png');
    
    // Apple icon (180x180)
    await generateMaskableIcon(180, 'apple-icon.png');
    
    // Favicon 32x32
    await generateIcon(32, 'favicon-32.png');
    
    console.log('\n✅ All icons generated successfully!');
  } catch (error) {
    console.error('❌ Error generating icons:', error);
    process.exit(1);
  }
}

main();

