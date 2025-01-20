// import { material_api } from "@/api_factory/modules/materials";
// import { useCustomToast } from "@/composables/core/useCustomToast";

// const batchPayloadObj = ref({
//   name: "",
//   description: "",
//   fileUrls: "",
//   academicLevel: "",
//   semester: "",
//   materialType: "",
//   session: "",
//   category: ""
// });

// export const useBatchUploadMaterials = () => {
//   const { showToast } = useCustomToast();
//   const processing = ref(false);
//   const uploadBatchMaterials = async (userType?: string) => {
//     processing.value = true;
//      // Build the payload based on userType
//      const finalPayload = userType === 'admin' 
//      ? { ...batchPayloadObj.value, status: 'approved' } 
//      : batchPayloadObj.value;
//     try {
//       const res = (await material_api.$_batch_upload_material(finalPayload)) as any;
//       showToast({
//         title: "Success",
//         message: "Materials uploaded successfully.",
//         toastType: "success",
//         duration: 3000,
//       });
//       return res.data;
//     } catch (error: any) {
//       showToast({
//         title: "Error",
//         message: error.message || "Failed to upload material.",
//         toastType: "error",
//         duration: 3000,
//       });
//       throw error;
//     } finally {
//       processing.value = false;
//     }
//   };

//   const setBatchPayload = (data: any) => {
//      batchPayloadObj.value = { ...data }
//   }

//   return { uploadBatchMaterials, processing, batchPayloadObj, setBatchPayload };
// };


import { ref } from 'vue';
import { material_api } from "@/api_factory/modules/materials";
import { useCustomToast } from "@/composables/core/useCustomToast";

// Define interfaces for type safety
interface Material {
  name: string;
  description: string;
  fileUrls: string[];
  academicLevel: string;
  semester: string;
  materialType: string;
  category: string;
  session: string;
  comment?: string;
  status?: string;
}

interface BatchPayload {
  materials: Material[];
}

// Initialize with the correct structure
const batchPayloadObj = ref<BatchPayload>({
  materials: []
});

export const useBatchUploadMaterials = () => {
  const { showToast } = useCustomToast();
  const processing = ref(false);

  const uploadBatchMaterials = async (userType?: string) => {
    processing.value = true;

    try {
      // If userType is admin, add status: 'approved' to each material
      const finalPayload: BatchPayload = {
        materials: userType === 'admin' 
          ? batchPayloadObj.value.materials.map(material => ({
              ...material,
              status: 'approved'
            }))
          : batchPayloadObj.value.materials
      };

      const response = await material_api.$_batch_upload_material(finalPayload);

      showToast({
        title: "Success",
        message: `Successfully uploaded ${finalPayload.materials.length} materials.`,
        toastType: "success",
        duration: 3000,
      });

      // Reset the batch payload after successful upload
      batchPayloadObj.value = { materials: [] };

      return response.data;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message || "Failed to upload materials.";
      
      showToast({
        title: "Error",
        message: errorMessage,
        toastType: "error",
        duration: 3000,
      });
      
      throw error;
    } finally {
      processing.value = false;
    }
  };

  const setBatchPayload = (payload: BatchPayload) => {
    // Validate payload structure
    if (!payload.materials || !Array.isArray(payload.materials)) {
      throw new Error('Invalid payload format. Expected { materials: [] }');
    }

    // Validate each material in the payload
    payload.materials.forEach((material, index) => {
      const requiredFields = [
        'name',
        'description',
        'fileUrls',
        'academicLevel',
        'semester',
        'materialType',
        'category',
        'session'
      ];

      const missingFields = requiredFields.filter(field => !material[field as keyof Material]);

      if (missingFields.length > 0) {
        throw new Error(`Material at index ${index} is missing required fields: ${missingFields.join(', ')}`);
      }

      // Validate fileUrls is an array
      if (!Array.isArray(material.fileUrls)) {
        throw new Error(`Material at index ${index} has invalid fileUrls format. Expected array.`);
      }
    });

    batchPayloadObj.value = payload;
  };

  // Helper to check if there are materials ready to upload
  const hasMaterials = (): boolean => {
    return batchPayloadObj.value.materials.length > 0;
  };

  // Helper to get the count of materials ready to upload
  const getMaterialCount = (): number => {
    return batchPayloadObj.value.materials.length;
  };

  // Helper to clear all materials
  const clearMaterials = () => {
    batchPayloadObj.value = { materials: [] };
  };

  return {
    uploadBatchMaterials,
    processing,
    batchPayloadObj,
    setBatchPayload,
    hasMaterials,
    getMaterialCount,
    clearMaterials
  };
};