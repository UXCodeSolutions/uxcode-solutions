<!-- SectionTitle.vue — Título de sección con acento de degradado
     Uso: <SectionTitle pre="Soluciones para" accent="crecer" post=" tu negocio" subtitle="..." />
     La palabra accent se muestra con degradado animado. -->
<template>
  <div class="section-title" :class="{ 'section-title--center': center }">
    <h2 v-if="tag === 'h2'" class="section-title__heading">
      <span v-if="pre">{{ pre }} </span>
      <span v-if="accent" class="gradient-text-animated">{{ accent }}</span>
      <span v-if="post">{{ post }}</span>
    </h2>
    <h1 v-else-if="tag === 'h1'" class="section-title__heading section-title__heading--h1">
      <span v-if="pre">{{ pre }} </span>
      <span v-if="accent" class="gradient-text-animated">{{ accent }}</span>
      <span v-if="post">{{ post }}</span>
    </h1>
    <h3 v-else class="section-title__heading section-title__heading--h3">
      <span v-if="pre">{{ pre }} </span>
      <span v-if="accent" class="gradient-text-animated">{{ accent }}</span>
      <span v-if="post">{{ post }}</span>
    </h3>
    <p v-if="subtitle" class="section-title__subtitle">{{ subtitle }}</p>
  </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  pre?: string
  accent?: string
  post?: string
  subtitle?: string
  center?: boolean
  tag?: 'h1' | 'h2' | 'h3'
}>(), {
  center: false,
  tag: 'h2',
})
</script>

<style scoped>
.section-title { max-width: 700px; }
.section-title--center { text-align: center; margin-inline: auto; }

.section-title__heading { font-family: var(--font-title); color: var(--text); margin-bottom: 1rem; }
.section-title__heading--h1 { font-size: var(--fs-h1); }
.section-title__heading--h3 { font-size: var(--fs-h3); }

.section-title__subtitle {
  font-size: 1.1rem;
  color: var(--text-muted);
  line-height: var(--lh-body);
}
</style>
