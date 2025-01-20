import { category_api } from "@/api_factory/modules/category";
import { useCustomToast } from "@/composables/core/useCustomToast";

export const useCreateCategory = () => {
  const { showToast } = useCustomToast();
  const payload = ref({
    name: '',
    description: ''
  });
  const loading = ref(false);

    
  const createCategory = async () => {
    loading.value = true;
    try {
      const res = await category_api.$_create_category(payload.value) as any
      showToast({
        title: "Success",
        message: "Category created successfully.",
        toastType: "success",
        duration: 3000,
      });
    } catch (error: any) {
      showToast({
        title: "Error",
        message: error.message || "Failed to create category.",
        toastType: "error",
        duration: 3000,
      });
    } finally {
      loading.value = false;
    }
  };


  const setPayload = (data: any)  => {
     payload.value.name = data.name
     payload.value.description = data.description
  }

  return { payload, loading,  setPayload, createCategory };
};