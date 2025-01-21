<template>
  <div v-if="isVisible" class="relative z-50" role="dialog" aria-modal="true">
    <div class="fixed inset-0 bg-black/70 transition-opacity" aria-hidden="true"></div>

    <div class="fixed inset-0 z-10 w-screen overflow-y-auto p-4 sm:p-6 md:p-20">
      <div
        class="mx-auto max-w-3xl transform divide-y divide-gray-100 overflow-hidden rounded-xl bg-white shadow-2xl ring-1 ring-black/5 transition-all">
        <button @click="hideCommandPalette"
          class="absolute top-3 right-3 p-2 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 rounded-full hover:bg-gray-100"
          aria-label="Close search">
          <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path
              d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
          </svg>
        </button>

        <div class="grid grid-cols-1">
          <input type="text" v-model="query"
            class="col-start-1 row-start-1 h-12 w-full pl-11 pr-4 text-base text-gray-900 outline-none placeholder:text-gray-400 sm:text-sm"
            placeholder="Search materials..." role="combobox" aria-expanded="false" @input="filterMaterials" />
          <svg class="pointer-events-none col-start-1 row-start-1 ml-4 h-5 w-5 self-center text-gray-400"
            viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fill-rule="evenodd"
              d="M9 3.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11ZM2 9a7 7 0 1 1 12.452 4.391l3.328 3.329a.75.75 0 1 1-1.06 1.06l-3.329-3.328A7 7 0 0 1 2 9Z"
              clip-rule="evenodd" />
          </svg>
        </div>

        <div class="flex transform-gpu divide-x divide-gray-100">
          <div class="max-h-96 min-w-0 flex-auto scroll-py-4 overflow-y-auto px-6 py-4 sm:h-96">
            <h2 class="mb-4 mt-2 text-xs font-semibold text-gray-500">Materials</h2>
            <ul v-if="filteredMaterials.length" class="-mx-2 text-sm text-gray-700">
              <li v-for="material in filteredMaterials" :key="material._id"
                class="group flex cursor-pointer select-none items-center rounded-md p-2 hover:bg-gray-100"
                @mouseenter="setActiveMaterial(material)">
                <span class="ml-3 flex-auto truncate">{{ material.name }}</span>
              </li>
            </ul>
            <div class="flex justify-center items-center flex-col pt-5" v-else>
              <svg width="152" height="124" viewBox="0 0 152 124" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="76" cy="58" r="52" fill="#EAEAEA"/>
                <circle cx="21" cy="25" r="5" fill="#BDBDBD"/>
                <circle cx="18" cy="109" r="7" fill="#BDBDBD"/>
                <circle cx="145" cy="41" r="7" fill="#BDBDBD"/>
                <circle cx="134" cy="14" r="4" fill="#BDBDBD"/>
                <g filter="url(#filter0_b_5289_76228)">
                <rect x="52" y="34" width="48" height="48" rx="24" fill="#9D9D9D"/>
                <path d="M66.2542 61.6322C66.2881 61.309 66.5223 61.0485 66.9908 60.5276L68.0218 59.3749C68.2739 59.0558 68.4527 58.5 68.4527 57.9998C68.4527 57.5 68.2738 56.944 68.0218 56.625L66.9908 55.4723C66.5223 54.9514 66.2881 54.6909 66.2542 54.3677C66.2202 54.0445 66.3952 53.7408 66.7451 53.1336L67.2386 52.277C67.6119 51.6291 67.7986 51.3052 68.1162 51.1761C68.4337 51.0469 68.7929 51.1488 69.5112 51.3527L70.7315 51.6964C71.1901 51.8021 71.6712 51.7421 72.09 51.527L72.4269 51.3326C72.7859 51.1026 73.0621 50.7635 73.215 50.3649L73.549 49.3675C73.7686 48.7075 73.8783 48.3775 74.1397 48.1888C74.4011 48 74.7483 48 75.4426 48H76.5574C77.2518 48 77.599 48 77.8603 48.1888C78.1217 48.3775 78.2315 48.7075 78.4511 49.3675L78.785 50.3649C78.9379 50.7635 79.2141 51.1026 79.5732 51.3326L79.9101 51.527C80.3288 51.7421 80.81 51.8021 81.2686 51.6964L82.4888 51.3527C83.2071 51.1488 83.5663 51.0469 83.8839 51.1761C84.2015 51.3052 84.3881 51.6291 84.7614 52.277L85.255 53.1336C85.6049 53.7408 85.7798 54.0445 85.7459 54.3677C85.7119 54.6909 85.4777 54.9514 85.0093 55.4723L83.9782 56.625C83.7263 56.944 83.5473 57.5 83.5473 57.9998C83.5473 58.5 83.7262 59.0558 83.9782 59.3749L85.0093 60.5276C85.4777 61.0485 85.7119 61.309 85.7459 61.6322C85.7798 61.9555 85.6049 62.2591 85.255 62.8663L84.7614 63.7229C84.3881 64.3707 84.2015 64.6947 83.8839 64.8238C83.5663 64.953 83.2071 64.8511 82.4888 64.6472L81.2686 64.3035C80.8099 64.1977 80.3287 64.2578 79.9099 64.473L79.5731 64.6674C79.214 64.8974 78.9379 65.2364 78.7851 65.635L78.4511 66.6325C78.2315 67.2925 78.1217 67.6225 77.8603 67.8112C77.599 68 77.2518 68 76.5574 68H75.4426C74.7483 68 74.4011 68 74.1397 67.8112C73.8783 67.6225 73.7686 67.2925 73.549 66.6325" stroke="white" stroke-width="2" stroke-linecap="round"/>
                <path d="M66.7389 64.7798C67.8189 63.6998 71.4909 60.0638 71.8509 59.6438C72.2315 59.1998 71.9229 58.5998 72.1065 56.7398C72.1953 55.8398 72.3889 55.1656 72.9429 54.6638C73.6029 54.0398 74.1429 54.0398 76.0029 53.9978C77.6229 54.0398 77.8149 53.8598 77.9829 54.2798C78.1029 54.5798 77.7429 54.7598 77.3109 55.2398C76.3509 56.1998 75.7869 56.6798 75.7329 56.9798C75.3429 58.2998 76.8789 59.0798 77.7189 58.2398C78.0366 57.9221 79.5069 56.4398 79.6509 56.3198C79.7589 56.2238 80.0175 56.2284 80.1429 56.3798C80.2509 56.4859 80.2629 56.4998 80.2509 56.9798C80.2398 57.4241 80.2448 58.062 80.2461 58.7198C80.2479 59.5721 80.2029 60.5198 79.8429 60.9998C79.1229 62.0798 77.9229 62.1398 76.8429 62.1878C75.8229 62.2478 74.9829 62.1398 74.7189 62.3318C74.5029 62.4398 73.3629 63.6398 71.9829 65.0198L69.5229 67.4798C67.4829 69.0998 65.2389 66.5798 66.7389 64.7798Z" stroke="white" stroke-width="1.5" stroke-linecap="round"/>
                </g>
                <defs>
                <filter id="filter0_b_5289_76228" x="44" y="26" width="64" height="64" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                <feGaussianBlur in="BackgroundImageFix" stdDeviation="4"/>
                <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_5289_76228"/>
                <feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_5289_76228" result="shape"/>
                </filter>
                </defs>
                </svg>
               <p class="text-sm text-gray-500">No Materials Found</p>
            </div>
          </div>

          <div v-if="activeMaterial"
            class="hidden h-96 w-1/2 flex-none flex-col divide-y divide-gray-100 overflow-y-auto sm:flex">
            <div class="flex-none p-6 text-center">
              <img src="@/assets/icons/lecture.svg" alt="" class="mx-auto h-16 w-16 rounded-full" />
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
                <!-- <dt class="col-end-1 font-semibold text-gray-900">Session</dt>
                  <dd>{{ activeMaterial.session }}</dd> -->
              </dl>
              <div class="" v-if="activeMaterial.fileUrls && activeMaterial.fileUrls.length > 0">
                <p class="text-sm font-medium mb-2">Materials:</p>
                <ul>
                  <li v-for="(url, index) in activeMaterial.fileUrls" :key="index">
                    <a :href="url" target="_blank" class="block flex text-sm items-center gap-x-1 font-semibold mt-2 text-indigo-600 hover:underline">
                      <svg xmlns="http://www.w3.org/2000/svg" width="26" height="20" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 15v4c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2v-4M17 9l-5 5-5-5M12 12.8V2.5"/></svg>
                      Download Material {{ index + 1 }}
                    </a>
                  </li>
                </ul>
              </div>
              <p v-else class="mt-6 text-sm text-gray-600">No materials available for download.</p>

              <!-- <a
                  :href="activeMaterial.fileUrls"
                  target="_blank"
                  class="mt-6 w-full rounded-md bg-indigo-600 px-3 text-center py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Download Material
                </a> -->
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