<!-- ProjectCard.vue — Tarjeta visual para el portafolio
     Soporta imagen con placeholder fallback, estado y etiquetas. -->
<template>
  <article class="project-card card" ref="cardRef">
    <div class="card__spotlight" aria-hidden="true" />

    <!-- Área de imagen con zoom suave -->
    <div class="project-card__img-wrap">
      <NuxtImg
        v-if="project.image"
        :src="project.image"
        :alt="project.name"
        class="project-card__img"
        loading="lazy"
        width="800"
        height="500"
        sizes="sm:100vw md:50vw lg:33vw"
      />
      <!-- Placeholder de marca si no hay imagen -->
      <div v-else class="project-card__placeholder">
        <div class="project-card__placeholder-pattern" />
        <div class="project-card__placeholder-icon">{{ project.name.charAt(0) }}</div>
        <span class="project-card__placeholder-text">Imagen próximamente</span>
      </div>
      <!-- Overlay de marca con degradado (siempre presente para consistencia) -->
      <div class="project-card__overlay" />

      <!-- Etiqueta de estado flotante -->
      <div class="project-card__status">
        <UiStatusTag :status="project.status" />
      </div>
    </div>

    <!-- Contenido -->
    <div class="project-card__content">
      <div class="project-card__meta">
        <span class="pill">{{ project.category }}</span>
        <span class="project-card__tech">{{ project.tech.join(' · ') }}</span>
      </div>

      <h3 class="project-card__title">{{ project.name }}</h3>
      <p class="project-card__desc">{{ project.description }}</p>

      <div class="project-card__actions">
        <!-- Botón principal según tipo de proyecto -->
        <template v-if="project.type === 'producto'">
          <!-- Si es Just Blocks (Play Store) -->
          <UiBaseButton
            v-if="project.slug === 'just-blocks'"
            :href="project.links.playStore || undefined"
            :disabled="!project.links.playStore"
            variant="primary"
          >
            {{ project.links.playStore ? $t('links.playStore') : $t('links.soon') }}
          </UiBaseButton>
          <!-- Si es Dokko (Demo o Prueba) -->
          <template v-else-if="project.slug === 'dokko'">
            <UiBaseButton to="/contacto?motivo=prueba&sistema=dokko" variant="primary">
              {{ $t('links.trial') }}
            </UiBaseButton>
          </template>
          <!-- Otros productos -->
          <UiBaseButton
            v-else-if="project.slug !== 'uxcode-solutions'"
            :href="project.links.web || project.links.demo || undefined"
            :disabled="!(project.links.web || project.links.demo)"
            variant="secondary"
          >
            {{ (project.links.web || project.links.demo) ? $t('links.demo') : $t('links.soon') }}
          </UiBaseButton>
          <!-- UXcode Solutions (Este sitio) -->
          <span v-else class="pill pill--cyan">{{ $t('links.here') }}</span>
        </template>

        <!-- Proyectos de clientes -->
        <template v-else>
          <UiBaseButton
            :href="project.links.web || undefined"
            :disabled="!project.links.web"
            variant="secondary"
          >
            {{ project.links.web ? $t('links.web') : $t('links.soon') }}
          </UiBaseButton>
        </template>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import type { Project } from '~/data/projects'

defineProps<{ project: Project }>()

const cardRef = ref<HTMLElement | null>(null)
useSpotlight(cardRef)
</script>

<style scoped>
.project-card {
  position: relative;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-card);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: transform var(--transition-base), box-shadow var(--transition-base), border-color var(--transition-base);
  height: 100%;
}

@media (hover: hover) {
  .project-card:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-card), 0 0 30px rgba(0,212,212,0.1);
    border-color: rgba(0,212,212,0.3);
  }
}

.card__spotlight {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: radial-gradient(
    800px circle at var(--mx, 50%) var(--my, 50%),
    rgba(0,212,212, 0.05),
    transparent 40%
  );
  opacity: 0;
  transition: opacity var(--transition-base);
  z-index: 0;
}

@media (hover: hover) { .project-card:hover .card__spotlight { opacity: 1; } }

/* ── Imagen y overlay ── */
.project-card__img-wrap {
  position: relative;
  aspect-ratio: 16/9;
  overflow: hidden;
  background: var(--surface-2);
}

.project-card__img, .project-card__placeholder {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 600ms cubic-bezier(0.2,0.7,0.2,1);
}

/* Overlay de marca: siempre oscurece un poco y añade tintes sutiles */
.project-card__overlay {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(to top, rgba(26,26,26,1) 0%, rgba(26,26,26,0) 40%),
    linear-gradient(135deg, rgba(0,212,212,0.1), rgba(0,76,223,0.1));
  pointer-events: none;
}

/* Efecto hover en la imagen */
@media (hover: hover) {
  .project-card:hover .project-card__img,
  .project-card:hover .project-card__placeholder {
    transform: scale(1.05);
  }
}

/* Placeholder si no hay imagen */
.project-card__placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  background: #1e1e1e;
  position: relative;
}

.project-card__placeholder-pattern {
  position: absolute;
  inset: 0;
  background-image: radial-gradient(rgba(254,254,254,0.05) 1px, transparent 1px);
  background-size: 20px 20px;
  opacity: 0.5;
}

.project-card__placeholder-icon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: var(--gradient);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-title);
  font-size: 1.5rem;
  color: #121212;
  position: relative;
  z-index: 1;
}

.project-card__placeholder-text {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  position: relative;
  z-index: 1;
}

/* Estado flotante */
.project-card__status {
  position: absolute;
  top: 1rem;
  right: 1rem;
  z-index: 2;
}

/* ── Contenido ── */
.project-card__content {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  flex: 1;
  position: relative;
  z-index: 1;
}

.project-card__meta {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.project-card__tech { font-size: 0.75rem; color: var(--text-muted); font-weight: 500; }

.project-card__title { font-size: 1.25rem; margin-bottom: 0.5rem; }

.project-card__desc { font-size: 0.9rem; margin-bottom: 1.5rem; flex: 1; }

.project-card__actions { margin-top: auto; }

.pill--cyan {
  border-color: var(--accent);
  color: var(--text);
  background: rgba(0,212,212,0.2);
}
</style>
