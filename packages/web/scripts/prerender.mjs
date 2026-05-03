import { mkdir, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

import puppeteer from 'puppeteer'
import { preview } from 'vite'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..')
const DIST = resolve(ROOT, 'dist')

const ROUTES = [
  { route: '/', file: 'index.html' },
  { route: '/ru', file: 'ru/index.html' },
  { route: '/en', file: 'en/index.html' },
]

async function prerenderRoute(browser, baseUrl, route) {
  const page = await browser.newPage()
  await page.evaluateOnNewDocument(() => {
    Object.defineProperty(window, '__PRERENDER__', { value: true, writable: false })
  })

  const url = `${baseUrl}${route}?prerender=1`
  await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 })

  await page.evaluate(() => {
    return new Promise((resolveEvent) => {
      const t = setTimeout(() => resolveEvent(undefined), 2000)
      document.addEventListener(
        'render-event',
        () => {
          clearTimeout(t)
          resolveEvent(undefined)
        },
        { once: true },
      )
    })
  })

  const html = await page.content()
  await page.close()
  return html
}

async function main() {
  const server = await preview({ root: ROOT, preview: { port: 0 } })
  const baseUrl = server.resolvedUrls.local[0].replace(/\/$/, '')
  console.warn(`Preview server at ${baseUrl}`)

  const browser = await puppeteer.launch({ headless: true })
  try {
    for (const { route, file } of ROUTES) {
      const html = await prerenderRoute(browser, baseUrl, route)
      const out = resolve(DIST, file)
      await mkdir(dirname(out), { recursive: true })
      await writeFile(out, html)
      console.warn(`Prerendered ${route} → ${file}`)
    }
  } finally {
    await browser.close()
    await server.close()
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
