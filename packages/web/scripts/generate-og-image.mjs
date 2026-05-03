import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

import sharp from 'sharp'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..')
const SRC = resolve(ROOT, 'src/assets/evo-logo.png')
const OUT = resolve(ROOT, 'public/og-image.jpg')

const W = 1200
const H = 630
const BG = '#0f0d11'
const PINK = '#e8308a'

async function main() {
  const logoBuf = await sharp(SRC)
    .trim()
    .resize(240, 240, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer()

  const overlay = `
    <svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="g" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stop-color="${BG}"/>
          <stop offset="100%" stop-color="#1a1419"/>
        </linearGradient>
      </defs>
      <rect width="${W}" height="${H}" fill="url(#g)"/>
      <text x="380" y="280" fill="#ffffff" font-family="Cormorant Garamond, serif" font-size="96" font-weight="500">Evo Studio</text>
      <text x="380" y="350" fill="${PINK}" font-family="Jost, sans-serif" font-size="36" font-weight="400">Salon de frumusețe · Chișinău</text>
      <path d="M 0 ${H - 80} Q ${W * 0.3} ${H - 130} ${W * 0.6} ${H - 60} T ${W} ${H - 90} L ${W} ${H} L 0 ${H} Z" fill="${PINK}" fill-opacity="0.85"/>
    </svg>
  `

  await sharp(Buffer.from(overlay))
    .composite([{ input: logoBuf, top: 195, left: 80 }])
    .jpeg({ quality: 85, mozjpeg: true })
    .toFile(OUT)

  console.warn(`Wrote ${OUT}`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
