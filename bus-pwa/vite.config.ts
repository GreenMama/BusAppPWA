import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import mkcert from 'vite-plugin-mkcert'
import { VitePWA, VitePWAOptions } from "vite-plugin-pwa"

const manifestForPlugIn: Partial<VitePWAOptions> = {
  registerType: 'prompt',

  manifest: {
    "theme_color": "#c8c8c8",
    "background_color": "#ffa521",
    "icons": [
      {
        "purpose": "maskable",
        "sizes": "512x512",
        "src": "icon512_maskable.png",
        "type": "image/png"
      },
      {
        "purpose": "any",
        "sizes": "512x512",
        "src": "icon512_rounded.png",
        "type": "image/png"
      }
    ],
    "orientation": "any",
    "display": "standalone",
    "lang": "en-US",
    "start_url": "https://runon.cloud/bus-pwa/",
    "scope": "https://runon.cloud/bus-pwa/",
    "name": "Radical Generosity Bus App",
    "short_name": "Bus App",
    "description": "Application for YesLiberia to support Radical Generosity Buses",
    "id": "https://runon.cloud/bus-pwa/",
    "screenshots": [
      {
        "src": "screenshot.png",
        "sizes": "754x913",
        "type": "image/png",
        "form_factor": "narrow",
        "platform": "web"
      }
    ]
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  server: { https: true },
  //plugins: [react(), mkcert()],
  plugins: [
    react(),
    mkcert(),
    VitePWA(manifestForPlugIn)
  ],
  base: '/bus-pwa/'
})