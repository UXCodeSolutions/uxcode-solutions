<!-- [slug].vue — Vista individual de un artículo del blog -->
<template>
  <div class="post-single">
    <!-- Indicador de scroll de lectura extra (opcional, el layout ya tiene uno, pero aquí es útil para el post) -->
    
    <div v-if="post">
      <!-- Cabecera del Post -->
      <header class="post-header section">
        <div class="container post-header__inner text-center">
          <div class="breadcrumb" v-reveal>
            <NuxtLink to="/blog">← Volver al Blog</NuxtLink>
          </div>
          
          <div class="post-meta" v-reveal="{ delay: 50 }">
            <span class="pill">{{ post.category }}</span>
            <span class="post-meta-text">{{ formatDate(post.date) }} · {{ post.readingTime }}</span>
          </div>
          
          <h1 class="post-title" v-reveal="{ delay: 100 }">{{ post.title }}</h1>
          <p class="post-desc" v-reveal="{ delay: 150 }">{{ post.description }}</p>

          <!-- Imagen destacada (opcional) -->
          <div v-if="post.image" class="post-hero-image" v-reveal="{ delay: 200 }">
            <NuxtImg :src="post.image" :alt="post.title" class="img-fluid rounded-card mt-4" loading="eager" />
          </div>
        </div>
      </header>

      <!-- Contenido Markdown -->
      <article class="post-content section">
        <div class="container container--narrow">
          <ContentRenderer :value="post" class="markdown-body" />
        </div>
      </article>

      <!-- CTA Final (Suscribirse o Ver Servicios) -->
      <SectionsCtaFinal
        :pre="$t('blogPage.singleCta.title_pre')"
        :accent="$t('blogPage.singleCta.title_accent')"
        :post="$t('blogPage.singleCta.title_post')"
        :cta-text="$t('blogPage.singleCta.cta')"
      />
    </div>
    
    <div v-else class="post-not-found section text-center">
      <div class="container">
        <h2>Artículo no encontrado</h2>
        <p class="text-muted my-4">El artículo que buscas no existe o ha sido movido.</p>
        <UiBaseButton to="/blog" variant="primary">Ver todos los artículos</UiBaseButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const slug = route.params.slug as string

const { data: post } = await useAsyncData(`blog-${slug}`, () => {
  return queryCollection('blog')
    .path(`/blog/${slug}`)
    .first()
})

if (!post.value) {
  throw createError({ statusCode: 404, statusMessage: 'Post no encontrado', fatal: true })
}

useSeoMeta({
  title: `${post.value?.title} | Blog UXcode Solutions`,
  description: post.value?.description,
})

const formatDate = (dateStr: string) => {
  const d = new Date(dateStr)
  return new Intl.DateTimeFormat('es-ES', { month: 'long', day: 'numeric', year: 'numeric' }).format(d)
}
</script>

<style scoped>
.post-header {
  padding-top: calc(var(--navbar-h) + 4rem);
  padding-bottom: 3rem;
  background: radial-gradient(circle at top, rgba(0,212,212,0.05), transparent 70%);
}

.text-center { text-align: center; }

.breadcrumb { font-size: 0.9rem; margin-bottom: 2rem; }
.breadcrumb a { color: var(--text-muted); text-decoration: none; transition: color var(--transition-base); }
.breadcrumb a:hover { color: var(--accent); }

.post-meta { display: flex; align-items: center; justify-content: center; gap: 1rem; margin-bottom: 1.5rem; }
.post-meta-text { font-size: 0.9rem; color: var(--text-muted); }

.post-title { font-size: clamp(2.5rem, 5vw, 4rem); line-height: 1.15; margin-bottom: 1.5rem; max-width: 900px; margin-inline: auto; }
.post-desc { font-size: 1.25rem; color: var(--text-muted); max-width: 700px; margin-inline: auto; line-height: 1.6; }

.post-hero-image { margin-top: 3rem; }
.img-fluid { max-width: 100%; height: auto; }
.rounded-card { border-radius: var(--radius-card); border: 1px solid var(--border); }
.mt-4 { margin-top: 2rem; }

/* Contenedor más estrecho para la lectura óptima */
.container--narrow { max-width: 760px; margin-inline: auto; }

.post-content { padding-top: 0; padding-bottom: 6rem; }

/* ── Estilos base para el Markdown Renderizado ── */
/* Nota: Al usar <ContentRenderer>, el contenido llega como HTML estándar */
:deep(.markdown-body) {
  font-size: 1.125rem;
  line-height: 1.8;
  color: var(--text);
}

:deep(.markdown-body h2) { font-size: 2rem; margin-top: 3rem; margin-bottom: 1.25rem; color: #fff; }
:deep(.markdown-body h3) { font-size: 1.5rem; margin-top: 2rem; margin-bottom: 1rem; color: #fff; }
:deep(.markdown-body p) { margin-bottom: 1.5rem; color: var(--text-muted); }
:deep(.markdown-body ul), :deep(.markdown-body ol) { margin-bottom: 1.5rem; padding-left: 1.5rem; color: var(--text-muted); }
:deep(.markdown-body li) { margin-bottom: 0.5rem; }
:deep(.markdown-body a) { color: var(--accent); text-decoration: none; }
:deep(.markdown-body a:hover) { text-decoration: underline; }
:deep(.markdown-body blockquote) {
  border-left: 4px solid var(--accent);
  padding-left: 1.5rem;
  margin-left: 0;
  margin-right: 0;
  font-style: italic;
  background: var(--surface-2);
  padding: 1.5rem;
  border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
}
:deep(.markdown-body pre) {
  background: #1e1e1e;
  padding: 1.5rem;
  border-radius: var(--radius-sm);
  overflow-x: auto;
  border: 1px solid var(--border);
  margin-bottom: 1.5rem;
}
:deep(.markdown-body code) {
  font-family: 'Courier New', Courier, monospace;
  background: rgba(254,254,254,0.1);
  padding: 0.2rem 0.4rem;
  border-radius: 4px;
  font-size: 0.9em;
}
:deep(.markdown-body pre code) { background: transparent; padding: 0; }
:deep(.markdown-body img) {
  max-width: 100%;
  height: auto;
  border-radius: var(--radius-sm);
  margin-block: 2rem;
  border: 1px solid var(--border);
}

.post-not-found { padding-block: 10rem; }
.text-muted { color: var(--text-muted); }
.my-4 { margin-block: 2rem; }
</style>
