<!-- contacto.vue — Página de Contacto -->
<template>
  <div class="page-contact">
    <header class="page-header section" aria-labelledby="page-title">
      <div class="container text-center">
        <h1 id="page-title" class="page-header__title" v-reveal>
          {{ $t('contactPage.title_pre') }}
          <span class="gradient-text-animated">{{ $t('contactPage.title_accent') }}</span>
        </h1>
        <p class="page-header__subtitle" v-reveal="{ delay: 100 }">
          {{ $t('contactPage.subtitle') }}
        </p>
      </div>
    </header>

    <section class="contact-section section">
      <div class="container contact-section__inner">
        <!-- Columna Izquierda: Tarjetas informativas -->
        <div class="contact-info">
          <!-- Correo -->
          <div class="info-card" v-reveal="{ delay: 0 }">
            <UiIconBadge icon="mail" color="cyan" class="info-card__icon" />
            <div class="info-card__content">
              <h3 class="info-card__title">{{ $t('contactPage.emailCard') }}</h3>
              <a v-if="site.email" :href="`mailto:${site.email}`" class="info-card__link">{{ site.email }}</a>
              <span v-else class="info-card__pending">{{ $t('contactPage.pendingContact') }}</span>
            </div>
          </div>

          <!-- WhatsApp -->
          <div class="info-card" v-reveal="{ delay: 100 }">
            <UiIconBadge icon="whatsapp" color="cyan" class="info-card__icon" />
            <div class="info-card__content">
              <h3 class="info-card__title">{{ $t('contactPage.whatsappCard') }}</h3>
              <a v-if="site.social.whatsapp" :href="site.social.whatsapp" target="_blank" rel="noopener" class="info-card__link">Escríbenos por WhatsApp</a>
              <span v-else class="info-card__pending">{{ $t('contactPage.pendingContact') }}</span>
            </div>
          </div>

          <!-- Prueba 15 días (Banner pequeño lateral) -->
          <div class="info-card info-card--highlight" v-reveal="{ delay: 200 }">
            <UiIconBadge icon="rocket" color="gradient" class="info-card__icon" />
            <div class="info-card__content">
              <h3 class="info-card__title">{{ $t('contactPage.trialCard') }}</h3>
              <p class="info-card__desc">{{ $t('contactPage.trialCardDesc') }}</p>
            </div>
          </div>
        </div>

        <!-- Columna Derecha: Formulario -->
        <div class="contact-form-area" v-reveal="{ delay: 300 }">
          <SectionsContactForm />
        </div>
      </div>
    </section>

    <!-- Qué pasa después (Pasos) -->
    <section class="next-steps section">
      <div class="container">
        <UiSectionTitle :pre="$t('contactPage.nextSteps.title')" center class="mb-5" v-reveal />
        
        <div class="steps-grid">
          <div
            v-for="(step, i) in nextSteps"
            :key="i"
            class="step-card"
            v-reveal="{ delay: i * 150 }"
          >
            <div class="step-card__number">{{ step.number }}</div>
            <h3 class="step-card__title">{{ step.title }}</h3>
            <p class="step-card__desc">{{ step.description }}</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { site } from '~/data/site'

const { t } = useI18n()

useSeoMeta({
  title: t('seo.contact.title'),
  description: t('seo.contact.description'),
})

const nextSteps = [
  { number: '1', title: 'Recibimos tu mensaje', description: 'Lo leemos con atención y lo analizamos antes de responderte.' },
  { number: '2', title: 'Te contactamos', description: 'Agendamos una llamada o conversación para entender tu idea a fondo.' },
  { number: '3', title: 'Te proponemos la mejor solución', description: 'Sin compromisos: te decimos qué haríamos, cómo y en cuánto tiempo.' },
]
</script>

<style scoped>
.page-header {
  padding-top: calc(var(--navbar-h) + 4rem);
  padding-bottom: 2rem;
}

.text-center { text-align: center; }
.mb-5 { margin-bottom: 4rem; }

.page-header__title { font-size: clamp(3rem, 6vw, 4.5rem); margin-bottom: 1rem; line-height: 1.1; }
.page-header__subtitle { font-size: 1.2rem; color: var(--text-muted); max-width: 600px; margin-inline: auto; }

/* ── Contacto Principal ── */
.contact-section { padding-block: 2rem; }
.contact-section__inner {
  display: grid;
  grid-template-columns: 1fr;
  gap: 3rem;
}

@media (min-width: 992px) {
  .contact-section__inner { grid-template-columns: 1fr 1.5fr; gap: 5rem; align-items: flex-start; }
}

/* Info Cards */
.contact-info { display: flex; flex-direction: column; gap: 1.5rem; }

.info-card {
  display: flex;
  align-items: flex-start;
  gap: 1.5rem;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-card);
  padding: 1.5rem;
  transition: transform var(--transition-base), box-shadow var(--transition-base);
}

@media (hover: hover) { .info-card:hover { transform: translateX(8px); border-color: rgba(0,212,212,0.3); box-shadow: var(--shadow-card); } }

.info-card--highlight { background: linear-gradient(135deg, rgba(0,212,212,0.05), var(--surface)); border-color: rgba(0,212,212,0.2); }

.info-card__icon { flex-shrink: 0; }
.info-card__title { font-size: 1.1rem; margin-bottom: 0.25rem; }
.info-card__link { color: var(--accent); text-decoration: none; font-weight: 500; font-size: 0.95rem; transition: color var(--transition-base); }
.info-card__link:hover { color: var(--text); }
.info-card__pending { color: var(--text-muted); font-size: 0.85rem; font-style: italic; }
.info-card__desc { color: var(--text-muted); font-size: 0.9rem; margin-top: 0.25rem; }

/* ── Qué pasa después ── */
.next-steps { background: var(--surface-2); border-top: 1px solid var(--border); padding-block: 5rem; }

.steps-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
}

@media (min-width: 768px) {
  .steps-grid { grid-template-columns: repeat(3, 1fr); gap: 3rem; }
}

.step-card { text-align: center; }

.step-card__number {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: rgba(0,212,212,0.1);
  color: var(--accent);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-title);
  font-size: 1.5rem;
  margin: 0 auto 1.5rem;
  border: 1px solid rgba(0,212,212,0.3);
}

.step-card__title { font-size: 1.2rem; margin-bottom: 0.75rem; }
.step-card__desc { color: var(--text-muted); font-size: 0.95rem; }
</style>
