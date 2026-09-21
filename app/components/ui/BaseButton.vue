<!-- BaseButton.vue — Botón de UXcode Solutions
     Tres variantes: primary, secondary (contorno), ghost (fantasma/enlace).
     Soporta rutas internas (to), enlaces externos (href), loading y disabled.
     Accesible: focus-visible, aria, estados activos. -->
<template>
  <!-- Enlace interno con NuxtLink -->
  <NuxtLink
    v-if="to"
    :to="to"
    :class="['btn', `btn--${variant}`, { 'btn--loading': loading, 'btn--disabled': disabled }]"
    :aria-disabled="disabled || loading"
    v-bind="$attrs"
  >
    <span v-if="loading" class="spinner" aria-hidden="true" />
    <slot />
  </NuxtLink>

  <!-- Enlace externo -->
  <a
    v-else-if="href"
    :href="href"
    target="_blank"
    rel="noopener noreferrer"
    :class="['btn', `btn--${variant}`, { 'btn--loading': loading, 'btn--disabled': disabled }]"
    :aria-disabled="disabled || loading"
    v-bind="$attrs"
  >
    <span v-if="loading" class="spinner" aria-hidden="true" />
    <slot />
  </a>

  <!-- Botón normal -->
  <button
    v-else
    :type="type"
    :class="['btn', `btn--${variant}`, { 'btn--loading': loading }]"
    :disabled="disabled || loading"
    v-bind="$attrs"
    @click="$emit('click', $event)"
  >
    <span v-if="loading" class="spinner" aria-hidden="true" />
    <slot />
  </button>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  variant?: 'primary' | 'secondary' | 'ghost'
  to?: string
  href?: string
  type?: 'button' | 'submit' | 'reset'
  loading?: boolean
  disabled?: boolean
}>(), {
  variant: 'primary',
  type: 'button',
})

defineEmits<{ click: [e: MouseEvent] }>()
</script>

<style scoped>
/* ── Base del botón ─────────────────────────────────────────────────── */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.85rem 2.25rem;
  border-radius: var(--radius-btn);
  font-family: var(--font-body);
  font-size: 1rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  text-decoration: none;
  cursor: pointer;
  border: none;
  outline: none;
  transition: all var(--transition-base);
  -webkit-user-select: none;
  user-select: none;
  white-space: nowrap;
  min-height: 52px;
}

/* ── Focus accesible ──────────────────────────────────────────────── */
.btn:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 4px;
  box-shadow: 0 0 15px rgba(0, 255, 255, 0.5);
}

/* ── Estado active ────────────────────────────────────────────────── */
.btn:active:not(.btn--disabled) { transform: scale(0.95); }

/* ── Variante: primario (Neon Glow) ───────────────────────────────── */
.btn--primary {
  background: var(--gradient);
  background-size: 200% 200%;
  color: #fff;
  font-weight: 700;
  box-shadow: 0 4px 20px rgba(0, 102, 255, 0.4), inset 0 2px 5px rgba(255, 255, 255, 0.4);
  text-shadow: 0 1px 3px rgba(0,0,0,0.3);
  position: relative;
  overflow: hidden;
}

/* Brillo interno cruzando el botón */
.btn--primary::before {
  content: '';
  position: absolute;
  top: 0; left: -100%;
  width: 50%; height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
  transform: skewX(-20deg);
  transition: left 0.5s ease;
}

@media (hover: hover) {
  .btn--primary:hover:not(.btn--disabled) {
    background: var(--gradient-hover);
    transform: translateY(-3px);
    box-shadow: var(--shadow-glow-strong);
    color: #fff;
  }
  .btn--primary:hover:not(.btn--disabled)::before {
    left: 200%;
  }
}

/* ── Variante: secundario (Neon Outline) ──────────────────────────── */
.btn--secondary {
  background: rgba(0, 255, 255, 0.02);
  color: var(--accent);
  border: 1px solid rgba(0, 255, 255, 0.5);
  box-shadow: inset 0 0 10px rgba(0, 255, 255, 0.1), 0 0 10px rgba(0, 255, 255, 0.05);
  backdrop-filter: blur(8px);
}

@media (hover: hover) {
  .btn--secondary:hover:not(.btn--disabled) {
    background: rgba(0, 255, 255, 0.1);
    border-color: #00FFFF;
    color: #fff;
    transform: translateY(-3px);
    box-shadow: inset 0 0 15px rgba(0, 255, 255, 0.2), 0 0 20px rgba(0, 255, 255, 0.4);
    text-shadow: 0 0 8px rgba(0, 255, 255, 0.8);
  }
}

/* ── Variante: fantasma/enlace ────────────────────────────────────── */
.btn--ghost {
  background: transparent;
  color: var(--accent);
  padding-inline: 0.5rem;
  font-weight: 600;
  min-height: auto;
  border: none;
}

.btn--ghost::after {
  content: ' →';
  display: inline-block;
  transition: transform var(--transition-base);
}

@media (hover: hover) {
  .btn--ghost:hover:not(.btn--disabled) {
    color: #fff;
    text-shadow: 0 0 10px rgba(0, 255, 255, 0.8);
  }
  .btn--ghost:hover:not(.btn--disabled)::after {
    transform: translateX(6px);
  }
}

/* ── Estado: deshabilitado ────────────────────────────────────────── */
.btn--disabled {
  opacity: 0.3;
  cursor: not-allowed;
  pointer-events: none;
  filter: grayscale(1);
}

/* ── Estado: cargando ─────────────────────────────────────────────── */
.btn--loading {
  opacity: 0.7;
  cursor: wait;
  pointer-events: none;
}
</style>
