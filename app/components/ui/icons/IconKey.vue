<!-- IconKey.vue — Icono de llave (sistemas en renta/licencia) -->
<template>
  <svg xmlns="http://www.w3.org/2000/svg" :width="size" :height="size" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" :stroke-width="strokeWidth" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <circle cx="7.5" cy="15.5" r="5.5" />
    <path d="M21 2L13 10" />
    <path d="M20 7l-3 3" />
    <path d="M17 4l-3 3" />
  </svg>
</template>
<script setup lang="ts">
withDefaults(defineProps<{ size?: number; strokeWidth?: number }>(), { size: 24, strokeWidth: 1.5 })
</script>
