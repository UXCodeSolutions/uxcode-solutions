<!-- index.vue (Blog) — Listado de artículos -->
<template>
  <div class="page-blog">
    <header class="page-header section" aria-labelledby="page-title">
      <div class="container text-center">
        <div class="breadcrumb" v-reveal>
          <NuxtLink to="/">Inicio</NuxtLink> / <span>{{ $t('nav.blog') }}</span>
        </div>
        <h1 id="page-title" class="page-header__title" v-reveal="{ delay: 100 }">
          <span class="gradient-text-animated">{{ $t('blogPage.title') }}</span>
        </h1>
        <p class="page-header__subtitle" v-reveal="{ delay: 200 }">
          {{ $t('blogPage.subtitle') }}
        </p>
      </div>
    </header>

    <section class="blog-list section">
      <div class="container">
        <!-- Filtros (simulados visualmente por ahora) -->
        <div class="blog-filters" v-reveal>
          <button class="filter-btn filter-btn--active">Todos</button>
          <button class="filter-btn">Desarrollo Web</button>
          <button class="filter-btn">Diseño UX/UI</button>
          <button class="filter-btn">Estrategia</button>
        </div>

        <div class="blog-grid">
          <div
            v-for="(post, index) in posts"
            :key="post._path"
            class="blog-grid__item"
            v-reveal="{ delay: (index % 3) * 100 }"
          >
          <SectionsPostCard :post="(post as any)" />
          </div>
        </div>

        <!-- Estado vacío si no hay posts -->
        <div v-if="!posts?.length" class="blog-empty">
          <UiIconsIconRocket :size="48" class="blog-empty__icon" />
          <h3 class="blog-empty__title">Aún estamos escribiendo</h3>
          <p class="blog-empty__text">Pronto publicaremos artículos interesantes sobre tecnología, diseño y negocios.</p>
        </div>
      </div>
    </section>

    <!-- Suscripción al Newsletter -->
    <section class="newsletter-section section">
      <div class="container">
        <div class="newsletter-box" v-reveal>
          <div class="newsletter-box__bg" aria-hidden="true" />
          <h2 class="newsletter-box__title">{{ $t('blogPage.newsletter.title') }}</h2>
          <p class="newsletter-box__desc">{{ $t('blogPage.newsletter.description') }}</p>
          
          <form class="newsletter-form" @submit.prevent>
            <input type="email" :placeholder="$t('blogPage.newsletter.placeholder')" class="newsletter-input" required />
            <UiBaseButton type="submit" variant="primary">{{ $t('blogPage.newsletter.button') }}</UiBaseButton>
          </form>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()

useSeoMeta({
  title: t('seo.blog.title'),
  description: t('seo.blog.description'),
})

// Cargar posts de @nuxt/content
const { data: posts } = await useAsyncData('blog-posts', () => {
  return queryContent('blog')
    .sort({ date: -1 })
    .find()
})
</script>

<style scoped>
.page-header {
  padding-top: calc(var(--navbar-h) + 4rem);
  padding-bottom: 3rem;
  background: radial-gradient(circle at top, rgba(0,212,212,0.08), transparent 70%);
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

/* ── Filtros ── */
.blog-filters {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  justify-content: center;
  margin-bottom: 3rem;
}

.filter-btn {
  background: var(--surface);
  border: 1px solid var(--border);
  color: var(--text-muted);
  padding: 0.5rem 1.25rem;
  border-radius: 100px;
  font-size: 0.9rem;
  font-family: var(--font-body);
  font-weight: 500;
  cursor: pointer;
  transition: all var(--transition-base);
}

@media (hover: hover) {
  .filter-btn:hover { background: rgba(0,212,212,0.1); color: var(--accent); border-color: rgba(0,212,212,0.3); }
}

.filter-btn--active { background: var(--gradient); color: #0a0a0a; border-color: transparent; }

/* ── Grid ── */
.blog-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2.5rem;
}

@media (min-width: 768px) { .blog-grid { grid-template-columns: repeat(2, 1fr); } }
@media (min-width: 1024px) { .blog-grid { grid-template-columns: repeat(3, 1fr); gap: 2rem; } }

/* ── Estado vacío ── */
.blog-empty { text-align: center; padding-block: 5rem; }
.blog-empty__icon { color: var(--text-muted); margin-bottom: 1rem; opacity: 0.5; }
.blog-empty__title { font-size: 1.5rem; margin-bottom: 0.5rem; }
.blog-empty__text { color: var(--text-muted); }

/* ── Newsletter ── */
.newsletter-box {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-card);
  padding: 4rem 2rem;
  text-align: center;
  position: relative;
  overflow: hidden;
}

.newsletter-box__bg {
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse at bottom, rgba(0,212,212,0.1) 0%, transparent 70%);
  pointer-events: none;
}

.newsletter-box__title { font-size: var(--fs-h3); margin-bottom: 0.75rem; position: relative; z-index: 1; }
.newsletter-box__desc { color: var(--text-muted); margin-bottom: 2.5rem; position: relative; z-index: 1; max-width: 500px; margin-inline: auto; }

.newsletter-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 450px;
  margin-inline: auto;
  position: relative;
  z-index: 1;
}

@media (min-width: 640px) {
  .newsletter-form { flex-direction: row; }
  .newsletter-input { flex: 1; }
}

.newsletter-input {
  background: var(--surface-2);
  border: 1px solid var(--border);
  border-radius: var(--radius-input);
  padding: 0 1.25rem;
  height: 48px;
  color: var(--text);
  outline: none;
  font-family: var(--font-body);
}

.newsletter-input:focus { border-color: var(--accent); box-shadow: 0 0 0 2px rgba(0,212,212,0.15); }
</style>
