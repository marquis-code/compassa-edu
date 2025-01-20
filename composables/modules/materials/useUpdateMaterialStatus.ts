import { material_api } from "@/api_factory/modules/materials";
import { useCustomToast } from "@/composables/core/useCustomToast";
import { useGetAllMaterials } from '@/composables/modules/materials/useGetAllMaterials';
const { getAllMaterials } = useGetAllMaterials();

export const useUpdateMaterialStatus = () => {
    const { showToast } = useCustomToast();
    const updating = ref(false);

    const payload = ref({
        materialId: "",
        userId: "",
        status: ""
    })
  
    const updateMaterialStatus = async () => {
      updating.value = true;
      const res = await material_api.$_update_material_status(payload.value) as any
      if(res.status === 200 || res.status === 201){
        showToast({
          title: "Success",
          message: "Material status updated successfully.",
          toastType: "success",
          duration: 3000,
        });
        getAllMaterials()
      } else {
        showToast({
          title: "Error",
          message: res?.data?.error || "Failed to update material status.",
          toastType: "error",
          duration: 3000,
        });
      }
      updating.value = false;
    };

    const setPayload = (data: any) => {
      payload.value.materialId = data.materialId 
      payload.value.userId = data.userId
      payload.value.status = data.status
    }
  
    return { updateMaterialStatus, setPayload, updating, payload };
  };
