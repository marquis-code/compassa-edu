import { material_api } from "@/api_factory/modules/materials";
import { useCustomToast } from "@/composables/core/useCustomToast";

const payload = ref({
  name: "",
  description: "",
  fileUrls: "",
  academicLevel: "",
  semester: "",
  materialType: "",
  session: "",
  category: ""
});

export const useUploadMaterial = () => {
  const { showToast } = useCustomToast();
  const uploading = ref(false);
  const uploadMaterial = async (userType?: string) => {
    uploading.value = true;
     // Build the payload based on userType
     const finalPayload = userType === 'admin' 
     ? { ...payload.value, status: 'approved' } 
     : payload.value;
    try {
      const res = (await material_api.$_upload_material(finalPayload)) as any;
      showToast({
        title: "Success",
        message: "Material uploaded successfully.",
        toastType: "success",
        duration: 3000,
      });
      return res.data;
    } catch (error: any) {
      showToast({
        title: "Error",
        message: error.message || "Failed to upload material.",
        toastType: "error",
        duration: 3000,
      });
      throw error;
    } finally {
      uploading.value = false;
    }
  };

  const setPayload = (data: any) => {
     payload.value = { ...data }
  }

  return { uploadMaterial, uploading, payload, setPayload };
};
