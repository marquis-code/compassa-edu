
import { group_api } from "@/api_factory/modules/group";
import { useCustomToast } from "@/composables/core/useCustomToast";

export const useGetGroupById = () => {
    const { showToast } = useCustomToast();
    const group = ref(null);
    const loading = ref(false);
  
    const fetchGroupById = async (groupId: string) => {
      loading.value = true;
      try {
        const res = await group_api.$_get_group_by_id(groupId);
        group.value = res.data;
      } catch (error: any) {
        showToast({
          title: "Error",
          message: error.message || "Failed to fetch group details.",
          toastType: "error",
          duration: 3000,
        });
      } finally {
        loading.value = false;
      }
    };
  
    return { group, loading, fetchGroupById };
  };
  