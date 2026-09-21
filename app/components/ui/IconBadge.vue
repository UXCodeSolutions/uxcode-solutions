<!-- IconBadge.vue — Contenedor circular con icono, hover premium
     Escala + rotación + resplandor cian en hover.
     Uso: <IconBadge icon="smartphone" /> -->
<template>
  <div class="icon-badge" :class="`icon-badge--${color}`">
    <component :is="iconComponent" :size="resolvedSize" />
  </div>
</template>

<script setup lang="ts">
// Mapa de iconos disponibles → componentes importados dinámicamente
const iconMap: Record<string, string> = {
  smartphone: 'IconSmartphone',
  dashboard: 'IconDashboard',
  'layout-dashboard': 'IconDashboard',
  globe: 'IconGlobe',
  key: 'IconKey',
  rocket: 'IconRocket',
  users: 'IconUsers',
  zap: 'IconZap',
  shield: 'IconShield',
  check: 'IconCheck',
  mail: 'IconMail',
  whatsapp: 'IconWhatsapp',
}

const props = withDefaults(defineProps<{
  icon: string
  size?: number
  iconSize?: number
  color?: 'cyan' | 'blue' | 'gradient'
}>(), {
  iconSize: 28,
  color: 'cyan',
})

const resolvedSize = computed(() => props.size ?? props.iconSize)

// Resolver el componente de icono según el prop
const iconComponent = computed(() => {
  const name = iconMap[props.icon]
  if (!name) return null
  return resolveComponent('UiIcons' + name)
})
</script>

<style scoped>
.icon-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: rgba(0,212,212,0.08);
  border: 1.5px solid rgba(0,212,212,0.25);
  color: var(--accent);
  flex-shrink: 0;
  transition:
    transform 300ms cubic-bezier(0.2,0.7,0.2,1),
    box-shadow 300ms cubic-bezier(0.2,0.7,0.2,1),
    background var(--transition-base),
    color var(--transition-base);
  will-change: transform;
}

@media (hover: hover) {
  .icon-badge:hover,
  :is(.card:hover) .icon-badge {
    transform: scale(1.12) rotate(-6deg);
    box-shadow: 0 0 20px rgba(0,212,212,0.5);
    background: rgba(0,212,212,0.15);
  }
}
</style>
