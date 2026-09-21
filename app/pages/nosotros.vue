<!-- nosotros.vue — Página "Nosotros" -->
<template>
  <div class="page-about">
    <!-- 1. Cabecera -->
    <header class="page-header section" aria-labelledby="page-title">
      <div class="container text-center">
        <h1 id="page-title" class="page-header__title" v-reveal>
          {{ $t('aboutPage.title_pre') }}
          <span class="gradient-text-animated">{{ $t('aboutPage.title_accent') }}</span>
        </h1>
        <p class="page-header__tagline" v-reveal="{ delay: 100 }">
          "{{ $t('aboutPage.tagline') }}"
        </p>
      </div>
    </header>

    <!-- 2. Historia y Foto -->
    <section class="about-story section">
      <div class="container about-story__inner">
        <!-- Visual (Imagen real o SVG fallback) -->
        <div class="about-story__visual" v-reveal>
          <!-- Se usa la foto IMG_8108-Photoroom.png como indicaste -->
          <NuxtImg
            src="/images/about/team.png"
            alt="Equipo UXcode Solutions"
            class="about-story__img"
            loading="eager"
            width="600"
            height="600"
            @error="imageError = true"
            v-show="!imageError"
          />
          <img
            v-if="imageError"
            src="/images/about-illustration.svg"
            alt="UXcode Solutions"
            class="about-story__img float-slow"
          />
          <div class="about-story__decor" aria-hidden="true" />
        </div>

        <!-- Contenido -->
        <div class="about-story__content" v-reveal="{ delay: 150 }">
          <h2 class="about-story__title">{{ $t('aboutPage.storyTitle') }}</h2>
          <p class="about-story__text">{{ $t('aboutPage.story') }}</p>
          
          <div class="about-story__actions mt-4">
            <UiBaseButton to="/contacto" variant="primary">{{ $t('aboutPage.cta1') }}</UiBaseButton>
            <UiBaseButton to="/portafolio" variant="ghost">{{ $t('aboutPage.cta2') }}</UiBaseButton>
          </div>
        </div>
      </div>
    </section>

    <!-- 3. Cifras reales (Contadores) -->
    <section class="stats-section section">
      <div class="container">
        <h2 class="sr-only">{{ $t('aboutPage.statsTitle') }}</h2>
        <div class="stats-grid">
          <!-- Productos propios -->
          <div class="stat-item" v-reveal="{ delay: 0 }">
            <div class="stat-item__number gradient-text">
              <span ref="num1">0</span>
            </div>
            <div class="stat-item__label">{{ $t('aboutPage.stats.products.label') }}</div>
          </div>
          <!-- Días de prueba -->
          <div class="stat-item" v-reveal="{ delay: 100 }">
            <div class="stat-item__number gradient-text">
              <span ref="num2">0</span>
            </div>
            <div class="stat-item__label">{{ $t('aboutPage.stats.trial.label') }}</div>
          </div>
          <!-- Tecnologías -->
          <div class="stat-item" v-reveal="{ delay: 200 }">
            <div class="stat-item__number gradient-text">
              <span ref="num3">0</span>
            </div>
            <div class="stat-item__label">{{ $t('aboutPage.stats.tech.label') }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- 4. Valores -->
    <section class="values-section section">
      <div class="container">
        <UiSectionTitle :pre="$t('aboutPage.valuesTitle')" center class="mb-5" v-reveal />
        
        <div class="values-grid">
          <div class="value-card" v-reveal="{ delay: 0 }">
            <UiIconBadge icon="users" color="blue" />
            <h3 class="value-card__title">{{ $t('aboutPage.values.human.title') }}</h3>
            <p class="value-card__desc">{{ $t('aboutPage.values.human.description') }}</p>
          </div>
          
          <div class="value-card" v-reveal="{ delay: 100 }">
            <UiIconBadge icon="zap" color="cyan" />
            <h3 class="value-card__title">{{ $t('aboutPage.values.fast.title') }}</h3>
            <p class="value-card__desc">{{ $t('aboutPage.values.fast.description') }}</p>
          </div>
          
          <div class="value-card" v-reveal="{ delay: 200 }">
            <UiIconBadge icon="dashboard" color="gradient" />
            <h3 class="value-card__title">{{ $t('aboutPage.values.custom.title') }}</h3>
            <p class="value-card__desc">{{ $t('aboutPage.values.custom.description') }}</p>
          </div>
          
          <div class="value-card" v-reveal="{ delay: 300 }">
            <UiIconBadge icon="check" color="cyan" />
            <h3 class="value-card__title">{{ $t('aboutPage.values.transparent.title') }}</h3>
            <p class="value-card__desc">{{ $t('aboutPage.values.transparent.description') }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 5. Uso honesto de IA -->
    <section class="ai-section section">
      <div class="container">
        <div class="ai-section__inner" v-reveal>
          <div class="ai-section__bg" aria-hidden="true" />
          <UiIconsIconRocket :size="40" class="ai-section__icon" />
          <h2 class="ai-section__title">{{ $t('aboutPage.aiTitle') }}</h2>
          <p class="ai-section__text">{{ $t('aboutPage.aiText') }}</p>
        </div>
      </div>
    </section>

  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()

useSeoMeta({
  title: t('seo.about.title'),
  description: t('seo.about.description'),
})

const imageError = ref(false)

// ── Animación de contadores ──
const num1 = ref<HTMLElement | null>(null)
const num2 = ref<HTMLElement | null>(null)
const num3 = ref<HTMLElement | null>(null)

// Valores objetivo (hardcodeados como dice el prompt para que sean reales)
const targets = [3, 15, 2]

const animateValue = (obj: HTMLElement | null, start: number, end: number, duration: number) => {
  if (!obj) return
  let startTimestamp: number | null = null
  const step = (timestamp: number) => {
    if (!startTimestamp) startTimestamp = timestamp
    const progress = Math.min((timestamp - startTimestamp) / duration, 1)
    // Easing easeOutQuart
    const easeProgress = 1 - Math.pow(1 - progress, 4)
    obj.innerHTML = Math.floor(easeProgress * (end - start) + start).toString()
    if (progress < 1) {
      window.requestAnimationFrame(step)
    } else {
      obj.innerHTML = end.toString()
    }
  }
  window.requestAnimationFrame(step)
}

onMounted(() => {
  // Usar IntersectionObserver para animar cuando entren al viewport
  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      animateValue(num1.value, 0, targets[0], 2000)
      animateValue(num2.value, 0, targets[1], 2000)
      animateValue(num3.value, 0, targets[2], 2000)
      observer.disconnect()
    }
  }, { threshold: 0.5 })

  if (num1.value) observer.observe(num1.value)
})
</script>

<style scoped>
.page-header {
  padding-top: calc(var(--navbar-h) + 4rem);
  padding-bottom: 2rem;
}

.text-center { text-align: center; }
.mb-5 { margin-bottom: 4rem; }
.mt-4 { margin-top: 2rem; }
.sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0, 0, 0, 0); white-space: nowrap; border-width: 0; }

.page-header__title { font-size: clamp(3rem, 6vw, 4.5rem); margin-bottom: 1rem; line-height: 1.1; }
.page-header__tagline { font-family: var(--font-title); font-size: 1.5rem; color: var(--accent); font-style: italic; }

/* ── Historia ── */
.about-story__inner {
  display: grid;
  grid-template-columns: 1fr;
  gap: 3rem;
  align-items: center;
}

@media (min-width: 992px) {
  .about-story__inner { grid-template-columns: 1fr 1fr; gap: 5rem; }
}

.about-story__visual { position: relative; display: flex; justify-content: center; }

.about-story__img {
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 500px;
  height: auto;
  border-radius: var(--radius-card);
  /* Overlay CSS a la foto del equipo para integrarla al diseño oscuro */
  filter: saturate(0.85) contrast(1.1);
  box-shadow: var(--shadow-card);
}

.about-story__decor {
  position: absolute;
  top: 50%; left: 50%;
  transform: translate(-50%, -50%);
  width: 120%; height: 120%;
  background: radial-gradient(circle, rgba(0,212,212,0.1) 0%, transparent 70%);
  pointer-events: none; z-index: 0;
}

.about-story__title { font-size: var(--fs-h2); margin-bottom: 1.5rem; }
.about-story__text { font-size: 1.1rem; color: var(--text-muted); line-height: 1.8; }
.about-story__actions { display: flex; gap: 1rem; flex-wrap: wrap; }

/* ── Cifras ── */
.stats-section { background: var(--surface-2); border-top: 1px solid var(--border); border-bottom: 1px solid var(--border); padding-block: 4rem; }
.stats-grid { display: grid; grid-template-columns: 1fr; gap: 3rem; text-align: center; }
@media (min-width: 640px) { .stats-grid { grid-template-columns: repeat(3, 1fr); gap: 2rem; } }

.stat-item__number { font-family: var(--font-title); font-size: 4rem; line-height: 1; margin-bottom: 0.5rem; }
.stat-item__label { font-size: 0.95rem; font-weight: 500; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.05em; }

/* ── Valores ── */
.values-grid { display: grid; grid-template-columns: 1fr; gap: 2rem; }
@media (min-width: 640px) { .values-grid { grid-template-columns: 1fr 1fr; } }
@media (min-width: 1024px) { .values-grid { grid-template-columns: repeat(4, 1fr); } }

.value-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-card);
  padding: 2rem;
  text-align: center;
  transition: transform var(--transition-base), box-shadow var(--transition-base);
}
@media (hover: hover) { .value-card:hover { transform: translateY(-4px); box-shadow: var(--shadow-card); border-color: rgba(0,212,212,0.3); } }

.value-card .icon-badge { margin-bottom: 1.5rem; }
.value-card__title { font-size: 1.2rem; margin-bottom: 0.75rem; }
.value-card__desc { font-size: 0.95rem; color: var(--text-muted); }

/* ── IA Honesta ── */
.ai-section__inner {
  position: relative;
  text-align: center;
  padding: 4rem 2rem;
  background: var(--surface);
  border: 1px solid rgba(0,76,223,0.2);
  border-radius: var(--radius-card);
  overflow: hidden;
  max-width: 800px;
  margin-inline: auto;
}
.ai-section__bg {
  position: absolute; inset: 0; pointer-events: none;
  background: radial-gradient(circle at top, rgba(0,76,223,0.1) 0%, transparent 70%);
}
.ai-section__icon { color: var(--accent); margin-bottom: 1rem; position: relative; z-index: 1; }
.ai-section__title { font-size: var(--fs-h3); margin-bottom: 1rem; position: relative; z-index: 1; }
.ai-section__text { font-size: 1.1rem; color: var(--text-muted); position: relative; z-index: 1; }
</style>
