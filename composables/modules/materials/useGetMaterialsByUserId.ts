import { material_api } from "@/api_factory/modules/materials";
import { useCustomToast } from "@/composables/core/useCustomToast";

export const useGetAllMaterialsByUserId = () => {
    const { showToast } = useCustomToast();
    const materials = ref([]);
    const loading = ref(false);
    const route = useRoute()
  
    const getUserMaterialsByUserId = async () => {
      loading.value = true;
      try {
        const res = await material_api.$_get_materials_by_user_id(route.params.id) as any
        materials.value = res?.data|| [];
        showToast({
          title: "Success",
          message: "",
          toastType: "success",
          duration: 3000,
        });
      } catch (error: any) {
        showToast({
          title: "Error",
          message: error.message || "Failed to fetch all materials.",
          toastType: "error",
          duration: 3000,
        });
      } finally {
        loading.value = false;
      }
    };
  
    onMounted(() => {
        getUserMaterialsByUserId()
    })
  
    return { materials, loading, getUserMaterialsByUserId };
  };