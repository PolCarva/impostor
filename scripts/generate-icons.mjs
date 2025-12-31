import sharp from 'sharp';
import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = join(__dirname, '..', 'public');
const appDir = join(__dirname, '..', 'app');

// Leer el SVG desde app/icon.svg (que tiene currentColor)
const svgPath = join(appDir, 'icon.svg');
const fallbackPngPath = join(publicDir, 'favicon.png');

// Función para generar iconos PNG desde SVG con color específico
async function generateIcon(size, filename, fillColor = '#000000', options = {}) {
  const { padding = 0, background = { r: 255, g: 255, b: 255, alpha: 0 } } = options;
  
  // Leer el SVG y reemplazar currentColor con el color específico
  let svgContent = '';
  if (existsSync(svgPath)) {
    svgContent = readFileSync(svgPath, 'utf-8');
    // Reemplazar currentColor con el color específico
    svgContent = svgContent.replace(/fill="currentColor"/g, `fill="${fillColor}"`);
    svgContent = svgContent.replace(/fill='currentColor'/g, `fill="${fillColor}"`);
  } else if (existsSync(fallbackPngPath)) {
    // Fallback al PNG si no existe el SVG
    const iconSize = size - (padding * 2);
    let sharpInstance = sharp(fallbackPngPath)
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
    console.log(`✓ Generated ${filename} (${size}x${size}) from PNG`);
    return;
  } else {
    console.error(`❌ No SVG or PNG source found!`);
    return;
  }
  
  const iconSize = size - (padding * 2);
  const svgBuffer = Buffer.from(svgContent);
  
  let sharpInstance = sharp(svgBuffer)
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
  console.log(`✓ Generated ${filename} (${size}x${size}) with color ${fillColor}`);
}

// Función para generar iconos maskable (con padding para safe zone)
async function generateMaskableIcon(size, filename, fillColor = '#000000') {
  // Los iconos maskable necesitan un padding del ~10% para la safe zone
  const padding = Math.round(size * 0.1);
  const iconSize = size - (padding * 2);
  
  // Leer el SVG y reemplazar currentColor
  let svgContent = '';
  if (existsSync(svgPath)) {
    svgContent = readFileSync(svgPath, 'utf-8');
    svgContent = svgContent.replace(/fill="currentColor"/g, `fill="${fillColor}"`);
    svgContent = svgContent.replace(/fill='currentColor'/g, `fill="${fillColor}"`);
  } else if (existsSync(fallbackPngPath)) {
    // Fallback al PNG
    await sharp({
      create: {
        width: size,
        height: size,
        channels: 4,
        background: { r: 250, g: 250, b: 250, alpha: 1 }
      }
    })
    .composite([{
      input: await sharp(fallbackPngPath)
        .resize(iconSize, iconSize, { fit: 'contain' })
        .toBuffer(),
      gravity: 'center'
    }])
    .png()
    .toFile(join(publicDir, filename));
    console.log(`✓ Generated ${filename} (${size}x${size}) [maskable] from PNG`);
    return;
  } else {
    console.error(`❌ No SVG or PNG source found!`);
    return;
  }
  
  const svgBuffer = Buffer.from(svgContent);
  
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
    input: await sharp(svgBuffer)
      .resize(iconSize, iconSize, { fit: 'contain' })
      .toBuffer(),
    gravity: 'center'
  }])
  .png()
  .toFile(join(publicDir, filename));

  console.log(`✓ Generated ${filename} (${size}x${size}) [maskable] with color ${fillColor}`);
}

// Función para copiar el SVG a public con soporte para temas claro/oscuro
async function copySVG() {
  if (existsSync(svgPath)) {
    let svgContent = readFileSync(svgPath, 'utf-8');
    
    // Agregar estilos CSS para que el SVG se adapte al tema
    // En tema claro: fill negro, en tema oscuro: fill blanco
    const styleTag = `<style>
      :root { color-scheme: light dark; }
      path[fill="currentColor"] {
        fill: #000000;
      }
      @media (prefers-color-scheme: dark) {
        path[fill="currentColor"] {
          fill: #ffffff;
        }
      }
    </style>`;
    
    // Insertar el style tag después de la etiqueta svg
    svgContent = svgContent.replace(
      /<svg([^>]*)>/,
      `<svg$1>${styleTag}`
    );
    
    writeFileSync(join(publicDir, 'icon.svg'), svgContent);
    console.log(`✓ Copied icon.svg to public (with theme-aware currentColor)`);
    
    // También copiar a app/icon.svg (Next.js App Router lo usa automáticamente)
    writeFileSync(svgPath, svgContent);
    console.log(`✓ Updated app/icon.svg (with theme-aware currentColor)`);
  } else {
    console.warn(`⚠ SVG not found at ${svgPath}, skipping SVG copy`);
  }
}

async function main() {
  console.log('🎨 Generating PWA icons from SVG (with currentColor support)...\n');
  
  try {
    // Copiar SVG a public (mantiene currentColor para adaptarse al tema)
    await copySVG();
    
    // Iconos normales - usar negro para tema claro (los navegadores mostrarán el SVG con currentColor cuando sea posible)
    await generateIcon(192, 'icon-192.png', '#000000');
    await generateIcon(512, 'icon-512.png', '#000000');
    
    // Iconos maskable (con safe zone) - usar negro
    await generateMaskableIcon(192, 'icon-maskable-192.png', '#000000');
    await generateMaskableIcon(512, 'icon-maskable-512.png', '#000000');
    
    // Apple icon (180x180) - usar negro
    await generateMaskableIcon(180, 'apple-icon.png', '#000000');
    
    // Favicon 32x32 - usar negro
    await generateIcon(32, 'favicon-32.png', '#000000');
    
    console.log('\n✅ All icons generated successfully!');
    console.log('📝 Note: The SVG uses currentColor and will adapt to light/dark themes automatically.');
  } catch (error) {
    console.error('❌ Error generating icons:', error);
    process.exit(1);
  }
}

main();

