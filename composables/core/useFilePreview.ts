// composables/useFilePreview.ts
import { ref, computed } from 'vue'

interface FileVersion {
  id: string
  url: string
  createdAt: Date
  size: number
  modifiedBy: string
}

export function useFilePreview() {
  const previewFile = ref<{
    id: string
    name: string
    type: string
    url: string
    versions: FileVersion[]
  } | null>(null)

  const isPreviewOpen = ref(false)
  const isVideoPlaying = ref(false)

  const previewType = computed(() => {
    if (!previewFile.value) return null
    if (previewFile.value.type.startsWith('image/')) return 'image'
    if (previewFile.value.type.startsWith('video/')) return 'video'
    if (previewFile.value.type.startsWith('audio/')) return 'audio'
    if (previewFile.value.type.includes('pdf')) return 'pdf'
    return 'default'
  })

  const openPreview = (file: any) => {
    previewFile.value = file
    isPreviewOpen.value = true
  }

  const closePreview = () => {
    previewFile.value = null
    isPreviewOpen.value = false
    isVideoPlaying.value = false
  }

  return {
    previewFile,
    isPreviewOpen,
    isVideoPlaying,
    previewType,
    openPreview,
    closePreview
  }
}