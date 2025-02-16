
import { group_api } from "@/api_factory/modules/group";
import { useCustomToast } from "@/composables/core/useCustomToast";

export const useJoinByInvite = () => {
    const { showToast } = useCustomToast();

    const loading = ref(false);
  
    const joinByInvite = async (inviteToken: string) => {
      loading.value = true;
      try {
        const res = await group_api.$_join_group_by_invite(inviteToken);
      } catch (error: any) {
        showToast({
          title: "Error",
          message: error.message || "Failed to join group by invite!.",
          toastType: "error",
          duration: 3000,
        });
      } finally {
        loading.value = false;
      }
    };
  
    return { loading, joinByInvite };
  };
  