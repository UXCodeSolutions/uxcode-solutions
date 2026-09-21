<!-- portafolio.vue — Página de Portafolio -->
<template>
  <div class="page-portfolio">
    <!-- 1. Cabecera -->
    <header class="page-header section" aria-labelledby="page-title">
      <div class="container text-center">
        <div class="breadcrumb" v-reveal>
          <NuxtLink to="/">Inicio</NuxtLink> / <span>{{ $t('nav.portfolio') }}</span>
        </div>
        <h1 id="page-title" class="page-header__title" v-reveal="{ delay: 100 }">
          <span class="gradient-text-animated">{{ $t('portfolioPage.title') }}</span>
        </h1>
        <p class="page-header__subtitle" v-reveal="{ delay: 200 }">
          {{ $t('portfolioPage.subtitle') }}
        </p>
      </div>
    </header>

    <!-- 2. Productos Propios -->
    <section class="portfolio-section section">
      <div class="container">
        <div class="portfolio-section__header" v-reveal>
          <h2 class="portfolio-section__title">{{ $t('portfolioPage.ownProducts') }}</h2>
          <p class="portfolio-section__note">
            <UiIconsIconShield :size="16" class="inline-icon" />
            {{ $t('portfolioPage.ownProductsNote') }}
          </p>
        </div>

        <div class="portfolio-grid">
          <div
            v-for="(project, index) in ownProducts"
            :key="project.slug"
            :id="project.slug"
            class="portfolio-grid__item"
            v-reveal="{ delay: index * 100 }"
          >
            <SectionsProjectCard :project="project" />
          </div>
        </div>
      </div>
    </section>

    <!-- 3. Proyectos para Clientes -->
    <section class="portfolio-section section portfolio-section--alt">
      <div class="container">
        <div class="portfolio-section__header" v-reveal>
          <h2 class="portfolio-section__title">{{ $t('portfolioPage.clientProjects') }}</h2>
          <p class="portfolio-section__note">
            <UiIconsIconUsers :size="16" class="inline-icon" />
            {{ $t('portfolioPage.clientNote') }}
          </p>
        </div>

        <div class="portfolio-grid">
          <div
            v-for="(project, index) in clientProjects"
            :key="project.slug"
            :id="project.slug"
            class="portfolio-grid__item"
            v-reveal="{ delay: index * 100 }"
          >
            <SectionsProjectCard :project="project" />
          </div>
        </div>
      </div>
    </section>

    <!-- 4. CTA Final -->
    <SectionsCtaFinal
      :pre="$t('portfolioPage.ctaTitle_pre')"
      :accent="$t('portfolioPage.ctaTitle_accent')"
      :post="$t('portfolioPage.ctaTitle_post')"
      :cta-text="$t('portfolioPage.ctaCta')"
    />
  </div>
</template>

<script setup lang="ts">
import { projects } from '~/data/projects'
const { t } = useI18n()

useSeoMeta({
  title: t('seo.portfolio.title'),
  description: t('seo.portfolio.description'),
})

const ownProducts = projects.filter(p => p.type === 'producto')
const clientProjects = projects.filter(p => p.type === 'cliente')
</script>

<style scoped>
.page-header {
  padding-top: calc(var(--navbar-h) + 4rem);
  padding-bottom: 3rem;
  background: radial-gradient(circle at top, rgba(0,76,223,0.1), transparent 70%);
}

.text-center { text-align: center; }

.breadcrumb {
  font-size: 0.85rem;
  color: var(--text-muted);
  margin-bottom: 1.5rem;
}
.breadcrumb a { color: var(--text); font-weight: 500; }
.breadcrumb a:hover { color: var(--accent); }

.page-header__title { font-size: clamp(3rem, 6vw, 4.5rem); margin-bottom: 1rem; line-height: 1.1; }
.page-header__subtitle { font-size: 1.2rem; color: var(--text-muted); max-width: 600px; margin-inline: auto; }

/* ── Secciones del portafolio ── */
.portfolio-section { padding-block: 4rem; }
.portfolio-section--alt { background: var(--surface-2); border-top: 1px solid var(--border); }

.portfolio-section__header { margin-bottom: 3rem; }
.portfolio-section__title { font-size: var(--fs-h2); margin-bottom: 0.5rem; }
.portfolio-section__note {
  font-size: 0.9rem;
  color: var(--text-muted);
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.inline-icon { color: var(--accent); }

.portfolio-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2.5rem;
}

@media (min-width: 768px) {
  .portfolio-grid { grid-template-columns: repeat(2, 1fr); }
}

@media (min-width: 1200px) {
  /* Si hay más de 2 items y es pantalla muy grande, podemos hacer grid de 3 */
  .portfolio-grid { grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); }
}
</style>
