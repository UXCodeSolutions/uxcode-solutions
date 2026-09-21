<!-- PillarsSection.vue — Los 4 pilares de UXcode Solutions -->
<template>
  <section class="pillars section" aria-labelledby="pillars-title">
    <div class="container">
      <UiSectionTitle
        id="pillars-title"
        :pre="$t('pillars.title_pre')"
        :accent="$t('pillars.title_accent')"
        center
        class="pillars__header"
        v-reveal
      />

      <div class="pillars__grid">
        <!-- Pilar 1 -->
        <div class="pillar" v-reveal="{ delay: 0 }">
          <UiIconBadge icon="zap" color="cyan" class="pillar__icon" />
          <h3 class="pillar__title">{{ $t('pillars.items.speed.title') }}</h3>
          <p class="pillar__desc">{{ $t('pillars.items.speed.description') }}</p>
        </div>

        <!-- Pilar 2 -->
        <div class="pillar" v-reveal="{ delay: 100 }">
          <UiIconBadge icon="users" color="blue" class="pillar__icon" />
          <h3 class="pillar__title">{{ $t('pillars.items.human.title') }}</h3>
          <p class="pillar__desc">{{ $t('pillars.items.human.description') }}</p>
        </div>

        <!-- Pilar 3 -->
        <div class="pillar" v-reveal="{ delay: 200 }">
          <UiIconBadge icon="rocket" color="gradient" class="pillar__icon" />
          <h3 class="pillar__title">{{ $t('pillars.items.products.title') }}</h3>
          <p class="pillar__desc">{{ $t('pillars.items.products.description') }}</p>
        </div>

        <!-- Pilar 4 -->
        <div class="pillar" v-reveal="{ delay: 300 }">
          <UiIconBadge icon="shield" color="cyan" class="pillar__icon" />
          <h3 class="pillar__title">{{ $t('pillars.items.trial.title') }}</h3>
          <p class="pillar__desc">{{ $t('pillars.items.trial.description') }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.pillars {
  position: relative;
  /* Fondo sutil */
  background: linear-gradient(to bottom, transparent, rgba(0,212,212,0.02) 50%, transparent);
}

.pillars__header { margin-bottom: 4rem; }

.pillars__grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2.5rem;
}

@media (min-width: 640px) {
  .pillars__grid { grid-template-columns: 1fr 1fr; gap: 3rem; }
}

@media (min-width: 1024px) {
  .pillars__grid { grid-template-columns: repeat(4, 1fr); gap: 2rem; }
}

.pillar { text-align: center; }

.pillar__icon { margin-bottom: 1.5rem; }

.pillar__title {
  font-family: var(--font-body);
  font-size: 1.1rem;
  margin-bottom: 0.75rem;
}

.pillar__desc { font-size: 0.9rem; }
</style>
