// faq.ts — Preguntas frecuentes de UXcode Solutions
// Acordeón accesible en /servicios. Editar según evolucione la marca.

export interface FaqItem {
  id: string
  question: string
  answer: string
}

export const faq: FaqItem[] = [
  {
    id: 'prueba-15-dias',
    question: '¿Cómo funciona la prueba de 15 días?',
    answer:
      'Usas el sistema como si ya fuera tuyo durante 15 días, sin compromiso ni pago inicial. Al terminar, decides con calma si adquieres la licencia. Sin presiones.',
  },
  {
    id: 'cuanto-cuesta',
    question: '¿Cuánto cuesta?',
    answer:
      'Depende del tipo de proyecto. El desarrollo a medida se cotiza según tu idea, los requerimientos y el alcance. Los sistemas en renta funcionan por licencia mensual. Escríbenos y te orientamos sin rodeos.',
  },
  {
    id: 'juegos-para-clientes',
    question: '¿Desarrollan juegos para clientes?',
    answer:
      'No. Los juegos, como Just Blocks, son creaciones propias de UXcode Solutions. No ofrecemos desarrollo de juegos como servicio para terceros.',
  },
  {
    id: 'uso-de-ia',
    question: '¿Usan inteligencia artificial?',
    answer:
      'Sí, como herramienta para construir más rápido y con mayor calidad. Las ideas, el diseño y las decisiones importantes siguen siendo 100 % humanas. La IA acelera; nosotros dirigimos.',
  },
  {
    id: 'tecnologias',
    question: '¿Con qué tecnologías trabajan?',
    answer:
      'Principalmente Flutter para apps móviles (Android e iOS desde un solo código) y Vue/Nuxt para la web. Elegimos las herramientas según lo que mejor sirve a tu proyecto.',
  },
]
