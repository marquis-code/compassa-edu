
import { category_api } from "@/api_factory/modules/category";
import { useCustomToast } from "@/composables/core/useCustomToast";

export const useGetCategories = () => {
  const { showToast } = useCustomToast();
  const categories = ref([]);
  const loading = ref(false);

    
  const getCategories = async () => {
    loading.value = true;
    try {
      const res = await category_api.$_get_scategories() as any
      categories.value = res.data;
      showToast({
        title: "Success",
        message: "Categories fetched successfully.",
        toastType: "success",
        duration: 3000,
      });
    } catch (error: any) {
      showToast({
        title: "Error",
        message: error.message || "Failed to fetch categories.",
        toastType: "error",
        duration: 3000,
      });
    } finally {
      loading.value = false;
    }
  };

  onMounted(() => {
    getCategories()
  })

  return { categories, loading, getCategories };
};