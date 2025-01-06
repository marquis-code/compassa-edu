// composables/useFileManager.ts
import { ref, computed } from 'vue'

interface FileItem {
  id: string
  name: string
  size: number
  type: string
  url: string
  createdAt: Date
  folderId?: string
}

interface Folder {
  id: string
  name: string
  type: 'folder'
  itemCount: number
  size: string
  thumbnail: string
  collaborators: { avatar: string }[]
  files: FileItem[]
}

export function useFileManager() {
  const files = ref<FileItem[]>([])
  const folders = ref<Folder[]>([])
  const searchQuery = ref('')

  const filteredFiles = computed(() => {
    if (!searchQuery.value) return files.value
    const query = searchQuery.value.toLowerCase()
    return files.value.filter(file => 
      file.name.toLowerCase().includes(query) ||
      file.type.toLowerCase().includes(query)
    )
  })

  const filteredFolders = computed(() => {
    if (!searchQuery.value) return folders.value
    const query = searchQuery.value.toLowerCase()
    return folders.value.filter(folder => 
      folder.name.toLowerCase().includes(query)
    )
  })

  const getFileIcon = (type: string) => {
    if (type.startsWith('image/')) return 'PhotoIcon'
    if (type.startsWith('video/')) return 'FilmIcon'
    if (type.startsWith('audio/')) return 'MusicalNoteIcon'
    if (type.includes('pdf')) return 'DocumentTextIcon'
    if (type.includes('spreadsheet') || type.includes('excel')) return 'TableCellsIcon'
    if (type.includes('presentation') || type.includes('powerpoint')) return 'PresentationChartBarIcon'
    return 'DocumentIcon'
  }

  const addFile = async (file: File, folderName?: string) => {
    const url = await createFilePreview(file)
    const fileItem: FileItem = {
      id: Date.now().toString(),
      name: file.name,
      size: file.size,
      type: file.type,
      url,
      createdAt: new Date()
    }

    if (folderName) {
      const folder = folders.value.find(f => f.name === folderName)
      if (folder) {
        folder.files.push(fileItem)
        folder.itemCount = folder.files.length
        updateFolderSize(folder)
      } else {
        createFolder(folderName, [fileItem])
      }
    } else {
      files.value.unshift(fileItem)
    }
  }

  const createFolder = (name: string, initialFiles: FileItem[] = []) => {
    const folder: Folder = {
      id: Date.now().toString(),
      name,
      type: 'folder',
      itemCount: initialFiles.length,
      size: '0 KB',
      thumbnail: initialFiles[0]?.url || '',
      collaborators: [],
      files: initialFiles
    }
    updateFolderSize(folder)
    folders.value.push(folder)
  }

  const deleteFile = (fileId: string, folderId?: string) => {
    if (folderId) {
      const folder = folders.value.find(f => f.id === folderId)
      if (folder) {
        folder.files = folder.files.filter(f => f.id !== fileId)
        folder.itemCount = folder.files.length
        updateFolderSize(folder)
      }
    } else {
      files.value = files.value.filter(f => f.id !== fileId)
    }
  }

  const deleteFolder = (folderId: string) => {
    folders.value = folders.value.filter(f => f.id !== folderId)
  }

  const moveFile = (fileId: string, targetFolderId: string, sourceFolderId?: string) => {
    let fileToMove: FileItem | undefined

    if (sourceFolderId) {
      const sourceFolder = folders.value.find(f => f.id === sourceFolderId)
      if (sourceFolder) {
        fileToMove = sourceFolder.files.find(f => f.id === fileId)
        sourceFolder.files = sourceFolder.files.filter(f => f.id !== fileId)
        sourceFolder.itemCount = sourceFolder.files.length
        updateFolderSize(sourceFolder)
      }
    } else {
      fileToMove = files.value.find(f => f.id === fileId)
      files.value = files.value.filter(f => f.id !== fileId)
    }

    if (fileToMove) {
      const targetFolder = folders.value.find(f => f.id === targetFolderId)
      if (targetFolder) {
        targetFolder.files.push(fileToMove)
        targetFolder.itemCount = targetFolder.files.length
        updateFolderSize(targetFolder)
      }
    }
  }

  const updateFolderSize = (folder: Folder) => {
    const totalSize = folder.files.reduce((acc, file) => acc + file.size, 0)
    folder.size = formatFileSize(totalSize)
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const createFilePreview = (file: File): Promise<string> => {
    return new Promise((resolve) => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader()
        reader.onload = (e) => resolve(e.target?.result as string)
        reader.readAsDataURL(file)
      } else {
        resolve('')
      }
    })
  }

  return {
    files: filteredFiles,
    folders: filteredFolders,
    searchQuery,
    addFile,
    deleteFile,
    deleteFolder,
    moveFile,
    createFolder,
    getFileIcon,
    formatFileSize
  }
}