
import { group_api } from "@/api_factory/modules/group";
import { useCustomToast } from "@/composables/core/useCustomToast";

export const useGenerateInvite = () => {
    const { showToast } = useCustomToast();
    const loading = ref(false);
  
    const generateInvite = async (groupId: string) => {
      loading.value = true;
      try {
        const res = await group_api.$_generate_invite(groupId);
      } catch (error: any) {
        showToast({
          title: "Error",
          message: error.message || "Failed to generate invite.",
          toastType: "error",
          duration: 3000,
        });
      } finally {
        loading.value = false;
      }
    };
  
    return { loading, generateInvite };
  };
  