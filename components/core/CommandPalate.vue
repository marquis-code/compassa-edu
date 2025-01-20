documents<template>
    <div v-if="isVisible" class="relative z-50" role="dialog" aria-modal="true">
      <div class="fixed inset-0 bg-black/70 transition-opacity" aria-hidden="true"></div>
  
      <div class="fixed inset-0 z-10 w-screen overflow-y-auto p-4 sm:p-6 md:p-20">
        <div class="mx-auto max-w-3xl transform divide-y divide-gray-100 overflow-hidden rounded-xl bg-white shadow-2xl ring-1 ring-black/5 transition-all">
          <button 
            @click="hideCommandPalette"
            class="absolute top-3 right-3 p-2 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 rounded-full hover:bg-gray-100"
            aria-label="Close search"
          >
            <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
            </svg>
          </button>
  
          <div class="grid grid-cols-1">
            <input
              type="text"
              v-model="query"
              class="col-start-1 row-start-1 h-12 w-full pl-11 pr-4 text-base text-gray-900 outline-none placeholder:text-gray-400 sm:text-sm"
              placeholder="Search materials..."
              role="combobox"
              aria-expanded="false"
              @input="filterMaterials"
            />
            <svg
              class="pointer-events-none col-start-1 row-start-1 ml-4 h-5 w-5 self-center text-gray-400"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                d="M9 3.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11ZM2 9a7 7 0 1 1 12.452 4.391l3.328 3.329a.75.75 0 1 1-1.06 1.06l-3.329-3.328A7 7 0 0 1 2 9Z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
  
          <div class="flex transform-gpu divide-x divide-gray-100">
            <div class="max-h-96 min-w-0 flex-auto scroll-py-4 overflow-y-auto px-6 py-4 sm:h-96">
              <h2 class="mb-4 mt-2 text-xs font-semibold text-gray-500">Materials</h2>
              <ul class="-mx-2 text-sm text-gray-700">
                <li
                  v-for="material in filteredMaterials"
                  :key="material._id"
                  class="group flex cursor-pointer select-none items-center rounded-md p-2 hover:bg-gray-100"
                  @mouseenter="setActiveMaterial(material)"
                >
                  <span class="ml-3 flex-auto truncate">{{ material.name }}</span>
                </li>
              </ul>
            </div>
  
            <div v-if="activeMaterial" class="hidden h-96 w-1/2 flex-none flex-col divide-y divide-gray-100 overflow-y-auto sm:flex">
              <div class="flex-none p-6 text-center">
                <img
                  :src="activeMaterial.fileUrl"
                  alt=""
                  class="mx-auto h-16 w-16 rounded-full"
                />
                <h2 class="mt-3 font-semibold text-gray-900">{{ activeMaterial.name }}</h2>
                <p class="text-sm text-gray-500">{{ activeMaterial.description }}</p>
              </div>
              <div class="flex flex-auto flex-col justify-between p-6">
                <dl class="grid grid-cols-1 gap-x-6 gap-y-3 text-sm text-gray-700">
                  <dt class="col-end-1 font-semibold text-gray-900">Academic Level</dt>
                  <dd>{{ activeMaterial.academicLevel }}</dd>
                  <dt class="col-end-1 font-semibold text-gray-900">Semester</dt>
                  <dd>{{ activeMaterial.semester }}</dd>
                  <dt class="col-end-1 font-semibold text-gray-900">Type</dt>
                  <dd>{{ activeMaterial.materialType }}</dd>
                </dl>
                <a
                  :href="activeMaterial.fileUrl"
                  target="_blank"
                  class="mt-6 w-full rounded-md bg-indigo-600 px-3 text-center py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Download Material
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { useCommandPalette } from '@/composables/core/useCommandPalette'
  import { useGetAllMaterials } from '@/composables/modules/materials/useGetAllMaterials'
  import { ref, watch } from 'vue'
  
  const { materials: materialsList, loading: loadingAllMaterials, queryParams, getAllMaterials } = useGetAllMaterials()
  const { isVisible, hideCommandPalette } = useCommandPalette()
  
  const query = ref('')
  const filteredMaterials = ref([])
  const activeMaterial = ref(null)
  
  // Watch for changes in materialsList and update filteredMaterials
  watch(materialsList, (newMaterials) => {
    filteredMaterials.value = newMaterials
  })
  
  // Fetch materials when the component is mounted
  getAllMaterials()
  
  const filterMaterials = () => {
    const lowerQuery = query.value.toLowerCase()
    filteredMaterials.value = materialsList.value.filter(
      (material) =>
        material?.name.toLowerCase().includes(lowerQuery) ||
        material?.description.toLowerCase().includes(lowerQuery) ||
        material?.materialType.toLowerCase().includes(lowerQuery)
    )
  }
  
  const setActiveMaterial = (material: any) => {
    activeMaterial.value = material
  }
  </script>
  
  <style scoped>
  /* Add your custom styles here */
  </style>
  