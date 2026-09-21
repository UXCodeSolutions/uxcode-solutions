// useScrollProgress.ts — Composable para la barra de progreso de scroll
// Calcula qué porcentaje de la página actual se ha desplazado el usuario.

export const useScrollProgress = () => {
  const progress = ref(0)

  const handleScroll = () => {
    const el = document.documentElement
    const scrollTop = el.scrollTop || document.body.scrollTop
    const scrollHeight = el.scrollHeight - el.clientHeight
    progress.value = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0
  }

  onMounted(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
  })

  return { progress }
}
