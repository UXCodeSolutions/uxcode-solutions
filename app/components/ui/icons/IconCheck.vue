<!-- IconCheck.vue -->
<template>
  <svg xmlns="http://www.w3.org/2000/svg" :width="size" :height="size" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" :stroke-width="strokeWidth" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <polyline points="20 6 9 17 4 12" />
  </svg>
</template>
<script setup lang="ts">
withDefaults(defineProps<{ size?: number; strokeWidth?: number }>(), { size: 24, strokeWidth: 2 })
</script>
