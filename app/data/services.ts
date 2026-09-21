// services.ts — Los 4 servicios de UXcode Solutions
// IMPORTANTE: NO incluir "desarrollo de juegos" como servicio.
// Los juegos (Just Blocks) son creaciones propias de la marca, no servicios.

export interface Service {
  slug: string
  icon: string
  cta: string
  ctaMotivo: string
  title: string
  description: string
  points: string[]
}

export const services: Service[] = [
  {
    slug: 'apps-flutter',
    icon: 'smartphone',
    cta: 'Cotizar mi proyecto',
    ctaMotivo: 'medida',
    title: 'Apps móviles con Flutter',
    description: 'Tu app para Android y iOS desde un solo código. Rápida, fluida y pensada para tus usuarios.',
    points: [
      'Una sola base de código para Android e iOS',
      'Interfaz nativa y fluida',
      'Integración con backends y APIs',
      'Lanzamiento guiado en las tiendas',
    ],
  },
  {
    slug: 'sistemas-gestion',
    icon: 'dashboard',
    cta: 'Cotizar mi proyecto',
    ctaMotivo: 'medida',
    title: 'Sistemas de gestión a medida',
    description: 'Automatiza tu negocio con un sistema hecho a tu manera de trabajar: clientes, citas, inventario, reportes y más.',
    points: [
      'Diseñado según tu flujo de trabajo real',
      'Gestión de clientes, citas e inventario',
      'Reportes y estadísticas en tiempo real',
      'Acceso web o móvil',
    ],
  },
  {
    slug: 'soluciones-digitales',
    icon: 'globe',
    cta: 'Cotizar mi proyecto',
    ctaMotivo: 'medida',
    title: 'Soluciones digitales y sitios web',
    description: 'Sitios web, plataformas y herramientas digitales que presentan tu marca y te ayudan a captar clientes.',
    points: [
      'Diseño profesional y diferenciado',
      'Optimizado para buscadores (SEO)',
      'Rápido, seguro y adaptable',
      'Integración con herramientas de marketing',
    ],
  },
  {
    slug: 'sistemas-renta',
    icon: 'key',
    cta: 'Probar 15 días',
    ctaMotivo: 'prueba',
    title: 'Sistemas en renta (licencia)',
    description: 'Usa sistemas listos, como Dokko, con módulos para inmobiliarias, salones, barberías y gimnasios. Pruébalo 15 días sin compromiso.',
    points: [
      'Sistema listo desde el primer día',
      'Módulos para distintos tipos de negocio',
      '15 días de prueba real sin compromiso',
      'Soporte y actualizaciones incluidas',
    ],
  },
]
