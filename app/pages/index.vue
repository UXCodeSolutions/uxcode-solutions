<!-- index.vue — Página de Inicio de UXcode Solutions -->
<template>
  <div>
    <!-- Sección 1: Hero -->
    <SectionsHeroSection />

    <!-- Sección 2: Tecnologías -->
    <SectionsTechStrip />

    <!-- Sección 3: Asistente Interactivo de Servicios -->
    <SectionsServiceWizard />

    <!-- Sección 4: Servicios destacados -->
    <section class="services-preview section" aria-labelledby="services-title">
      <div class="container">
        <UiSectionTitle
          id="services-title"
          :pre="$t('servicesSection.title_pre')"
          :accent="$t('servicesSection.title_accent')"
          :subtitle="$t('servicesSection.subtitle')"
          center
          class="services-preview__header"
          v-reveal
        />

        <div class="services-preview__grid">
          <div
            v-for="(svc, index) in featuredServices"
            :key="svc.slug"
            class="services-preview__card-wrap"
            v-reveal="{ delay: index * 100 }"
          >
            <SectionsServiceCard :service="svc" is-home />
          </div>
        </div>

        <div class="services-preview__actions" v-reveal>
          <UiBaseButton to="/servicios" variant="ghost">
            {{ $t('servicesSection.viewAll') }}
          </UiBaseButton>
        </div>
      </div>
    </section>

    <!-- Sección 4: Pilares -->
    <SectionsPillarsSection />

    <!-- Sección 5: Banner 15 días -->
    <SectionsTrialBanner />

    <!-- Sección 6: Portafolio Preview -->
    <section class="portfolio-preview section" aria-labelledby="portfolio-title">
      <div class="container">
        <UiSectionTitle
          id="portfolio-title"
          :pre="$t('portfolioPreview.title_pre')"
          :accent="$t('portfolioPreview.title_accent')"
          :subtitle="$t('portfolioPreview.subtitle')"
          class="portfolio-preview__header"
          v-reveal
        />

        <div class="portfolio-preview__grid">
          <div
            v-for="(project, index) in featuredProjects"
            :key="project.slug"
            class="portfolio-preview__card-wrap"
            v-reveal="{ delay: index * 100 }"
          >
            <SectionsProjectCard :project="project" />
          </div>
        </div>

        <div class="portfolio-preview__actions" v-reveal>
          <UiBaseButton to="/portafolio" variant="ghost">
            {{ $t('portfolioPreview.viewAll') }}
          </UiBaseButton>
        </div>
      </div>
    </section>

    <!-- Sección 7: Nosotros Teaser -->
    <SectionsAboutTeaser />

    <!-- Sección 8: Blog Preview -->
    <section class="blog-preview section" aria-labelledby="blog-title">
      <div class="container">
        <UiSectionTitle
          id="blog-title"
          :pre="$t('blogPreview.title_pre')"
          :accent="$t('blogPreview.title_accent')"
          :subtitle="$t('blogPreview.subtitle')"
          class="blog-preview__header"
          v-reveal
        />

        <div class="blog-preview__grid">
          <div
            v-for="(post, index) in recentPosts"
            :key="post._path"
            class="blog-preview__card-wrap"
            v-reveal="{ delay: index * 100 }"
          >
            <SectionsPostCard :post="(post as any)" />
          </div>
        </div>

        <div class="blog-preview__actions" v-reveal>
          <UiBaseButton to="/blog" variant="ghost">
            {{ $t('blogPreview.viewAll') }}
          </UiBaseButton>
        </div>
      </div>
    </section>

    <!-- Sección 9: CTA Final -->
    <SectionsCtaFinal
      :pre="$t('ctaFinal.title_pre')"
      :accent="$t('ctaFinal.title_accent')"
      :post="$t('ctaFinal.title_post')"
      :cta-text="$t('ctaFinal.cta')"
    />
  </div>
</template>

<script setup lang="ts">
import { services } from '~/data/services'
import { projects } from '~/data/projects'
import { useI18n } from '#imports'

const { t } = useI18n()

useSeoMeta({
  title: t('seo.home.title'),
  description: t('seo.home.description'),
})

const featuredServices = services
const featuredProjects = projects.filter(p => p.featured).slice(0, 3)

// Obtener los 3 artículos más recientes del blog
const { data: recentPosts } = await useAsyncData('recent-posts', () => {
  return queryContent('blog')
    .sort({ date: -1 })
    .limit(3)
    .find()
})
</script>

<style scoped>
/* ── Servicios Preview ── */
.services-preview__header { margin-bottom: 4rem; }
.services-preview__grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  margin-bottom: 3rem;
}
@media (min-width: 640px) { .services-preview__grid { grid-template-columns: 1fr 1fr; } }
@media (min-width: 1024px) { .services-preview__grid { grid-template-columns: repeat(4, 1fr); } }
.services-preview__actions { text-align: center; }

/* ── Portfolio Preview ── */
.portfolio-preview__header { margin-bottom: 3rem; text-align: center; margin-inline: auto; }
.portfolio-preview__grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  margin-bottom: 3rem;
}
@media (min-width: 768px) { .portfolio-preview__grid { grid-template-columns: repeat(3, 1fr); } }
.portfolio-preview__actions { text-align: center; }

/* ── Blog Preview ── */
.blog-preview__header { margin-bottom: 3rem; text-align: center; margin-inline: auto; }
.blog-preview__grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  margin-bottom: 3rem;
}
@media (min-width: 768px) { .blog-preview__grid { grid-template-columns: repeat(3, 1fr); } }
.blog-preview__actions { text-align: center; }
</style>
