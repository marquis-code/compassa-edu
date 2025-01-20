// composables/useCommandPalette.ts
import { ref } from 'vue'

export const useCommandPalette = () => {
  const isVisible = ref(false)

  const showCommandPalette = () => {
    isVisible.value = true
  }

  const hideCommandPalette = () => {
    isVisible.value = false
  }

  const toggleCommandPalette = () => {
    isVisible.value = !isVisible.value
  }

  // Setup keyboard shortcut listener
  if (typeof window !== 'undefined') {
    window.addEventListener('keydown', (event) => {
      if (event.ctrlKey && event.shiftKey && !event.altKey && !event.metaKey) {
        event.preventDefault()
        showCommandPalette()
      }

      // Add escape key to close
      if (event.key === 'Escape' && isVisible.value) {
        hideCommandPalette()
      }
    })
  }

  return {
    isVisible,
    showCommandPalette,
    hideCommandPalette,
    toggleCommandPalette
  }
}