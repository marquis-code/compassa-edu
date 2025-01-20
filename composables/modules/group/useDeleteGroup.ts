
import { group_api } from "@/api_factory/modules/group";
import { useCustomToast } from "@/composables/core/useCustomToast";

export const useDeleteGroup = () => {
    const { showToast } = useCustomToast();
    const loading = ref(false);
  
    const deleteGroup = async (groupId: string) => {
      loading.value = true;
      try {
        await group_api.$_delete_group(groupId);
        showToast({
          title: "Success",
          message: "Group deleted successfully.",
          toastType: "success",
          duration: 3000,
        });
      } catch (error: any) {
        showToast({
          title: "Error",
          message: error.message || "Failed to delete group.",
          toastType: "error",
          duration: 3000,
        });
      } finally {
        loading.value = false;
      }
    };
  
    return { loading, deleteGroup };
  };