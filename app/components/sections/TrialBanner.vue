<!-- TrialBanner.vue — Banner destacado "Prueba de 15 días" -->
<template>
  <section class="trial-banner container" aria-label="Contacto y Prueba" v-reveal>
    <div class="trial-banner__inner">
      <div class="trial-banner__bg" aria-hidden="true" />

      <div class="trial-banner__content">
        <h2 class="trial-banner__title">{{ $t('trial.title') }}</h2>
        <p class="trial-banner__desc">{{ $t('trial.description') }}</p>
        <div class="trial-banner__actions">
          <UiBaseButton to="/contacto?motivo=prueba" variant="primary" class="trial-banner__cta">
            Empieza ahora
          </UiBaseButton>
          <UiBaseButton to="/contacto" variant="secondary" class="trial-banner__cta">
            Contáctanos
          </UiBaseButton>
        </div>
      </div>

      <!-- Decoración visual -->
      <div class="trial-banner__decor" aria-hidden="true">
        <div class="trial-banner__circle trial-banner__circle--1 float" />
        <div class="trial-banner__circle trial-banner__circle--2 float float-delay-2" />
      </div>
    </div>
  </section>
</template>

<style scoped>
.trial-banner { padding-block: 2rem; }

.trial-banner__inner {
  position: relative;
  background: var(--surface);
  border-radius: 24px;
  overflow: hidden;
  padding: 3rem 2rem;
  text-align: center;
  border: 1px solid rgba(0,212,212,0.15);
  box-shadow: var(--shadow-card), inset 0 0 40px rgba(0,212,212,0.05);
}

@media (min-width: 768px) {
  .trial-banner__inner { padding: 5rem 3rem; }
}

.trial-banner__bg {
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 50% 0%, rgba(0,212,212,0.1) 0%, transparent 70%);
  pointer-events: none;
}

.trial-banner__content { position: relative; z-index: 1; max-width: 600px; margin-inline: auto; }

.trial-banner__title { font-size: var(--fs-h3); margin-bottom: 1rem; }
.trial-banner__desc { color: var(--text-muted); margin-bottom: 2rem; }
.trial-banner__actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.trial-banner__decor { position: absolute; inset: 0; pointer-events: none; overflow: hidden; }

.trial-banner__circle {
  position: absolute;
  border-radius: 50%;
  border: 1px solid rgba(0,212,212,0.2);
  opacity: 0.5;
}

.trial-banner__circle--1 { width: 300px; height: 300px; top: -100px; left: -100px; }
.trial-banner__circle--2 { width: 400px; height: 400px; bottom: -150px; right: -100px; border-color: rgba(0,76,223,0.2); }
</style>
