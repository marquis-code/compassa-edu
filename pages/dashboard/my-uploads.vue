<template>
    <main>
        <main class="flex-1 lg:-mt-5">
            <div class="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-4">
                <div class="flex justify-between items-center w-full">
                    <h1 class="text-2xl font-semibold">Welcome back {{ user?.name ?? '' }}</h1>
                    <button type="button" @click="showDrawer = true"
                        class="text-white lg:hidden border border-white"><svg xmlns="http://www.w3.org/2000/svg"
                            width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2"
                            stroke-linecap="round" stroke-linejoin="round">
                            <line x1="4" y1="21" x2="4" y2="14"></line>
                            <line x1="4" y1="10" x2="4" y2="3"></line>
                            <line x1="12" y1="21" x2="12" y2="12"></line>
                            <line x1="12" y1="8" x2="12" y2="3"></line>
                            <line x1="20" y1="21" x2="20" y2="16"></line>
                            <line x1="20" y1="12" x2="20" y2="3"></line>
                            <line x1="1" y1="14" x2="7" y2="14"></line>
                            <line x1="9" y1="8" x2="15" y2="8"></line>
                            <line x1="17" y1="16" x2="23" y2="16"></line>
                        </svg></button>
                </div>
                <div class="flex flex-col lg:flex-row items-start lg:items-center gap-4 w-full lg:w-auto -mt-1">
                    <!-- Search and Filter Toggle -->
                    <div class="flex flex-col w-full space-y-4">
                    <!-- Top Bar with Search and Filter Button -->
                    <div class="flex items-center gap-4">
                        <!-- Search Bar -->
                        <div class="relative flex-1">
                        <input 
                            v-model="filters.search"
                            type="text" 
                            placeholder="Search files and folders" 
                            class="w-full bg-white border-[0.5px] w-[400px] outline-none border-gray-200 rounded-lg px-4 py-3.5 text-sm pl-10"
                        >
                        <MagnifyingGlassIcon class="w-5 h-5 absolute left-3 top-4 text-gray-400" />
                        </div>
                        
                        <!-- Filter Toggle Button -->
                        <button 
                        @click="toggleFilters"
                        class="flex items-center gap-2 px-4 py-3.5 text-sm font-medium bg-white border-[0.5px] border-gray-200 rounded-lg hover:bg-gray-50"
                        >
                        <FunnelIcon class="w-5 h-5" />
                        <span class="hidden sm:inline">Filters</span>
                        <span v-if="activeFilterCount > 0" 
                                class="ml-1 px-2 py-0.5 text-xs bg-blue-100 text-blue-600 rounded-full">
                            {{ activeFilterCount }}
                        </span>
                        </button>
                    </div>

                    <!-- Expandable Filter Panel -->
                    <transition
                        enter-active-class="transition ease-out duration-200"
                        enter-from-class="opacity-0 -translate-y-1"
                        enter-to-class="opacity-100 translate-y-0"
                        leave-active-class="transition ease-in duration-150"
                        leave-from-class="opacity-100 translate-y-0"
                        leave-to-class="opacity-0 -translate-y-1"
                    >
                        <div v-if="isFilterVisible" class="bg-white border-[0.5px] border-gray-200 rounded-lg p-4">
                        <div class="flex items-center justify-between mb-4">
                            <h3 class="text-sm font-medium">Filter Materials</h3>
                            <div class="flex items-center gap-3">
                            <button 
                                @click="resetFilters"
                                class="text-sm text-gray-500 hover:text-gray-700"
                            >
                                Reset all
                            </button>
                            <button 
                                @click="toggleFilters"
                                class="text-gray-400 hover:text-gray-500"
                            >
                                <XMarkIcon class="w-5 h-5" />
                            </button>
                            </div>
                        </div>

                        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            <!-- Session Filter -->
                            <div class="space-y-2">
                            <label class="text-sm font-medium text-gray-700">Session</label>
                            <select 
                                v-model="filters.session"
                                class="w-full bg-white border-[0.5px] outline-none border-gray-200 rounded-lg px-3 py-2 text-sm"
                            >
                                <option value="">All Sessions</option>
                                <option v-for="session in sessions.data" 
                                        :key="session._id" 
                                        :value="session._id">
                                {{ session.name }}
                                </option>
                            </select>
                            </div>

                            <!-- Semester Filter -->
                            <div class="space-y-2">
                            <label class="text-sm font-medium text-gray-700">Semester</label>
                            <select 
                                v-model="filters.semester"
                                class="w-full bg-white border-[0.5px] outline-none border-gray-200 rounded-lg px-3 py-2 text-sm"
                            >
                                <option value="">All Semesters</option>
                                <option v-for="semester in semesterArray" 
                                        :key="semester.key" 
                                        :value="semester.key">
                                {{ semester.label }}
                                </option>
                            </select>
                            </div>

                            <!-- Category Filter -->
                            <div class="space-y-2">
                            <label class="text-sm font-medium text-gray-700">Category</label>
                            <select 
                                v-model="filters.category"
                                class="w-full bg-white border-[0.5px] outline-none border-gray-200 rounded-lg px-3 py-2 text-sm"
                            >
                                <option value="">All Categories</option>
                                <option v-for="category in categories?.data" 
                                        :key="category._id" 
                                        :value="category._id">
                                {{ category.name }}
                                </option>
                            </select>
                            </div>
                        </div>
                        </div>
                    </transition>

                    <!-- Active Filters Display -->
                    <div v-if="activeFilterCount > 0" class="flex flex-wrap gap-2">
                        <div v-for="(value, key) in filters" 
                            v-if="value"
                            :key="key"
                            class="inline-flex items-center gap-1 px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-full"
                        >
                        <span class="capitalize">{{ key }}: {{ value }}</span>
                        <button 
                            @click="filters[key] = ''"
                            class="p-0.5 hover:text-gray-900"
                        >
                            <XMarkIcon class="w-3 h-3" />
                        </button>
                        </div>
                    </div>
                    </div>
                    <!-- <div class="flex flex-col lg:flex-row items-start lg:items-center gap-4 w-full lg:w-auto">

                        <div class="relative w-full lg:w-64">
                            <input v-model="searchQuery" type="text" placeholder="Search files and folders"
                                class="w-full bg-white border-[0.5px] outline-none border-gray-200 rounded-lg px-4 py-3.5 text-sm pl-10">
                            <MagnifyingGlassIcon class="w-5 h-5 absolute left-3 top-4 text-gray-400" />
                        </div>

        
                        <div class="relative w-full lg:w-48">
                            <select v-model="selectedSession"
                                class="w-full bg-white border-[0.5px] outline-none border-gray-200 rounded-lg px-4 py-3.5 text-sm appearance-none">
                                <option value="">All Sessions</option>
                                <option v-for="session in sessions.data" :key="session._id" :value="session._id">
                                    {{ session.name }}
                                </option>
                            </select>
                        </div>

                   
                        <div class="relative w-full lg:w-48">
                            <select v-model="selectedSemester"
                                class="w-full bg-white border-[0.5px] outline-none border-gray-200 rounded-lg px-4 py-3.5 text-sm appearance-none">
                                <option value="">All Semesters</option>
                                <option v-for="semester in semesterArray" :key="semester.key" :value="semester.key">
                                    {{ semester.label }}
                                </option>
                            </select>
                        </div>

                
                        <div class="relative w-full lg:w-48">
                            <select v-model="selectedCategory"
                                class="w-full bg-white border-[0.5px] outline-none border-gray-200 rounded-lg px-4 py-3.5 text-sm appearance-none">
                                <option value="">All Categories</option>
                                <option v-for="category in categories?.data" :key="category._id" :value="category._id">
                                    {{ category.name }}
                                </option>
                            </select>
                        </div>


                        <button @click="resetFilters"
                            class="px-4 py-2 text-sm text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200">
                            Reset Filters
                        </button>
                    </div> -->
                    <!-- <div class="relative w-full lg:w-64">
                <input 
                v-model="searchQuery"
                type="text" 
                placeholder="Search files and folders" 
                class="w-full bg-white border-[0.5px] outline-none border-gray-200 rounded-lg px-4 py-3.5 text-sm pl-10"
                >
                <MagnifyingGlassIcon class="w-5 h-5 absolute left-3 top-4 text-gray-400" />
              </div> -->
                    <button class="flex items-center gap-x-2 text-sm bg-black text-white px-3 rounded-lg py-2"
                        @click="openModal('document')">
                        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none"
                            stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M3 15v4c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2v-4M17 8l-5-5-5 5M12 4.2v10.3" />
                        </svg> Upload
                    </button>
                    <button type="button" @click="showDrawer = true"
                        class="text-white hidden lg:block border border-white"><svg xmlns="http://www.w3.org/2000/svg"
                            width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2"
                            stroke-linecap="round" stroke-linejoin="round">
                            <line x1="4" y1="21" x2="4" y2="14"></line>
                            <line x1="4" y1="10" x2="4" y2="3"></line>
                            <line x1="12" y1="21" x2="12" y2="12"></line>
                            <line x1="12" y1="8" x2="12" y2="3"></line>
                            <line x1="20" y1="21" x2="20" y2="16"></line>
                            <line x1="20" y1="12" x2="20" y2="3"></line>
                            <line x1="1" y1="14" x2="7" y2="14"></line>
                            <line x1="9" y1="8" x2="15" y2="8"></line>
                            <line x1="17" y1="16" x2="23" y2="16"></line>
                        </svg></button>
                </div>
            </div>
            <!-- Files Preview Section -->
            <div v-if="materials?.length > 0" class="mb-8">
                <h2 class="text-xl font-medium mb-4">Recent Uploads</h2>
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <!-- {{allMaterialsList}} -->
                    <div v-for="file in filteredMaterials" :key="file.id"
                        class="bg-white border-[0.5px] border-gray-100 rounded-xl">
                        <!-- {{ file }} -->
                        <div class="aspect-video mb-4 rounded-lg overflow-hidden">
                            <!-- <img src="@/assets/icons/pdf-file.svg" /> -->
                            <!--  -->
                            <div v-if="file?.fileUrl">
                                <img v-if="getFileExtension(file?.fileUrl) === 'pdf'" src="@/assets/icons/pdf-file.svg"
                                    class="object-cover" />
                                <img v-else :src="file.fileUrl" :alt="file.name" class="w-full h-full object-cover">
                            </div>

                            <div v-if="file?.fileUrls.length" v-for="item in file?.fileUrls">
                                <img v-if="getFileExtension(item) === 'pdf'" src="@/assets/icons/pdf-file.svg"
                                    class="object-cover" />
                                <img v-else :src="item" alt="Image File" class="w-full h-full object-cover">
                            </div>
                        </div>
                        <div class="px-4 py-3">
                            <div class="w-full flex justify-between items-center">
                                <span class="text-xs border rounded-full px-3 py-1.5">{{ file?.status ?? 'Nil' }}</span>
                                <span class="text-sm text-gray-400 font-bold">{{ `${file?.academicLevel} Level` ?? 'Nil'
                                    }}</span>
                            </div>
                            <div class="pt-5 space-y-1.5">
                                <h3 class="font-medium truncate text-sm">{{ file.name }}</h3>
                                <p class="text-xs">{{ file?.description ?? 'Nil' }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Folders Section -->
            <div>

                <!-- Folder Grid -->
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <FolderCard v-for="folder in folders" :key="folder.id" :folder="folder" />
                </div>
            </div>
        </main>

        <!-- Modal remains mostly the same but with updated file handling -->
        <TransitionRoot appear :show="isModalOpen" as="template">
            <Dialog as="div" @close="closeModal" class="relative z-50">
                <TransitionChild enter="duration-300 ease-out" enter-from="opacity-0" enter-to="opacity-100"
                    leave="duration-200 ease-in" leave-from="opacity-100" leave-to="opacity-0">
                    <div class="fixed inset-0 bg-black/90" />
                </TransitionChild>

                <div class="fixed inset-0 overflow-y-auto">
                    <div class="flex min-h-full items-center justify-center p-4 sm:p-6">
                        <TransitionChild enter="duration-300 ease-out" enter-from="opacity-0 scale-95"
                            enter-to="opacity-100 scale-100" leave="duration-200 ease-in"
                            leave-from="opacity-100 scale-100" leave-to="opacity-0 scale-95">
                            <DialogPanel
                                class="bg-white border-[0.5px] outline-none border-gray-200 w-[350px] sm:w-[85%] md:w-[75%] lg:w-[650px] transform rounded-xl p-4 sm:p-6 md:p-8 transition-all mx-auto">
                                <DialogTitle class="text-xl font-medium mb-6 flex items-center justify-between">
                                    <div class="flex items-center gap-2">
                                        <span>{{ modalType === 'document' ? 'New document' : 'New project' }}</span>
                                        <span class="text-sm text-gray-500 ml-4">Step {{ currentStep }}/3</span>
                                    </div>
                                    <button @click="closeModal" class="text-gray-400 hover:text-gray-500">
                                        <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </DialogTitle>

                                <form @submit.prevent="handleStepSubmit" class="space-y-6">
                                    <!-- Step 1: Basic Information -->
                                    <div v-if="currentStep === 1">
                                        <div class="space-y-6">
                                            <div>
                                                <label class="block text-sm font-medium mb-2">Name</label>
                                                <input v-model="payload.name" type="text"
                                                    class="w-full bg-gray-100 border border-gray-200 outline-none rounded-lg px-4 py-4 text-base"
                                                    required>
                                            </div>

                                            <div>
                                                <label class="block text-sm font-medium mb-2">Description</label>
                                                <textarea v-model="payload.description"
                                                    class="w-full bg-gray-100 border border-gray-200 h-32 resize-none outline-none rounded-lg px-4 py-4 text-base"></textarea>
                                            </div>

                                            <div>
                                                <label class="block text-sm font-medium mb-2">Session</label>
                                                <!-- {{sessions}} -->
                                                <select v-model="payload.session"
                                                    class="w-full text-base bg-gray-100 border border-gray-200 outline-none rounded-lg px-4 py-4"
                                                    required>
                                                    <option value="">Select session</option>
                                                    <option v-for="item in sessions.data" :key="item.key"
                                                        :value="item._id">
                                                        {{ item.name }}
                                                    </option>
                                                </select>
                                            </div>

                                            <div>
                                                <label class="block text-sm font-medium mb-2">Category</label>
                                                <select v-model="payload.category"
                                                    class="w-full text-base bg-gray-100 border border-gray-200 outline-none rounded-lg px-4 py-4"
                                                    required>
                                                    <option value="">Select category</option>
                                                    <option v-for="item in categories?.data" :key="item.key"
                                                        :value="item._id">
                                                        {{ item.name }}
                                                    </option>
                                                </select>
                                            </div>


                                        </div>
                                    </div>

                                    <!-- Step 2: Academic Details -->
                                    <div v-if="currentStep === 2">
                                        <div class="space-y-6">
                                            <div>
                                                <label class="block text-sm font-medium mb-2">Academic Level</label>
                                                <select v-model="payload.academicLevel"
                                                    class="w-full text-base bg-gray-100 border border-gray-200 outline-none rounded-lg px-4 py-4"
                                                    required>
                                                    <option value="">Select academic level</option>
                                                    <option v-for="item in academicLevelArray" :key="item.key"
                                                        :value="item.key">
                                                        {{ item.label }}
                                                    </option>
                                                </select>
                                            </div>

                                            <div>
                                                <label class="block text-sm font-medium mb-2">Academic Semester</label>
                                                <select v-model="payload.semester"
                                                    class="w-full text-base bg-gray-100 border border-gray-200 outline-none rounded-lg px-4 py-4"
                                                    required>
                                                    <option value="">Select semester</option>
                                                    <option v-for="item in semesterArray" :key="item.key"
                                                        :value="item.key">
                                                        {{ item.label }}
                                                    </option>
                                                </select>
                                            </div>

                                            <div>
                                                <label class="block text-sm font-medium mb-2">Material Type</label>
                                                <select v-model="payload.materialType"
                                                    class="w-full text-base bg-gray-100 border border-gray-200 outline-none rounded-lg px-4 py-4"
                                                    required>
                                                    <option value="">Select material type</option>
                                                    <option v-for="item in materialTypeArray" :key="item.key"
                                                        :value="item.key">
                                                        {{ item.label }}
                                                    </option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                    <div v-if="currentStep === 3">
                                        <div>
                                            <label class="block text-sm font-medium mb-2">File</label>
                                            <div @dragover.prevent="dragover = true"
                                                @dragleave.prevent="dragover = false" @drop.prevent="handleFileDrop"
                                                :class="[
                                                    'border-2 border-dashed rounded-lg text-center transition-colors min-h-[250px] flex items-center justify-center',
                                                    dragover ? 'border-blue-500 bg-blue-500/10' : 'border-gray-300',
                                                    formData.file ? 'bg-green-500/10 border-green-500' : ''
                                                ]" @click="$refs.fileInput.click()">
                                                <!-- {{payload?.fileUrls}} -->
                                                <div v-if="payload?.fileUrls.length > 0"
                                                    class="max-w-xl grid grid-cols-2">
                                                    <!-- Map through the uploaded files -->
                                                    <div v-for="(file, index) in payload?.fileUrls" :key="index"
                                                        class="w-full mb-4">
                                                        <img v-if="!['pdf', 'docx'].includes(getFileExtension(file))"
                                                            class="w-full max-w-32 object-cover rounded-lg"
                                                            :src="file" />
                                                        <img v-else src="@/assets/icons/pdf-file.svg"
                                                            class="w-full h-[250px] object-contain p-8" />
                                                    </div>
                                                </div>
                                                <div v-else
                                                    class="text-gray-400 flex flex-col items-center justify-center p-8">
                                                    <img src="@/assets/icons/file-upload.svg" class="h-16 w-16 mb-4" />
                                                    <p class="text-base max-w-sm text-center">
                                                        Drag and drop your file here, or click to select
                                                    </p>
                                                </div>
                                                <input type="file" ref="fileInput" multiple class="hidden"
                                                    @change="handleFileUpload" required>
                                            </div>
                                            <!-- Loading spinner -->
                                            <div v-if="uploadingFile" class="flex items-center justify-center mt-4">
                                                <div class="loader"></div>
                                                <!-- Add spinner styles to the 'loader' class -->
                                                <p class="ml-2 text-gray-500">Uploading files...</p>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Navigation Buttons -->
                                    <div class="flex justify-between items-center w-full gap-4 pt-6">
                                        <button type="button" v-if="currentStep > 1" @click="currentStep--"
                                            class="px-6 py-4 border border-gray-200 text-base w-full rounded-lg hover:bg-gray-50 font-medium">
                                            Previous
                                        </button>
                                        <button type="button" v-if="currentStep === 1" @click="closeModal"
                                            class="px-6 py-4 border border-gray-200 text-base w-full rounded-lg hover:bg-gray-50 font-medium">
                                            Cancel
                                        </button>
                                        <button type="submit" :disabled="uploading"
                                            class="px-6 w-full py-4 text-white text-base disabled:cursor-not-allowed disabled:opacity-25 bg-blue-600 rounded-lg hover:bg-blue-700 font-medium">
                                            <span>{{ uploading ? 'uploading..' : '' }}</span>
                                            {{ currentStep === 3 ? 'Create' : 'Next' }}
                                        </button>
                                    </div>
                                </form>
                            </DialogPanel>
                        </TransitionChild>
                    </div>
                </div>
            </Dialog>
        </TransitionRoot>
        <CoreDrawer @close="showDrawer = false" :show="showDrawer">
            <template #content>
                <MaterialFilter />
            </template>
        </CoreDrawer>
        <!-- <div 
      v-if="uploadingFile" 
      class="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
    >
      <div class="bg-white border-[0.5px] outline-none border-gray-200 p-6 rounded-lg shadow-xl flex flex-col items-center gap-4">
        <div class="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
        <p class="text-sm">Please wait while we upload your file...</p>
      </div>
    </div> -->
        <CoreFullScreenLoader :visible="uploadingFile" class="z-50" text="Please wait while we upload your file..." />
        <CoreFullScreenLoader :visible="uploading" class="z-50" text="Please wait while we save your file..." />
        <CoreFullScreenLoader :visible="loading" class="z-50" text="Please wait while we fetch your materials..." />
    </main>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useUploadFile } from '@/composables/core/useFileUpload'
import { useGetAllMaterials } from '@/composables/modules/materials/useGetAllMaterials'
import { useUploadMaterial } from '@/composables/modules/materials/useUploadMaterial'
import { useUser } from '@/composables/auth/user'
import { useGetSessions } from '@/composables/modules/session/useFetchSessions'
import { useGetCategories } from '@/composables/modules/category/useFetchCategories'
import { useGetUserMaterials } from '@/composables/modules/materials/useGetUserMaterials'
import { useFileExtension } from '@/composables/core/useFileExtension';

const { getFileExtension } = useFileExtension();
const { user } = useUser()
const { materials, loading, } = useGetUserMaterials()
const { uploadMaterial, uploading, payload, setPayload } = useUploadMaterial()
const { uploadFile, loading: uploadingFile, uploadResponse } = useUploadFile()
const { materials: allMaterialsList, loading: loadingAllMaterials, queryParams, getAllMaterials } = useGetAllMaterials()
const { sessions, loading: fetchingSessions } = useGetSessions()
const { categories, loading: fetchingCategories } = useGetCategories()
import { Dialog, DialogPanel, DialogTitle, TransitionRoot, TransitionChild } from '@headlessui/vue'
import { 
  AdjustmentsHorizontalIcon,
  XMarkIcon,
  FunnelIcon
} from '@heroicons/vue/24/outline'
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

const searchQuery = ref('')
const selectedSession = ref('')
const selectedSemester = ref('')
const selectedCategory = ref('')

// Add computed property for filtered materials
// const filteredMaterials = computed(() => {
//   if (!materials.value || !searchQuery.value) {
//     return materials.value
//   }

//   const query = searchQuery.value.toLowerCase().trim()

//   return materials.value.filter(material => {
//     const matchName = material.name?.toLowerCase().includes(query)
//     const matchDescription = material.description?.toLowerCase().includes(query)
//     return matchName || matchDescription
//   })
// })

// Enhanced computed property for filtered materials
// const filteredMaterials = computed(() => {
//     if (!materials.value) return []

//     return materials.value.filter(material => {
//         // Text search filter
//         const query = searchQuery.value.toLowerCase().trim()
//         const matchesSearch = !query ||
//             material.name?.toLowerCase().includes(query) ||
//             material.description?.toLowerCase().includes(query)

//         // Dropdown filters
//         const matchesSession = !selectedSession.value ||
//             material.session === selectedSession.value

//         const matchesSemester = !selectedSemester.value ||
//             material.semester === selectedSemester.value

//         const matchesCategory = !selectedCategory.value ||
//             material.category === selectedCategory.value

//         // Combined filter result
//         return matchesSearch && matchesSession && matchesSemester && matchesCategory
//     })
// })

// // Reset filters function
// const resetFilters = () => {
//     searchQuery.value = ''
//     selectedSession.value = ''
//     selectedSemester.value = ''
//     selectedCategory.value = ''
// }

// Filter visibility state
// const isFilterVisible = ref(false)
// const activeFilters = ref(0)

// Filter state
// const filters = ref({
//   search: '',
//   session: '',
//   semester: '',
//   category: ''
// })

// Computed property for active filters count
const activeFilterCount = computed(() => {
  return Object.values(filters.value).filter(value => value !== '').length
})

// Enhanced computed property for filtered materials
const filteredMaterials = computed(() => {
  if (!materials.value) return []

  return materials.value.filter(material => {
    // Text search filter
    const query = filters.value.search.toLowerCase().trim()
    const matchesSearch = !query || 
      material.name?.toLowerCase().includes(query) || 
      material.description?.toLowerCase().includes(query)

    // Dropdown filters
    const matchesSession = !filters.value.session || 
      material.session === filters.value.session
    
    const matchesSemester = !filters.value.semester || 
      material.semester === filters.value.semester
    
    const matchesCategory = !filters.value.category || 
      material.category === filters.value.category

    return matchesSearch && matchesSession && matchesSemester && matchesCategory
  })
})

// Reset filters function
const resetFilters = () => {
  filters.value = {
    search: '',
    session: '',
    semester: '',
    category: ''
  }
  isFilterVisible.value = false
}

// Toggle filters visibility
// const toggleFilters = () => {
//   isFilterVisible.value = !isFilterVisible.value
// }

const showDrawer = ref(false)

definePageMeta({
    layout: 'user'
})




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

const actionButtons: ActionButton[] = [
    { name: 'New document', type: 'document', icon: DocumentIcon },
    // { name: 'New project', type: 'project', icon: FolderIcon },
    // { name: 'New team', type: 'team', icon: UserGroupIcon },
    // { name: 'New organization', type: 'organization', icon: BuildingIcon },
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

// Filter visibility state
const isFilterVisible = ref(false)
const activeFilters = ref(0)

// Filter state
const filters = ref({
  search: '',
  session: '',
  semester: '',
  category: ''
})

// Computed property for active filters count
// const activeFilterCount = computed(() => {
//   return Object.values(filters.value).filter(value => value !== '').length
// })

// // Enhanced computed property for filtered materials
// const filteredMaterials = computed(() => {
//   if (!materials.value) return []

//   return materials.value.filter(material => {
//     // Text search filter
//     const query = filters.value.search.toLowerCase().trim()
//     const matchesSearch = !query || 
//       material.name?.toLowerCase().includes(query) || 
//       material.description?.toLowerCase().includes(query)

//     // Dropdown filters
//     const matchesSession = !filters.value.session || 
//       material.session === filters.value.session
    
//     const matchesSemester = !filters.value.semester || 
//       material.semester === filters.value.semester
    
//     const matchesCategory = !filters.value.category || 
//       material.category === filters.value.category

//     return matchesSearch && matchesSession && matchesSemester && matchesCategory
//   })
// })

// // Reset filters function
// const resetFilters = () => {
//   filters.value = {
//     search: '',
//     session: '',
//     semester: '',
//     category: ''
//   }
//   isFilterVisible.value = false
// }

// Toggle filters visibility
const toggleFilters = () => {
  isFilterVisible.value = !isFilterVisible.value
}


async function handleFileUpload(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target && target.files && target.files.length > 0) {
        try {
            const files = Array.from(target.files); // Get all files

            // Process each file and upload individually
            const uploadedUrls = await Promise.all(
                files.map(async (file) => {
                    try {
                        const response = await uploadFile(file); // Call uploadFile for each file
                        console.log(response, 'upload es hee')
                        return response.url; // Extract the URL from the response
                    } catch (error) {
                        console.error(`Error uploading file ${file.name}:`, error);
                        return null; // Handle failed uploads gracefully
                    }
                })
            );

            // Filter out any null values from failed uploads
            const validUrls = uploadedUrls.filter((url) => url !== null);

            if (validUrls.length > 0) {
                payload.value.fileUrls = validUrls; // Set the final array to payload.value.fileUrls
            }
        } catch (error) {
            console.error('Error uploading files:', error);
        }
    } else {
        console.error('No files selected for upload');
    }
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
    { name: 'My Uploads', path: '/dashboard', icon: DocumentIcon },
    { name: 'Alll Uploads', path: '/dashboard', icon: FolderIcon },
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