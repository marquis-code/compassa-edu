<template>
    <main>
        <section class="w-full grid lg:grid-cols-2 gap-6 flex gap-x-6">
            <form class="space-y-3 rounded border-[0.5px] border-gray-100 p-3" @submit.prevent="handleSaveToPreview">
                <section class="space-y-4">
          <div class="grid lg:grid-cols-2 gap-6">
            <div>
                <label class="block text-sm font-medium mb-1 text-gray-700">Material Name</label>
                <input
                    v-model="payload.name"
                    type="text"
                    class="w-full bg-gray-50 border-[0.5px] border-gray-100 outline-none rounded-lg px-4 py-3.5 text-sm text-base"
                    required
                />
                </div>

                <div>
                <label class="block text-sm font-medium mb-1 text-gray-700">Lecturer Name</label>
                <input 
                    v-model="payload.lecturer"
                    type="text"
                    class="w-full bg-gray-50 border-[0.5px] border-gray-100 outline-none rounded-lg px-4 py-3.5 text-sm text-base"
                    required
                />
                </div>
          </div>
        
                <div>
                <label class="block text-sm font-medium mb-1 text-gray-700">Description</label>
                <textarea
                    v-model="payload.description"
                    class="w-full bg-gray-50 border-[0.5px] border-gray-100 h-32 resize-none outline-none rounded-lg px-4 py-3.5 text-sm text-base"
                ></textarea>
                </div>
        
            <div class="grid lg:grid-cols-2 gap-6">
            <div>
                <label class="block text-sm font-medium mb-1 text-gray-700">Academic Level</label>
                <select
                    v-model="payload.academicLevel"
                    class="w-full text-base bg-gray-50 border-[0.5px] border-gray-100 outline-none rounded-lg px-4 py-3.5 text-sm"
                    required
                >
                    <option value="">Select academic level</option>
                    <option
                    v-for="item in academicLevelArray"
                    :key="item.key"
                    :value="item.key"
                    >
                    {{ item.label }}
                    </option>
                </select>
                </div>
        
                <div>
                <label class="block text-sm font-medium mb-1 text-gray-700">Academic Semester</label>
                <select
                    v-model="payload.semester"
                    class="w-full text-base bg-gray-50 border-[0.5px] border-gray-100 outline-none rounded-lg px-4 py-3.5 text-sm"
                    required
                >
                    <option value="">Select semester</option>
                    <option v-for="item in semesterArray" :key="item.key" :value="item.key">
                    {{ item.label }}
                    </option>
                </select>
                </div>
            </div>
        
            <div class="grid lg:grid-cols-2 gap-6 w-full">
                <div class="w-full">
                <label class="block text-sm font-medium mb-1 text-gray-700">Material Type</label>
                <select
                    v-model="payload.materialType"
                    class="w-full text-base bg-gray-50 border-[0.5px] border-gray-100 outline-none rounded-lg px-4 py-3.5 text-sm"
                    required
                >
                    <option value="">Select material type</option>
                    <option
                    v-for="item in materialTypeArray"
                    :key="item.key"
                    :value="item.key"
                    >
                    {{ item.label }}
                    </option>
                </select>
                </div>
        
                <div class="w-full">
                <label class="block text-sm font-medium mb-1 text-gray-700">Material Session</label>
                <select
                    v-model="payload.session"
                    class="w-full text-base bg-gray-50 border-[0.5px] border-gray-100 outline-none rounded-lg px-4 py-3.5 text-sm"
                    required
                >
                    <option value="">Select session</option>
                    <option
                    v-for="item in sessions.data"
                    :key="item.key"
                    :value="item._id"
                    >
                    {{ item.name }}
                    </option>
                </select>
                </div>
            </div>
        
            <div class="w-full">
                <label class="block text-sm font-medium mb-1 text-gray-700">Material Category</label>
                <select
                    v-model="payload.category"
                    class="w-full text-base bg-gray-50 border-[0.5px] border-gray-100 outline-none rounded-lg px-4 py-3.5 text-sm"
                    required
                >
                    <option value="">Select category</option>
                    <option
                    v-for="item in categories"
                    :key="item.key"
                    :value="item._id"
                    >
                    {{ item.name }}
                    </option>
                </select>
                </div>
        
                <div>
                <label class="block text-sm font-medium mb-1 text-gray-700">File</label>
                <div
                    @dragover.prevent="dragover = true"
                    @dragleave.prevent="dragover = false"
                    @drop.prevent="handleFileDrop"
                    :class="[
                    'border-2 border-dashed rounded-lg text-center transition-colors min-h-[250px] flex items-center justify-center',
                    dragover ? 'border-blue-500 bg-blue-500/10' : 'border-gray-300',
                    formData.file ? 'bg-green-500/10 border-green-500' : '',
                    ]"
                    @click="$refs.fileInput.click()"
                >
                <!-- {{ payload.fileUrls }} dddddd -->
                <div v-if="payload.fileUrls?.length" class="w-full grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          <!-- Map through the uploaded files -->
          <div 
            v-for="(file, index) in payload.fileUrls" 
            :key="index" 
            class="w-full mb-4"
          >
            <img 
               v-if="!isIconNeeded(file)"
              class="w-full h-[250px] object-cover rounded-lg" 
              :src="file" 
            />
            <img 
              v-else 
               :src="getFileIcon(file)" 
              class="w-full h-[250px] object-contain p-8" 
            />
          </div>
        </div>
                <!-- <div v-if="payload.fileUrls?.length" class="w-full grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div 
                    v-for="(file, index) in payload.fileUrls" 
                    :key="index" 
                    class="w-full mb-4"
                    >
                    <img 
                        v-if="!['pdf', 'docx'].includes(getFileExtension(file))" 
                        class="w-full h-[250px] object-cover rounded-lg" 
                        :src="file" 
                    />
                    <img 
                        v-else 
                        src="@/assets/icons/pdf-file.svg"  
                        class="w-full h-[250px] object-contain p-8" 
                    />
                    </div>
                </div> -->
                    <!-- <div v-if="payload.fileUrls?.length" class="w-full h-full">
                    <img
                        v-if="
                        !['pdf', 'docx'].includes(getFileExtension(uploadResponse.url))
                        "
                        class="w-full h-[250px] object-cover rounded-lg"
                        :src="uploadResponse.url"
                    />
                    <img
                        v-else
                        src="@/assets/icons/pdf-file.svg"
                        class="w-full h-[250px] object-contain p-8"
                    />
                    </div> -->
                    <div
                    v-else
                    class="text-gray-400 flex flex-col items-center justify-center p-8"
                    >
                    <img src="@/assets/icons/file-upload.svg" class="h-10 w-16 mb-4" />
                    <p class="text-base max-w-sm text-center">
                        Drag and drop your file here, or click to select
                    </p>
                    </div>
                    <input
                    type="file"
                    ref="fileInput"
                    class="hidden"
                    multiple
                    @change="handleFileSelect"
                    required
                    />
                </div>
                </div>
            </section>
            <!-- <div class="flex justify-between items-center space-x-10 text-sm pt-8">
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
                            <span>{{ uploading ? 'uploading..' : 'Submit' }}</span>
                            </button>
            </div> -->
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
                    class="px-6 w-full py-3.5 text-sm text-white bg-green-600 rounded-lg hover:bg-green-700 text-base disabled:cursor-not-allowed disabled:opacity-25 bg-blue-600 rounded-lg hover:bg-blue-700 font-medium"
                    >
                    <span>Save to Preview</span>
                    </button>
                </div>
            </form>
            <div class="rounded border-[0.5px] border-gray-100 p-3">
                <div class="bg-white rounded-lg p-6 shadow-sm space-y-4">
            <div class="flex justify-center items-center flex-col">
                <svg width="152" height="124" viewBox="0 0 152 124" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="76" cy="58" r="52" fill="#EAEAEA"/>
                    <circle cx="21" cy="25" r="5" fill="#BDBDBD"/>
                    <circle cx="18" cy="109" r="7" fill="#BDBDBD"/>
                    <circle cx="145" cy="41" r="7" fill="#BDBDBD"/>
                    <circle cx="134" cy="14" r="4" fill="#BDBDBD"/>
                    <g filter="url(#filter0_b_5517_93034)">
                    <rect x="52" y="34" width="48" height="48" rx="24" fill="#9D9D9D"/>
                    <path d="M67.3438 62.1961L80.1727 49.3672M82.6296 57.0541L80.4302 59.2536M78.5529 61.1084L77.5742 62.0871" stroke="white" stroke-width="2" stroke-linecap="round"/>
                    <path d="M67.1747 62.1411C65.6084 60.5749 65.6084 58.0355 67.1747 56.4693L74.4693 49.1747C76.0355 47.6084 78.5749 47.6084 80.1411 49.1747L84.8253 53.8589C86.3916 55.4251 86.3916 57.9645 84.8253 59.5307L77.5307 66.8253C75.9645 68.3916 73.4251 68.3916 71.8589 66.8253L67.1747 62.1411Z" stroke="white" stroke-width="1.5"/>
                    <path d="M68 68H84" stroke="white" stroke-width="1.5" stroke-linecap="round"/>
                    </g>
                    <defs>
                    <filter id="filter0_b_5517_93034" x="44" y="26" width="64" height="64" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                    <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                    <feGaussianBlur in="BackgroundImageFix" stdDeviation="4"/>
                    <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_5517_93034"/>
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_5517_93034" result="shape"/>
                    </filter>
                    </defs>
                    </svg>

                <h2 class="text-base font-semibold text-gray-900">Saved Materials Preview</h2>
                <p class="text-center text-sm text-gray-400">No Materials to preview</p>
            </div>
                
                <!-- Preview Items -->
                <div class="space-y-4 max-h-[600px] overflow-y-auto">
                    <div v-for="(item, index) in savedMaterials" :key="index" class="bg-gray-50 p-4 rounded-lg">
                    <div class="flex justify-between items-start">
                        <div>
                        <h3 class="font-medium text-gray-900">{{ item.name }}</h3>
                        <p class="text-sm text-gray-500 mt-1">{{ item.materialType }}</p>
                        <p class="text-sm text-gray-500 mt-1">{{ item.lecturer }}</p>
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
            <!-- <section class=" rounded border-[0.5px] border-gray-100 p-3">
                <div class="flex justify-center items-center flex-col pt-32">
                    <svg width="152" height="124" viewBox="0 0 152 124" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="76" cy="58" r="52" fill="#EAEAEA"/>
                        <circle cx="21" cy="25" r="5" fill="#BDBDBD"/>
                        <circle cx="18" cy="109" r="7" fill="#BDBDBD"/>
                        <circle cx="145" cy="41" r="7" fill="#BDBDBD"/>
                        <circle cx="134" cy="14" r="4" fill="#BDBDBD"/>
                        <g filter="url(#filter0_b_5517_93034)">
                        <rect x="52" y="34" width="48" height="48" rx="24" fill="#9D9D9D"/>
                        <path d="M67.3438 62.1961L80.1727 49.3672M82.6296 57.0541L80.4302 59.2536M78.5529 61.1084L77.5742 62.0871" stroke="white" stroke-width="2" stroke-linecap="round"/>
                        <path d="M67.1747 62.1411C65.6084 60.5749 65.6084 58.0355 67.1747 56.4693L74.4693 49.1747C76.0355 47.6084 78.5749 47.6084 80.1411 49.1747L84.8253 53.8589C86.3916 55.4251 86.3916 57.9645 84.8253 59.5307L77.5307 66.8253C75.9645 68.3916 73.4251 68.3916 71.8589 66.8253L67.1747 62.1411Z" stroke="white" stroke-width="1.5"/>
                        <path d="M68 68H84" stroke="white" stroke-width="1.5" stroke-linecap="round"/>
                        </g>
                        <defs>
                        <filter id="filter0_b_5517_93034" x="44" y="26" width="64" height="64" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                        <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                        <feGaussianBlur in="BackgroundImageFix" stdDeviation="4"/>
                        <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_5517_93034"/>
                        <feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_5517_93034" result="shape"/>
                        </filter>
                        </defs>
                        </svg>

                    <p>No Materials Available for preview</p>
                </div>
            </section> -->
        </section>
  
      <CoreFullScreenLoader :visible="uploadingFile" class="z-50" text="Please wait while we upload your file..." />
      <CoreFullScreenLoader :visible="uploading" class="z-50" text="Please wait while we save your file..." />
      <CoreFullScreenLoader :visible="processing" class="z-50" text="Please wait while we process batch upload..." />
    </main>
  </template>
  
  <script setup lang="ts">
  import { ref } from "vue";
  import { useBatchUploadFile } from "@/composables/core/useBatchUpload";
  import { useGetAllMaterials } from "@/composables/modules/materials/useGetAllMaterials";
  import { useUploadMaterial } from "@/composables/modules/materials/useUploadMaterial";
  import { useUser } from "@/composables/auth/user";
  import { useGetUserMaterials } from "@/composables/modules/materials/useGetUserMaterials";
  import { useFileExtension } from "@/composables/core/useFileExtension";
  import { useGetSessions } from '@/composables/modules/session/useFetchSessions'
  const { sessions, loading:fetchingSessions  } = useGetSessions()
  import { useGetCategories } from '@/composables/modules/category/useFetchCategories'
  const { categories, loading:fetchingCategories  } = useGetCategories()
  import { useBatchUploadMaterials } from '@/composables/modules/materials/useBatchUploadMaterial'
  import pdf from "@/assets/icons/pdfs-file.svg";
import doc from "@/assets/icons/doc-file.svg";
import docx from "@/assets/icons/docx-file.svg";
import pptx from "@/assets/icons/pptx-file.svg";
import txt from "@/assets/icons/txt-file.svg";
import xls from "@/assets/icons/xls-file.svg";
import xlsx from "@/assets/icons/xlsx-file.svg";
  
  const { getFileExtension } = useFileExtension();
  const { user } = useUser();
  const { materials, loading } = useGetUserMaterials();
  const { uploadMaterial, uploading, payload, setPayload } = useUploadMaterial();
  const { uploadFiles, loading: uploadingFile, uploadResponse } = useBatchUploadFile();
  const { uploadBatchMaterials, processing, batchPayloadObj, setBatchPayload } = useBatchUploadMaterials()
  const {
    materials: allMaterialsList,
    loading: loadingAllMaterials,
    queryParams,
    getAllMaterials,
  } = useGetAllMaterials();
  import {
    Dialog,
    DialogPanel,
    DialogTitle,
    TransitionRoot,
    TransitionChild,
  } from "@headlessui/vue";
  import {
    HomeIcon,
    FolderIcon,
    UsersIcon,
    Cog6ToothIcon as CogIcon,
    PlusIcon,
    DocumentIcon,
    UserGroupIcon,
    BuildingOfficeIcon as BuildingIcon,
    MagnifyingGlassIcon,
  } from "@heroicons/vue/24/outline";
  const emit = defineEmits(['close'])

  // Interface for Material
interface Material {
  name: string;
  description: string;
  fileUrls: any[];
  academicLevel: string;
  semester: string;
  materialType: string;
  category: string;
  session: string;
  lecturer: string;
  comment?: string;
}

// Interface for the batch payload
interface BatchPayload {
  materials: Material[];
}

// Helper function to get material type label
const getMaterialTypeLabel = (key: string): string => {
  const material = materialTypeArray.value.find(m => m.key === key);
  return material?.label || key;
};

// Helper function to get semester label
const getSemesterLabel = (key: string): string => {
  const semester = semesterArray.value.find(s => s.key === key);
  return semester?.label || key;
};
  
  const savedMaterials = ref<any[]>([]);
const STORAGE_KEY = 'saved_materials';
  const showDrawer = ref(false);

  // Load saved materials from localStorage on mount
onMounted(() => {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    savedMaterials.value = JSON.parse(saved);
  }
});
  
  definePageMeta({
    layout: "user",
  });

  // Function to map file extensions to icons
const getFileIcon = (fileUrl) => {
  console.log(fileUrl, 'getting file icon utl')
  const extension = getFileExtension(fileUrl);
  const icons = {
    pdf: pdf,
    doc: doc,
    docx: docx,
    pptx: pptx,
    xls: xls,
    xlsx: xlsx,
    // jpg: "@/assets/icons/image-file.svg",
    // jpeg: "@/assets/icons/image-file.svg",
    // png: "@/assets/icons/image-file.svg",
    // gif: "@/assets/icons/image-file.svg",
    txt: txt,
    // Add more mappings as needed
  };

  // Fallback for unsupported file types
  return icons[extension] || "@/assets/icons/default-file.svg";
};

// Function to determine if an icon should be shown
const isIconNeeded = (fileUrl) => {
  const supportedExtensions = ["pdf", "doc", "docx", "xls", "xlsx", "txt", 'pptx'];
  return supportedExtensions.includes(getFileExtension(fileUrl));
};


  // Function to save current form data to preview
// const handleSaveToPreview = () => {
//   const currentMaterial = {
//     ...payload.value,
//     timestamp: new Date().toISOString()
//   };
  
//   savedMaterials.value.push(currentMaterial);
//   localStorage.setItem(STORAGE_KEY, JSON.stringify(savedMaterials.value));
  
//   // Reset form
//   payload.value = {
//     name: '',
//     description: '',
//     academicLevel: '',
//     semester: '',
//     materialType: '',
//     session: '',
//     category: '',
//     fileUrls: []
//   };
// };

// Function to save current form data to preview
const handleSaveToPreview = () => {
  const currentMaterial: Material = {
    name: payload.value.name,
    description: payload.value.description,
    fileUrls: payload.value.fileUrls || [],
    academicLevel: payload.value.academicLevel,
    semester: payload.value.semester,
    materialType: payload.value.materialType,
    category: payload.value.category,
    session: payload.value.session,
    comment: payload.value.comment || '',
    lecturer: payload.value.lecturer || ''
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
    fileUrls: [],
    comment: '',
    lecturer: ''
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
    const batchPayload: BatchPayload = {
      materials: savedMaterials.value
    };
    
    // Set the batch payload with the correct format
    setBatchPayload(batchPayload);
    
    // Call the upload materials endpoint
    await uploadBatchMaterials('admin');
    
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


// // Function to remove item from preview
// const removeSavedItem = (index: number) => {
//   savedMaterials.value.splice(index, 1);
//   localStorage.setItem(STORAGE_KEY, JSON.stringify(savedMaterials.value));
// };

// // Function to submit all saved materials
// const handleSubmitAll = async () => {
//   try {
//     // Set the batch payload with all saved materials
//     setBatchPayload(savedMaterials.value);
    
//     // Call the upload materials endpoint
//     await uploadBatchMaterials();
    
//     // Clear saved materials after successful upload
//     savedMaterials.value = [];
//     localStorage.removeItem(STORAGE_KEY);
    
//     // Close the modal
//     emit('close');
//   } catch (error) {
//     console.error('Error uploading materials:', error);
//     // Handle error appropriately
//   }
// };

// Modified file upload handler to work with preview system
// async function handleFileSelect(event: Event) {
//   const target = event.target as HTMLInputElement;
//   if (target && target.files && target.files.length > 0) {
//     try {
//       const files = Array.from(target.files);
//       uploadingFile.value = true;

//       const uploadedUrls = await Promise.all(
//         files.map(async (file) => {
//           try {
//             const response = await uploadFiles(file);
//             return response.url;
//           } catch (error) {
//             console.error(`Error uploading file ${file.name}:`, error);
//             return null;
//           }
//         })
//       );

//       const validUrls = uploadedUrls.filter((url): url is string => url !== null);

//       if (validUrls.length > 0) {
//         payload.value.fileUrls = validUrls;
//       }

//       uploadResponse.value = validUrls.map((url) => ({ url }));
//     } catch (error) {
//       console.error('Error uploading files:', error);
//     } finally {
//       uploadingFile.value = false;
//     }
//   }
// }

async function handleFileSelect(event: Event) {
  const target = event.target as HTMLInputElement;
  if (target && target.files && target.files.length > 0) {
    try {
      const files = Array.from(target.files);
      uploadingFile.value = true;

      // Directly pass files to the `uploadFiles` function
      const response = await uploadFiles(files);

      if (response && Array.isArray(response)) {
        // Ensure response contains valid URLs
        const validUrls = response
          .map((res) => res.url)
          .filter((url): url is string => url !== undefined && url !== null);

        if (validUrls.length > 0) {
          payload.value.fileUrls = validUrls;
        }

        uploadResponse.value = validUrls.map((url) => ({ url }));
      } else {
        console.warn('Unexpected response format from uploadFiles');
      }
    } catch (error) {
      console.error('Error uploading files:', error);
    } finally {
      uploadingFile.value = false;
    }
  }
}


// Modified file upload handler to work with preview system
// async function handleFileSelect(event: Event) {
//   const target = event.target as HTMLInputElement;
//   if (target && target.files && target.files.length > 0) {
//     try {
//       const files = Array.from(target.files);
//       uploadingFile.value = true;

//       const uploadedUrls = await Promise.all(
//         files.map(async (file) => {
//           try {
//             const response = await uploadFile(file);
//             return response.url;
//           } catch (error) {
//             console.error(`Error uploading file ${file.name}:`, error);
//             return null;
//           }
//         })
//       );

//       const validUrls = uploadedUrls.filter((url): url is string => url !== null);

//       if (validUrls.length > 0) {
//         payload.value.fileUrls = validUrls;
//       }

//       uploadResponse.value = validUrls.map((url) => ({ url }));
//     } catch (error) {
//       console.error('Error uploading files:', error);
//     } finally {
//       uploadingFile.value = false;
//     }
//   }
// }
  
  interface NavigationItem {
    name: string;
    path: string;
    icon: any;
    count?: number;
  }
  
  interface ActionButton {
    name: string;
    type: "document" | "project" | "team" | "organization";
    icon: any;
  }
  
  // Interfaces
  interface UploadedFile {
    id: string;
    name: string;
    size: number;
    type: string;
    url: string;
  }
  
  interface Folder {
    id: string;
    name: string;
    type: string;
    itemCount: number;
    size: string;
    thumbnail: string;
    collaborators: { avatar: string }[];
  }
  
  // State
  const isSidebarOpen = ref(false);
  const dragover = ref(false);
  const uploadedFiles = ref<UploadedFile[]>([]);
  
  const actionButtons: ActionButton[] = [
    { name: "New document", type: "document", icon: DocumentIcon },
    { name: "New project", type: "project", icon: FolderIcon },
    { name: "New team", type: "team", icon: UserGroupIcon },
    { name: "New organization", type: "organization", icon: BuildingIcon },
  ];
  
  const tabs = ["Recent", "Favorites", "Shared", "External", "Archived"];
  const activeTab = ref("Recent");
  
  const isModalOpen = ref(false);
  const modalType = ref<"document" | "project">("document");
  const formData = ref({
    name: "",
    description: "",
    file: null as File | null,
  });
  
  const openModal = (type: "document" | "project") => {
    modalType.value = type;
    isModalOpen.value = true;
  };
  
  // File handling functions
  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };
  
  const createFilePreview = (file: File): Promise<string> => {
    return new Promise((resolve) => {
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target?.result as string);
        reader.readAsDataURL(file);
      } else {
        resolve("");
      }
    });
  };
  
  const handleFileDrop = async (event: DragEvent) => {
    dragover.value = false;
    const file = event.dataTransfer?.files[0];
    if (file) {
      formData.value.file = file;
    }
  };
  
  // const handleFileSelect = async (event: Event) => {
  //   const input = event.target as HTMLInputElement;
  //   if (input.files?.length) {
  //     const res = await uploadFile(input.files[0]);
  //     console.log(res, "here ooooooooo");
  //     payload.value.fileUrl = res.url;
  //   }
  //   // console
  //   // payload.value.fileUrl = res.url
  // };
  
//   async function handleFileSelect(event: Event) {
//     const target = event.target as HTMLInputElement;
//     if (target && target.files && target.files.length > 0) {
//       try {
//         const files = Array.from(target.files); // Get all files
//         uploadingFile.value = true; // Start loading spinner
  
//         // Process each file and upload individually
//         const uploadedUrls = await Promise.all(
//           files.map(async (file) => {
//             try {
//               const response = await uploadFile(file); // Call uploadFile for each file
//               return response.url; // Extract the URL from the response
//             } catch (error) {
//               console.error(`Error uploading file ${file.name}:`, error);
//               return null; // Handle failed uploads gracefully
//             }
//           })
//         );
  
//         // Filter out any null values from failed uploads
//         const validUrls = uploadedUrls.filter((url) => url !== null);
  
//         if (validUrls.length > 0) {
//           payload.value.fileUrls = validUrls; // Set the final array to payload.value.fileUrls
//         }
  
//         uploadResponse.value = validUrls.map((url) => ({ url })); // Update uploadResponse for UI mapping
//       } catch (error) {
//         console.error('Error uploading files:', error);
//       } finally {
//         uploadingFile.value = false; // Stop loading spinner
//       }
//     } else {
//       console.error('No files selected for upload');
//     }
//   }
  
  
  const closeModal = () => {
    isModalOpen.value = false;
    formData.value = {
      name: "",
      description: "",
      file: null,
    };
  };
  
  interface NavigationItem {
    name: string;
    path: string;
    icon: any;
    count?: number;
  }
  
  const navigationItems = ref([
    { name: "Home", path: "/dashboard", icon: HomeIcon },
    { name: "My Uploads", path: "/dashboard", icon: DocumentIcon },
    { name: "Alll Uploads", path: "/dashboard", icon: FolderIcon },
    // { name: 'Team members', path: '/', icon: UsersIcon },
    // { name: 'Settings', path: '/', icon: CogIcon },
  ]);
  
  const semesterArray = ref([
    { label: "First Semester", key: "first" },
    { label: "Second Semester", key: "second" },
  ]);
  
  const materialTypeArray = ref([
    { label: "Lecture Note", key: "lecture_note" },
    { label: "Textbook", key: "textbook" },
    { label: "Personal notes", key: "personal_note" },
    { label: "Drawings and diagrams", key: "drawings_and_diagrams" },
    { label: "Research Paper", key: "research_paper" },
    { label: "Assignment", key: "assignment" },
    { label: "Project Report", key: "project_report" },
    { label: "Exam Past Question", key: "exam_past_question" },
    { label: "Lab Manual", key: "lab_manual" },
    { label: "Study Guide", key: "study_guide" },
    { label: "Presentation Slides", key: "presentation_slides" },
    { label: "Article", key: "article" },
    { label: "Case Study", key: "case_study" },
    { label: "Thesis", key: "thesis" },
    { label: "Dissertation", key: "dissertation" },
    { label: "Tutorial Video", key: "tutorial_video" },
    { label: "Reference Material", key: "reference_material" },
  ]);
  
  const academicLevelArray = ref([
    { label: "100 Level", key: "100" },
    { label: "200 Level", key: "200" },
    { label: "300 Level", key: "300" },
    { label: "400 Level", key: "400" },
    { label: "500 Level", key: "500" },
    { label: "600 Level", key: "600" },
  ]);
  
  const currentStep = ref(1);
  
  const handleStepSubmit = async () => {
    await uploadMaterial('admin').finally(() => {
        emit('close')
      });
  };
  
  definePageMeta({
  layout: 'admin',
   middleware: 'admin'
})

  const validateStep = (step: number) => {
    switch (step) {
      case 1:
        return payload.value.name && payload.value.description;
      case 2:
        return (
          payload.value.academicLevel &&
          payload.value.semester &&
          payload.value.materialType
        );
      case 3:
        return payload.value.fileUrls;
      default:
        return false;
    }
  };
  </script>
  