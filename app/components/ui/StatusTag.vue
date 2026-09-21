<!-- StatusTag.vue — Etiqueta de estado para proyectos del portafolio -->
<template>
  <span v-if="status" class="status-tag" :class="`status-tag--${status}`">
    <span class="status-tag__dot" aria-hidden="true" />
    {{ label }}
  </span>
</template>

<script setup lang="ts">
const props = defineProps<{ status: 'published' | 'in-progress' | null }>()
const { t } = useI18n()

const label = computed(() => {
  if (props.status === 'published') return t('status.published')
  if (props.status === 'in-progress') return t('status.in-progress')
  return ''
})
</script>

<style scoped>
.status-tag {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.25rem 0.75rem;
  border-radius: var(--radius-badge);
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.status-tag__dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: currentColor;
}

.status-tag--published {
  background: rgba(46,230,166,0.12);
  color: var(--success);
  border: 1px solid rgba(46,230,166,0.3);
}

.status-tag--in-progress {
  background: rgba(0,212,212,0.1);
  color: var(--accent);
  border: 1px solid rgba(0,212,212,0.25);
}
</style>
