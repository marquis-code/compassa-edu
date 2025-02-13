<template>
  <!-- Previous template code remains the same until the table section -->

  <!-- Table Section with Pagination -->
  <div class="mt-8 flow-root">
    <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div class="inline-block min-w-full py-2 align-middle">
        <div class="overflow-hidden shadow ring-1 ring-black border-[0.5px] border-gray-100 ring-opacity-5 sm:rounded-lg">
          <table class="min-w-full divide-y divide-gray-300">
            <!-- Table header remains the same -->
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
                <td class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                  <div class="relative inline-block text-left">
                    <button @click="toggleDropdown(item.id)" class="p-1 rounded-full hover:bg-gray-100">
                      <svg class="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                      </svg>
                    </button>
                    <div v-if="dropdowns[item.id]" class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                      <div class="py-1">
                        <button @click="openModal('preview', item)" class="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100">
                          Preview
                        </button>
                        <button @click="openModal('edit', item)" class="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100">
                          Edit
                        </button>
                        <button @click="openModal('delete', item)" class="block w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-100">
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Pagination Controls -->
    <div class="mt-4 flex items-center justify-between">
      <div class="flex items-center">
        <span class="text-sm text-gray-700">
          Showing {{ startIndex + 1 }} to {{ Math.min(endIndex, totalItems) }} of {{ totalItems }} entries
        </span>
      </div>
      <div class="flex items-center space-x-2">
        <button
          @click="currentPage--"
          :disabled="currentPage === 1"
          class="px-3 py-1 rounded-md border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
        >
          Previous
        </button>
        <span class="text-sm text-gray-700">Page {{ currentPage }} of {{ totalPages }}</span>
        <button
          @click="currentPage++"
          :disabled="currentPage === totalPages"
          class="px-3 py-1 rounded-md border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  </div>

  <!-- Rest of the template remains the same -->
</template>

<script setup lang="ts">
// Previous imports remain the same

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

// Modified toggleDropdown function to handle individual dropdowns
const toggleDropdown = (id: string) => {
  dropdowns.value = {
    ...dropdowns.value,
    [id]: !dropdowns.value[id]
  }
}

// Modified openModal function
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
  // Clear all dropdowns when opening modal
  dropdowns.value = {}
}

// Modified handleClickOutside
const handleClickOutside = (event: MouseEvent) => {
  if (Object.values(dropdowns.value).some(v => v) && !(event.target as Element).closest('.relative')) {
    dropdowns.value = {}
  }
}

// Modified handleSubmit to fix processing state
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

// Reset page when data changes
watch(categories, () => {
  currentPage.value = 1
})

// Rest of the script remains the same
</script>