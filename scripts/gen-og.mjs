import sharp from 'sharp';
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';

const svg = readFileSync('scripts/og-image.svg');
mkdirSync('public', { recursive: true });
const png = await sharp(svg, { density: 150 }).png().toBuffer();
writeFileSync('public/og-image.png', png);
console.log(`og-image.png written (${png.length} bytes)`);
