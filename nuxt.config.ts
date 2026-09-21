// nuxt.config.ts — Configuración principal de UXcode Solutions
// Nuxt 4 con estructura app/, módulos de contenido, imágenes, fuentes e i18n

export default defineNuxtConfig({
  // Compatibilidad con Nuxt 4 (estructura app/)
  future: { compatibilityVersion: 4 },
  compatibilityDate: '2024-11-01',

  // Módulos del ecosistema Nuxt
  modules: [
    '@nuxt/content',   // Blog en Markdown
    '@nuxtjs/i18n',    // Internacionalización (es ahora, en después)
    '@nuxt/image',     // Optimización de imágenes
    '@nuxt/fonts',     // Carga de fuentes con font-display: swap
  ],

  // ── Estilos globales ──────────────────────────────────────────────────────
  css: [
    '~/assets/css/tokens.css',
    '~/assets/css/base.css',
    '~/assets/css/animations.css',
  ],

  // ── App: head, transiciones y metadatos globales ──────────────────────────
  app: {
    head: {
      htmlAttrs: { lang: 'es' },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'theme-color', content: '#121212' },
        { name: 'color-scheme', content: 'dark' },
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
      ],
    },
    // Transición suave entre páginas (fundido + desplazamiento leve)
    pageTransition: { name: 'page', mode: 'out-in' },
    layoutTransition: { name: 'layout', mode: 'out-in' },
  },

  // ── Módulo i18n ───────────────────────────────────────────────────────────
  // Estrategia: sin prefijo ahora (solo español). Cuando se agregue inglés,
  // cambiar strategy a 'prefix_except_default'.
  i18n: {
    strategy: 'no_prefix',
    defaultLocale: 'es',
    locales: [
      { code: 'es', language: 'es-ES', file: 'es.json', name: 'Español' },
      { code: 'en', language: 'en-US', file: 'en.json', name: 'English' },
    ],
    langDir: '../i18n/locales/',
    lazy: true,
    bundle: {
      optimizeTranslationDirective: false
    }
  },

  // ── Módulo Content (blog Markdown) ────────────────────────────────────────
  content: {
    highlight: {
      theme: 'github-dark',
    },
  },

  // ── Módulo Image ──────────────────────────────────────────────────────────
  image: {
    quality: 85,
    formats: ['webp', 'avif'],
    screens: { sm: 640, md: 768, lg: 1024, xl: 1280, xxl: 1536 },
  },

  // ── Módulo Fonts ──────────────────────────────────────────────────────────
  fonts: {
    families: [
      { name: 'Outfit', weights: [300, 400, 500, 600, 700, 800] },
      { name: 'Inter', weights: [400, 500, 600] },
    ],
    defaults: {
      weights: [400],
      styles: ['normal'],
      subsets: ['latin'],
    },
  },

  // ── Nitro: prerenderizado para SEO y velocidad ────────────────────────────
  // Se usa nuxt build (no generate) porque /api/contact se despliega como
  // función serverless en Vercel.
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/', '/servicios', '/portafolio', '/nosotros', '/blog', '/contacto'],
    },
  },

  // ── Reglas de rutas: cache para assets estáticos ──────────────────────────
  routeRules: {
    '/images/**': { headers: { 'cache-control': 'public, max-age=31536000, immutable' } },
  },

  // ── DevTools en desarrollo ────────────────────────────────────────────────
  devtools: { enabled: true },
})
