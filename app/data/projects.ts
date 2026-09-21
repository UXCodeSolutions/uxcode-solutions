// projects.ts — Portafolio de UXcode Solutions
// image: null → se muestra placeholder de marca automáticamente
// links con null → botón deshabilitado "Enlace próximamente"
// Cuando el propietario suba imágenes/links, editar solo aquí.

export interface Project {
  slug: string
  name: string
  type: 'producto' | 'cliente'
  category: string
  tech: string[]
  status: 'published' | 'in-progress' | null
  image: string | null
  links: {
    playStore?: string | null
    web?: string | null
    demo?: string | null
  }
  tags: string[]
  featured?: boolean
}

export const projects: Project[] = [
  // ── Productos propios ──────────────────────────────────────────────────
  {
    slug: 'just-blocks',
    name: 'Just Blocks',
    type: 'producto',
    category: 'Juego',
    tech: ['Flutter'],
    status: 'published',
    image: null, // Pendiente: subir captura a /images/projects/just-blocks.webp
    links: {
      playStore: 'https://play.google.com/store/apps/details?id=just.blocks&pcampaignid=web_share',
    },
    tags: ['Flutter', 'Android', 'iOS', 'Juego', 'Multijugador'],
    featured: true,
  },
  {
    slug: 'viewly',
    name: 'Viewly',
    type: 'producto',
    category: 'Streaming Social',
    tech: ['Flutter'],
    status: 'in-progress',
    image: null,
    links: {
      web: null, // Pendiente
    },
    tags: ['Flutter', 'Streaming', 'Salas', 'Netflix', 'YouTube'],
    featured: true,
  },
  {
    slug: 'dokko',
    name: 'Dokko',
    type: 'producto',
    category: 'Sistema de Gestión',
    tech: ['Flutter'],
    status: 'in-progress',
    image: null,
    links: {
      demo: null, // Pendiente: demo en vivo
    },
    tags: ['Flutter', 'SaaS', 'Multi-tenant', 'Inmobiliaria', 'Salón', 'Barbería', 'Gimnasio'],
    featured: true,
  },
  {
    slug: 'uxcode-solutions',
    name: 'UXcode Solutions',
    type: 'producto',
    category: 'Marca',
    tech: ['Nuxt', 'Vue.js'],
    status: null,
    image: null,
    links: {},
    tags: ['Nuxt', 'Vue', 'Web', 'Marca'],
    featured: false,
  },
  // ── Proyectos para clientes ────────────────────────────────────────────
  {
    slug: 'nexo-inmuebles',
    name: 'Nexo Inmuebles',
    type: 'cliente',
    category: 'Sitio Web',
    tech: ['Vue.js'],
    status: null,
    image: null,
    links: {
      web: 'https://nexo-inmuebles.vercel.app',
    },
    tags: ['Vue.js', 'Inmobiliaria', 'Web', 'Leads'],
    featured: false,
  },
]
