<!-- TechStrip.vue — Cinta horizontal de tecnologías con marquee continuo -->
<template>
  <section class="tech-strip" aria-label="Tecnologías que usamos">
    <div class="container">
      <p class="tech-strip__label">{{ $t('techStrip.label') }}</p>
    </div>
    <div class="tech-strip__track-wrapper" aria-hidden="true">
      <!-- Duplicamos la lista para el efecto marquee continuo sin saltos -->
      <div class="tech-strip__track">
        <div
          v-for="(tech, i) in [...techs, ...techs]"
          :key="`${tech.name}-${i}`"
          class="tech-strip__chip"
          :style="{ '--brand-color': tech.color }"
        >
          <span class="tech-strip__icon" v-html="tech.icon" />
          <span class="tech-strip__name">{{ tech.name }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// Íconos reales de cada tecnología — paths extraídos de Simple Icons (simpleicons.org)
// Todos los SVGs tienen viewBox="0 0 24 24" y se rellenan con fill="currentColor"
const techs = [
  {
    name: 'Flutter',
    color: '#54C5F8',
    icon: `<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
      <path d="M14.314 0L2.3 12 6 15.7 21.684.013h-7.37zm.159 11.971l-6.439 6.439 6.439 6.439 6.439-6.439-6.439-6.439zm-6.439 6.439L2.3 24h15.369l-5.684-5.59z"/>
    </svg>`
  },
  {
    name: 'Vue.js',
    color: '#4FC08D',
    icon: `<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
      <path d="M24,1.61H14.06L12,5.16,9.94,1.61H0L12,22.39ZM12,14.08,5.16,2.23H9.59L12,6.41l2.41-4.18h4.43Z"/>
    </svg>`
  },
  {
    name: 'Nuxt',
    color: '#00DC82',
    icon: `<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
      <path d="M13.4642 19.8295h8.9218c.2964 0 .5872-.0784.8418-.2272a1.6899 1.6899 0 0 0 .6208-.6207 1.701 1.701 0 0 0 .0007-1.699l-4.4617-7.7836a1.6975 1.6975 0 0 0-.621-.6197 1.6878 1.6878 0 0 0-1.6836 0 1.6975 1.6975 0 0 0-.621.6197l-1.1367 1.982-2.1796-3.8004a1.6978 1.6978 0 0 0-.6209-.6207 1.6878 1.6878 0 0 0-1.6836 0 1.6978 1.6978 0 0 0-.621.6207L.1507 17.3026a1.701 1.701 0 0 0 .0007 1.699c.1455.252.3551.4606.6208.6207A1.6955 1.6955 0 0 0 1.614 19.8295h6.296c2.5978 0 4.5085-1.1378 5.7902-3.3695l3.0543-5.3263 1.0833-1.8886 3.2495 5.666h-4.3334zm-5.3842-1.97-1.0022 1.7503H1.614l4.4429-7.7495 2.2184 3.8665z"/>
    </svg>`
  },
  {
    name: 'Dart',
    color: '#0175C2',
    icon: `<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
      <path d="M4.105 4.105S9.158 1.58 11.684.316a3.079 3.079 0 0 1 1.481-.315c.766.047 1.677.788 1.677.788L24 9.948v9.789h-4.263V24H9.789l-9-9C.303 14.5 0 13.795 0 13.105c0-.319.18-.818.18-.818L4.105 4.105zm.679.679L1.6 12.958 5.684 9.31l-3.237 5.788L4.3 16.9l3.476-6.207-.056 4.875 1.8.816L11.37 9.947l-1.8 7.63 1.576.69 1.62-8.01.38 7.125 1.576.456 1.17-8.126.94 6.696 1.577.23.637-7.22 1.38 5.898 1.576.007-.03-7.524c-.28-.28-.57-.56-.86-.84l-.01.003a1.14 1.14 0 0 0-.198-.15L10.58.81z"/>
    </svg>`
  },
  {
    name: 'TypeScript',
    color: '#3178C6',
    icon: `<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
      <path d="M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 0 1 1.306.34v2.458a3.95 3.95 0 0 0-.643-.361 5.093 5.093 0 0 0-.717-.26 5.453 5.453 0 0 0-1.426-.2c-.3 0-.573.028-.819.086a2.1 2.1 0 0 0-.623.242c-.17.104-.3.229-.393.374a.888.888 0 0 0-.14.49c0 .196.053.373.156.529.104.156.252.304.443.444s.423.276.696.41c.273.135.582.274.926.416.47.197.892.407 1.266.628.374.222.695.473.963.753.268.279.472.598.614.957.142.359.214.776.214 1.253 0 .657-.125 1.21-.373 1.656a3.033 3.033 0 0 1-1.012 1.085 4.38 4.38 0 0 1-1.487.596c-.566.12-1.163.18-1.79.18a9.916 9.916 0 0 1-1.84-.164 5.544 5.544 0 0 1-1.512-.493v-2.63a5.033 5.033 0 0 0 3.237 1.2c.333 0 .624-.03.872-.09.249-.06.456-.144.623-.25.166-.108.29-.234.373-.38a1.023 1.023 0 0 0-.074-1.089 2.12 2.12 0 0 0-.537-.5 5.597 5.597 0 0 0-.807-.444 27.72 27.72 0 0 0-1.007-.436c-.918-.383-1.602-.852-2.053-1.405-.45-.553-.676-1.222-.676-2.005 0-.614.123-1.141.369-1.582.246-.441.58-.804 1.004-1.089a4.494 4.494 0 0 1 1.47-.629 7.536 7.536 0 0 1 1.77-.201zm-15.113.188h9.563v2.166H9.506v9.646H6.789v-9.646H3.375z"/>
    </svg>`
  },
  {
    name: 'Firebase',
    color: '#FFCA28',
    icon: `<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
      <path d="M3.89 15.672L6.255.461A.542.542 0 0 1 7.27.288l2.543 4.771zm16.794 3.692l-2.25-14a.54.54 0 0 0-.919-.295L3.316 19.365l7.856 4.427a1.621 1.621 0 0 0 1.588 0zM14.3 7.147l-1.818-3.482a.542.542 0 0 0-.96 0L3.53 17.984z"/>
    </svg>`
  },
  {
    name: 'Vercel',
    color: '#ffffff',
    icon: `<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
      <path d="M24 22.525H0l12-21.05 12 21.05z"/>
    </svg>`
  },
  {
    name: 'Supabase',
    color: '#3ECF8E',
    icon: `<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
      <path d="M11.9 1.036c-.015-.986-1.26-1.41-1.874-.637L.764 12.05C-.33 13.427.65 15.455 2.409 15.455h9.579l.003 7.51c.015.985 1.259 1.408 1.874.636l9.262-11.653c1.093-1.375.113-3.403-1.645-3.403h-9.58L11.9 1.036z"/>
    </svg>`
  },
  {
    name: 'GitHub',
    color: '#ffffff',
    icon: `<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
    </svg>`
  },
]
</script>

<style scoped>
.tech-strip {
  padding-block: 2.5rem;
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
  overflow: hidden;
}

.tech-strip__label {
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: var(--text-muted);
  text-align: center;
  margin-bottom: 1.5rem;
}

.tech-strip__track-wrapper {
  overflow: hidden;
  /* Gradientes de fade en los bordes */
  -webkit-mask-image: linear-gradient(90deg, transparent 0%, black 10%, black 90%, transparent 100%);
  mask-image: linear-gradient(90deg, transparent 0%, black 10%, black 90%, transparent 100%);
}

.tech-strip__track {
  display: flex;
  gap: 1.5rem;
  width: max-content;
  animation: marquee 25s linear infinite;
}

/* Pausar en hover */
@media (hover: hover) {
  .tech-strip__track:hover { animation-play-state: paused; }
}

.tech-strip__chip {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1.25rem;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-badge);
  white-space: nowrap;
  color: var(--text-muted);
  font-size: 0.875rem;
  font-weight: 500;
  transition: color var(--transition-base), border-color var(--transition-base);
}

@media (hover: hover) {
  .tech-strip__chip:hover {
    color: var(--brand-color, var(--accent));
    border-color: color-mix(in srgb, var(--brand-color, var(--accent)) 40%, transparent);
  }
  .tech-strip__chip:hover .tech-strip__icon {
    color: var(--brand-color, var(--accent));
  }
}

.tech-strip__icon { display: flex; }
</style>
