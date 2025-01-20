<template>
    <main class="grid grid-cols-12 gap-6">
      <!-- Form Section -->
      <div class="col-span-8">
        <form class="space-y-4" @submit.prevent="handleSaveToPreview">
          <!-- Existing form fields remain the same until the buttons section -->
          
          <!-- Previous form content remains unchanged -->
          
          <div class="flex justify-between items-center space-x-10 text-sm pt-8">
            <button 
              type="button"
              @click="emit('close')"
              class="px-6 py-3.5 text-sm border-[0.5px] border-gray-100 text-base w-full rounded-lg bg-gray-600 text-white font-medium"
            >
              Cancel
            </button>
            <button 
              type="submit"
              :disabled="uploading"
              class="px-6 w-full py-3.5 text-sm text-white text-base disabled:cursor-not-allowed disabled:opacity-25 bg-blue-600 rounded-lg hover:bg-blue-700 font-medium"
            >
              <span>Save to Preview</span>
            </button>
          </div>
        </form>
      </div>
  
      <!-- Preview Section -->
      <div class="col-span-4">
        <div class="bg-white rounded-lg p-6 shadow-sm space-y-4">
          <h2 class="text-lg font-semibold text-gray-900">Saved Materials Preview</h2>
          
          <!-- Preview Items -->
          <div class="space-y-4 max-h-[600px] overflow-y-auto">
            <div v-for="(item, index) in savedMaterials" :key="index" class="bg-gray-50 p-4 rounded-lg">
              <div class="flex justify-between items-start">
                <div>
                  <h3 class="font-medium text-gray-900">{{ item.name }}</h3>
                  <p class="text-sm text-gray-500 mt-1">{{ item.materialType }}</p>
                  <p class="text-sm text-gray-500">{{ item.academicLevel }} Level - {{ item.semester }} Semester</p>
                </div>
                <button 
                  @click="removeSavedItem(index)"
                  class="text-red-500 hover:text-red-700"
                >
                  <XMarkIcon class="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
  
          <!-- Submit All Button -->
          <div v-if="savedMaterials.length > 0" class="pt-4">
            <p class="text-sm text-gray-500 mb-2">{{ savedMaterials.length }} items ready to upload</p>
            <button 
              @click="handleSubmitAll"
              :disabled="uploading"
              class="w-full px-6 py-3.5 text-sm text-white bg-green-600 rounded-lg hover:bg-green-700 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span>{{ uploading ? 'Uploading...' : 'Submit All Materials' }}</span>
            </button>
          </div>
        </div>
      </div>
  
      <CoreFullScreenLoader :visible="uploadingFile" class="z-50" text="Please wait while we upload your file..." />
      <CoreFullScreenLoader :visible="uploading" class="z-50" text="Please wait while we save your files..." />
    </main>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from "vue";
  import { XMarkIcon } from "@heroicons/vue/24/outline";
  // ... (keep existing imports)
  
  // Add new refs for saved materials
  const savedMaterials = ref<any[]>([]);
  const STORAGE_KEY = 'saved_materials';
  
  // Load saved materials from localStorage on mount
  onMounted(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      savedMaterials.value = JSON.parse(saved);
    }
  });
  
  // Function to save current form data to preview
  const handleSaveToPreview = () => {
    const currentMaterial = {
      ...payload.value,
      timestamp: new Date().toISOString()
    };
    
    savedMaterials.value.push(currentMaterial);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(savedMaterials.value));
    
    // Reset form
    payload.value = {
      name: '',
      description: '',
      academicLevel: '',
      semester: '',
      materialType: '',
      session: '',
      category: '',
      fileUrls: []
    };
  };
  
  // Function to remove item from preview
  const removeSavedItem = (index: number) => {
    savedMaterials.value.splice(index, 1);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(savedMaterials.value));
  };
  
  // Function to submit all saved materials
  const handleSubmitAll = async () => {
    try {
      // Set the batch payload with all saved materials
      setBatchPayload(savedMaterials.value);
      
      // Call the upload materials endpoint
      await uploadMaterials();
      
      // Clear saved materials after successful upload
      savedMaterials.value = [];
      localStorage.removeItem(STORAGE_KEY);
      
      // Close the modal
      emit('close');
    } catch (error) {
      console.error('Error uploading materials:', error);
      // Handle error appropriately
    }
  };
  
  // Modified file upload handler to work with preview system
  async function handleFileSelect(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target && target.files && target.files.length > 0) {
      try {
        const files = Array.from(target.files);
        uploadingFile.value = true;
  
        const uploadedUrls = await Promise.all(
          files.map(async (file) => {
            try {
              const response = await uploadFile(file);
              return response.url;
            } catch (error) {
              console.error(`Error uploading file ${file.name}:`, error);
              return null;
            }
          })
        );
  
        const validUrls = uploadedUrls.filter((url): url is string => url !== null);
  
        if (validUrls.length > 0) {
          payload.value.fileUrls = validUrls;
        }
  
        uploadResponse.value = validUrls.map((url) => ({ url }));
      } catch (error) {
        console.error('Error uploading files:', error);
      } finally {
        uploadingFile.value = false;
      }
    }
  }
  </script>