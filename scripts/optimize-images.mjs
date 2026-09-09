import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const IMAGES_DIR = path.resolve("public/images");
const MAX_DIMENSION = 1920;
const WEBP_QUALITY = 80;

async function getFiles(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await getFiles(fullPath)));
    } else {
      files.push(fullPath);
    }
  }
  return files;
}

function formatBytes(bytes) {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${(bytes / Math.pow(k, i)).toFixed(2)} ${sizes[i]}`;
}

async function optimizeImages() {
  console.log(`Buscando imágenes en ${IMAGES_DIR}...`);
  const allFiles = await getFiles(IMAGES_DIR);
  const imageFiles = allFiles.filter((file) => {
    const ext = path.extname(file).toLowerCase();
    // No modificar logo.png para mantener máxima nitidez vectorial/branding
    if (path.basename(file) === "logo.png") return false;
    return [".webp", ".jpg", ".jpeg", ".png"].includes(ext);
  });

  console.log(`Encontradas ${imageFiles.length} imágenes para optimizar.\n`);

  let totalOriginal = 0;
  let totalOptimized = 0;
  let optimizedCount = 0;

  for (const file of imageFiles) {
    const relativePath = path.relative(process.cwd(), file);
    const ext = path.extname(file).toLowerCase();
    const stat = await fs.stat(file);
    const origSize = stat.size;
    totalOriginal += origSize;

    try {
      let pipeline = sharp(file).resize({
        width: MAX_DIMENSION,
        height: MAX_DIMENSION,
        fit: "inside",
        withoutEnlargement: true,
      });

      let buffer;
      if (ext === ".webp") {
        buffer = await pipeline.webp({ quality: WEBP_QUALITY, effort: 6 }).toBuffer();
      } else if (ext === ".jpg" || ext === ".jpeg") {
        buffer = await pipeline.jpeg({ quality: 80, mozjpeg: true }).toBuffer();
      } else if (ext === ".png") {
        buffer = await pipeline.png({ quality: 85, compressionLevel: 9 }).toBuffer();
      }

      if (buffer && buffer.length < origSize) {
        await fs.writeFile(file, buffer);
        totalOptimized += buffer.length;
        optimizedCount++;
        const savedPercent = (((origSize - buffer.length) / origSize) * 100).toFixed(1);
        console.log(
          `✓ ${relativePath} : ${formatBytes(origSize)} -> ${formatBytes(buffer.length)} (-${savedPercent}%)`
        );
      } else {
        totalOptimized += origSize;
        console.log(`- ${relativePath} : Ya estaba óptimo (${formatBytes(origSize)})`);
      }
    } catch (err) {
      totalOptimized += origSize;
      console.error(`✗ Error optimizando ${relativePath}:`, err.message);
    }
  }

  const savedTotal = totalOriginal - totalOptimized;
  const savedTotalPercent = ((savedTotal / totalOriginal) * 100).toFixed(1);

  console.log("\n=========================================");
  console.log(`Total original:   ${formatBytes(totalOriginal)}`);
  console.log(`Total optimizado: ${formatBytes(totalOptimized)}`);
  console.log(`Ahorro total:     ${formatBytes(savedTotal)} (-${savedTotalPercent}%)`);
  console.log(`Imágenes reducidas: ${optimizedCount}/${imageFiles.length}`);
  console.log("=========================================\n");
}

optimizeImages().catch((err) => {
  console.error("Error en optimización:", err);
  process.exit(1);
});
