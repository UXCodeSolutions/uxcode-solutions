<!-- HeroSection.vue — Sección hero de pantalla completa
     Fondo: hero-bg.svg + overlay de marca + cuadrícula
     Contenido: pill, h1 con degradado animado, subtítulo, botones, chips de confianza con iconos
     Lado derecho (escritorio): dos tarjetas flotantes de código apiladas -->
<template>
  <section class="hero" aria-label="Inicio" id="hero">
    <!-- Fondo con capas (Grid y gradientes oscuros, sin orbes neón exagerados) -->
    <div class="hero__bg" aria-hidden="true">
      <img src="/images/hero-bg.svg" alt="" class="hero__bg-img" loading="eager" width="1200" height="800" />
      <div class="hero__bg-overlay" />
    </div>

    <div class="container hero__content">
      <!-- Columna izquierda: texto -->
      <div class="hero__text">
        <!-- Pill etiqueta -->
        <div class="pill hero-animate-1">
          <svg width="10" height="10" viewBox="0 0 12 12" fill="none" aria-hidden="true">
            <circle cx="6" cy="6" r="5" fill="#00FFFF" opacity="0.5" />
            <circle cx="6" cy="6" r="3" fill="#00FFFF" />
          </svg>
          Desarrollo de software para emprendedores
        </div>

        <!-- H1 principal -->
        <h1 class="hero__h1 hero-animate-2">
          Tu idea,
          <br />
          funcionando en
          <br />
          <span class="gradient-text-animated">tiempo récord.</span>
        </h1>

        <!-- Subtítulo -->
        <p class="hero__subtitle hero-animate-3">
          En UXcode Solutions convertimos ideas en apps, sistemas y soluciones digitales. Rápido, a tu medida y con trato humano.
        </p>

        <!-- Botones de acción -->
        <div class="hero__actions hero-animate-4">
          <UiBaseButton to="/servicios" variant="primary">Saber más</UiBaseButton>
          <UiBaseButton to="/portafolio" variant="ghost">Ver portafolio</UiBaseButton>
        </div>

        <!-- Chips de confianza (con Iconos, sin Emojis) -->
        <div class="hero__chips hero-animate-4">
          <div class="hero__chip">
            <UiIconsIconZap :size="14" />
            <span>Desarrollo con IA - criterio humano</span>
          </div>
          <div class="hero__chip">
            <UiIconsIconCheck :size="14" />
            <span>15 días de prueba</span>
          </div>
          <div class="hero__chip" style="width: 100%;">
            <UiIconsIconRocket :size="14" />
            <span>Creamos nuestros propios productos</span>
          </div>
        </div>
      </div>

      <!-- Columna derecha: Mockup de teléfono flotante con tarjetas de stats -->
      <div class="hero__visual" aria-hidden="true">
        <!-- Anillos pulsantes centrados -->
        <div class="hero__glow-ring hero__glow-ring--1" />
        <div class="hero__glow-ring hero__glow-ring--2" />

        <!-- Teléfono mockup principal centrado en el anillo -->
        <div class="hero__phone-wrap float">
          <img
            src="/images/hero-phone.png"
            alt="App dashboard en móvil"
            class="hero__phone-img"
            width="340"
            height="520"
            loading="eager"
          />
        </div>

        <!-- Tarjeta flotante: Velocidad de desarrollo -->
        <div class="hero__stat-card hero__stat-card--time float float-delay-2">
          <span class="hero__stat-icon">
            <UiIconsIconZap :size="18" />
          </span>
          <div>
            <div class="hero__stat-number">2× más rápido</div>
            <div class="hero__stat-label">con IA en el proceso</div>
          </div>
        </div>

        <!-- Badge: Prueba gratis -->
        <div class="hero__badge float float-delay-3">
          <UiIconsIconCheck :size="14" />
          <span>15 días de prueba</span>
        </div>
      </div>
    </div>

    <!-- Indicador de scroll -->
    <div class="hero__scroll-indicator" aria-hidden="true">
      <div class="hero__scroll-mouse">
        <div class="hero__scroll-wheel" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// Sin lógica adicional — las animaciones CSS se encargan de todo
</script>

<style scoped>
/* ── Sección hero ─────────────────────────────────────────────────── */
.hero {
  position: relative;
  min-height: 100svh;
  display: flex;
  align-items: center;
  overflow: hidden;
}

/* ── Fondo ────────────────────────────────────────────────────────── */
.hero__bg { position: absolute; inset: 0; z-index: 0; }

.hero__bg-img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.15;
}

.hero__bg-overlay {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(135deg, rgba(0,255,255,0.03) 0%, rgba(0,102,255,0.03) 100%),
    linear-gradient(to bottom, rgba(10,10,14,0.5) 0%, rgba(10,10,14,1) 100%);
}

/* ── Contenido ────────────────────────────────────────────────────── */
.hero__content {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: 1fr;
  gap: 3rem;
  padding-top: 4rem;
  padding-bottom: 5rem;
  align-items: center;
}

@media (min-width: 1024px) {
  .hero__content {
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
    padding-top: 2rem;
  }
}

/* ── Texto del hero ───────────────────────────────────────────────── */
.hero__h1 {
  font-size: clamp(3rem, 5.5vw, 4.5rem);
  line-height: 1.05;
  margin-top: 1.25rem;
  margin-bottom: 1.25rem;
  color: var(--text);
}

.hero__subtitle {
  font-size: clamp(1rem, 2vw, 1.15rem);
  color: var(--text-muted);
  line-height: 1.6;
  max-width: 480px;
  margin-bottom: 2rem;
}

.hero__actions {
  display: flex;
  gap: 1.5rem;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 2.5rem;
}

/* ── Chips de confianza ───────────────────────────────────────────── */
.hero__chips {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  max-width: 480px;
}

.hero__chip {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.8rem;
  font-weight: 500;
  color: var(--text-muted);
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: var(--radius-btn);
  padding: 0.4rem 0.85rem;
  box-shadow: 0 4px 10px rgba(0,0,0,0.2);
}

.hero__chip svg { color: var(--accent); flex-shrink: 0; }

/* ── Visual flotante (solo escritorio) ────────────────────────────── */
.hero__visual {
  display: none;
  position: relative;
  height: 540px;
}

@media (min-width: 1024px) { .hero__visual { display: block; } }

/* ── Anillos de brillo ── */
.hero__glow-ring {
  position: absolute;
  border-radius: 50%;
  border: 1px solid rgba(0, 255, 255, 0.12);
  pointer-events: none;
  animation: ringPulse 4s ease-in-out infinite;
}

.hero__glow-ring--1 {
  width: 360px;
  height: 360px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation-delay: 0s;
}

.hero__glow-ring--2 {
  width: 480px;
  height: 480px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-color: rgba(0, 102, 255, 0.08);
  animation-delay: 1s;
}

@keyframes ringPulse {
  0%, 100% { opacity: 0.6; transform: translate(-50%, -50%) scale(1); }
  50% { opacity: 1; transform: translate(-50%, -50%) scale(1.04); }
}

/* ── Teléfono ── */
.hero__phone-wrap {
  position: absolute;
  top: 20%;
  left: 40%;
  transform: translate(-50%, -50%);
  z-index: 2;
}

.hero__phone-img {
  height: 440px;
  width: auto;
  object-fit: contain;
  filter: drop-shadow(0 0 40px rgba(0, 255, 255, 0.25));
  /* Usamos scale en vez de afectar las dimensiones reales para no romper el layout */
  transform: scale(1.65) translateY(-5%);
}

/* ── Tarjetas de estadísticas flotantes ── */
.hero__stat-card {
  position: absolute;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background: rgba(18, 18, 22, 0.88);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 14px;
  padding: 0.85rem 1.25rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
  z-index: 3;
  white-space: nowrap;
}

.hero__stat-card--time {
  bottom: 60px;
  right: 0px;
}

.hero__stat-icon {
  color: var(--accent);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  background: rgba(0, 255, 255, 0.1);
  border-radius: 10px;
  flex-shrink: 0;
}

.hero__stat-number {
  font-weight: 700;
  font-size: 1rem;
  color: var(--text);
  line-height: 1.2;
}

.hero__stat-label {
  font-size: 0.75rem;
  color: var(--text-muted);
}

/* ── Badge circular ── */
.hero__badge {
  position: absolute;
  top: 30px;
  right: 10px;
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  background: rgba(0, 255, 255, 0.08);
  border: 1px solid rgba(0, 255, 255, 0.25);
  border-radius: 999px;
  padding: 0.4rem 1rem;
  font-size: 0.8rem;
  color: var(--accent);
  font-weight: 600;
  backdrop-filter: blur(8px);
  z-index: 3;
}

/* ── Indicador de scroll ─────────────────────────────────────────── */
.hero__scroll-indicator {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1;
}

.hero__scroll-mouse {
  width: 24px;
  height: 38px;
  border: 2px solid rgba(0,255,255,0.4);
  border-radius: 12px;
  display: flex;
  justify-content: center;
  padding-top: 6px;
}

.hero__scroll-wheel {
  width: 4px;
  height: 8px;
  background: var(--accent);
  border-radius: 2px;
  animation: scrollBounce 2s ease-in-out infinite;
}
</style>
