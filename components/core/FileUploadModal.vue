<!-- FileUploadModal.vue -->
<template>
    <!-- <CoreModal :visible="visible" @close="handleClose"> -->
      <div class="w-full max-w-2xl">
        <div class="">
          <h3 class="text-lg font-semibold mb-4">Upload Study Material</h3>
          
          <!-- File Preview Section -->
          <div v-if="selectedFile" class="mb-4">
            <div class="border rounded-lg p-4">
              <!-- Image Preview -->
              <img 
                v-if="isImage"
                :src="filePreview"
                class="max-w-full h-48 object-contain mx-auto"
                alt="File preview"
              />
              <!-- Document/Other File Preview -->
              <div v-else class="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
                <span class="text-sm">{{ selectedFile.name }}</span>
              </div>
            </div>
          </div>
  
          <!-- Form Fields -->
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700">Academic Session</label>
              <select v-model="formData.academicSession" class="mt-1 block w-full rounded-md border-[0.5px] py-3 text-sm pl-4 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
                <option value="">Select Session</option>
                <option v-for="year in academicYears" :key="year" :value="year">{{ year }}</option>
              </select>
            </div>
  
            <div>
              <label class="block text-sm font-medium text-gray-700">Semester</label>
              <select v-model="formData.semester" class="mt-1 block w-full rounded-md border-[0.5px] py-3 text-sm pl-4 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
                <option value="">Select Semester</option>
                <option value="1">First Semester</option>
                <option value="2">Second Semester</option>
              </select>
            </div>
  
            <div>
              <label class="block text-sm font-medium text-gray-700">Material Type</label>
              <select v-model="formData.materialType" class="mt-1 block w-full rounded-md border-[0.5px] py-3 text-sm pl-4 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
                <option value="">Select Type</option>
                <option value="notes">Notes</option>
                <option value="assignment">Assignment</option>
                <option value="past_question">Past Question</option>
                <option value="textbook">Textbook</option>
              </select>
            </div>
  
            <div class="flex justify-end gap-3 mt-6">
              <button 
                @click="handleClose" 
                class="px-4 py-3 w-full text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button 
                @click="handleUpload"
                :disabled="!isFormValid || uploading"
                class="px-4 py-3 text-sm w-full font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 disabled:bg-indigo-400"
              >
                {{ uploading ? 'Uploading...' : 'Upload' }}
              </button>
            </div>
          </div>
        </div>
      </div>
    <!-- </CoreModal> -->
  </template>
  
  <script setup lang="ts">
  import { ref, computed } from 'vue';
  
  const props = defineProps({
    visible: Boolean,
    selectedFile: File,
  });
  
  const emit = defineEmits(['close', 'upload']);
  
  const uploading = ref(false);
  const filePreview = ref('');
  const formData = ref({
    academicSession: '',
    semester: '',
    materialType: '',
  });
  
  // Generate academic years (current year - 5 to current year + 1)
  const academicYears = computed(() => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let i = currentYear - 5; i <= currentYear + 1; i++) {
      years.push(`${i}/${i + 1}`);
    }
    return years;
  });
  
  const isImage = computed(() => {
    return props.selectedFile?.type.startsWith('image/');
  });
  
  const isFormValid = computed(() => {
    return formData.value.academicSession && 
           formData.value.semester && 
           formData.value.materialType;
  });
  
  const handleClose = () => {
    emit('close');
  };
  
  const handleUpload = async () => {
    if (!isFormValid.value) return;
    
    uploading.value = true;
    try {
      emit('upload', {
        file: props.selectedFile,
        ...formData.value
      });
    } finally {
      uploading.value = false;
    }
  };
  
  // Create file preview when file is selected
  watch(() => props.selectedFile, (newFile) => {
    if (newFile && isImage.value) {
      const reader = new FileReader();
      reader.onload = (e) => {
        filePreview.value = e.target?.result as string;
      };
      reader.readAsDataURL(newFile);
    }
  });
  </script>