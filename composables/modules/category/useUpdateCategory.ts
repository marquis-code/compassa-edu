import { category_api } from "@/api_factory/modules/category";
import { useCustomToast } from "@/composables/core/useCustomToast";

export const useUpdateCategory = () => {
    const { showToast } = useCustomToast();
    const loading = ref(false);
  
    const updateCategory = async (payload: any, id: string) => {
      loading.value = true;
      const res = await category_api.$_update_category(payload, id) as any
      if(res.status === 200 || res.status === 201){
        showToast({
            title: "Success",
            message: 'Category was updated successfully',
            toastType: "success",
            duration: 3000,
          });
      } else {
        showToast({
            title: "Error",
            message: `${res.data.message}` || "Failed to fetch users.",
            toastType: "error",
            duration: 3000,
          });
      }
      loading.value = false;
    };
  
    return { updateCategory, loading };
  };