<template>
  <div  v-if="show" class="relative z-50" aria-labelledby="slide-over-title" role="dialog" aria-modal="true">
  <!-- Background backdrop, show/hide based on slide-over state. -->
  <!-- <div class="fixed inset-0"></div> -->
  <div class="fixed inset-0 bg-gray-500/75 transition-opacity" aria-hidden="true"></div>

  <div class="fixed inset-0 overflow-hidden">
    <div class="absolute inset-0 overflow-hidden">
      <div class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
        <div :class="[size === 'sm' ? 'max-w-md' : 'max-w-2xl']" class="pointer-events-auto w-screen">
          <div class="flex h-full flex-col divide-y divide-gray-200 bg-white shadow-xl">
            <div class="flex min-h-0 flex-1 flex-col overflow-y-scroll py-6">
              <div class="px-4 sm:px-6">
                <div class="flex items-start justify-between">
                  <h2 class="text-base font-semibold text-gray-900" id="slide-over-title">{{ title }}</h2>
                  <div class="ml-3 flex h-7 items-center">
                    <button @click="emit('close')" type="button" class="relative rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                      <span class="absolute -inset-2.5"></span>
                      <span class="sr-only">Close panel</span>
                      <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                    </button>
                  </div>
                </div>
              </div>
              <div class="relative mt-6 flex-1 px-4 sm:px-6">
                 <slot name="content" />
              </div>
            </div>
            <div class="flex shrink-0 justify-end px-4 py-4">
              <slot name="actionBtn" />
              <!-- <button type="button" class="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:ring-gray-400">Cancel</button>
              <button type="submit" class="ml-4 inline-flex justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">Save</button> -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
    </div>
</template>

<script setup lang="ts">
 const props = defineProps({
    show: {
        type: Boolean
    },
    title: {
      type: String
    },
    size: {
      type: String,
      default: 'sm'
    }
 })

 const emit = defineEmits(['close'])
</script>

