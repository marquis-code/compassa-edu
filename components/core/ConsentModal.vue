<template>
    <!-- <CoreModal :visible="visible" @close="handleClose"> -->
      <div class="w-full max-w-lg mx-auto p-6">
        <div class="flex items-center justify-center mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        
        <h3 class="text-lg font-semibold text-center mb-2">File Upload Consent</h3>
        
        <p class="text-gray-600 text-center mb-6">
          By uploading this file, you agree that it will be stored in our database and accessible to other users. 
          This contribution will earn you compass points. Do you wish to proceed?
        </p>
  
        <div class="flex justify-center gap-3">
          <button 
            @click="handleClose" 
            class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Cancel
          </button>
          <button 
            @click="handleProceed"
            class="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
          >
            Proceed to Upload
          </button>
        </div>
      </div>
    <!-- </CoreModal> -->
  </template>
  
  <script setup lang="ts">
  const props = defineProps({
    visible: Boolean
  });
  
  const emit = defineEmits(['close', 'proceed']);
  
  const handleClose = () => {
    emit('close');
  };
  
  const handleProceed = () => {
    emit('proceed');
  };
  </script>