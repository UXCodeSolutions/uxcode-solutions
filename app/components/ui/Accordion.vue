<!-- Accordion.vue — Acordeón accesible para preguntas frecuentes
     Accesible: aria-expanded, aria-controls, role="region", teclado.
     Un solo ítem abierto a la vez (group). -->
<template>
  <div class="accordion">
    <div
      v-for="item in items"
      :key="item.id"
      class="accordion__item"
      :class="{ 'accordion__item--open': openId === item.id }"
    >
      <!-- Botón del acordeón -->
      <button
        :id="`acc-btn-${item.id}`"
        class="accordion__trigger"
        :aria-expanded="openId === item.id"
        :aria-controls="`acc-panel-${item.id}`"
        @click="toggle(item.id)"
      >
        <span class="accordion__question">{{ item.question }}</span>
        <span class="accordion__icon" aria-hidden="true">
          <!-- Flecha que rota al abrir -->
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </span>
      </button>

      <!-- Panel de contenido -->
      <div
        :id="`acc-panel-${item.id}`"
        role="region"
        :aria-labelledby="`acc-btn-${item.id}`"
        class="accordion__panel"
        :style="{ maxHeight: openId === item.id ? panelHeight(item.id) : '0px' }"
      >
        <div :ref="el => panelRefs[item.id] = el as HTMLElement" class="accordion__content">
          <p>{{ item.answer }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { FaqItem } from '~/data/faq'

defineProps<{ items: FaqItem[] }>()

const openId = ref<string | null>(null)
const panelRefs = ref<Record<string, HTMLElement | null>>({})

const toggle = (id: string) => {
  openId.value = openId.value === id ? null : id
}

const panelHeight = (id: string) => {
  const el = panelRefs.value[id]
  return el ? `${el.scrollHeight}px` : 'auto'
}
</script>

<style scoped>
.accordion { display: flex; flex-direction: column; gap: 0.75rem; }

.accordion__item {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-card);
  overflow: hidden;
  transition: border-color var(--transition-base), box-shadow var(--transition-base);
}

.accordion__item--open {
  border-color: rgba(0,212,212,0.35);
  box-shadow: var(--shadow-glow);
}

.accordion__trigger {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 1.25rem 1.5rem;
  background: none;
  border: none;
  cursor: pointer;
  text-align: left;
  color: var(--text);
  font-family: var(--font-body);
  font-weight: 600;
  font-size: 1rem;
  transition: color var(--transition-base);
}

.accordion__trigger:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: -2px;
  border-radius: var(--radius-sm);
}

.accordion__item--open .accordion__trigger { color: var(--accent); }

.accordion__icon {
  flex-shrink: 0;
  color: var(--text-muted);
  transition: transform var(--transition-base), color var(--transition-base);
}

.accordion__item--open .accordion__icon {
  transform: rotate(180deg);
  color: var(--accent);
}

.accordion__panel {
  overflow: hidden;
  transition: max-height 350ms cubic-bezier(0.2,0.7,0.2,1);
}

.accordion__content { padding: 0 1.5rem 1.25rem; }
.accordion__content p { color: var(--text-muted); line-height: var(--lh-body); }
</style>
