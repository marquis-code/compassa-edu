import { material_api } from "@/api_factory/modules/materials";
import { useCustomToast } from "@/composables/core/useCustomToast";

export const useGetAllMaterials = () => {
    const { showToast } = useCustomToast();
    const materials = ref([]);
    const loading = ref(false);
  
    const queryParams = ref({
      academicLevel: '',
      semester: '',
      materialType: '',
      status: ''
    });
  
    const getAllMaterials = async () => {
      loading.value = true;
      try {
        const { academicLevel, semester, materialType, status } = queryParams.value;
        const res = await material_api.$_get_all_materials(academicLevel, semester, materialType, status) as any
        materials.value = res.data;
        showToast({
          title: "Success",
          message: "All materials fetched successfully.",
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
  
    watch(queryParams, getAllMaterials, { deep: true });

    onMounted(() => {
      getAllMaterials()
    })
  
    return { materials, loading, queryParams, getAllMaterials };
  };