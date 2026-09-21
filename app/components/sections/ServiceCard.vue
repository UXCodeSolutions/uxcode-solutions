<!-- ServiceCard.vue — Tarjeta de servicio con hover spotlight
     Uso: Servicios destacados en Inicio y cuadrícula principal en Servicios. -->
<template>
  <div class="card service-card" ref="cardRef">
    <!-- Overlay para el efecto spotlight -->
    <div class="card__spotlight" aria-hidden="true" />

    <div class="service-card__content">
      <UiIconBadge :icon="service.icon" />
      <h3 class="service-card__title">{{ service.title }}</h3>
      <p class="service-card__desc">{{ service.description }}</p>

      <div class="service-card__footer">
        <UiBaseButton
          :to="to || `/servicios#${service.slug}`"
          variant="ghost"
          class="service-card__link"
          :aria-label="`Saber más sobre ${service.title}`"
        >
          {{ isHome ? 'Saber más' : service.cta }}
        </UiBaseButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Service } from '~/data/services'

defineProps<{
  service: Service
  to?: string
  isHome?: boolean
}>()

const cardRef = ref<HTMLElement | null>(null)
useSpotlight(cardRef)
</script>

<style scoped>
.service-card {
  position: relative;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-card);
  padding: 2rem;
  display: flex;
  flex-direction: column;
  transition: transform var(--transition-base), border-color var(--transition-base), box-shadow var(--transition-base);
  overflow: hidden;
  height: 100%;
}

@media (hover: hover) {
  .service-card:hover {
    transform: translateY(-4px);
    border-color: rgba(0,212,212,0.3);
    box-shadow: var(--shadow-card), 0 0 20px rgba(0,212,212,0.05);
  }
}

/* Efecto spotlight */
.card__spotlight {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: radial-gradient(
    600px circle at var(--mx, 50%) var(--my, 50%),
    rgba(0,212,212, 0.06),
    transparent 40%
  );
  opacity: 0;
  transition: opacity var(--transition-base);
  z-index: 0;
}

@media (hover: hover) {
  .service-card:hover .card__spotlight { opacity: 1; }
}

.service-card__content { position: relative; z-index: 1; display: flex; flex-direction: column; flex: 1; }

.service-card__title {
  margin-top: 1.5rem;
  margin-bottom: 0.75rem;
  font-size: 1.25rem;
}

.service-card__desc {
  font-size: 0.95rem;
  margin-bottom: 1.5rem;
  flex: 1;
}

.service-card__footer { margin-top: auto; }

.service-card__link { padding-left: 0; }
</style>
