<!-- components/core/CoreModal.vue -->
<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="visible" class="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6" role="dialog">
        <!-- Backdrop -->
        <div class="fixed inset-0 bg-black bg-opacity-50 transition-opacity" @click="handleBackdropClick"></div>

        <!-- Modal -->
        <div 
          class="relative w-full max-w-lg transform overflow-hidden rounded-lg bg-white shadow-xl transition-all"
          @click.stop
        >
          <!-- Close button -->
          <button 
            @click="emit('close')"
            class="absolute right-4 top-4 text-gray-400 hover:text-gray-500 focus:outline-none"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <!-- Modal content -->
          <div class="bg-white p-6">
            <slot></slot>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from "vue";

const props = defineProps({
  visible: {
    type: Boolean,
    required: true
  },
  closeOnBackdrop: {
    type: Boolean,
    default: true
  }
});

const emit = defineEmits(["close"]);

// Handle backdrop click
const handleBackdropClick = () => {
  if (props.closeOnBackdrop) {
    emit("close");
  }
};

// Handle escape key
const handleEscape = (e: KeyboardEvent) => {
  if (e.key === "Escape" && props.visible) {
    emit("close");
  }
};

// Add and remove event listeners
onMounted(() => {
  document.addEventListener("keydown", handleEscape);
});

onUnmounted(() => {
  document.removeEventListener("keydown", handleEscape);
});
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active .bg-white,
.modal-leave-active .bg-white {
  transition: transform 0.3s ease-out;
}

.modal-enter-from .bg-white,
.modal-leave-to .bg-white {
  transform: scale(0.95);
}
</style>
