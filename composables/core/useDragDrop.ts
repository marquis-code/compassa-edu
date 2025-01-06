// composables/useDragDrop.ts
import { ref } from 'vue'

export function useDragDrop() {
  const draggedItem = ref<{ id: string, type: 'file' | 'folder' } | null>(null)
  const dragOverTarget = ref<{ id: string, type: 'file' | 'folder' } | null>(null)

  const handleDragStart = (item: { id: string, type: 'file' | 'folder' }) => {
    draggedItem.value = item
  }

  const handleDragOver = (target: { id: string, type: 'file' | 'folder' }) => {
    if (draggedItem.value?.id !== target.id) {
      dragOverTarget.value = target
    }
  }

  const handleDragEnd = () => {
    draggedItem.value = null
    dragOverTarget.value = null
  }

  return {
    draggedItem,
    dragOverTarget,
    handleDragStart,
    handleDragOver,
    handleDragEnd
  }
}