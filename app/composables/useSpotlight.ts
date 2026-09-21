// useSpotlight.ts — Composable para el efecto "spotlight" en tarjetas
// Un resplandor radial cian/azul sigue al cursor dentro de la tarjeta.
// Se desactiva en dispositivos táctiles (sin hover real).

export const useSpotlight = (cardRef: Ref<HTMLElement | null>) => {
  // Detectar si el dispositivo tiene hover real (no táctil)
  const hasHover = ref(false)

  onMounted(() => {
    hasHover.value = window.matchMedia('(hover: hover)').matches
    if (!hasHover.value || !cardRef.value) return

    const el = cardRef.value

    const onMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width) * 100
      const y = ((e.clientY - rect.top) / rect.height) * 100
      // Las variables CSS --mx y --my se usan en el ::before del CSS de la tarjeta
      el.style.setProperty('--mx', `${x}%`)
      el.style.setProperty('--my', `${y}%`)
    }

    const onLeave = () => {
      el.style.setProperty('--mx', '50%')
      el.style.setProperty('--my', '50%')
    }

    el.addEventListener('pointermove', onMove)
    el.addEventListener('pointerleave', onLeave)

    onUnmounted(() => {
      el.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerleave', onLeave)
    })
  })
}
