<template>
    <transition name="fade">
      <div v-if="visible" class="fixed inset-0 z-50 bg-gray-900 bg-opacity-90 flex items-center justify-center">
        <div class="bg-white rounded-lg shadow-lg w-96 p-6 transform transition-transform scale-95 animate-fade-in">
          <div class="flex flex-col items-center text-center">
            <div class="p-4 bg-red-100 rounded-full">
              <slot name="icon">
                <svg class="w-12 h-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2z"></path>
                </svg>
              </slot>
            </div>
            <h2 class="text-lg font-semibold mt-4">{{ title }}</h2>
            <p class="text-gray-600 mt-2">{{ description }}</p>
          </div>
          <div class="mt-10 flex justify-center space-x-4">
            <button @click="$emit('cancel')" class="px-4 py-2.5 text-sm w-full bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400">Cancel</button>
            <button @click="$emit('confirm')" class="px-4 py-2.5 text-sm w-full bg-red-500 text-white rounded-md hover:bg-red-600">Confirm</button>
          </div>
        </div>
      </div>
    </transition>
  </template>
  
  <script setup lang="ts">
  import { defineProps, defineEmits } from "vue";
  
  const props = defineProps<{ 
    visible: boolean;
    title: string;
    description: string;
  }>();
  
  const emit = defineEmits(["confirm", "cancel"]);
  </script>
  
  <style>
  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.3s ease-in-out;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
  </style>
  