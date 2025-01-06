<!-- components/ContextMenu.vue -->
<template>
    <div v-if="show" class="fixed z-50" :style="position">
      <div 
        class="bg-[#2C2C2C] rounded-lg shadow-lg py-1 min-w-[200px]"
        @click.stop
      >
        <slot>
          <button 
            v-for="item in items" 
            :key="item.label"
            class="w-full px-4 py-2 text-left hover:bg-[#363636] flex items-center gap-2"
            @click="item.action"
          >
            <component :is="item.icon" class="w-4 h-4" v-if="item.icon" />
            {{ item.label }}
          </button>
        </slot>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { computed } from 'vue'
  
  interface MenuItem {
    label: string
    action: () => void
    icon?: any
  }
  
  interface Props {
    show: boolean
    x: number
    y: number
    items: MenuItem[]
  }
  
  const props = defineProps<Props>()
  
  const position = computed(() => ({
    left: `${props.x}px`,
    top: `${props.y}px`
  }))
  </script>