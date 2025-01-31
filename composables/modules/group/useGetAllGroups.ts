

import { group_api } from "@/api_factory/modules/group";
import { useCustomToast } from "@/composables/core/useCustomToast";

export const useGetAllGroups = () => {
    const { showToast } = useCustomToast();
    const groups = ref([]);
    const loading = ref(false);
  
    const fetchGroups = async () => {
      loading.value = true;
      try {
        const res = await group_api.$_get_all_groups();
        console.log(res, 'res here')
        groups.value = res.data;
      } catch (error: any) {
        showToast({
          title: "Error",
          message: error.message || "Failed to fetch groups.",
          toastType: "error",
          duration: 3000,
        });
      } finally {
        loading.value = false;
      }
    };

    onMounted(() => {
      fetchGroups()
    })
  
    return { groups, loading, fetchGroups };
  };