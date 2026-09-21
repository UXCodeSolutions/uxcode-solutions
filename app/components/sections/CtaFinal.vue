<!-- CtaFinal.vue — Llamado a la acción del final de las páginas principales -->
<template>
  <section class="cta-final section" aria-label="Contacto" v-reveal>
    <div class="container">
      <div class="cta-final__inner">
        <!-- Decoración de fondo -->
        <div class="cta-final__bg" aria-hidden="true">
          <div class="cta-final__glow" />
        </div>

        <h2 class="cta-final__title">
          <span v-if="pre">{{ pre }} </span>
          <span v-if="accent" class="gradient-text-animated">{{ accent }}</span>
          <span v-if="post">{{ post }}</span>
        </h2>
        <p v-if="subtitle" class="cta-final__subtitle">{{ subtitle }}</p>

        <UiBaseButton to="/contacto" variant="primary" class="cta-final__btn">
          {{ ctaText }}
        </UiBaseButton>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  pre?: string
  accent?: string
  post?: string
  subtitle?: string
  ctaText: string
}>()
</script>

<style scoped>
.cta-final__inner {
  position: relative;
  text-align: center;
  padding: 4rem 2rem;
  background: var(--surface);
  border: 1px solid rgba(0,212,212,0.1);
  border-radius: var(--radius-card);
  overflow: hidden;
}

@media (min-width: 768px) {
  .cta-final__inner { padding: 6rem 3rem; }
}

.cta-final__bg { position: absolute; inset: 0; pointer-events: none; }
.cta-final__glow {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 60%;
  height: 50%;
  background: radial-gradient(ellipse at bottom, rgba(0,212,212,0.15) 0%, transparent 70%);
}

.cta-final__title {
  font-size: var(--fs-h2);
  margin-bottom: 1rem;
  position: relative;
  z-index: 1;
}

.cta-final__subtitle {
  font-size: 1.1rem;
  color: var(--text-muted);
  margin-bottom: 2.5rem;
  max-width: 600px;
  margin-inline: auto;
  position: relative;
  z-index: 1;
}

.cta-final__btn { position: relative; z-index: 1; }
</style>
