// useScrolled.ts — Composable para detectar si el usuario hizo scroll
// Convierte el navbar de transparente a sólido al pasar los primeros ~40px.

export const useScrolled = () => {
  const isScrolled = ref(false)

  const handleScroll = () => {
    isScrolled.value = window.scrollY > 40
  }

  onMounted(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Verificar estado inicial
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
  })

  return { isScrolled }
}
