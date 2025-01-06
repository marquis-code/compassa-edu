<!-- components/FolderCard.vue -->
<template>
    <div class="bg-[#242424] rounded-xl overflow-hidden group">
      <div class="relative">
        <img 
          :src="folder.thumbnail" 
          :alt="folder.name"
          class="w-full h-48 object-cover"
        >
        <button 
          class="absolute top-3 right-3 p-1 rounded-lg bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <EllipsisHorizontalIcon class="w-5 h-5" />
        </button>
      </div>
      
      <div class="p-4">
        <div class="flex justify-between items-start mb-2">
          <div>
            <h3 class="font-medium">{{ folder.name }}</h3>
            <p class="text-sm text-gray-400">
              {{ folder.itemCount }} {{ folder.type }} · {{ folder.size }}
            </p>
          </div>
        </div>
  
        <div class="flex items-center gap-1">
          <img 
            v-for="(collaborator, index) in folder.collaborators.slice(0, 3)"
            :key="index"
            :src="collaborator.avatar"
            alt="Collaborator"
            class="w-6 h-6 rounded-full border-2 border-[#242424] -ml-1 first:ml-0"
          >
          <span 
            v-if="folder.collaborators.length > 3"
            class="text-sm text-gray-400 ml-1"
          >
            +{{ folder.collaborators.length - 3 }}
          </span>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { EllipsisHorizontalIcon } from '@heroicons/vue/24/outline'
  
  interface FolderProps {
    folder: {
      id: string
      name: string
      type: string
      itemCount: number
      size: string
      thumbnail: string
      collaborators: { avatar: string }[]
    }
  }
  
  defineProps<FolderProps>()
  </script>