import { session_api } from "@/api_factory/modules/session";
import { useCustomToast } from "@/composables/core/useCustomToast";

export const useGetSessions = () => {
  const { showToast } = useCustomToast();
  const sessions = ref([]);
  const loading = ref(false);

    
  const getSessions = async () => {
    loading.value = true;
    try {
      const res = await session_api.$_get_ssessions() as any
      sessions.value = res.data;
      showToast({
        title: "Success",
        message: "sessions fetched successfully.",
        toastType: "success",
        duration: 3000,
      });
    } catch (error: any) {
      showToast({
        title: "Error",
        message: error.message || "Failed to fetch sessions.",
        toastType: "error",
        duration: 3000,
      });
    } finally {
      loading.value = false;
    }
  };

  onMounted(() => {
    getSessions()
  })

  return { sessions, loading,  };
};