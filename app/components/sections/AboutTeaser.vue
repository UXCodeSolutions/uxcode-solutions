<!-- AboutTeaser.vue — Resumen de "Nosotros" para la página de inicio -->
<template>
  <section class="about-teaser section" aria-label="Sobre nosotros">
    <div class="container about-teaser__inner">
      <!-- Ilustración izquierda -->
      <div class="about-teaser__visual" v-reveal>
        <img
          src="/images/about-illustration.svg"
          alt="Equipo UXcode Solutions"
          class="about-teaser__img float-slow"
          width="500"
          height="500"
          loading="lazy"
        />
        <!-- Decoración -->
        <div class="about-teaser__decor" aria-hidden="true" />
      </div>

      <!-- Texto derecha -->
      <div class="about-teaser__content" v-reveal="{ delay: 150 }">
        <h2 class="about-teaser__title">
          <span class="gradient-text">{{ $t('aboutTeaser.title').split(' ').slice(0, 5).join(' ') }}</span>
          {{ $t('aboutTeaser.title').split(' ').slice(5).join(' ') }}
        </h2>
        <p class="about-teaser__desc">{{ $t('aboutTeaser.description') }}</p>
        <UiBaseButton to="/nosotros" variant="secondary">{{ $t('aboutTeaser.cta') }}</UiBaseButton>
      </div>
    </div>
  </section>
</template>

<style scoped>
.about-teaser { background: var(--surface-2); }

.about-teaser__inner {
  display: grid;
  grid-template-columns: 1fr;
  gap: 3rem;
  align-items: center;
}

@media (min-width: 992px) {
  .about-teaser__inner { grid-template-columns: 1fr 1fr; gap: 5rem; }
}

.about-teaser__visual { position: relative; display: flex; justify-content: center; }

.about-teaser__img { position: relative; z-index: 1; max-width: 100%; height: auto; border-radius: var(--radius-card); }

.about-teaser__decor {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 120%;
  height: 120%;
  background: radial-gradient(circle, rgba(0,212,212,0.1) 0%, transparent 70%);
  pointer-events: none;
  z-index: 0;
}

.about-teaser__title { font-size: var(--fs-h2); margin-bottom: 1.5rem; line-height: 1.2; }
.about-teaser__desc { color: var(--text-muted); margin-bottom: 2rem; font-size: 1.1rem; }
</style>
