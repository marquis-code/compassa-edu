<template>
  <div class="w-full max-w-2xl">
    <div>
      <h3 class="text-lg font-semibold mb-4">Upload Study Material</h3>

      <!-- File Preview Section -->
      <div v-if="selectedFile" class="mb-4">
        <div class="border rounded-lg p-4">
          <!-- Image Preview -->
          <img
            v-if="isImage && uploadResponse?.url"
            :src="uploadResponse.url"
            class="max-w-full h-48 object-contain mx-auto"
            alt="File preview"
          />
          <div v-else class="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-8 w-8 text-gray-500"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
              />
            </svg>
            <span class="text-sm">{{ selectedFile.name }}</span>
          </div>
        </div>
      </div>

      <!-- Form Fields -->
      <div class="grid grid-cols-2 gap-3">
        <div>
          <label class="block text-sm font-medium text-gray-700">Level</label>
          <select
            v-model="formData.academicLevel"
            class="mt-1 block w-full rounded-md border-[0.5px] py-3.5 text-sm pl-4 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="">Select Level</option>
            <option v-for="(year, idx) in academicLevelArray" :key="idx" :value="year.key">
              {{ year.label }}
            </option>
          </select>
        </div>

        <div class="space-y-2">
                    <label class="text-sm font-medium text-gray-700">Category</label>
                    <select v-model="formData.category"
                    class="mt-1 block w-full rounded-md border-[0.5px] py-3.5 text-sm pl-4 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
                      <option value="">Select Category</option>
                      <option v-for="category in categories" :key="category._id" :value="category._id">
                        {{ category.name }}
                      </option>
                    </select>
                  </div>

        <div>
          <label class="block text-sm font-medium text-gray-700">Semester</label>
          <select
            v-model="formData.semester"
             class="mt-1 block w-full rounded-md border-[0.5px] py-3.5 text-sm pl-4 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="">Select Semester</option>
            <option v-for="(item, idx) in semesterArray" :key="idx" :value="item.key">{{ item.label }}</option>
          </select>
        </div>


        <div>
                        <label class="block text-sm font-medium mb-2">Session</label>
                        <!-- {{sessions}} -->
                        <select v-model="formData.session"
                          class="mt-1 block w-full rounded-md border-[0.5px] py-3.5 text-sm pl-4 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                          required>
                          <option value="">Select session</option>
                          <option v-for="item in sessions.data" :key="item.key" :value="item._id">
                            {{ item.name }}
                          </option>
                        </select>
                      </div>
      </div>
      <div>
          <label class="block text-sm font-medium text-gray-700">Material Type</label>
          <select
            v-model="formData.materialType"
             class="mt-1 block w-full rounded-md border-[0.5px] py-3.5 text-sm pl-4 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="">Select Type</option>
            <option v-for="(item, idx) in materialTypeArray" :key="idx" :value="item.key">{{ item.label }}</option>
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
            :disabled="!isFormValid || loading"
            class="px-4 py-3 text-sm w-full font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 disabled:bg-indigo-400"
          >
            {{ loading ? "Uploading..." : "Upload" }}
          </button>
        </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useGetCategories } from '@/composables/modules/category/useFetchCategories'
import { useGetSessions } from '@/composables/modules/session/useFetchSessions'
const { sessions, loading: fetchingSessions } = useGetSessions()
const { categories, loading: fetchingCategories } = useGetCategories()
import { useUploadFile } from '@/composables/core/useFileUpload'

interface FormData {
  academicLevel: string;
  session: string;
  semester: string;
  category: string;
  materialType: string;
}

const semesterArray = ref([
  { label: "First Semester", key: "first" },
  { label: "Second Semester", key: "second" },
])


const materialTypeArray = ref([
  { label: "Lecturers slide", key: "lecture_note" },
  { label: "Personal notes", key: "personal_note" },
  { label: "Drawings and diagrams", key: "drawings_and_diagrams" },
  { label: "Textbooks", key: "textbook" },
  { label: "Research Paper", key: "research_paper" },
  { label: "Assignment", key: "assignment" },
  { label: "Project Report", key: "project_report" },
  { label: "Exam Past Question", key: "exam_past_question" },
  { label: "Lab Manual", key: "lab_manual" },
  { label: "Study guide/Scheme of work", key: "study_guide" },
  { label: "Presentation Slides", key: "presentation_slides" },
  { label: "Article", key: "article" },
  { label: "Case Study", key: "case_study" },
  { label: "Thesis", key: "thesis" },
  { label: "Dissertation", key: "dissertation" },
  { label: "Tutorial Video", key: "tutorial_video" },
  { label: "Reference Material", key: "reference_material" },
])

const academicLevelArray = ref([
  { label: "100 Level", key: "100" },
  { label: "200 Level", key: "200" },
  { label: "300 Level", key: "300" },
  { label: "400 Level", key: "400" },
  { label: "500 Level", key: "500" },
  { label: "600 Level", key: "600" },
]);

interface Props {
  visible: boolean;
  selectedFile: File | null;
}

const props = withDefaults(defineProps<Props>(), {
  visible: false,
  selectedFile: null,
})

const emit = defineEmits<{
  (e: 'close'): void;
  (e: 'upload', data: { response: any } & FormData): void;
}>()

const { uploadFile, loading, uploadResponse } = useUploadFile()

const formData = ref<FormData>({
  session: '',
  semester: '',
  materialType: '',
  academicLevel: '',
  category: ''
})

const academicYears = computed(() => {
  const currentYear = new Date().getFullYear()
  const years: string[] = []
  for (let i = currentYear - 5; i <= currentYear + 1; i++) {
    years.push(`${i}/${i + 1}`)
  }
  return years
})

const isImage = computed(() => {
  return props.selectedFile?.type.startsWith('image/')
})

const isFormValid = computed(() => {
  return (
    formData.value.session &&
    formData.value.semester &&
    formData.value.materialType &&
    formData.value.academicLevel &&
    formData.value.category &&
    props.selectedFile
  )
})

const handleClose = () => {
  emit('close')
}

// Watch for file selection and upload immediately
watch(() => props.selectedFile, async (newFile) => {
  if (newFile) {
    await uploadFile(newFile)
  }
}, { immediate: true })

const handleUpload = async () => {
  if (!isFormValid.value || !props.selectedFile) return

  emit('upload', {
    response: uploadResponse.value,
    ...formData.value,
  })
}
</script>