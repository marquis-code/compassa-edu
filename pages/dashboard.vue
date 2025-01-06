<template>
  <div class="min-h-screen bg-[#1C1C1C] text-white">
    <!-- Mobile Header -->
    <div class="lg:hidden flex items-center justify-between p-4 bg-[#242424]">
      <button @click="isSidebarOpen = true" class="text-white">
        <svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
      </button>
      <div class="flex items-center gap-2">
        <img src="@/assets/img/logo.jpeg" alt="User" class="w-8 h-8 rounded-full">
        <span class="text-sm">Nickolas Gibbons</span>
      </div>
    </div>

    <div class="flex relative">
      <!-- Sidebar -->
      <aside 
        :class="[
          'lg:w-64 w-64 h-screen fixed lg:static bg-[#242424] p-4 z-50 transition-transform duration-300',
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        ]"
      >
        <!-- Close button for mobile -->
        <button 
          @click="isSidebarOpen = false"
          class="lg:hidden absolute right-4 top-4 text-gray-400 hover:text-white"
        >
        <svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>

        <div class="flex items-center gap-3 mb-8">
          <div class="w-10 h-10 bg-gradient-to-br from-pink-500 to-blue-500 rounded-xl"></div>
          <div>
            <h2 class="font-medium">Untitled UI Team</h2>
            <p class="text-sm text-gray-400">hello@untitledui.com</p>
          </div>
        </div>

        <!-- Navigation items remain the same -->
      
          <nav class="space-y-2">
            <RouterLink 
              v-for="item in navigationItems" 
              :key="item.name"
              :to="item.path"
              class="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-[#2C2C2C] transition-colors"
              :class="{'bg-[#2C2C2C]': item.name === 'Folders'}"
            >
              <component :is="item.icon" class="w-5 h-5" />
              <span>{{ item.name }}</span>
              <span v-if="item.count" class="ml-auto bg-[#3C3C3C] px-2 py-0.5 rounded-md text-sm">
                {{ item.count }}
              </span>
            </RouterLink>
          </nav>
      </aside>

      <!-- Overlay for mobile sidebar -->
      <div 
        v-if="isSidebarOpen" 
        class="fixed inset-0 bg-black/50 z-40 lg:hidden"
        @click="isSidebarOpen = false"
      ></div>

      <!-- Main Content -->
      <main class="flex-1 p-4 lg:p-8 w-full">
        <div class="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-4">
          <h1 class="text-2xl font-semibold">Welcome back</h1>
          <label for="Toggle1" class="inline-flex items-center space-x-4 cursor-pointer dark:text-gray-800">
            <span>Group study</span>
            <span class="relative">
              <input id="Toggle1" type="checkbox" class="hidden peer">
              <div class="w-10 h-6 rounded-full shadow-inner dark:bg-gray-600 peer-checked:dark:bg-violet-600"></div>
              <div class="absolute inset-y-0 left-0 w-4 h-4 m-1 rounded-full shadow peer-checked:right-0 peer-checked:left-auto dark:bg-gray-100"></div>
            </span>
            <span>Library</span>
          </label>
          <div class="flex flex-col lg:flex-row items-start lg:items-center gap-4 w-full lg:w-auto">
            <div class="relative w-full lg:w-64">
              <input 
              v-model="searchQuery"
              type="text" 
              placeholder="Search files and folders" 
              class="w-full bg-[#2C2C2C] rounded-lg px-4 py-2 pl-10"
              >
              <MagnifyingGlassIcon class="w-5 h-5 absolute left-3 top-2.5 text-gray-400" />
            </div>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <button 
            v-for="action in actionButtons" 
            :key="action.name"
            @click="openModal(action.type)"
            class="flex items-center gap-3 p-4 bg-[#242424] rounded-xl hover:bg-[#2C2C2C] transition-colors"
          >
            <component :is="action.icon" class="w-6 h-6" />
            <span>{{ action.name }}</span>
          </button>
        </div>

        <!-- Files Preview Section -->
        <div v-if="uploadedFiles.length > 0" class="mb-8">
          <h2 class="text-xl font-medium mb-4">Recent Uploads</h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div 
              v-for="file in uploadedFiles" 
              :key="file.id"
              class="bg-[#242424] rounded-xl p-4"
            >
              <div class="aspect-video mb-4 rounded-lg overflow-hidden">
                <!-- Preview based on file type -->
                <img 
                  v-if="file.type.startsWith('image/')"
                  :src="file.url"
                  :alt="file.name"
                  class="w-full h-full object-cover"
                >
                <div 
                  v-else
                  class="w-full h-full bg-[#2C2C2C] flex items-center justify-center"
                >
                  <DocumentIcon class="w-12 h-12 text-gray-400" />
                </div>
              </div>
              <h3 class="font-medium truncate">{{ file.name }}</h3>
              <p class="text-sm text-gray-400">{{ formatFileSize(file.size) }}</p>
            </div>
          </div>
        </div>

        <!-- Folders Section -->
        <div>
          <h2 class="text-xl font-medium mb-4">All folders</h2>
          <div class="overflow-x-auto">
            <div class="flex gap-4 mb-6 whitespace-nowrap">
              <button 
                v-for="tab in tabs" 
                :key="tab"
                :class="[
                  'px-4 py-2 rounded-lg',
                  tab === activeTab ? 'bg-[#242424]' : 'text-gray-400'
                ]"
                @click="activeTab = tab"
              >
                {{ tab }}
              </button>
            </div>
          </div>

          <!-- Folder Grid -->
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <FolderCard 
              v-for="folder in folders" 
              :key="folder.id"
              :folder="folder"
            />
          </div>
        </div>
      </main>
    </div>

    <!-- Modal remains mostly the same but with updated file handling -->
    <TransitionRoot appear :show="isModalOpen" as="template">
      <Dialog as="div" @close="closeModal" class="relative z-50">
        <!-- ... previous modal backdrop code ... -->

        <div class="fixed inset-0 overflow-y-auto">
          <div class="flex min-h-full items-center justify-center p-4">
            <TransitionChild
              enter="duration-300 ease-out"
              enter-from="opacity-0 scale-95"
              enter-to="opacity-100 scale-100"
              leave="duration-200 ease-in"
              leave-from="opacity-100 scale-100"
              leave-to="opacity-0 scale-95"
            >
              <DialogPanel class="w-full max-w-md w-full bg-[#242424] p-6 rounded-xl">
                <DialogTitle class="text-lg font-medium mb-4">
                  {{ modalType === 'document' ? 'New document' : 'New project' }}
                </DialogTitle>
                
                <form @submit.prevent="handleSubmit" class="space-y-4">
                  <div>
                    <label class="block text-sm mb-1">Name</label>
                    <input 
                      v-model="formData.name"
                      type="text" 
                      class="w-full bg-[#2C2C2C] rounded-lg px-4 py-2"
                      required
                    >
                  </div>
                  
                  <div>
                    <label class="block text-sm mb-1">Description</label>
                    <textarea 
                      v-model="formData.description"
                      class="w-full bg-[#2C2C2C] rounded-lg px-4 py-2 h-24"
                    ></textarea>
                  </div>

                  <div>
                    <label class="block text-sm mb-1">File</label>
                    <div 
                      @dragover.prevent="dragover = true"
                      @dragleave.prevent="dragover = false"
                      @drop.prevent="handleFileDrop"
                      :class="[
                        'border-2 border-dashed rounded-lg p-8 text-center transition-colors',
                        dragover ? 'border-blue-500 bg-blue-500/10' : 'border-gray-600',
                        formData.file ? 'bg-green-500/10 border-green-500' : ''
                      ]"
                      @click="$refs.fileInput.click()"
                    >
                      <div v-if="formData.file">
                        <p class="text-green-400">{{ formData.file.name }}</p>
                        <p class="text-sm text-gray-400">
                          {{ formatFileSize(formData.file.size) }}
                        </p>
                      </div>
                      <p v-else class="text-gray-400">
                        Drag and drop your file here, or click to select
                      </p>
                      <input 
                        type="file"
                        ref="fileInput"
                        class="hidden"
                        @change="handleFileSelect"
                        required
                      >
                    </div>
                  </div>

                  <div class="flex justify-end gap-3">
                    <button 
                      type="button"
                      @click="closeModal"
                      class="px-4 py-2 rounded-lg hover:bg-[#2C2C2C]"
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit"
                      class="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700"
                    >
                      Create
                    </button>
                  </div>
                </form>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
  </div>
</template>
  
  <script setup lang="ts">
  import { ref } from 'vue'
  import { Dialog, DialogPanel, DialogTitle, TransitionRoot, TransitionChild } from '@headlessui/vue'
  import { 
  HomeIcon, 
  FolderIcon, 
  UsersIcon, 
  Cog6ToothIcon as CogIcon,
  PlusIcon,
  DocumentIcon,
  UserGroupIcon,
  BuildingOfficeIcon as BuildingIcon,
  MagnifyingGlassIcon
} from '@heroicons/vue/24/outline'

  
  interface NavigationItem {
    name: string
    path: string
    icon: any
    count?: number
  }
  
  interface ActionButton {
    name: string
    type: 'document' | 'project' | 'team' | 'organization'
    icon: any
  }
  

// Interfaces
interface UploadedFile {
  id: string
  name: string
  size: number
  type: string
  url: string
}


  interface Folder {
    id: string
    name: string
    type: string
    itemCount: number
    size: string
    thumbnail: string
    collaborators: { avatar: string }[]
  }

  // State
const isSidebarOpen = ref(false)
const dragover = ref(false)
const uploadedFiles = ref<UploadedFile[]>([])
  
  // const navigationItems: NavigationItem[] = [
  //   { name: 'Home', path: '/', icon: HomeIcon },
  //   { name: 'My projects', path: '/projects', icon: DocumentIcon },
  //   { name: 'Folders', path: '/folders', icon: FolderIcon },
  //   { name: 'Team members', path: '/team', icon: UsersIcon },
  //   { name: 'Settings', path: '/settings', icon: CogIcon },
  // ]
  
  const actionButtons: ActionButton[] = [
    { name: 'New document', type: 'document', icon: DocumentIcon },
    { name: 'New project', type: 'project', icon: FolderIcon },
    { name: 'New team', type: 'team', icon: UserGroupIcon },
    { name: 'New organization', type: 'organization', icon: BuildingIcon },
  ]
  
  const tabs = ['Recent', 'Favorites', 'Shared', 'External', 'Archived']
  const activeTab = ref('Recent')
  
  const isModalOpen = ref(false)
  const modalType = ref<'document' | 'project'>('document')
  const formData = ref({
    name: '',
    description: '',
    file: null as File | null,
  })
  
  const openModal = (type: 'document' | 'project') => {
    modalType.value = type
    isModalOpen.value = true
  }
  
  // File handling functions
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

const handleFileDrop = async (event: DragEvent) => {
  dragover.value = false
  const file = event.dataTransfer?.files[0]
  if (file) {
    formData.value.file = file
  }
}

const handleFileSelect = async (event: Event) => {
  const input = event.target as HTMLInputElement
  if (input.files?.length) {
    formData.value.file = input.files[0]
  }
}

const handleSubmit = async () => {
  if (!formData.value.file) return

  const fileUrl = await createFilePreview(formData.value.file)
  
  // Add the file to uploadedFiles
  uploadedFiles.value.unshift({
    id: Date.now().toString(),
    name: formData.value.name || formData.value.file.name,
    size: formData.value.file.size,
    type: formData.value.file.type,
    url: fileUrl
  })

  closeModal()
}

  const closeModal = () => {
    isModalOpen.value = false
    formData.value = {
      name: '',
      description: '',
      file: null,
    }
  }


  interface NavigationItem {
    name: string
    path: string
    icon: any
    count?: number
  }
  
  const navigationItems = ref([
    { name: 'Home', path: '/', icon: HomeIcon },
    { name: 'My projects', path: '/', icon: DocumentIcon },
    { name: 'Folders', path: '/', icon: FolderIcon },
    { name: 'Team members', path: '/', icon: UsersIcon },
    { name: 'Settings', path: '/', icon: CogIcon },
  ])
  </script>
