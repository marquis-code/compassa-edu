<template>
    <div class="min-h-screen bg-[#1C1C1C] text-white">
      <!-- Mobile Header -->
      <div class="lg:hidden flex items-center justify-between p-4 bg-[#242424]">
        <button @click="isSidebarOpen = true" class="text-white">
          <svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
        </button>
        <div class="flex items-center gap-2">
          <img src="@/assets/img/logo.jpeg" alt="User" class="w-8 h-8 rounded-full">
          <span class="text-sm">{{ user?.name ?? 'Nil'}}</span>
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
              <h2 class="font-medium">{{user?.name ?? 'Nil'}}</h2>
              <p class="text-sm text-gray-400">{{user?.email ?? 'Nil'}}</p>
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
        <slot />
      </div>
    </div>
  </template>
    
    <script setup lang="ts">
    import { ref } from 'vue'
    import { useUploadFile } from '@/composables/core/useFileUpload'
    import { useGetAllMaterials } from '@/composables/modules/materials/useGetAllMaterials'
    import { useUploadMaterial } from '@/composables/modules/materials/useUploadMaterial'
    import { useUser } from '@/composables/auth/user'
    import { useGetUserMaterials } from '@/composables/modules/materials/useGetUserMaterials'
    import { useFileExtension } from '@/composables/core/useFileExtension';
  
  const { getFileExtension } = useFileExtension();
    const { user } = useUser()
    const { materials, loading, } = useGetUserMaterials()
    const { uploadMaterial, uploading, payload, setPayload } = useUploadMaterial()
    const { uploadFile, loading: uploadingFile, uploadResponse } = useUploadFile()
    const { materials: allMaterialsList, loading: loadingAllMaterials, queryParams, getAllMaterials } = useGetAllMaterials()
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
  
  const showDrawer  = ref(false)
  
    
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
      const res = await uploadFile(input.files[0])
      console.log(res, 'here ooooooooo')
      payload.value.fileUrl = res.url
    }
    // console
    // payload.value.fileUrl = res.url
  }
  
  const handleSubmit = async () => {
    // if (!formData.value.file) return
  
    // const payload = {
    //   name: "",
    //   description: "",
    //   fileUrl: "",
    //   academicLevel: "",
    //   semester: "",
    //   materialType: "",
    //   fileUrl: uploadResponse?.url
    // }
  
    // const fileUrl = await createFilePreview(formData.value.file)
    
    // // Add the file to uploadedFiles
    // uploadedFiles.value.unshift({
    //   id: Date.now().toString(),
    //   name: formData.value.name || formData.value.file.name,
    //   size: formData.value.file.size,
    //   type: formData.value.file.type,
    //   url: fileUrl
    // })
  
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
      { name: 'Home', path: '/dashboard', icon: HomeIcon },
      { name: 'My Uploads', path: '/dashboard/my-uploads', icon: DocumentIcon },
      { name: 'Alll Uploads', path: '/dashboard/all-uploads', icon: FolderIcon },
      // { name: 'Team members', path: '/', icon: UsersIcon },
      // { name: 'Settings', path: '/', icon: CogIcon },
    ])
  
  
    const semesterArray = ref([
    { label: "First Semester", key: "first" },
    { label: "Second Semester", key: "second" },
  ])
  
  
  const materialTypeArray = ref([
    { label: "Lecture Note", key: "lecture_note" },
    { label: "Textbook", key: "textbook" },
    { label: "Personal notes", key: "personal_note" },
    { label: "Drawings and diagrams", key: "drawings_and_diagrams" },
    { label: "Research Paper", key: "research_paper" },
    { label: "Assignment", key: "assignment" },
    { label: "Project Report", key: "project_report" },
    { label: "Exam Past Question", key: "exam_past_question" },
    { label: "Lab Manual", key: "lab_manual" },
    { label: "Study Guide", key: "study_guide" },
    { label: "Presentation Slides", key: "presentation_slides" },
    { label: "Article", key: "article" },
    { label: "Case Study", key: "case_study" },
    { label: "Thesis", key: "thesis" },
    { label: "Dissertation", key: "dissertation" },
    { label: "Tutorial Video", key: "tutorial_video" },
    { label: "Reference Material", key: "reference_material" },
  ])
  
  const academicLevelArray = ref([
    { label: "100 Level", key: "100" },
    { label: "200 Level", key: "200" },
    { label: "300 Level", key: "300" },
    { label: "400 Level", key: "400" },
    { label: "500 Level", key: "500" },
    { label: "600 Level", key: "600" },
  ]);
  
  const currentStep = ref(1)
  
  const handleStepSubmit = async () => {
    if (currentStep.value < 3) {
      currentStep.value++
    } else {
     await uploadMaterial().finally(() => {
      isModalOpen.value = false
     })
    }
  }
  
  const validateStep = (step: number) => {
    switch (step) {
      case 1:
        return payload.value.name && payload.value.description
      case 2:
        return payload.value.academicLevel && payload.value.semester && payload.value.materialType
      case 3:
        return payload.value.fileUrl
      default:
        return false
    }
  }
    </script>
  