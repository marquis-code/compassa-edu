import { material_api } from "@/api_factory/modules/materials";
import { useCustomToast } from "@/composables/core/useCustomToast";
import { ref, watch } from "vue";

export const useGetUserMaterials = () => {
  const { showToast } = useCustomToast();
  const materials = ref([]);
  const loading = ref(false);

    
  const queryParams = ref({
    academicLevel: '',
    semester: '',
    materialType: '',
    status: ''
  });


  const getUserMaterials = async () => {
    loading.value = true;
    try {
      const { academicLevel, semester, materialType, status } = queryParams.value;
      const res = await material_api.$_get_user_materials() as any
      console.log(res, 'tes here')
      materials.value = res.data;
      showToast({
        title: "Success",
        message: "Materials fetched successfully.",
        toastType: "success",
        duration: 3000,
      });
    } catch (error: any) {
      showToast({
        title: "Error",
        message: error.message || "Failed to fetch materials.",
        toastType: "error",
        duration: 3000,
      });
    } finally {
      loading.value = false;
    }
  };

  onMounted(() => {
    getUserMaterials()
  })

  return { materials, loading, getUserMaterials };
};