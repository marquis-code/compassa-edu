<template>
  <div class="border-[0.5px] border-gray-100 rounded-lg p-4">
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-lg font-semibold text-gray-900">Recent Activity</h2>
      <div class="flex items-center gap-2">
        <select 
          v-model="sortBy" 
          class="rounded-md border px-6 py-2.5 border-gray-200 text-sm outline-none"
          @change="handleSort"
        >
          <option value="date">Date</option>
          <option value="action">Action</option>
          <option value="module">Module</option>
        </select>
      </div>
    </div>

    <div v-if="loading" class="flex justify-center py-8">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
    </div>

    <div v-else-if="paginatedAudits.length === 0" class="text-center py-8 text-gray-500">
      No audit records found
    </div>

    <div v-else class="overflow-x-auto">
      <table class="w-full">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
            <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
            <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
            <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Module</th>
            <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Details</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="audit in paginatedAudits" :key="audit._id" class="hover:bg-gray-50">
            <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
              {{ formatDate(audit.createdAt) }}
            </td>
            <td class="px-4 py-4 whitespace-nowrap">
              <span 
                class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                :class="getActionClass(audit.action)"
              >
                {{ audit.action }}
              </span>
            </td>
            <td class="px-4 py-4 whitespace-nowrap">
              <div class="text-sm text-gray-900">{{ audit.user.name }}</div>
              <div class="text-xs text-gray-500">{{ audit.user.role }}</div>
            </td>
            <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
              {{ audit.module }}
            </td>
            <td class="px-4 py-4 text-sm text-gray-500">
              <button 
                @click="showAuditDetails(audit)"
                class="text-indigo-600 hover:text-indigo-900"
              >
                View Details
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination -->
    <div class="flex items-center justify-between px-4 py-3 sm:px-6">
      <div class="flex flex-1 justify-between sm:hidden">
        <button
          @click="currentPage--"
          :disabled="currentPage === 1"
          class="relative inline-flex items-center px-4 py-2 text-sm font-medium rounded-md text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 disabled:opacity-50"
        >
          Previous
        </button>
        <button
          @click="currentPage++"
          :disabled="currentPage >= totalPages"
          class="relative ml-3 inline-flex items-center px-4 py-2 text-sm font-medium rounded-md text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 disabled:opacity-50"
        >
          Next
        </button>
      </div>
      <div class="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p class="text-sm text-gray-700">
            Showing 
            <span class="font-medium">{{ paginationStart }}</span>
            to
            <span class="font-medium">{{ paginationEnd }}</span>
            of
            <span class="font-medium">{{ totalItems }}</span>
            results
          </p>
        </div>
        <div>
          <nav class="isolate inline-flex -space-x-px rounded-md shadow-sm">
            <button
              v-for="page in displayedPages"
              :key="page"
              @click="currentPage = page"
              :class="[
                currentPage === page
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white text-gray-900 hover:bg-gray-50',
                'relative inline-flex items-center px-4 py-2 text-sm font-medium focus:z-20'
              ]"
            >
              {{ page }}
            </button>
          </nav>
        </div>
      </div>
    </div>

    <!-- Modal for audit details -->
    <div v-if="selectedAudit" class="fixed inset-0 z-50 bg-black bg-opacity-75 flex items-center justify-center p-4">
      <div class="bg-white rounded-lg max-w-2xl w-full p-6">
        <div class="flex justify-between items-start mb-4">
          <h3 class="text-lg font-medium">Audit Details</h3>
          <button @click="selectedAudit = null" class="text-gray-400 border rounded-full p-1 shadow hover:text-gray-500">
            <span class="sr-only">Close</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>
        <div class="space-y-4">
          <div class="grid grid-cols-2 gap-4">
            <div>
              <h4 class="text-sm font-medium text-gray-500">Action</h4>
              <p class="mt-1">{{ selectedAudit.action }}</p>
            </div>
            <div>
              <h4 class="text-sm font-medium text-gray-500">Module</h4>
              <p class="mt-1">{{ selectedAudit.module }}</p>
            </div>
            <div>
              <h4 class="text-sm font-medium text-gray-500">User</h4>
              <p class="mt-1">{{ selectedAudit.user.name }}</p>
            </div>
            <div>
              <h4 class="text-sm font-medium text-gray-500">Role</h4>
              <p class="mt-1">{{ selectedAudit.user.role }}</p>
            </div>
            <div>
              <h4 class="text-sm font-medium text-gray-500">IP Address</h4>
              <p class="mt-1">{{ selectedAudit.ipAddress }}</p>
            </div>
            <div>
              <h4 class="text-sm font-medium text-gray-500">Date</h4>
              <p class="mt-1">{{ formatDate(selectedAudit.createdAt) }}</p>
            </div>
          </div>
          <div v-if="selectedAudit.changes">
            <h4 class="text-sm font-medium text-gray-500">Changes</h4>
            <pre class="mt-1 whitespace-pre-wrap bg-gray-50 p-2 rounded">{{ JSON.stringify(selectedAudit.changes, null, 2) }}</pre>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import { useGetAudits } from '@/composables/modules/audit/useGetAudits'

interface User {
  _id: string
  name: string
  email: string
  role: string
}

interface Audit {
  _id: string
  action: string
  module: string
  documentId: string | null
  user: User
  changes: any | null
  metadata?: {
    matric?: string
  }
  ipAddress: string
  userAgent: string
  createdAt: string
  updatedAt: string
}

const { auditsList, loading } = useGetAudits()
const currentPage = ref(1)
const itemsPerPage = ref(5)
const sortBy = ref('date')
const selectedAudit = ref<Audit | null>(null)

// Sorting function
const sortedAudits = computed(() => {
  if (!auditsList.value) return []
  
  return [...auditsList.value].sort((a, b) => {
    switch (sortBy.value) {
      case 'date':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      case 'action':
        return a.action.localeCompare(b.action)
      case 'module':
        return a.module.localeCompare(b.module)
      default:
        return 0
    }
  })
})

// Pagination computeds
const totalItems = computed(() => sortedAudits.value.length)
const totalPages = computed(() => Math.ceil(totalItems.value / itemsPerPage.value))
const paginationStart = computed(() => (currentPage.value - 1) * itemsPerPage.value + 1)
const paginationEnd = computed(() => Math.min(currentPage.value * itemsPerPage.value, totalItems.value))

const paginatedAudits = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return sortedAudits.value.slice(start, end)
})

const displayedPages = computed(() => {
  const pages = []
  for (let i = 1; i <= totalPages.value; i++) {
    pages.push(i)
  }
  return pages
})

// Methods
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleString()
}

const getActionClass = (action: string) => {
  switch (action.toUpperCase()) {
    case 'CREATE':
      return 'bg-green-100 text-green-800'
    case 'UPDATE':
      return 'bg-blue-100 text-blue-800'
    case 'DELETE':
      return 'bg-red-100 text-red-800'
    case 'ACCESS':
      return 'bg-yellow-100 text-yellow-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

const handleSort = () => {
  currentPage.value = 1
}

const showAuditDetails = (audit: Audit) => {
  selectedAudit.value = audit
}
</script>