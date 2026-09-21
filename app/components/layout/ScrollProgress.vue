<!-- ScrollProgress.vue — Barra de progreso de lectura (3px en la parte superior)
     Sigue el porcentaje de scroll de la página actual. -->
<template>
  <div
    class="scroll-progress"
    role="progressbar"
    :aria-valuenow="Math.round(progress)"
    aria-valuemin="0"
    aria-valuemax="100"
    :aria-label="`Progreso de lectura: ${Math.round(progress)}%`"
  >
    <div class="scroll-progress__bar" :style="{ width: `${progress}%` }" />
  </div>
</template>

<script setup lang="ts">
const { progress } = useScrollProgress()
</script>

<style scoped>
.scroll-progress {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  z-index: calc(var(--z-nav) + 1);
  background: rgba(254,254,254,0.05);
}

.scroll-progress__bar {
  height: 100%;
  background: var(--gradient);
  border-radius: 0 2px 2px 0;
  transition: width 50ms linear;
  box-shadow: 0 0 8px rgba(0,212,212,0.6);
}
</style>
