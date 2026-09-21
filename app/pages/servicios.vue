<!-- servicios.vue — Página de Servicios completa y funcional -->
<template>
  <div class="page-services">
    <!-- 1. Cabecera -->
    <header class="page-header section" aria-labelledby="page-title">
      <div class="container text-center">
        <div class="breadcrumb" v-reveal>
          <NuxtLink to="/">Inicio</NuxtLink> / <span>Servicios</span>
        </div>
        <h1 id="page-title" class="page-header__title" v-reveal="{ delay: 100 }">
          <span class="gradient-text-animated">Servicios</span>
        </h1>
        <p class="page-header__subtitle" v-reveal="{ delay: 200 }">
          Desde tu primera idea hasta un sistema funcionando.
        </p>
      </div>
    </header>

    <!-- Asistente interactivo -->
    <SectionsServiceWizard />

    <!-- 2. Detalle de los 4 servicios -->
    <section class="services-detail section">
      <div class="container">
        <div class="services-list">
          <div
            v-for="(svc, index) in services"
            :key="svc.slug"
            :id="svc.slug"
            class="service-row"
            :class="{ 'service-row--reverse': index % 2 !== 0 }"
            v-reveal
          >
            <!-- Visual -->
            <div class="service-row__visual">
              <div class="service-row__icon-wrap">
                <UiIconBadge :icon="svc.icon" :size="48" color="cyan" />
              </div>
              <div class="service-row__decor" aria-hidden="true" />
            </div>

            <!-- Contenido -->
            <div class="service-row__content">
              <h2 class="service-row__title">{{ svc.title }}</h2>
              <p class="service-row__desc">{{ svc.description }}</p>

              <ul class="service-row__points">
                <li v-for="(point, pIdx) in svc.points" :key="pIdx">
                  <UiIconsIconCheck class="service-row__check" :size="20" />
                  <span>{{ point }}</span>
                </li>
              </ul>

              <UiBaseButton
                :to="`/contacto?motivo=${svc.ctaMotivo}${svc.slug === 'sistemas-renta' ? '&sistema=dokko' : ''}`"
                variant="primary"
                class="service-row__btn"
              >
                {{ svc.cta }}
              </UiBaseButton>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 3. Dos formas de trabajar (Comparativa) -->
    <section class="two-ways section">
      <div class="container">
        <UiSectionTitle
          pre="Dos formas de trabajar con nosotros"
          center
          class="mb-4"
          v-reveal
        />

        <div class="two-ways__grid">
          <!-- A medida -->
          <div class="two-ways__card" v-reveal="{ delay: 100 }">
            <h3 class="two-ways__title">A la medida</h3>
            <p class="two-ways__desc">Te escuchamos, diseñamos la solución juntos y construimos exactamente lo que necesitas. Se cotiza según tu idea y alcance.</p>
            <UiBaseButton to="/contacto?motivo=medida" variant="secondary">
              Cotizar mi proyecto
            </UiBaseButton>
          </div>

          <!-- Licencia -->
          <div class="two-ways__card two-ways__card--highlight" v-reveal="{ delay: 200 }">
            <h3 class="two-ways__title">Sistema en renta (licencia)</h3>
            <p class="two-ways__desc">Usa un sistema listo con módulos para tu tipo de negocio. Prueba 15 días sin compromiso y decide después.</p>
            <UiBaseButton to="/contacto?motivo=prueba" variant="primary">
              Probar 15 días
            </UiBaseButton>
          </div>
        </div>
      </div>
    </section>

    <!-- 4. Spotlight de Dokko -->
    <section class="dokko-spotlight section">
      <div class="container dokko-spotlight__inner" v-reveal>
        <div class="dokko-spotlight__content">
          <span class="pill pill--cyan mb-2">Multi-tenant</span>
          <h2 class="dokko-spotlight__title">Conoce Dokko</h2>
          <p class="dokko-spotlight__desc">Dokko es nuestro sistema de gestión en renta. Un solo sistema, varios módulos adaptados a cada tipo de negocio.</p>

          <div class="dokko-spotlight__modules">
            <div class="dokko-module"><UiIconsIconDashboard :size="20"/> Inmobiliarias</div>
            <div class="dokko-module"><UiIconsIconUsers :size="20"/> Salones</div>
            <div class="dokko-module"><UiIconsIconCheck :size="20"/> Barberías</div>
            <div class="dokko-module"><UiIconsIconZap :size="20"/> Gimnasios</div>
          </div>

          <div class="dokko-spotlight__actions">
            <UiBaseButton to="/contacto?motivo=prueba&sistema=dokko" variant="primary">
              Probar 15 días
            </UiBaseButton>
            <UiBaseButton to="/portafolio#dokko" variant="ghost">
              Ver Dokko en el portafolio
            </UiBaseButton>
          </div>
        </div>
      </div>
    </section>

    <!-- 5. Cómo trabajamos (Proceso) -->
    <section class="process-section section">
      <div class="container">
        <UiSectionTitle
          pre="Cómo trabajamos"
          center
          class="mb-4"
          v-reveal
        />
        <SectionsProcessSteps :steps="processSteps" />
      </div>
    </section>

    <!-- 6. FAQ -->
    <section class="faq-section section">
      <div class="container faq-section__inner">
        <div class="faq-section__header" v-reveal>
          <UiSectionTitle pre="Preguntas frecuentes" />
          <UiBaseButton to="/contacto" variant="ghost" class="mt-2">
            ¿Tienes otra duda? Escríbenos
          </UiBaseButton>
        </div>
        <div class="faq-section__content" v-reveal="{ delay: 150 }">
          <UiAccordion :items="faqItems" />
        </div>
      </div>
    </section>

    <!-- 7. CTA Final -->
    <SectionsCtaFinal
      pre="¿Listo para"
      accent="empezar"
      post="?"
      cta-text="Hablemos de tu idea"
    />
  </div>
</template>

<script setup lang="ts">
import { services } from '~/data/services'
import { faq } from '~/data/faq'

useSeoMeta({
  title: 'Servicios | UXcode Solutions',
  description: 'Apps móviles con Flutter, sistemas de gestión a medida, soluciones web y sistemas en renta. Desde tu idea hasta un producto funcionando.',
})

const processSteps = [
  { number: '01', title: 'Nos cuentas tu idea', description: 'Nos escribes, agendamos una llamada y entendemos qué quieres construir. Sin formularios eternos.' },
  { number: '02', title: 'Diseñamos la solución contigo', description: 'Definimos el alcance, la tecnología y el plan. Tú apruebas antes de que escribamos una sola línea de código.' },
  { number: '03', title: 'Construimos rápido con ayuda de IA', description: 'Desarrollamos con herramientas de IA para llegar antes al mercado, sin perder calidad ni criterio humano.' },
  { number: '04', title: 'Lo pruebas y lo lanzamos', description: 'Revisas, nos das feedback y lanzamos juntos. Seguimos contigo después del lanzamiento.' },
]

const faqItems = faq
</script>

<style scoped>
.page-header {
  padding-top: calc(var(--navbar-h) + 4rem);
  padding-bottom: 4rem;
  background: radial-gradient(circle at top, rgba(0,255,255,0.06), transparent 60%);
}

.text-center { text-align: center; }
.mb-2 { margin-bottom: 1rem; }
.mb-4 { margin-bottom: 3rem; }
.mt-2 { margin-top: 1rem; }

.breadcrumb {
  font-size: 0.85rem;
  color: var(--text-muted);
  margin-bottom: 1.5rem;
}
.breadcrumb a { color: var(--text); font-weight: 500; }
.breadcrumb a:hover { color: var(--accent); }

.page-header__title { font-size: clamp(3rem, 6vw, 4.5rem); margin-bottom: 1rem; line-height: 1.1; }
.page-header__subtitle { font-size: 1.2rem; color: var(--text-muted); max-width: 600px; margin-inline: auto; }

/* ── Detalle de servicios ── */
.services-list { display: flex; flex-direction: column; gap: 4rem; }
@media (min-width: 768px) { .services-list { gap: 6rem; } }

.service-row {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2.5rem;
  align-items: center;
}

@media (min-width: 768px) {
  .service-row { grid-template-columns: 1fr 1fr; gap: 4rem; }
  .service-row--reverse .service-row__visual { order: 2; }
  .service-row--reverse .service-row__content { order: 1; }
}

.service-row__visual {
  position: relative;
  aspect-ratio: 1;
  max-width: 380px;
  margin: 0 auto;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.service-row__decor {
  position: absolute;
  inset: 10%;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(0,255,255,0.06), rgba(0,102,255,0.06));
  border: 1px solid rgba(0,255,255,0.15);
  z-index: 0;
  animation: floatSlow 8s ease-in-out infinite;
}

.service-row__icon-wrap { position: relative; z-index: 1; transform: scale(1.5); }

.service-row__title { font-size: var(--fs-h2); margin-bottom: 1rem; }
.service-row__desc { font-size: 1.1rem; color: var(--text-muted); margin-bottom: 1.5rem; }

.service-row__points { margin-bottom: 2rem; display: flex; flex-direction: column; gap: 0.75rem; }
.service-row__points li { display: flex; align-items: flex-start; gap: 0.75rem; color: var(--text-muted); font-size: 1rem; }
.service-row__check { color: var(--success); flex-shrink: 0; margin-top: 2px; }

/* ── Dos formas de trabajar ── */
.two-ways__grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  max-width: 900px;
  margin-inline: auto;
}

@media (min-width: 768px) { .two-ways__grid { grid-template-columns: 1fr 1fr; } }

.two-ways__card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-card);
  padding: 2.5rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  backdrop-filter: blur(8px);
}

.two-ways__card--highlight {
  border-color: rgba(0,255,255,0.2);
  background: linear-gradient(to bottom, rgba(0,255,255,0.04), var(--surface));
  box-shadow: var(--shadow-glow);
}

.two-ways__title { font-size: 1.3rem; margin-bottom: 1rem; }
.two-ways__desc { color: var(--text-muted); margin-bottom: 2rem; flex: 1; }

/* ── Dokko Spotlight ── */
.dokko-spotlight__inner {
  background: var(--surface-2);
  border: 1px solid rgba(0,102,255,0.2);
  border-radius: var(--radius-card);
  padding: 3rem 2rem;
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(8px);
}

.dokko-spotlight__inner::before {
  content: '';
  position: absolute;
  top: 0; right: 0;
  width: 50%; height: 100%;
  background: radial-gradient(ellipse at right, rgba(0,102,255,0.12) 0%, transparent 70%);
  pointer-events: none;
}

.dokko-spotlight__content { position: relative; z-index: 1; max-width: 700px; }
.pill--cyan { background: rgba(0,255,255,0.08); color: var(--accent); border-color: rgba(0,255,255,0.25); }

.dokko-spotlight__title { font-size: var(--fs-h2); margin-bottom: 1rem; }
.dokko-spotlight__desc { font-size: 1.1rem; color: var(--text-muted); margin-bottom: 2rem; line-height: 1.7; }

.dokko-spotlight__modules {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 2.5rem;
}

.dokko-module {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: var(--radius-sm);
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--text-muted);
}
.dokko-module svg { color: var(--accent); }

.dokko-spotlight__actions { display: flex; gap: 1rem; flex-wrap: wrap; }

/* ── FAQ ── */
.faq-section__inner {
  display: grid;
  grid-template-columns: 1fr;
  gap: 3rem;
}

@media (min-width: 768px) {
  .faq-section__inner { grid-template-columns: 1fr 2fr; gap: 4rem; }
}

@keyframes floatSlow {
  0%, 100% { transform: scale(1) rotate(0deg); }
  50% { transform: scale(1.05) rotate(5deg); }
}
</style>
