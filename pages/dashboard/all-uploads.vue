<template>
  <nmain class="container mx-auto p-6">
    <div v-if="computedMaterials?.length && !loadingAllMaterials" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <!-- {{allMaterialsList}} -->
       <!-- {{ computedMaterials }} -->
      <div
        v-for="file in computedMaterials"
        :key="file._id"
        class="bg-white border-[0.5px] cursor-pointer border-gray-100 rounded-xl transform transition-transform duration-300 hover:scale-105"
        @click="openMaterialModal(file)"
      >
        <!-- <div class="aspect-video mb-4 rounded-lg overflow-hidden">
          <img
            v-if="getFileExtension(file?.fileUrl) === 'pdf'"
            src="@/assets/icons/pdf-file.svg"
            class="object-cover"
          />
          <img
            v-else
            :src="file.fileUrl"
            :alt="file.name"
            class="w-full h-full object-cover"
          />
        </div> -->
        <div v-if="file?.fileUrls.length" v-for="item in file?.fileUrls">
                                <!-- <img v-if="getFileExtension(item) === 'pdf'" src="@/assets/icons/pdf-file.svg"
                                    class="object-cover" /> -->
               <img
               :src="getFileIcon(item)"
               v-if="isIconNeeded(item)"
               class="object-cover h-32 w-full"
               />
          <img v-else :src="item" alt="Image File" class="w-32 h-32 object-cover">
                            </div>
        <div class="px-4 py-3">
          <div class="w-full flex justify-between items-center">
            <span
              class="text-xs border rounded-full px-3 py-1.5"
              :class="{
                'bg-yellow-200 text-yellow-800': file?.status === 'pending',
                'bg-green-200 text-green-800': file?.status === 'approved',
                'bg-red-200 text-red-800': file?.status === 'rejected',
              }"
            >
              {{ file?.status ?? "Nil" }}
            </span>
            <span class="text-sm text-gray-400 font-bold">{{ `${file?.academicLevel} Level` ?? "Nil" }}</span>
          </div>
          <div class="pt-5">
      <section class="flex justify-between items-center">
            <h3 class="font-medium truncate text-sm">{{ file.name }}</h3>
            <div v-if="file?.status === 'approved'" class="pt-4">
              <!-- {{ file }} -->
            <!-- <button
              class="text-xs flex items-center justify-center"
              @click.stop="downloadMaterial(file.fileUrl)"
            >
              <img src="@/assets/icons/download.svg" alt="download" class="h-7 w-7" />
            </button> -->
            <div v-for="fileUrl in file.fileUrls" :key="fileUrl" class="mb-4">
              <!-- <p>{{ file.name }}</p> -->
              <button
                class="text-xs flex items-center justify-center"
                @click.stop="downloadMaterial(fileUrl)"
              >
                <!-- <img :src="downloadIcon" alt="download" class="h-7 w-7" /> -->
                <img src="@/assets/icons/download.svg" alt="download" class="h-6 w-6" />
              </button>
            </div>
          </div>
      </section>
            <p class="text-xs">{{ file?.description ?? "Nil" }}</p>
          </div>
          <!-- <div v-if="file?.status === 'approved'" class="pt-4">
            <button
              class="text-xs flex items-center justify-center"
              @click.stop="downloadMaterial(file.fileUrl)"
            >
              <img src="@/assets/icons/download.svg" alt="download" class="h-7 w-7" />
            </button>
          </div> -->
        </div>
      </div>
    </div>
    <div v-else class="border-[0.5px] rounded-lg  py-10 flex justify-center flex-col gap-y-2 shadow items-center">
      <svg class="h-32 w-32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M18.5 20C18.5 20.275 18.276 20.5 18 20.5H12.2678C11.9806 21.051 11.6168 21.5557 11.1904 22H18C19.104 22 20 21.104 20 20V9.828C20 9.298 19.789 8.789 19.414 8.414L13.585 2.586C13.57 2.57105 13.5531 2.55808 13.5363 2.5452C13.5238 2.53567 13.5115 2.5262 13.5 2.516C13.429 2.452 13.359 2.389 13.281 2.336C13.2557 2.31894 13.2281 2.30548 13.2005 2.29207C13.1845 2.28426 13.1685 2.27647 13.153 2.268C13.1363 2.25859 13.1197 2.24897 13.103 2.23933C13.0488 2.20797 12.9944 2.17648 12.937 2.152C12.74 2.07 12.528 2.029 12.313 2.014C12.2933 2.01274 12.2738 2.01008 12.2542 2.00741C12.2271 2.00371 12.1999 2 12.172 2H6C4.896 2 4 2.896 4 4V11.4982C4.47417 11.3004 4.97679 11.1572 5.5 11.0764V4C5.5 3.725 5.724 3.5 6 3.5H12V8C12 9.104 12.896 10 14 10H18.5V20ZM13.5 4.621L17.378 8.5H14C13.724 8.5 13.5 8.275 13.5 8V4.621Z" fill="#212121"/>
      <path d="M12 17.5C12 20.5376 9.53757 23 6.5 23C3.46243 23 1 20.5376 1 17.5C1 14.4624 3.46243 12 6.5 12C9.53757 12 12 14.4624 12 17.5ZM2.5 17.5C2.5 18.3335 2.75495 19.1075 3.19112 19.7482L8.74822 14.1911C8.10751 13.755 7.33353 13.5 6.5 13.5C4.29086 13.5 2.5 15.2909 2.5 17.5ZM6.5 21.5C8.70914 21.5 10.5 19.7091 10.5 17.5C10.5 16.6665 10.245 15.8925 9.80888 15.2518L4.25178 20.8089C4.89249 21.245 5.66647 21.5 6.5 21.5Z" fill="#212121"/>
      </svg>
      <p class="text-gray-600">No documents available</p>
    </div>

    <!-- Material Modal -->
    <div
      v-if="selectedMaterial"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
    >
      <div class="bg-white rounded-lg shadow-lg w-11/12 sm:w-3/4 lg:w-1/2 p-6">
        <button class="text-gray-400 hover:text-gray-600 float-right" @click="closeMaterialModal">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>
        <h2 class="text-lg font-bold mb-4">{{ selectedMaterial.name }}</h2>
        <p class="text-sm text-gray-600 mb-4">{{ selectedMaterial.description }}</p>
        <!-- <div class="aspect-video rounded-lg overflow-hidden mb-4">
          <img
            v-if="getFileExtension(selectedMaterial?.fileUrl) === 'pdf'"
            src="@/assets/icons/pdf-file.svg"
            class="object-cover"
          />
          <img
            v-else
            :src="selectedMaterial.fileUrl"
            :alt="selectedMaterial.name"
            class="w-full h-full object-cover"
          />
        </div> -->
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
      <div v-if="selectedMaterial?.status === 'approved'" class="mt-4">
      <a :href="item" target="_blank" class="bg-blue-500 text-white rounded-full px-4 py-2 text-xs flex items-center justify-center hover:bg-blue-600">
        Download
      </a>
    </div>
    </section>
        <p class="text-sm text-gray-400">Academic Level: {{ selectedMaterial.academicLevel }} Level</p>
        <p class="text-sm text-gray-400">Status: {{ selectedMaterial.status }}</p>
        <!-- <div v-if="selectedMaterial?.status === 'approved'" class="mt-4">
          <button
            class="bg-blue-500 text-white rounded-full px-4 py-2 text-xs flex items-center justify-center hover:bg-blue-600"
            @click="downloadMaterial(selectedMaterial.fileUrl)"
          >
            Download
          </button>
        </div> -->
      </div>
    </div>

    <CoreFullScreenLoader
      :visible="loadingAllMaterials"
      class="z-50"
      text="Please wait while we fetch all materials..."
    />
  </nmain>
</template>

<script setup lang="ts">
import { useFileExtension } from "@/composables/core/useFileExtension";
import { useGetAllMaterials } from "@/composables/modules/materials/useGetAllMaterials";
import pdf from "@/assets/icons/pdfs-file.svg";
import doc from "@/assets/icons/doc-file.svg";
import docx from "@/assets/icons/docx-file.svg";
import pptx from "@/assets/icons/pptx-file.svg";
import txt from "@/assets/icons/txt-file.svg";
import xls from "@/assets/icons/xls-file.svg";
import xlsx from "@/assets/icons/xlsx-file.svg";
const {
  materials,
  loading: loadingAllMaterials,
  queryParams,
  getAllMaterials,
} = useGetAllMaterials();
const { getFileExtension } = useFileExtension();
const selectedMaterial = ref(null);


const isImage = (url) => /\.(jpeg|jpg|png|gif)$/i.test(url);
const isPDF = (url) => /\.pdf$/i.test(url);
const isWordDoc = (url) => /\.(doc|docx)$/i.test(url);
const isPowerPoint = (url) => /\.(ppt|pptx)$/i.test(url);
const isExcelSheet = (url) => /\.(xls|xlsx)$/i.test(url);
const isTextFile = (url) => /\.txt$/i.test(url);

function openMaterialModal(file) {
  selectedMaterial.value = file;
}

function closeMaterialModal() {
  selectedMaterial.value = null;
}

// function downloadMaterial(url) {
//   const link = document.createElement("a");
//   link.href = url;
//   link.download = "material"; // You can set a more descriptive name if needed
//   link.click();
// }

const downloadMaterial = (fileUrl) => {
  if (!fileUrl) {
    console.warn('Invalid file URL provided');
    return;
  }

  // Create an anchor element to trigger the download
  const anchor = document.createElement('a');
  anchor.href = fileUrl;
  anchor.download = fileUrl.split('/').pop(); // Suggest the file name from the URL
  anchor.target = '_blank';
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
};

const computedMaterials = computed(() => {
  return materials.value.filter((m: any) => m.status === 'approved');
});

definePageMeta({
  layout: "user",
});

// Function to map file extensions to icons
const getFileIcon = (fileUrl) => {
  const extension = getFileExtension(fileUrl);
  const icons = {
    pdf: pdf,
    doc: doc,
    docx: docx,
    pptx: pptx,
    xls: xls,
    xlsx: xlsx,
    // jpg: "@/assets/icons/image-file.svg",
    // jpeg: "@/assets/icons/image-file.svg",
    // png: "@/assets/icons/image-file.svg",
    // gif: "@/assets/icons/image-file.svg",
    txt: txt,
    // Add more mappings as needed
  };

  // Fallback for unsupported file types
  return icons[extension] || "@/assets/icons/default-file.svg";
};

// Function to determine if an icon should be shown
const isIconNeeded = (fileUrl) => {
  const supportedExtensions = ["pdf", "doc", "docx", "xls", "xlsx", "txt", 'pptx'];
  return supportedExtensions.includes(getFileExtension(fileUrl));
};
</script>

<style scoped>
/**** Add custom styling if needed ****/
</style>
