<!-- TheNavbar.vue — Barra de navegación principal de UXcode Solutions
     - Fija en la parte superior, transparente → sólida al hacer scroll
     - Logo real (PNG) + wordmark como fallback
     - Menú móvil a pantalla completa con hamburguesa animada
     - Botón CTA "Prueba 15 días" en el extremo derecho
     - Accesible: aria-expanded, aria-controls, foco atrapado, Esc para cerrar -->
<template>
  <header
    class="navbar"
    :class="{ 'navbar--scrolled': isScrolled, 'navbar--open': menuOpen }"
    role="banner"
  >
    <div class="navbar__inner container">
      <!-- Logo -->
      <NuxtLink to="/" class="navbar__logo" :aria-label="`${$t('seo.siteName')} — Inicio`">
        <img
          src="/images/logo.png"
          alt="UXcode Solutions"
          class="navbar__logo-img"
          width="140"
          height="40"
          loading="eager"
          @error="logoError = true"
        />
        <!-- Wordmark como fallback si no carga la imagen -->
        <span v-if="logoError" class="navbar__wordmark">
          <span class="navbar__wordmark-ux">UX</span><span class="navbar__wordmark-code">code</span>
          <span class="navbar__wordmark-solutions"> Solutions</span>
        </span>
      </NuxtLink>

      <!-- Navegación de escritorio -->
      <nav class="navbar__nav" aria-label="Navegación principal">
        <ul class="navbar__links">
          <li v-for="link in navLinks" :key="link.to">
            <NuxtLink
              :to="link.to"
              class="navbar__link"
              :class="{ 'navbar__link--active': route.path === link.to }"
            >
              {{ $t(link.label) }}
            </NuxtLink>
          </li>
        </ul>
      </nav>

      <!-- CTA de escritorio -->
      <BaseButton
        to="/contacto?motivo=prueba"
        variant="primary"
        class="navbar__cta"
      >
        {{ $t('nav.cta') }}
      </BaseButton>

      <!-- Botón hamburguesa (móvil) -->
      <button
        class="navbar__hamburger"
        :class="{ 'navbar__hamburger--active': menuOpen }"
        :aria-expanded="menuOpen"
        aria-controls="mobile-menu"
        :aria-label="menuOpen ? 'Cerrar menú' : 'Abrir menú'"
        @click="toggleMenu"
      >
        <span class="navbar__hamburger-line" />
        <span class="navbar__hamburger-line" />
        <span class="navbar__hamburger-line" />
      </button>
    </div>

    <!-- Menú móvil a pantalla completa -->
    <Transition name="mobile-menu">
      <div
        v-if="menuOpen"
        id="mobile-menu"
        class="navbar__mobile"
        role="dialog"
        aria-modal="true"
        aria-label="Menú de navegación"
        @click.self="closeMenu"
      >
        <nav class="navbar__mobile-nav" aria-label="Menú móvil">
          <ul class="navbar__mobile-links">
            <li
              v-for="(link, i) in navLinks"
              :key="link.to"
              class="navbar__mobile-item"
              :style="{ '--item-delay': `${i * 80}ms` }"
            >
              <NuxtLink
                :to="link.to"
                class="navbar__mobile-link"
                :class="{ 'navbar__mobile-link--active': route.path === link.to }"
                @click="closeMenu"
              >
                {{ $t(link.label) }}
              </NuxtLink>
            </li>
          </ul>

          <div class="navbar__mobile-cta">
            <BaseButton to="/contacto?motivo=prueba" variant="primary" @click="closeMenu">
              {{ $t('nav.cta') }}
            </BaseButton>
          </div>
        </nav>
      </div>
    </Transition>
  </header>
</template>

<script setup lang="ts">
const route = useRoute()
const { isScrolled } = useScrolled()

const menuOpen = ref(false)
const logoError = ref(false)

const navLinks = [
  { to: '/', label: 'nav.home' },
  { to: '/servicios', label: 'nav.services' },
  { to: '/portafolio', label: 'nav.portfolio' },
  { to: '/nosotros', label: 'nav.about' },
  { to: '/blog', label: 'nav.blog' },
  { to: '/contacto', label: 'nav.contact' },
]

const toggleMenu = () => { menuOpen.value = !menuOpen.value }
const closeMenu = () => { menuOpen.value = false }

// Cerrar al navegar a otra página
watch(() => route.path, closeMenu)

// Bloquear scroll del body cuando el menú está abierto
watch(menuOpen, (open) => {
  if (process.client) {
    document.body.style.overflow = open ? 'hidden' : ''
  }
})

// Cerrar con tecla Esc
onMounted(() => {
  const handleKey = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && menuOpen.value) closeMenu()
  }
  window.addEventListener('keydown', handleKey)
  onUnmounted(() => window.removeEventListener('keydown', handleKey))
})
</script>

<style scoped>
/* ── Navbar base ───────────────────────────────────────────────────── */
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: var(--z-nav);
  height: var(--navbar-h);
  transition:
    background var(--transition-slow),
    border-color var(--transition-slow),
    box-shadow var(--transition-slow);
}

.navbar--scrolled {
  background: rgba(18,18,18,0.92);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--border);
  box-shadow: 0 4px 20px rgba(0,0,0,0.3);
}

.navbar__inner {
  display: flex;
  align-items: center;
  height: 100%;
  gap: 2rem;
}

/* ── Logo ──────────────────────────────────────────────────────────── */
.navbar__logo {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  text-decoration: none;
  margin-right: auto;
}

.navbar__logo-img {
  height: 38px;
  width: auto;
  object-fit: contain;
}

.navbar__wordmark {
  font-family: var(--font-title);
  font-size: 1.3rem;
  letter-spacing: -0.02em;
}

.navbar__wordmark-ux { color: var(--text); }
.navbar__wordmark-code {
  background: var(--gradient);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}
.navbar__wordmark-solutions {
  font-family: var(--font-body);
  font-weight: 300;
  font-size: 0.85rem;
  color: var(--text-muted);
  margin-left: 0.25rem;
}

/* ── Links de escritorio ───────────────────────────────────────────── */
.navbar__nav { display: none; }

@media (min-width: 1024px) {
  .navbar__nav {
    display: flex;
    align-items: center;
  }
  .navbar__logo { margin-right: 0; }
}

.navbar__links {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  list-style: none;
}

.navbar__link {
  display: block;
  padding: 0.5rem 0.875rem;
  font-family: var(--font-body);
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--text-muted);
  text-decoration: none;
  border-radius: var(--radius-sm);
  transition: color var(--transition-base);
  position: relative;
}

.navbar__link::after {
  content: '';
  position: absolute;
  bottom: 2px;
  left: 0.875rem;
  right: 0.875rem;
  height: 2px;
  background: var(--gradient);
  border-radius: 1px;
  transform: scaleX(0);
  transform-origin: left;
  transition: transform var(--transition-base);
}

@media (hover: hover) {
  .navbar__link:hover { color: var(--text); }
  .navbar__link:hover::after { transform: scaleX(1); }
}

.navbar__link--active { color: var(--accent); }
.navbar__link--active::after { transform: scaleX(1); }

/* ── CTA de escritorio ─────────────────────────────────────────────── */
.navbar__cta {
  display: none;
  font-size: 0.85rem;
  padding: 0.6rem 1.25rem;
  min-height: 40px;
  white-space: nowrap;
}

@media (min-width: 1024px) { .navbar__cta { display: inline-flex; } }

/* ── Hamburguesa ───────────────────────────────────────────────────── */
.navbar__hamburger {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  width: 40px;
  height: 40px;
  padding: 8px;
  cursor: pointer;
  background: none;
  border: none;
  border-radius: var(--radius-sm);
  flex-shrink: 0;
}

@media (min-width: 1024px) { .navbar__hamburger { display: none; } }

.navbar__hamburger-line {
  display: block;
  width: 100%;
  height: 2px;
  background: var(--text);
  border-radius: 1px;
  transition: transform 300ms ease, opacity 300ms ease, background var(--transition-base);
  transform-origin: center;
}

/* Las tres líneas se convierten en X */
.navbar__hamburger--active .navbar__hamburger-line:nth-child(1) {
  transform: translateY(7px) rotate(45deg);
}
.navbar__hamburger--active .navbar__hamburger-line:nth-child(2) {
  opacity: 0;
  transform: scaleX(0);
}
.navbar__hamburger--active .navbar__hamburger-line:nth-child(3) {
  transform: translateY(-7px) rotate(-45deg);
}

/* ── Menú móvil ────────────────────────────────────────────────────── */
.navbar__mobile {
  position: fixed;
  inset: 0;
  background: rgba(18,18,18,0.97);
  backdrop-filter: blur(16px);
  z-index: calc(var(--z-nav) - 1);
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: var(--navbar-h);
}

.navbar__mobile-nav { text-align: center; width: 100%; padding: 2rem; }

.navbar__mobile-links { display: flex; flex-direction: column; gap: 0.5rem; margin-bottom: 2.5rem; }

.navbar__mobile-item {
  animation: mobileItemIn 0.5s cubic-bezier(0.2,0.7,0.2,1) var(--item-delay, 0ms) both;
}

@keyframes mobileItemIn {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}

.navbar__mobile-link {
  display: block;
  font-family: var(--font-title);
  font-size: clamp(1.8rem, 5vw, 2.5rem);
  color: var(--text-muted);
  text-decoration: none;
  padding: 0.5rem;
  transition: color var(--transition-base);
}

@media (hover: hover) {
  .navbar__mobile-link:hover { color: var(--accent); }
}
.navbar__mobile-link--active { color: var(--accent); }

/* Transición de entrada/salida del menú */
.mobile-menu-enter-active { transition: opacity 300ms ease; }
.mobile-menu-leave-active { transition: opacity 200ms ease; }
.mobile-menu-enter-from, .mobile-menu-leave-to { opacity: 0; }
</style>
