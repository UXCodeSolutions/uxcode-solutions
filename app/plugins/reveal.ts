// reveal.ts — Directiva v-reveal para UXcode Solutions
// Plugin universal (se carga en cliente y servidor)
import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin((nuxtApp: any) => {
  let observer: IntersectionObserver | null = null
  let prefersReduced = false

  if (import.meta.client) {
    prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    document.documentElement.classList.add('reveal-ready')

    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const el = entry.target as HTMLElement

          if (entry.isIntersecting) {
            if (el.classList.contains('is-out')) {
              el.style.transition = 'none'
              el.classList.remove('is-out')
              void el.offsetWidth
              el.style.transition = ''
            }
            el.classList.remove('is-out')
            el.classList.add('is-in')
          } else {
            if (el.classList.contains('is-in')) {
              el.classList.remove('is-in')
              el.classList.add('is-out')
            }
          }
        })
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -8% 0px',
      }
    )
  }

  nuxtApp.vueApp.directive('reveal', {
    mounted(el: HTMLElement, binding: any) {
      if (!import.meta.client || !observer) return
      
      const delay = (binding.value?.delay ?? 0)
      if (delay > 0 && !prefersReduced) {
        el.style.setProperty('--reveal-delay', `${delay}ms`)
      }

      el.classList.add('reveal')
      observer.observe(el)
    },
    unmounted(el: HTMLElement) {
      if (!import.meta.client || !observer) return
      observer.unobserve(el)
      el.classList.remove('reveal', 'is-in', 'is-out')
    },
    getSSRProps() {
      // Evita que SSR falle por no encontrar la directiva
      return {}
    }
  })
})
