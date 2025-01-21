<template>
  <main>
    <header v-if="!loading">
      <!-- Secondary navigation -->
      <nav class="flex overflow-x-auto border-b border-white/10 py-4">
        <ul
          role="list"
          class="flex min-w-full flex-none gap-x-6 px-4 text-sm/6 font-semibold text-gray-40"
        >
          <li>
            <a href="#" class="text-indigo-400">Overview</a>
          </li>
          <li>
            <a href="#" class="">Activity</a>
          </li>
          <li>
            <a href="#" class="">Settings</a>
          </li>
          <li>
            <a href="#" class="">Collaborators</a>
          </li>
          <li>
            <a href="#" class="">Notifications</a>
          </li>
        </ul>
      </nav>

      <!-- {{ user }} -->

      <!-- Heading -->
      <div
        class="flex flex-col rounded-lg items-start justify-between gap-x-8 gap-y-4 bg-gray-700/10 px-4 py-4 sm:flex-row sm:items-center sm:px-6 lg:px-8"
      >
        <div>
          <div class="flex items-center gap-x-3">
            <div
              class="flex-none rounded-full bg-green-400/10 p-1 text-green-400"
            >
              <div class="h-2 w-2 rounded-full bg-current"></div>
            </div>
            <h1 class="flex gap-x-3 text-base/7">
              <span class="font-semibold text-gray-900">{{
                user?.name ?? "Nil"
              }}</span>
              <span class="text-gray-600">/</span>
              <span class="font-semibold text-gray-900">{{
                user?.email ?? "Nil"
              }}</span>
            </h1>
          </div>
          <!-- <p class="mt-2 text-xs/6 text-gray-400">Deploys from GitHub via main branch</p> -->
        </div>
        <div
          class="order-first flex-none rounded-full bg-indigo-400/10 px-2 py-1 text-xs font-medium text-indigo-400 ring-1 ring-inset ring-indigo-400/30 sm:order-none"
        >
          {{ user?.role ?? "Nil" }}
        </div>
      </div>

      <!-- Stats -->
      <div
        class="grid grid-cols-1 bg-gray-700/10 sm:grid-cols-2 lg:grid-cols-4"
      >
        <div class="border-t border-white/5 px-4 py-6 sm:px-6 lg:px-8">
          <p class="text-sm/6 font-medium text-gray-400">Number of Materials</p>
          <p class="mt-2 flex items-baseline gap-x-2">
            <span class="text-2xl font-semibold tracking-tight text-gray-900">{{
              user?.uploadedMaterials?.length ?? "0"
            }}</span>
          </p>
        </div>
        <div
          class="border-t border-white/5 px-4 py-6 sm:border-l sm:px-6 lg:px-8"
        >
          <p class="text-sm/6 font-medium text-gray-400">COMPSSA Points</p>
          <p class="mt-2 flex items-baseline gap-x-2">
            <span class="text-2xl font-semibold tracking-tight text-gray-900">{{
              user?.points ?? "Nil"
            }}</span>
            <!-- <span class="text-sm text-gray-400">mins</span> -->
          </p>
        </div>
        <div
          class="border-t border-white/5 px-4 py-6 sm:px-6 lg:border-l lg:px-8"
        >
          <p class="text-sm/6 font-medium text-gray-400">Matric</p>
          <p class="mt-2 flex items-baseline gap-x-2">
            <span class="text-2xl font-semibold tracking-tight text-gray-900">{{
              user?.matric
            }}</span>
          </p>
        </div>
        <div
          class="border-t border-white/5 px-4 py-6 sm:border-l sm:px-6 lg:px-8"
        >
          <p class="text-sm/6 font-medium text-gray-400">Phone Number</p>
          <p class="mt-2 flex items-baseline gap-x-2">
            <span class="text-2xl font-semibold tracking-tight text-gray-900">{{
              user?.phone ?? "Nil"
            }}</span>
          </p>
        </div>
      </div>
    </header>
    <section v-else>
      <div class="rounded-md p-4 w-full mx-auto">
        <div class="animate-pulse flex space-x-4">
          <div class="h-44 w-full bg-slate-200 rounded col-span-1"></div>
        </div>
      </div>
    </section>
    <div class="pt-4 border-[0.5px] rounded-lg mt-10">
      <h2
        class="px-4 text-base/7 border-b-[0.5px] pb-3 font-semibold text-gray-900 sm:px-6 lg:px-8"
      >
        Latest activity
      </h2>
      <div class="flow-root overflow-hidden">
        <div
          v-if="!loadingMaterials && materials.data?.length"
          class="mt-8 flow-root overflow-hidden"
        >
          <div
            class="mx-auto max-w-7xl border-[0.5px] rounded-lg border-gray-100"
          >
            <table class="w-full text-left p-3">
              <thead class="bg-white">
                <tr class="border-b-[0.5px]">
                  <th class="py-3.5 text-left"></th>
                  <th
                    scope="col"
                    class="relative px-6 isolate py-3.5 pr-3 text-left text-sm font-semibold text-gray-900"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    class="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell"
                  >
                    Description
                  </th>
                  <th
                    scope="col"
                    class="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 md:table-cell"
                  >
                    Type
                  </th>
                  <th
                    scope="col"
                    class="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 md:table-cell"
                  >
                    Semester
                  </th>
                  <th
                    scope="col"
                    class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Status
                  </th>
                  <th scope="col" class="relative px-6 py-3.5 pl-3">
                    <span class="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white">
                <tr
                  class="even:bg-gray-50"
                  v-for="material in materials?.data"
                  :key="material.id"
                >
                  <!-- <td class="px-6 py-4">
                <input type="checkbox" v-model="selectedMaterials" :value="material.id" class="form-checkbox h-4 w-4" />
              </td> -->
                  <td class="py-4"></td>
                  <td
                    class="relative py-4 px-6 text-sm font-medium text-gray-900"
                  >
                    {{ material.name ?? "Nil" }}
                  </td>
                  <td
                    class="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell"
                  >
                    {{
                      material.description?.length > 50
                        ? material.description.slice(0, 50) + "..."
                        : material.description ?? "Nil"
                    }}
                  </td>
                  <td
                    class="hidden px-3 py-4 text-sm text-gray-500 md:table-cell"
                  >
                    {{ material.materialType }}
                  </td>
                  <td
                    class="hidden px-3 py-4 text-sm text-gray-500 md:table-cell"
                  >
                    {{ material.semester ?? "Nil" }}
                  </td>
                  <td class="px-3 py-4 text-sm">
                    <p
                      class="rounded-full px-2 py-1.5 text-xs text-center"
                      :class="statusClass(material.status)"
                    >
                      {{ material.status ?? "Nil" }}
                    </p>
                  </td>
                  <td class="relative py-4 px-6 text-right text-sm font-medium">
                    <button @click="openDrawer(material)"  class="text-indigo-600 hover:text-indigo-900">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="23"
                        height="23"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#000000"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <path
                          d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"
                        ></path>
                        <circle cx="12" cy="12" r="3"></circle>
                      </svg>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <section v-else-if="loadingMaterials && !materials?.length">
          <div class="rounded-md p-4 w-full mx-auto">
            <div class="animate-pulse flex space-x-4">
              <div class="h-44 w-full bg-slate-200 rounded col-span-1"></div>
            </div>
          </div>
        </section>

        <div
          v-else
          class="text-center py-10 flex justify-center items-center flex-col border rounded-md border-gray-100"
        >
          <p class="text-gray-500">No Materials Available</p>
        </div>
      </div>
    </div>

    <CoreDrawer @close="showDrawer = false" title="Material Details" :show="showDrawer">
    <template #content>
      <div class="flow-root">
        <dl class="-my-3 divide-y divide-gray-100 text-sm">
          <div class="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
            <dt class="font-medium text-gray-900">Name</dt>
            <dd class="text-gray-700 sm:col-span-2">{{ selectedMaterial?.name }}</dd>
          </div>

          <div class="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
            <dt class="font-medium text-gray-900">Description</dt>
            <dd class="text-gray-700 sm:col-span-2">{{ selectedMaterial?.description }}</dd>
          </div>

          <div class="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
            <dt class="font-medium text-gray-900">Type</dt>
            <dd class="text-gray-700 sm:col-span-2">{{ capitalizeWords(selectedMaterial?.materialType) }}</dd>
          </div>

          <div class="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
            <dt class="font-medium text-gray-900">Session</dt>
            <dd class="text-gray-700 sm:col-span-2">{{ selectedMaterial?.semester ?? 'Nil' }} Semester</dd>
          </div>

          <div class="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
            <dt class="font-medium text-gray-900">Status</dt>
            <dd class="text-gray-700 sm:col-span-2">{{ selectedMaterial?.status ?? 'Nil' }}</dd>
          </div>

          <div class="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
            <dt class="font-medium text-gray-900">Level</dt>
            <dd class="text-gray-700 sm:col-span-2">{{ selectedMaterial?.academicLevel ?? 'Nil' }}</dd>
          </div>

          <div class="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
            <dt class="font-medium text-gray-900">Session</dt>
            <dd class="text-gray-700  sm:col-span-2">{{ selectedMaterial?.session?.name ?? 'Nil' }}</dd>
          </div>

          <div class="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
            <dt class="font-medium text-gray-900">Category</dt>
            <dd class="text-gray-700  sm:col-span-2">{{ selectedMaterial?.category?.name ?? 'Nil' }}</dd>
          </div>

          <div class="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
            <dt class="font-medium text-gray-900">Content</dt>
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
            <!-- <dd class="text-gray-700 sm:col-span-2">
              <template v-if="isImage(selectedMaterial.fileUrl)">
                <img :src="selectedMaterial.fileUrl" alt="Material Content" class="w-full h-auto rounded" />
              </template>
              <template v-else-if="isPDF(selectedMaterial.fileUrl)">
                <embed :src="selectedMaterial.fileUrl" type="application/pdf" class="w-full h-96 border rounded" />
              </template>
              <template v-else>
                <p>Unsupported file format</p>
              </template>
            </dd> -->
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
  </main>
</template>

<script setup lang="ts">
import { useGetUserById } from "@/composables/modules/users/useGetUserById";
import { useGetAllMaterialsByUserId } from "@/composables/modules/materials/useGetMaterialsByUserId";
import { useBatchUpdateMaterialStatus } from '@/composables/modules/materials/useBatchUpdateMaterialStatus'
import { useUpdateMaterialStatus } from '@/composables/modules/materials/useUpdateMaterialStatus'
import { ref } from 'vue';
import { useGetAllMaterials } from '@/composables/modules/materials/useGetAllMaterials';

const { updateMaterialStatus, updating, payload, setPayload } = useUpdateMaterialStatus()
const { user, getUserById, loading } = useGetUserById();
const { materials, loading: loadingMaterials } = useGetAllMaterialsByUserId();
definePageMeta({
  layout: "admin",
});

const showRejectModal = ref(false);

const isImage = (url) => /\.(jpeg|jpg|png|gif)$/i.test(url);
const isPDF = (url) => /\.pdf$/i.test(url);
const isWordDoc = (url) => /\.(doc|docx)$/i.test(url);
const isPowerPoint = (url) => /\.(ppt|pptx)$/i.test(url);
const isExcelSheet = (url) => /\.(xls|xlsx)$/i.test(url);
const isTextFile = (url) => /\.txt$/i.test(url);

function statusClass(status: string) {
  switch (status?.toLowerCase()) {
    case "approved":
      return "text-green-600 text-sm bg-green-300 font-semibold";
    case "pending":
      return "text-yellow-600 text-sm bg-yellow-300 font-semibold";
    case "rejected":
      return "text-red-600 text-sm bg-red-300 font-semibold";
    default:
      return "text-gray-500";
  }
}

const showDrawer = ref(false)

const selectedMaterial = ref({})


function capitalizeWords(str: string) {
  return str
    .toLowerCase()
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

// function isImage(url: string) {
//   return /\.(jpeg|jpg|png)$/i.test(url);
// }

// function isPDF(url: string) {
//   return /\.pdf$/i.test(url);
// }


function openDrawer(material: any) {
  selectedMaterial.value = material;
  showDrawer.value = true;
}

function closeDrawer() {
  showDrawer.value = false;
}

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

function openRejectModal() {
  showRejectModal.value = true;
}
</script>
