import { category_api } from "@/api_factory/modules/category";
import { useCustomToast } from "@/composables/core/useCustomToast";

export const useDeleteCategory = () => {
  const { showToast } = useCustomToast();
  const loading = ref(false);

  const deleteCategory = async (id: any) => {
    loading.value = true;
    const res = await category_api.$_delete_category(id) as any
     if(res.status === 200 || res.status === 201){
      showToast({
        title: "Success",
        toastType: "success",
        message: `Category with ID ${id} deleted successfully`,
        duration: 3000,
      });
     } else {
        showToast({
            title: "Success",
            toastType: "success",
            message: res.data.message || `Failed to delete category with ID ${id}.`,
            duration: 3000,
          });
     }
     loading.value = false;
  };

  return { deleteCategory, loading };
};
