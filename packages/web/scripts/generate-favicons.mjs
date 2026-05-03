import { mkdir, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

import sharp from 'sharp'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..')
const SRC = resolve(ROOT, 'src/assets/evo-logo.png')
const OUT = resolve(ROOT, 'public')

const BG = '#0f0d11'
const SIZES = [16, 32, 180, 192, 512]

function roundedSquareBg(size) {
  const radius = Math.round(size * 0.15)
  const svg = `<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg"><rect width="${size}" height="${size}" rx="${radius}" ry="${radius}" fill="${BG}"/></svg>`
  return Buffer.from(svg)
}

async function buildIcon(size) {
  const padding = Math.round(size * 0.16)
  const innerSize = size - padding * 2
  const trimmed = await sharp(SRC)
    .trim()
    .resize(innerSize, innerSize, {
      fit: 'contain',
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .png()
    .toBuffer()
  return sharp(roundedSquareBg(size))
    .composite([{ input: trimmed, gravity: 'center' }])
    .png({ compressionLevel: 9 })
    .toBuffer()
}

async function main() {
  await mkdir(OUT, { recursive: true })
  const buffers = {}
  for (const size of SIZES) buffers[size] = await buildIcon(size)

  await writeFile(resolve(OUT, 'favicon-16x16.png'), buffers[16])
  await writeFile(resolve(OUT, 'favicon-32x32.png'), buffers[32])
  await writeFile(resolve(OUT, 'apple-touch-icon.png'), buffers[180])
  await writeFile(resolve(OUT, 'android-chrome-192x192.png'), buffers[192])
  await writeFile(resolve(OUT, 'android-chrome-512x512.png'), buffers[512])
  // favicon.ico is a root-fetch fallback only (not referenced in <link>);
  // browsers auto-request /favicon.ico. PNG-encoded .ico is fine for that purpose.
  await writeFile(resolve(OUT, 'favicon.ico'), buffers[32])

  const manifest = {
    name: 'Evo Studio',
    short_name: 'Evo Studio',
    description: 'Salon de frumusețe în Chișinău',
    icons: [
      { src: '/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
      { src: '/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    theme_color: '#0f0d11',
    background_color: '#0f0d11',
    display: 'standalone',
  }
  await writeFile(resolve(OUT, 'site.webmanifest'), JSON.stringify(manifest, null, 2))

  console.warn(`Wrote favicons to ${OUT}`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
