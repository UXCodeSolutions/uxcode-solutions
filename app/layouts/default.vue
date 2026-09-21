<!-- default.vue — Layout principal del sitio
     Incluye: barra de progreso + enlace de saltar al contenido + Navbar + slot + Footer -->
<template>
  <div class="layout">
    <!-- Enlace de accesibilidad: saltar al contenido principal -->
    <a href="#main-content" class="skip-link">{{ $t('nav.skip') }}</a>

    <!-- Barra de progreso de scroll -->
    <LayoutScrollProgress />

    <!-- Barra de navegación fija -->
    <LayoutTheNavbar />

    <!-- Contenido principal de la página -->
    <main id="main-content" class="layout__main">
      <slot />
    </main>

    <!-- Pie de página -->
    <LayoutTheFooter />
  </div>
</template>

<script setup lang="ts">
// El layout es compartido por todas las páginas.
// Al cambiar de ruta, Nuxt hace scroll al inicio automáticamente.
const router = useRouter()
router.afterEach(() => {
  if (process.client) {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }
})
</script>

<style scoped>
.layout {
  display: flex;
  flex-direction: column;
  min-height: 100dvh;
}

.layout__main {
  flex: 1;
  padding-top: var(--navbar-h); /* Compensar el navbar fijo */
}
</style>
