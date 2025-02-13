<template>
  <div class="space-y-4">
    <div class="mx-auto max-w-7xl">
      <div class="sm:flex sm:items-center">
        <div class="sm:flex-auto">
          <h1 class="text-base font-semibold text-gray-900">Materials Uploads</h1>
          <p class="mt-2 text-sm text-gray-700">
            A list of all the materials uploaded including their name, description, type, semester, and status.
          </p>
        </div>
        <div class="mt-4 sm:ml-16 sm:mt-0 space-y-2 lg:space-y-0 sm:flex-none">
          <NuxtLink to="/admin/dashboard/materials/batch-upload"
            class="bg-black text-white text-sm  px-4 py-2.5 rounded mr-2">
            Batch Upload
          </NuxtLink>
          <button @click="showCreateMaterialDrawer = true"
            class="bg-black text-white text-sm  px-4 py-2 rounded mr-2">
            Add Material
          </button>
          <button :disabled="!selectedMaterials?.length" @click="performBatchApproval"
            class="bg-green-600 text-white text-sm disabled:cursor-not-allowed disabled:opacity-25 px-4 py-2 rounded mr-2">
            Approve Selected
          </button>
          <button :disabled="!selectedMaterials?.length" @click="openBatchRejectModal"
            class="bg-red-600 text-white text-sm disabled:cursor-not-allowed disabled:opacity-25 px-4 py-2 rounded">
            Reject Selected
          </button>
        </div>
      </div>
    </div>
    <CoreDrawer @close="showDrawer = false" title="Material Details" :show="showDrawer">
    <template #content>
      <div class="flow-root">
        <dl class="-my-3 divide-y divide-gray-100 text-sm">
          <div class="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
            <dt class="font-medium text-gray-900">Name</dt>
            <dd class="text-gray-700 sm:col-span-2">{{ selectedMaterial.name }}</dd>
          </div>

          <div class="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
            <dt class="font-medium text-gray-900">Description</dt>
            <dd class="text-gray-700 sm:col-span-2">{{ selectedMaterial.description }}</dd>
          </div>

          <div class="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
            <dt class="font-medium text-gray-900">Type</dt>
            <dd class="text-gray-700 sm:col-span-2">{{ capitalizeWords(selectedMaterial.materialType) }}</dd>
          </div>

          <div class="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
            <dt class="font-medium text-gray-900">Session</dt>
            <dd class="text-gray-700 sm:col-span-2">{{ selectedMaterial.semester }} Semester</dd>
          </div>

          <div class="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
            <dt class="font-medium text-gray-900">Status</dt>
            <dd class="text-gray-700 sm:col-span-2">{{ selectedMaterial.status }}</dd>
          </div>

          <div class="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
            <dt class="font-medium text-gray-900">Level</dt>
            <dd class="text-gray-700 sm:col-span-2">{{ selectedMaterial.academicLevel }}</dd>
          </div>

          <div class="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
            <dt class="font-medium text-gray-900">User</dt>
            <dd class="text-gray-700  sm:col-span-2">{{ selectedMaterial.user?.name }} ({{ selectedMaterial.user?.matric  }})</dd>
          </div>

          <div class="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
            <dt class="font-medium text-gray-900">Content</dt>
            <!-- {{ selectedMaterial.fileUrls }} -->
            <!-- <dd class="text-gray-700 sm:col-span-2">
             <section v-for="(item, idx) in selectedMaterial.fileUrls" :key="idx">
                <template v-if="isImage(item)">
                  <img :src="item" alt="Material Content" class="w-full h-auto rounded" />
                </template>
                <template v-else-if="isPDF(item)">
                  <embed :src="item" type="application/pdf" class="w-full h-96 border rounded" />
                </template>
                <template v-else>
                  <p>Unsupported file format</p>
                </template>
             </section>
            </dd> -->
            <!-- <dd class="text-gray-700 sm:col-span-2">
    <section v-for="(item, idx) in selectedMaterial.fileUrls" :key="idx">
      <template v-if="isImage(item)">
        <img :src="item" alt="Material Content" class="w-full h-auto rounded" />
      </template>
      <template v-else-if="isPDF(item)">
        <embed :src="item" type="application/pdf" class="w-full h-96 border rounded" />
      </template>
      <template v-else-if="isWordDoc(item)">
        <a :href="item" target="_blank" class="text-blue-500 underline">
          Download Word Document
        </a>
      </template>
      <template v-else-if="isPowerPoint(item)">
        <a :href="item" target="_blank" class="text-blue-500 underline">
          Download PowerPoint Presentation
        </a>
      </template>
      <template v-else-if="isExcelSheet(item)">
        <a :href="item" target="_blank" class="text-blue-500 underline">
          Download Excel Spreadsheet
        </a>
      </template>
      <template v-else-if="isTextFile(item)">
        <iframe :src="item" class="w-full h-96 border rounded"></iframe>
      </template>
      <template v-else>
        <p>Unsupported file format</p>
      </template>
    </section>
  </dd> -->
  <dd class="text-gray-700 sm:col-span-2">
    <section v-for="(item, idx) in selectedMaterial.fileUrls" :key="idx" class="mb-4">
      <template v-if="isImage(item)">
        <img :src="item" alt="Material Content" class="w-full h-auto rounded" />
      </template>
      <template v-else-if="isPDF(item)">
        <embed :src="item" type="application/pdf" class="w-full h-96 border rounded" />
      </template>
      <template v-else-if="isWordDoc(item) || isPowerPoint(item) || isExcelSheet(item)">
        <iframe
          :src="`https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(item)}`"
          class="w-full h-96 border rounded"
        ></iframe>
      </template>
      <template v-else-if="isTextFile(item)">
        <iframe :src="item" class="w-full h-96 border rounded"></iframe>
      </template>
      <template v-else>
        <p>Unsupported file format</p>
      </template>
      <a :href="item" target="_blank" class="text-blue-500 underline mt-2 block">
        Download
      </a>
    </section>
  </dd>
          </div>
        </dl>
      </div>
    </template>

    <template v-if="selectedMaterial.status === 'pending'" #actionBtn>
      <div class="space-x-3">
        <button @click="approveMaterial(selectedMaterial)" class="bg-green-600 disabled:cursor-not-allowed disabled:opacity-25 text-white px-6 py-3 text-sm rounded-lg">{{ updating ? 'processing..' : 'Approve' }}</button>
        <button @click="openRejectModal" class="bg-red-600 text-sm text-white px-6 py-3 rounded-lg">Reject</button>
      </div>
    </template>
     </CoreDrawer>

     <CoreDrawer @close="showCreateMaterialDrawer = false" size="lg" title="Upload New Material" :show="showCreateMaterialDrawer">
    <template #content>
      <main>
        <CreateMaterialForm @close="showCreateMaterialDrawer = false" />
      </main>
    </template>
    <!-- <template v-if="selectedMaterial.status === 'pending'" #actionBtn>
    </template> -->
     </CoreDrawer>
     <div v-if="showRejectModal" class="fixed inset-0 z-50 flex justify-center items-center">
      <div class="bg-white rounded-lg shadow-lg p-6 max-w-md w-full relative">
        <button @click="closeRejectModal" class="absolute top-2 right-2 text-gray-500 hover:text-gray-800">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <h2 class="text-lg font-semibold text-gray-900">Reject Material</h2>
        <textarea v-model="rejectionReason" class="w-full border mt-4 p-2 rounded"
          placeholder="Enter reason for rejection"></textarea>
        <div class="mt-4 space-x-2">
          <button @click="submitRejection" class="bg-red-600 text-white px-4 py-2 rounded">Submit</button>
          <button @click="closeRejectModal" class="bg-gray-300 px-4 py-2 rounded">Cancel</button>
        </div>
      </div>
    </div>

    <div v-if="showBatchRejectModal" class="fixed inset-0 bg-black/90 z-50 flex justify-center items-center">
      <div class="bg-white rounded-lg shadow-lg p-6 max-w-md w-full relative">
       <div class="flex justify-between items-center">
        <h2 class="text-base font-semibold text-gray-900">Reject Selected Materials</h2>
        <button @click="closeBatchRejectModal" class="">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
       </div>
        <textarea rows="6" cols="6" v-model="rejectionReason" class="w-full outline-none resize-none border mt-4 p-2 rounded"
          placeholder="Enter reason for rejection"></textarea>
        <div class="mt-4 flex justify-between items-center gap-x-6 w-full pt-6">
          <button @click="submitBatchRejection" class="bg-red-600 text-sm w-full text-white px-4 py-2.5 rounded">Submit</button>
          <button @click="closeBatchRejectModal" class="bg-gray-300 text-sm w-full px-4 py-2.5 rounded">Cancel</button>
        </div>
      </div>
    </div>

    <div v-if="!loading && materials?.length" class="mt-8 flow-root overflow-hidden">
      <div class="mx-auto max-w-7xl border-[0.5px] rounded-lg border-gray-100">
        <table class="w-full text-left p-3">
          <thead class="bg-white">
            <tr class="border-b-[0.5px]">
              <!-- <th class="px-6 py-3.5 text-left">
                <input type="checkbox" v-model="selectAll" @change="toggleAllCheckboxes"
                  class="form-checkbox h-4 w-4" />
              </th> -->
              <th class="px-6 py-3.5 text-left">
            <div class="flex items-center gap-2">
              <input 
                type="checkbox" 
                  :checked="isAllSelected"
                @change="toggleSelectAll"
                class="h-5 w-5 rounded-md border-gray-300 text-purple-500 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 cursor-pointer transition-all duration-200 ease-in-out hover:border-purple-500 checked:bg-purple-500 checked:border-purple-500"
              />
              <!-- <span class="text-sm text-gray-500">Select All</span> -->
            </div>
          </th>
              <th scope="col" class="relative px-6 isolate py-3.5 pr-3 text-left text-sm font-semibold text-gray-900">
                Name
              </th>
              <th scope="col" class="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell">
                Description</th>
              <th scope="col" class="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 md:table-cell">
                Type
              </th>
              <th scope="col" class="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 md:table-cell">
                Semester</th>
              <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Status</th>
              <th scope="col" class="relative px-6 py-3.5 pl-3">
                <span class="sr-only">Edit</span>
              </th>
            </tr>
          </thead>
          <tbody class="bg-white">
            <tr class="even:bg-gray-50" v-for="material in materials" :key="material.id">
              <!-- <td class="px-6 py-4">
                <input type="checkbox" v-model="selectedMaterials" :value="material.id" class="form-checkbox h-4 w-4" />
              </td> -->
              <td class="px-6 py-4">
            <input 
              type="checkbox" 
                :checked="selectedMaterials.includes(material._id)"
              @change="() => toggleSelect(material._id)"
              class="h-5 w-5 rounded-md border-gray-300 text-purple-500 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 cursor-pointer transition-all duration-200 ease-in-out hover:border-purple-500 checked:bg-purple-500 checked:border-purple-500"
            />
          </td>
              <td class="relative py-4 px-6 text-sm font-medium text-gray-900">{{ material.name ?? 'Nil' }}</td>
              <td class="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell">
                {{ material.description?.length > 50 ? material.description.slice(0, 50) + '...' : material.description
                  ??
                  'Nil' }}
              </td>
              <td class="hidden px-3 py-4 text-sm text-gray-500 md:table-cell">
                {{ material.materialType ? capitalizeWords(material.materialType) : 'Nil' }}
              </td>
              <td class="hidden px-3 py-4 text-sm text-gray-500 md:table-cell">{{ material.semester ?? 'Nil' }}</td>
              <td class="px-3 py-4 text-sm">
                <p class="rounded-full px-2 py-1.5 text-xs text-center" :class="statusClass(material.status)">{{ material.status ?? 'Nil' }}</p>
              </td>
              <td class="relative py-4 px-6 text-right text-sm font-medium">
                <button @click="openDrawer(material)" class="text-indigo-600 hover:text-indigo-900">
                  <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 24 24" fill="none"
                    stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <section v-else-if="loading && !materials?.length">
      <div class="rounded-md p-4 w-full mx-auto">
        <div class="animate-pulse flex space-x-4">
          <div class="h-44 w-full bg-slate-200 rounded col-span-1"></div>
        </div>
      </div>
    </section>

    <div v-else class="text-center py-10 flex justify-center items-center flex-col border rounded-md border-gray-100">
      <p class="text-gray-500">No Materials Available</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useBatchUpdateMaterialStatus } from '@/composables/modules/materials/useBatchUpdateMaterialStatus'
import { useUpdateMaterialStatus } from '@/composables/modules/materials/useUpdateMaterialStatus'
import { ref } from 'vue';
import { useGetAllMaterials } from '@/composables/modules/materials/useGetAllMaterials';

const { materials, loading } = useGetAllMaterials();
const { updateMaterialStatus, updating, payload, setPayload } = useUpdateMaterialStatus()
const { batchUpdateMaterialStatus, updating: batchUpdating, setBatchPayload  } = useBatchUpdateMaterialStatus()

const showDrawer = ref(false);
const showRejectModal = ref(false);
const showBatchRejectModal = ref(false);
const selectedMaterial = ref<any>({});
const selectedMaterials = ref<number[]>([]);
const rejectionReason = ref('');
const selectAll = ref(false);
const showCreateMaterialDrawer = ref(false)


const isImage = (url) => /\.(jpeg|jpg|png|gif)$/i.test(url);
const isPDF = (url) => /\.pdf$/i.test(url);
const isWordDoc = (url) => /\.(doc|docx)$/i.test(url);
const isPowerPoint = (url) => /\.(ppt|pptx)$/i.test(url);
const isExcelSheet = (url) => /\.(xls|xlsx)$/i.test(url);
const isTextFile = (url) => /\.txt$/i.test(url);

// Simulating the selectedMaterial object
// const selectedMaterial = reactive({
//   fileUrls: [
//     "example.pdf",
//     "example.docx",
//     "example.png",
//     "example.pptx",
//     "example.txt",
//     "unsupported.xyz",
//   ],
// });

function openDrawer(material: any) {
  selectedMaterial.value = material;
  showDrawer.value = true;
}

function closeDrawer() {
  showDrawer.value = false;
}

function openRejectModal() {
  showRejectModal.value = true;
}

function closeRejectModal() {
  showRejectModal.value = false;
}

definePageMeta({
  layout: 'admin',
   middleware: 'admin'
})

function openBatchRejectModal() {
  if (!selectedMaterials.value.length) {
    alert('Please select materials to reject.');
    return;
  }
  showBatchRejectModal.value = true;
}

function closeBatchRejectModal() {
  showBatchRejectModal.value = false;
}

function submitRejection() {
  if (!rejectionReason.value) {
    alert('Please enter a reason for rejection.');
    return;
  }
  // API call to reject the material
  console.log('Rejecting material:', selectedMaterial.value.id, 'Reason:', rejectionReason.value);
  closeRejectModal();
  closeDrawer();
}

// function submitBatchRejection() {
//   if (!rejectionReason.value) {
//     alert('Please enter a reason for rejection.');
//     return;
//   }
//   // API call to reject selected materials
//   console.log('Rejecting materials:', selectedMaterials.value, 'Reason:', rejectionReason.value);
//   closeBatchRejectModal();
//   selectedMaterials.value = [];
//   selectAll.value = false;
// }

const emit = defineEmits(['cancel'])
async function approveMaterial(material: any) {
  // API call to approve the material
  const payloadObj = {
    materialId: material._id,
    userId: material.user._id,
    status: "approved"
  }
  setPayload(payloadObj)
  await updateMaterialStatus()
  console.log('Approving material:', material);
  closeDrawer();
}

// function isImage(url: string) {
//   return /\.(jpeg|jpg|png)$/i.test(url);
// }

// function isPDF(url: string) {
//   return /\.pdf$/i.test(url);
// }

// function performBatchApproval() {
//   if (!selectedMaterials.value.length) {
//     alert('Please select materials to approve.');
//     return;
//   }
//   // API call to approve selected materials
//   console.log('Approving materials:', selectedMaterials.value);
//   selectedMaterials.value = [];
//   selectAll.value = false;
// }

function toggleAllCheckboxes() {
  if (selectAll.value) {
    selectedMaterials.value = materials.map((material: any) => material.id);
  } else {
    selectedMaterials.value = [];
  }
}

function capitalizeWords(str: string) {
  return str
    .toLowerCase()
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function statusClass(status: string) {
  switch (status?.toLowerCase()) {
    case 'approved':
      return 'text-green-600 text-sm bg-green-300 font-semibold';
    case 'pending':
      return 'text-yellow-600 text-sm bg-yellow-300 font-semibold';
    case 'rejected':
      return 'text-red-600 text-sm bg-red-300 font-semibold';
    default:
      return 'text-gray-500';
  }
}

watch(selectedMaterials, (newSelected) => {
  if (materials.value) {
    selectAll.value = newSelected.length === materials.value.length
  }
})

const handleSelectAll = (e: Event) => {
  const isChecked = (e.target as HTMLInputElement).checked
  selectAll.value = isChecked
  
  if (isChecked && materials.value) {
    selectedMaterials.value = materials.value.map(material => material.id)
  } else {
    selectedMaterials.value = []
  }
}

const handleSelectOne = (e: Event, materialId: number) => {
  const isChecked = (e.target as HTMLInputElement).checked
  
  if (isChecked) {
    selectedMaterials.value.push(materialId)
  } else {
    selectedMaterials.value = selectedMaterials.value.filter(id => id !== materialId)
  }
}

const isSelected = (materialId: number): boolean => {
  return selectedMaterials.value.includes(materialId)
}

// Computed property to check if all items are selected
const isAllSelected = computed(() => {
  if (!materials.value?.length) return false
  return materials.value.length === selectedMaterials.value.length
})

// Toggle individual selection
const toggleSelect = (materialId: string) => {
  const index = selectedMaterials.value.indexOf(materialId)
  if (index === -1) {
    selectedMaterials.value.push(materialId)
  } else {
    selectedMaterials.value.splice(index, 1)
  }
}


// Toggle select all
const toggleSelectAll = () => {
  if (isAllSelected.value) {
    selectedMaterials.value = []
  } else {
    selectedMaterials.value = materials.value?.map(material => material._id) || []
  }
}

// // / Perform batch approval
// const performBatchApproval = async () => {
//   if (!selectedMaterials.value.length) {
//     alert('Please select materials to approve.')
//     return
//   }

//   console.log(selectedMaterials.value, 'se;lected materiaka')
  
//   // try {
//   //   for (const materialId of selectedMaterials.value) {
//   //     const material = materials.value?.find(m => m._id === materialId)
//   //     if (material) {
//   //       const payloadObj = {
//   //         materialId: material._id,
//   //         userId: material.user._id,
//   //         status: "approved"
//   //       }
//   //       setPayload(payloadObj)
//   //       await updateMaterialStatus()
//   //     }
//   //   }
//   //   selectedMaterials.value = []
//   // } catch (error) {
//   //   console.error('Error approving materials:', error)
//   //   alert('Error approving materials')
//   // }
// }

async function performBatchApproval() {
  if (!selectedMaterials.value.length) {
    alert('Please select materials to approve.');
    return;
  }

  const batchPayload = selectedMaterials.value.map((materialId) => {
    const material = materials.value?.find((m) => m._id === materialId);
    if (material) {
      return {
        materialId: material._id,
        userId: material.user._id,
        status: 'approved',
      };
    }
  }).filter(Boolean); // Filter out any undefined entries

  setBatchPayload(batchPayload);
  await batchUpdateMaterialStatus();

  selectedMaterials.value = [];
  selectAll.value = false;
}

function submitBatchRejection() {
  if (!rejectionReason.value) {
    alert('Please enter a reason for rejection.');
    return;
  }

  const batchPayload = selectedMaterials.value.map((materialId) => {
    const material = materials.value?.find((m) => m._id === materialId);
    if (material) {
      return {
        materialId: material._id,
        userId: material.user._id,
        status: 'rejected',
        comment: rejectionReason.value,
      };
    }
  }).filter(Boolean);

  setBatchPayload(batchPayload);
  batchUpdateMaterialStatus();

  closeBatchRejectModal();
  selectedMaterials.value = [];
  selectAll.value = false;
}


</script>