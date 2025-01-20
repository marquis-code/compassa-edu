import { material_api } from "@/api_factory/modules/materials";
import { useCustomToast } from "@/composables/core/useCustomToast";

export const useBatchUpdateMaterialStatus = () => {
    const { showToast } = useCustomToast();
    const updating = ref(false);

    const payload = ref([])
  
    const batchUpdateMaterialStatus = async () => {
      updating.value = true;
      try {
        const res = await material_api.$_batch_update_material_status(payload.value) as any
        showToast({
          title: "Success",
          message: "Material statuses updated successfully.",
          toastType: "success",
          duration: 3000,
        });
        return res.data;
      } catch (error: any) {
        showToast({
          title: "Error",
          message: error.message || "Failed to update material statuses.",
          toastType: "error",
          duration: 3000,
        });
        throw error;
      } finally {
        updating.value = false;
      }
    };

    const setBatchPayload = (data: any) => {
      payload.value = data
    }
  
    return { batchUpdateMaterialStatus, updating, setBatchPayload };
  };
