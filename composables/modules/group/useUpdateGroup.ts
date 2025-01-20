
import { group_api } from "@/api_factory/modules/group";
import { useCustomToast } from "@/composables/core/useCustomToast";

export const useUpdateGroup = () => {
    const { showToast } = useCustomToast();
    const loading = ref(false);
  
    const updateGroup = async (groupId: any, payload: any) => {
      loading.value = true;
      try {
        await group_api.$_uptate_group(groupId, payload);
        showToast({
          title: "Success",
          message: "Group updated successfully.",
          toastType: "success",
          duration: 3000,
        });
      } catch (error: any) {
        showToast({
          title: "Error",
          message: error.message || "Failed to update group.",
          toastType: "error",
          duration: 3000,
        });
      } finally {
        loading.value = false;
      }
    };
  
    return { loading, updateGroup };
  };
  