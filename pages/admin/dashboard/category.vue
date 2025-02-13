<template>
  <main>
    <div class="px-4 sm:px-6 lg:px-8 border-[0.5px] rounded-lg">
      <!-- Header Section -->
      <div class="sm:flex sm:items-center">
        <div class="sm:flex-auto">
          <h1 class="text-2xl font-semibold text-gray-900">Categories</h1>
          <p class="mt-2 text-sm text-gray-700">
            Manage your categories including their names, descriptions, and creation dates.
          </p>
        </div>
        <div class="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button
            @click="openModal('create')"
            type="button"
            class="block rounded-md bg-[#5B8469] px-4 py-2.5 text-center text-sm font-semibold text-white shadow-sm transition-colors duration-200"
          >
            Add Category
          </button>
        </div>
      </div>
  
      <!-- Table Section -->
      <div class="mt-8 flow-root">
        <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div class="inline-block min-w-full py-2 align-middle">
            <div class="overflow-hidden shadow ring-1 ring-black border-[0.5px] border-gray-100 ring-opacity-5 sm:rounded-lg">
              <table class="min-w-full divide-y divide-gray-300">
                <thead class="bg-gray-50">
                  <tr>
                    <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Name</th>
                    <th scope="col" class="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 md:table-cell">Description</th>
                    <th scope="col" class="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell">Created At</th>
                    <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-0">
                      <span class="">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-200 bg-white">
              <tr v-for="item in paginatedCategories" :key="item.id" class="hover:bg-gray-50">
                <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                  {{ item?.name ?? 'Nil' }}
                </td>
                <td class="hidden whitespace-nowrap px-3 py-4 text-sm text-gray-500 md:table-cell">
                  {{ item?.description ?? 'Nil' }}
                </td>
                <td class="hidden whitespace-nowrap px-3 py-4 text-sm text-gray-500 lg:table-cell">
                  {{ formatDate(item?.createdAt) }}
                </td>
                <td class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                  <div class="flex items-center gap-x-1">
                <!-- <div> -->
                  <button @click="openModal('preview', item)" class="px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100">
                          <!-- Preview -->
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                        </button>
                <!-- </div> -->
                       <!-- <div> -->
                        <button @click="openModal('edit', item)" class="px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100">
                          <!-- Edit -->
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 14.66V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h5.34"></path><polygon points="18 2 22 6 12 16 8 16 8 12 18 2"></polygon></svg>
                        </button>
                       <!-- </div> -->
                       <!-- <div> -->
                        <button @click="openModal('delete', item)" class="px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-100">
                          <!-- Delete -->
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#d0021b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                        </button>
                       <!-- </div> -->
                  </div>
                </td>
              </tr>
            </tbody>
              </table>
            </div>
          </div>
        </div>

        <div class="my-4 flex items-center justify-between">
      <div class="flex items-center">
        <span class="text-sm text-gray-700">
          Showing {{ startIndex + 1 }} to {{ Math.min(endIndex, totalItems) }} of {{ totalItems }} entries
        </span>
      </div>
      <div class="flex items-center space-x-2">
        <button
          @click="currentPage--"
          :disabled="currentPage === 1"
          class="px-3 py-1.5 rounded-md border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
        >
          Previous
        </button>
        <span class="text-sm text-gray-700">Page {{ currentPage }} of {{ totalPages }}</span>
        <button
          @click="currentPage++"
          :disabled="currentPage === totalPages"
          class="px-3 py-1.5 rounded-md border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
        >
          Next
        </button>
      </div>
        </div>
      </div>
  
      <!-- Category Modal -->
      <TransitionRoot appear :show="isModalOpen" as="template">
        <Dialog as="div" class="relative z-50" @close="closeModal">
          <TransitionChild
          as="template"
          enter="ease-out duration-300"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="ease-in duration-200"
          leave-from="opacity-100"
          leave-to="opacity-0"
          >
            <div class="fixed inset-0  bg-black bg-opacity-70" />
          </TransitionChild>
  
          <div class="fixed inset-0  overflow-y-auto">
            <div class="flex min-h-full items-center justify-center p-4 text-center">
              <TransitionChild
                as="template"
                enter="ease-out duration-300"
                enter-from="opacity-0 scale-95"
                enter-to="opacity-100 scale-100"
                leave="ease-in duration-200"
                leave-from="opacity-100 scale-100"
                leave-to="opacity-0 scale-95"
              >
                <DialogPanel class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <DialogTitle as="h3" class="text-lg font-medium leading-6 text-gray-900">
                    {{ modalTitle }}
                  </DialogTitle>
  

                  <template v-if="['create', 'edit'].includes(modalMode)">
                    <div class="mt-4">
                      <div class="space-y-4">
                        <div>
                          <label class="block text-sm font-medium text-gray-700">Name</label>
                          <input
                            type="text"
                            v-model="formData.name"
                            class="mt-1 block w-full py-3 border-[0.5px] outline-none pl-3 border-gray-100 bg-gray-25 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          />
                        </div>
                        <div>
                          <label class="block text-sm font-medium text-gray-700">Description</label>
                          <textarea
                            v-model="formData.description"
                            rows="3"
                            class="mt-1 block w-full py-3 resize-none outline-none pl-3 border-[0.5px] border-gray-100 bg-gray-25 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          ></textarea>
                        </div>
                      </div>
                    </div>
  
                    <div class="mt-6 flex justify-end space-x-3">
                      <button
                        type="button"
                        class="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                        @click="closeModal"
                      >
                        Cancel
                      </button>
                      <button
                        v-if="modalMode === 'create'"
                        type="button"
                        :disabled="creating"
                        class="rounded-md bg-[#5B8469] px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
                        @click="handleCreate"
                      >
                        {{ creating ? 'Processing...' : 'Create' }}
                      </button>
                      <button
                        v-else
                        type="button"
                        :disabled="updating"
                        class="rounded-md bg-[#5B8469] px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
                        @click="handleUpdate"
                      >
                        {{ updating ? 'Processing...' : 'Update' }}
                      </button>
                    </div>
                  </template>
  

                  <template v-if="modalMode === 'delete'">
                    <div class="mt-4">
                      <p class="text-sm text-gray-500">
                        Are you sure you want to delete this category? This action cannot be undone.
                      </p>
                      <div class="mt-4">
                        <label class="block text-sm font-medium text-gray-700">Enter password to confirm</label>
                        <input
                          type="password"
                          v-model="deletePassword"
                          class="mt-1 block w-full py-3 bg-gray-50 border-[0.5px] pl-4 outline-none rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          placeholder="Enter COMPASSA to confirm"
                        />
                      </div>
                    </div>
  
                    <div class="mt-6 flex justify-end space-x-3">
                      <button
                        type="button"
                        class="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                        @click="closeModal"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        :disabled="deletePassword !== 'COMPASSA' || deleting"
                        class="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-500 disabled:opacity-50"
                        @click="handleDelete"
                      >
                        {{ deleting ? 'Deleting...' : 'Delete' }}
                      </button>
                    </div>
                  </template>
  

                  <template v-if="modalMode === 'preview'">
                    <div class="mt-4 space-y-4">
                      <div>
                        <h4 class="text-sm font-medium text-gray-700">Name</h4>
                        <p class="mt-1 text-sm text-gray-900">{{ selectedItem?.name }}</p>
                      </div>
                      <div>
                        <h4 class="text-sm font-medium text-gray-700">Description</h4>
                        <p class="mt-1 text-sm text-gray-900">{{ selectedItem?.description }}</p>
                      </div>
                      <div>
                        <h4 class="text-sm font-medium text-gray-700">Created At</h4>
                        <p class="mt-1 text-sm text-gray-900">{{ formatDate(selectedItem?.createdAt) }}</p>
                      </div>
                    </div>
  
                    <div class="mt-6 flex justify-end">
                      <button
                        type="button"
                        class="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                        @click="closeModal"
                      >
                        Close
                      </button>
                    </div>
                  </template>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </TransitionRoot>
    </div>
  </main>
</template>
  
  <script setup lang="ts">
  import { ref, computed } from 'vue'
  import {
    Dialog,
    DialogPanel,
    DialogTitle,
    TransitionChild,
    TransitionRoot,
  } from '@headlessui/vue'
  import { useDeleteCategory } from '@/composables/modules/category/useDeleteCategory'
  import { useCreateCategory } from '@/composables/modules/category/useCreateCategory'
  import { useUpdateCategory } from '@/composables/modules/category/useUpdateCategory'
  import { useGetCategories } from '@/composables/modules/category/useFetchCategories'
  
  // Composables
  const { categories, loading: fetching, getCategories } = useGetCategories()
  const { payload, loading: creating, setPayload, createCategory } = useCreateCategory()
  const { deleteCategory, loading: deleting } = useDeleteCategory()
  const { updateCategory, loading: updating } = useUpdateCategory()

  // Pagination state
const currentPage = ref(1)
const itemsPerPage = ref(10)

// Replace single activeDropdown with dropdowns object
const dropdowns = ref<{ [key: string]: boolean }>({})


// Pagination computed properties
const totalItems = computed(() => categories.value?.length ?? 0)
const totalPages = computed(() => Math.ceil(totalItems.value / itemsPerPage.value))
const startIndex = computed(() => (currentPage.value - 1) * itemsPerPage.value)
const endIndex = computed(() => startIndex.value + itemsPerPage.value)


const paginatedCategories = computed(() => {
  if (!categories.value) return []
  return categories.value.slice(startIndex.value, endIndex.value)
})

  
  // State
  const isModalOpen = ref(false) as any
  const modalMode = ref<'create' | 'edit' | 'delete' | 'preview'>('create')
  const selectedItem = ref(null) as any
  const activeDropdown = ref(null) as any
  const deletePassword = ref('') as any
  const error = ref('') as any
  const formData = ref({
    name: '',
    description: ''
  }) as any
  
  // Computed
  const modalTitle = computed(() => {
    switch (modalMode.value) {
      case 'create':
        return 'Create New Category'
      case 'edit':
        return 'Edit Category'
      case 'delete':
        return 'Delete Category'
      case 'preview':
        return 'Category Details'
      default:
        return ''
    }
  })

  const handleCreate = async () => {
    const payloadObj = {
      name: formData?.value?.name.trim(),
      description: formData?.value?.description.trim(),
    }
    setPayload(payloadObj)
    await createCategory().then(() => {
      closeModal()
    })
  }

  const handleUpdate = async () => {
    const payloadObj = {
      name: formData?.value?.name,
      description: formData?.value?.description,
    }
    await updateCategory(payloadObj, selectedItem?.value?._id).then(() => {
      closeModal()
    })
  }

//   const closeModal = () => {
//   isModalOpen.value = false
//   selectedItem.value = null
//   deletePassword.value = ''
//   error.value = null
//   formData.value = {
//     name: '',
//     description: ''
//   }
// }
  
  const loading = computed(() => creating || updating)
  
  // Methods
  const formatDate = (date: string) => {
    if (!date) return 'Nil'
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const validateForm = (): boolean => {
  if (!formData.value.name.trim()) {
    error.value = 'Name is required'
    return false
  }
  if (!formData.value.description.trim()) {
    error.value = 'Description is required'
    return false
  }
  return true
}
  
  // const toggleDropdown = (id: string) => {
  //   activeDropdown.value = activeDropdown.value === id ? null : id
  // }

  // Modified toggleDropdown function to handle individual dropdowns
const toggleDropdown = (id: string) => {
  dropdowns.value = {
    ...dropdowns.value,
    [id]: !dropdowns.value[id]
  }
}
  
  const openModal = (mode: typeof modalMode.value, item: any = null) => {
    modalMode.value = mode
    selectedItem.value = item
    error.value = null
    
    if (mode === 'edit' && item) {
      formData.value = {
        name: item.name,
        description: item.description
      }
    } else if (mode === 'create') {
      formData.value = {
        name: '',
        description: ''
      }
    }
    
    isModalOpen.value = true
    dropdowns.value = {}
    // activeDropdown.value = null
  }
  
//   const closeModal = () => {
//     isModalOpen.value = false
//     selectedItem.value = null
//     deletePassword.value = ''
//     formData.value = {
//       name: '',
//       description: ''
//     }
//   }

// Reset page when data changes
watch(categories, () => {
  currentPage.value = 1
})

const closeModal = () => {
  isModalOpen.value = false
  selectedItem.value = null
  deletePassword.value = ''
  error.value = null
  formData.value = {
    name: '',
    description: ''
  }
}

const handleSubmit = async () => {
  try {
    if (!validateForm()) return

    const isCreating = modalMode.value === 'create'
    const processingState = isCreating ? creating : updating

    if (!processingState) {
      if (isCreating) {
        setPayload(formData.value)
        await createCategory()
      } else if (modalMode.value === 'edit' && selectedItem.value) {
        await updateCategory({
          id: selectedItem.value.id,
          ...formData.value
        })
      }
      
      await getCategories()
      closeModal()
    }
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'An error occurred'
  }
}


//   const handleSubmit = async () => {
//   try {
//     if (!validateForm()) return

//     if (modalMode.value === 'create') {
//       setPayload(formData.value)
//       await createCategory()
//     } else if (modalMode.value === 'edit' && selectedItem.value) {
//       await updateCategory({
//         id: selectedItem.value.id,
//         ...formData.value
//       })
//     }
    
//     await fetchCategories() // Refresh the categories list
//     closeModal()
//   } catch (err) {
//     error.value = err instanceof Error ? err.message : 'An error occurred'
//   }
// }
  
//   const handleSubmit = async () => {
//     if (modalMode.value === 'create') {
//       setPayload(formData.value)
//       await createCategory()
//     } else if (modalMode.value === 'edit' && selectedItem.value) {
//       await updateCategory({
//         id: selectedItem.value.id,
//         ...formData.value
//       })
//     }
//     closeModal()
//   }
  
  const handleDelete = async () => {
  try {
    if (!selectedItem.value) return
    if (deletePassword.value !== 'COMPASSA') {
      error.value = 'Invalid password'
      return
    }

    await deleteCategory(selectedItem.value._id)
    await getCategories() // Refresh the categories list
    closeModal()
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'An error occurred'
  }
}

// Click outside dropdown handler
const handleClickOutside = (event: MouseEvent) => {
  if (activeDropdown.value && !(event.target as Element).closest('.relative')) {
    activeDropdown.value = null
  }
}

// Lifecycle hooks
onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

watch(isModalOpen, (newValue) => {
  if (!newValue) {
    error.value = null
  }
})

definePageMeta({
  layout: 'admin',
   middleware: 'admin'
})

// Clean up
onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
.dropdown-enter-active,
.dropdown-leave-active {
  transition: opacity 0.2s, transform 0.2s;
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
</style>