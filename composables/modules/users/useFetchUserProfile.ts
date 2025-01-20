import { user_api } from "@/api_factory/modules/user";
import { useCustomToast } from "@/composables/core/useCustomToast";
import { ref } from "vue";

export const useFetchUserProfile = () => {
  const { showToast } = useCustomToast();
  const profile = ref(null);
  const loading = ref(false);

  const fetchUserProfile = async () => {
    loading.value = true;
    try {
      const res = await user_api.$_fetch_user_profile() as any
      profile.value = res.data;
    } catch (error: any) {
      showToast({
        title: "Error",
        message: error.message || "Failed to fetch user profile.",
        toastType: "error",
        duration: 3000,
      });
    } finally {
      loading.value = false;
    }
  };

  return { profile, fetchUserProfile, loading };
};
