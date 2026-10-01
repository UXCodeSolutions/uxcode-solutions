<!-- PostCard.vue — Tarjeta para listado de artículos del blog -->
<template>
  <article class="post-card card" ref="cardRef">
    <div class="card__spotlight" aria-hidden="true" />

    <NuxtLink :to="`/blog/${post._path?.split('/').pop()}`" class="post-card__link">
      <div class="post-card__img-wrap">
        <NuxtImg
          v-if="post.image"
          :src="post.image"
          :alt="post.title"
          class="post-card__img"
          loading="lazy"
          width="600"
          height="340"
        />
        <div v-else class="post-card__placeholder">
          <div class="post-card__placeholder-pattern" />
          <UiIconsIconRocket :size="48" />
        </div>
        <!-- Overlay -->
        <div class="post-card__overlay" />
      </div>

      <div class="post-card__content">
        <div class="post-card__meta">
          <span class="pill">{{ post.category }}</span>
          <span class="post-card__meta-text">{{ post.date ? formatDate(post.date) : '' }} · {{ post.readingTime }}</span>
        </div>
        <h3 class="post-card__title">{{ post.title }}</h3>
        <p class="post-card__desc">{{ post.description }}</p>

        <div class="post-card__footer">
          <span class="post-card__read-more">{{ $t('blogPreview.readMore') }} →</span>
        </div>
      </div>
    </NuxtLink>
  </article>
</template>

<script setup lang="ts">
// Interface interna del componente – los campos del frontmatter son opcionales
// para ser compatibles con ParsedContent de Nuxt Content v2
interface Post {
  _path?: string
  title?: string
  description?: string
  image?: string | null
  date?: string
  category?: string
  readingTime?: string
}

defineProps<{ post: Post }>()

const cardRef = ref<HTMLElement | null>(null)
useSpotlight(cardRef)

const formatDate = (dateStr: string) => {
  const d = new Date(dateStr)
  return new Intl.DateTimeFormat('es-ES', { month: 'short', day: 'numeric', year: 'numeric' }).format(d)
}
</script>

<style scoped>
.post-card {
  position: relative;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-card);
  overflow: hidden;
  transition: transform var(--transition-base), box-shadow var(--transition-base), border-color var(--transition-base);
  height: 100%;
}

.post-card__link {
  display: flex;
  flex-direction: column;
  height: 100%;
  text-decoration: none;
  color: inherit;
}

@media (hover: hover) {
  .post-card:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-card), 0 0 20px rgba(0,212,212,0.05);
    border-color: rgba(0,212,212,0.3);
  }
}

.card__spotlight {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: radial-gradient(
    600px circle at var(--mx, 50%) var(--my, 50%),
    rgba(0,212,212, 0.05),
    transparent 40%
  );
  opacity: 0;
  transition: opacity var(--transition-base);
  z-index: 0;
}

@media (hover: hover) { .post-card:hover .card__spotlight { opacity: 1; } }

/* ── Imagen ── */
.post-card__img-wrap { position: relative; aspect-ratio: 16/9; overflow: hidden; background: var(--surface-2); }

.post-card__img, .post-card__placeholder {
  width: 100%; height: 100%; object-fit: cover;
  transition: transform 600ms cubic-bezier(0.2,0.7,0.2,1);
}

.post-card__overlay {
  position: absolute; inset: 0;
  background: linear-gradient(to top, rgba(26,26,26,1) 0%, rgba(26,26,26,0) 50%);
  pointer-events: none;
}

@media (hover: hover) {
  .post-card:hover .post-card__img, .post-card:hover .post-card__placeholder { transform: scale(1.05); }
}

.post-card__placeholder { display: flex; align-items: center; justify-content: center; background: #1e1e1e; color: rgba(0,212,212,0.2); }
.post-card__placeholder-pattern {
  position: absolute; inset: 0;
  background-image: radial-gradient(rgba(254,254,254,0.05) 1px, transparent 1px);
  background-size: 20px 20px;
}

/* ── Contenido ── */
.post-card__content { padding: 1.5rem; display: flex; flex-direction: column; flex: 1; position: relative; z-index: 1; }

.post-card__meta { display: flex; align-items: center; justify-content: space-between; margin-bottom: 1rem; }
.post-card__meta-text { font-size: 0.8rem; color: var(--text-muted); }

.post-card__title { font-size: 1.25rem; margin-bottom: 0.5rem; transition: color var(--transition-base); }
@media (hover: hover) { .post-card:hover .post-card__title { color: var(--accent); } }

.post-card__desc { font-size: 0.95rem; color: var(--text-muted); margin-bottom: 1.5rem; flex: 1; display: -webkit-box; -webkit-line-clamp: 3; line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; }

.post-card__footer { margin-top: auto; }
.post-card__read-more { font-size: 0.9rem; font-weight: 600; color: var(--accent); display: inline-flex; transition: transform var(--transition-base); }
@media (hover: hover) { .post-card:hover .post-card__read-more { transform: translateX(4px); } }
</style>
