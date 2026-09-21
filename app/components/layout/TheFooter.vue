<!-- TheFooter.vue — Pie de página de UXcode Solutions
     4 columnas: Marca | Páginas | Servicios | Redes sociales
     Año dinámico, redes con fallback si están vacías, botón "Volver arriba" -->
<template>
  <footer class="footer" role="contentinfo">
    <!-- Línea superior decorativa con degradado -->
    <div class="footer__top-line" aria-hidden="true" />

    <div class="footer__main container">
      <!-- ── Columna 1: Marca ── -->
      <div class="footer__col footer__col--brand">
        <NuxtLink to="/" class="footer__logo-link" :aria-label="`${site.name} — Inicio`">
          <img
            src="/images/logo.png"
            alt="UXcode Solutions"
            class="footer__logo-img"
            width="130"
            height="36"
            loading="lazy"
            @error="logoError = true"
          />
          <span v-if="logoError" class="footer__wordmark">
            <span class="footer__wordmark-ux">UX</span><span class="footer__wordmark-code">code</span>
          </span>
        </NuxtLink>
        <p class="footer__tagline">{{ $t('footer.tagline') }}</p>
        <p class="footer__desc">{{ $t('footer.description') }}</p>

        <!-- Email -->
        <a
          v-if="site.email"
          :href="`mailto:${site.email}`"
          class="footer__email-link"
          :aria-label="`Escribirnos a ${site.email}`"
        >
          <UiIconsIconMail :size="16" />
          {{ site.email }}
        </a>
      </div>

      <!-- ── Columna 2: Páginas ── -->
      <div class="footer__col">
        <h3 class="footer__col-title">{{ $t('footer.quickLinks') }}</h3>
        <ul class="footer__list">
          <li v-for="link in navLinks" :key="link.to">
            <NuxtLink :to="link.to" class="footer__link">{{ $t(link.label) }}</NuxtLink>
          </li>
        </ul>
      </div>

      <!-- ── Columna 3: Servicios ── -->
      <div class="footer__col">
        <h3 class="footer__col-title">{{ $t('footer.services') }}</h3>
        <ul class="footer__list">
          <li v-for="svc in serviceLinks" :key="svc.slug">
            <NuxtLink :to="`/servicios#${svc.slug}`" class="footer__link">
              {{ $t(`services.${svc.slug}.title`) }}
            </NuxtLink>
          </li>
        </ul>
      </div>

      <!-- ── Columna 4: Redes sociales ── -->
      <div class="footer__col">
        <h3 class="footer__col-title">{{ $t('footer.social') }}</h3>
        <div class="footer__social">
          <!-- Instagram -->
          <a
            v-if="site.social.instagram"
            :href="site.social.instagram"
            target="_blank"
            rel="noopener noreferrer"
            class="footer__social-link"
            aria-label="Instagram de UXcode Solutions"
          >
            <UiIconsIconInstagram :size="22" />
          </a>
          <span v-else class="footer__social-link footer__social-link--disabled" :title="$t('footer.socialSoon')" aria-label="Instagram — próximamente">
            <UiIconsIconInstagram :size="22" />
          </span>

          <!-- LinkedIn -->
          <a
            v-if="site.social.linkedin"
            :href="site.social.linkedin"
            target="_blank"
            rel="noopener noreferrer"
            class="footer__social-link"
            aria-label="LinkedIn de UXcode Solutions"
          >
            <UiIconsIconLinkedin :size="22" />
          </a>
          <span v-else class="footer__social-link footer__social-link--disabled" :title="$t('footer.socialSoon')" aria-label="LinkedIn — próximamente">
            <UiIconsIconLinkedin :size="22" />
          </span>

          <!-- GitHub -->
          <a
            v-if="site.social.github"
            :href="site.social.github"
            target="_blank"
            rel="noopener noreferrer"
            class="footer__social-link"
            aria-label="GitHub de UXcode Solutions"
          >
            <UiIconsIconGithub :size="22" />
          </a>
          <span v-else class="footer__social-link footer__social-link--disabled" :title="$t('footer.socialSoon')" aria-label="GitHub — próximamente">
            <UiIconsIconGithub :size="22" />
          </span>

          <!-- WhatsApp -->
          <a
            v-if="site.social.whatsapp"
            :href="site.social.whatsapp"
            target="_blank"
            rel="noopener noreferrer"
            class="footer__social-link"
            aria-label="WhatsApp de UXcode Solutions"
          >
            <UiIconsIconWhatsapp :size="22" />
          </a>
          <span v-else class="footer__social-link footer__social-link--disabled" :title="$t('footer.socialSoon')" aria-label="WhatsApp — próximamente">
            <UiIconsIconWhatsapp :size="22" />
          </span>
        </div>
      </div>
    </div>

    <!-- ── Barra inferior ── -->
    <div class="footer__bottom container">
      <p class="footer__copy">
        &copy; {{ currentYear }} {{ $t('footer.copyright') }}
      </p>
      <button class="footer__back-top" @click="scrollToTop" :aria-label="$t('footer.backToTop')">
        {{ $t('footer.backToTop') }}
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <polyline points="18 15 12 9 6 15" />
        </svg>
      </button>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { site } from '~/data/site'
import { services } from '~/data/services'

const logoError = ref(false)

// Año dinámico
const currentYear = new Date().getFullYear()

const navLinks = [
  { to: '/', label: 'nav.home' },
  { to: '/servicios', label: 'nav.services' },
  { to: '/portafolio', label: 'nav.portfolio' },
  { to: '/nosotros', label: 'nav.about' },
  { to: '/blog', label: 'nav.blog' },
  { to: '/contacto', label: 'nav.contact' },
]

const serviceLinks = services

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<style scoped>
.footer {
  background: #121212;
  padding-top: 0;
  margin-top: 0;
}

/* Línea superior con degradado */
.footer__top-line {
  height: 1px;
  background: var(--gradient);
  opacity: 0.5;
}

.footer__main {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2.5rem;
  padding-top: 4rem;
  padding-bottom: 3rem;
}

@media (min-width: 640px) { .footer__main { grid-template-columns: repeat(2, 1fr); } }
@media (min-width: 1024px) { .footer__main { grid-template-columns: 2fr 1fr 1fr 1fr; } }

/* ── Columnas ── */
.footer__col-title {
  font-family: var(--font-body);
  font-size: 0.8rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--text-muted);
  margin-bottom: 1.25rem;
}

.footer__list { display: flex; flex-direction: column; gap: 0.6rem; }

.footer__link {
  font-size: 0.9rem;
  color: var(--text-muted);
  text-decoration: none;
  transition: color var(--transition-base);
}

@media (hover: hover) { .footer__link:hover { color: var(--accent); } }

/* ── Columna marca ── */
.footer__logo-link { display: inline-flex; align-items: center; margin-bottom: 1rem; }
.footer__logo-img { height: 34px; width: auto; }

.footer__wordmark { font-family: var(--font-title); font-size: 1.2rem; }
.footer__wordmark-ux { color: var(--text); }
.footer__wordmark-code {
  background: var(--gradient);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.footer__tagline {
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--accent);
  margin-bottom: 0.75rem;
  font-style: italic;
}

.footer__desc { font-size: 0.875rem; color: var(--text-muted); line-height: 1.6; }

.footer__email-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 1rem;
  font-size: 0.875rem;
  color: var(--text-muted);
  text-decoration: none;
  transition: color var(--transition-base);
}

@media (hover: hover) {
  .footer__email-link:hover { color: var(--accent); }
}

/* ── Redes sociales ── */
.footer__social { display: flex; gap: 0.75rem; flex-wrap: wrap; }

.footer__social-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--surface);
  border: 1px solid var(--border);
  color: var(--text-muted);
  text-decoration: none;
  transition: color var(--transition-base), background var(--transition-base), box-shadow var(--transition-base), transform var(--transition-base);
  cursor: pointer;
}

@media (hover: hover) {
  a.footer__social-link:hover {
    color: var(--accent);
    background: rgba(0,212,212,0.1);
    box-shadow: var(--shadow-glow);
    transform: scale(1.1);
  }
}

.footer__social-link--disabled {
  opacity: 0.35;
  cursor: not-allowed;
  pointer-events: none;
}

/* ── Barra inferior ── */
.footer__bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1rem;
  padding-top: 1.5rem;
  padding-bottom: 1.5rem;
  border-top: 1px solid var(--border);
}

.footer__copy { font-size: 0.8rem; color: var(--text-muted); }

.footer__back-top {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--text-muted);
  background: none;
  border: none;
  cursor: pointer;
  transition: color var(--transition-base);
  font-family: var(--font-body);
}

@media (hover: hover) { .footer__back-top:hover { color: var(--accent); } }
</style>
