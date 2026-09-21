<!-- ProcessSteps.vue — Proceso de trabajo (4 pasos) -->
<template>
  <div class="process">
    <div
      v-for="(step, i) in steps"
      :key="i"
      class="process__step"
      v-reveal="{ delay: i * 100 }"
    >
      <div class="process__number" aria-hidden="true">{{ step.number }}</div>
      <div class="process__content">
        <h3 class="process__title">{{ step.title }}</h3>
        <p class="process__desc">{{ step.description }}</p>
      </div>
      <!-- Línea conectora (excepto en el último) -->
      <div v-if="i < steps.length - 1" class="process__connector" aria-hidden="true" />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  steps: { number: string; title: string; description: string }[]
}>()
</script>

<style scoped>
.process {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

@media (min-width: 768px) {
  .process {
    flex-direction: row;
    gap: 1.5rem;
  }
}

.process__step {
  position: relative;
  flex: 1;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-card);
  padding: 2rem 1.5rem;
  text-align: center;
  transition: transform var(--transition-base), box-shadow var(--transition-base), border-color var(--transition-base);
}

@media (hover: hover) {
  .process__step:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-card);
    border-color: rgba(0,212,212,0.3);
  }
}

.process__number {
  font-family: var(--font-title);
  font-size: 3.5rem;
  line-height: 1;
  background: var(--gradient);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  opacity: 0.5;
  margin-bottom: 1rem;
}

.process__title { font-size: 1.1rem; margin-bottom: 0.75rem; }
.process__desc { font-size: 0.9rem; color: var(--text-muted); }

/* Línea conectora (visible en desktop) */
.process__connector {
  display: none;
}

@media (min-width: 768px) {
  .process__connector {
    display: block;
    position: absolute;
    top: 3.5rem;
    right: -1.5rem;
    width: 1.5rem;
    height: 2px;
    background: var(--gradient);
    opacity: 0.5;
    z-index: -1;
  }
}
</style>
