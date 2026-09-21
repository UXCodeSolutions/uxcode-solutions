<!-- error.vue — Página 404 con estilo de marca UXcode Solutions -->
<template>
  <NuxtLayout>
    <section class="error-page section">
      <div class="container error-page__content">
        <!-- Número 404 grande con degradado -->
        <div v-reveal class="error-page__number" aria-hidden="true">404</div>

        <div v-reveal="{ delay: 120 }" class="error-page__text">
          <h1 class="error-page__title">{{ $t('error404.subtitle') }}</h1>
          <p class="error-page__desc">{{ $t('error404.description') }}</p>
        </div>

        <div v-reveal="{ delay: 240 }" class="error-page__actions">
          <UiBaseButton to="/" variant="primary">{{ $t('error404.cta1') }}</UiBaseButton>
          <UiBaseButton to="/servicios" variant="secondary">{{ $t('error404.cta2') }}</UiBaseButton>
        </div>

        <!-- Código decorativo flotante -->
        <div class="error-page__code" aria-hidden="true">
          <span class="float float-delay-1">&lt;/&gt;</span>
          <span class="float float-delay-2">{ }</span>
          <span class="float">;</span>
        </div>
      </div>
    </section>
  </NuxtLayout>
</template>

<script setup lang="ts">
// error.vue recibe el error de Nuxt como prop
defineProps<{ error?: { statusCode?: number; message?: string } }>()

useSeoMeta({
  title: '404 — Página no encontrada | UXcode Solutions',
})
</script>

<style scoped>
.error-page {
  min-height: calc(100dvh - var(--navbar-h));
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  position: relative;
  overflow: hidden;
}

.error-page__content { position: relative; z-index: 1; }

.error-page__number {
  font-family: var(--font-title);
  font-size: clamp(6rem, 20vw, 14rem);
  line-height: 1;
  background: var(--gradient);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  opacity: 0.15;
  user-select: none;
  margin-bottom: -2rem;
}

.error-page__text { margin-bottom: 2.5rem; }
.error-page__title { font-size: var(--fs-h2); margin-bottom: 1rem; }
.error-page__desc { color: var(--text-muted); max-width: 480px; margin-inline: auto; }

.error-page__actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.error-page__code {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: space-around;
  font-family: monospace;
  font-size: clamp(2rem, 5vw, 4rem);
  color: rgba(0,212,212,0.06);
  pointer-events: none;
  z-index: 0;
}
</style>
