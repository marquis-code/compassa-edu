<template>
  <nmain class="container mx-auto p-6">
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <!-- {{allMaterialsList}} -->
      <div
        v-for="file in computedMaterials"
        :key="file.id"
        class="bg-white border-[0.5px] cursor-pointer border-gray-100 rounded-xl transform transition-transform duration-300 hover:scale-105"
        @click="openMaterialModal(file)"
      >
        <div class="aspect-video mb-4 rounded-lg overflow-hidden">
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
            <button
              class="text-xs flex items-center justify-center"
              @click.stop="downloadMaterial(file.fileUrl)"
            >
              <img src="@/assets/icons/download.svg" alt="download" class="h-7 w-7" />
            </button>
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
        <div class="aspect-video rounded-lg overflow-hidden mb-4">
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
        </div>
        <p class="text-sm text-gray-400">Academic Level: {{ selectedMaterial.academicLevel }} Level</p>
        <p class="text-sm text-gray-400">Status: {{ selectedMaterial.status }}</p>
        <div v-if="selectedMaterial?.status === 'approved'" class="mt-4">
          <button
            class="bg-blue-500 text-white rounded-full px-4 py-2 text-xs flex items-center justify-center hover:bg-blue-600"
            @click="downloadMaterial(selectedMaterial.fileUrl)"
          >
            Download
          </button>
        </div>
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
const {
  materials,
  loading: loadingAllMaterials,
  queryParams,
  getAllMaterials,
} = useGetAllMaterials();
const { getFileExtension } = useFileExtension();
const selectedMaterial = ref(null);

function openMaterialModal(file) {
  selectedMaterial.value = file;
}

function closeMaterialModal() {
  selectedMaterial.value = null;
}

function downloadMaterial(url) {
  const link = document.createElement("a");
  link.href = url;
  link.download = "material"; // You can set a more descriptive name if needed
  link.click();
}

const computedMaterials = computed(() => {
  return materials.value.filter((m: any) => m.status === 'approved');
});

definePageMeta({
  layout: "user",
});
</script>

<style scoped>
/**** Add custom styling if needed ****/
</style>
