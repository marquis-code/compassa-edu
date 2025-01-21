import { material_api } from "@/api_factory/modules/materials";
import { useCustomToast } from "@/composables/core/useCustomToast";

export const useGetPendingMaterials = () => {
    const { showToast } = useCustomToast();
    const materials = ref([]);
    const loading = ref(false);
  
    const queryParams = ref({
      academicLevel: '',
      semester: '',
      materialType: '',
      status: 'pending'
    });
  
    const getPendingMaterials = async () => {
      loading.value = true;
      try {
        const { academicLevel, semester, materialType, status } = queryParams.value;
        const res = await material_api.$_get_pending_materials(academicLevel, semester, materialType, status) as any
        materials.value = res.data;
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
      getPendingMaterials()
    })
  
    watch(queryParams, getPendingMaterials, { deep: true });
  
    return { materials, loading, queryParams, getPendingMaterials };
  };