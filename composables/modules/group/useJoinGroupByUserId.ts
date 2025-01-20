
import { group_api } from "@/api_factory/modules/group";
import { useCustomToast } from "@/composables/core/useCustomToast";

export const useJoinGroupByUserId = () => {
    const { showToast } = useCustomToast();
    const loading = ref(false);
  
    const joinGroupByUserId = async (userId: any, groupId: any) => {
      loading.value = true;
      try {
        await group_api.$_join_group_by_user_id(userId, groupId);
        showToast({
          title: "Success",
          message: "Joined group successfully.",
          toastType: "success",
          duration: 3000,
        });
      } catch (error: any) {
        showToast({
          title: "Error",
          message: error.message || "Failed to join group.",
          toastType: "error",
          duration: 3000,
        });
      } finally {
        loading.value = false;
      }
    };
  
    return { loading, joinGroupByUserId };
  };
  