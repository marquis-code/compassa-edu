import { session_api } from "@/api_factory/modules/session";
import { useCustomToast } from "@/composables/core/useCustomToast";

export const useCreateSession = () => {
  const { showToast } = useCustomToast();
  const payload = ref({
    name: '',
    description: ''
  });
  const loading = ref(false);

    
  const createSession = async () => {
    loading.value = true;
    try {
      const res = await session_api.$_create_session(payload.value) as any
      showToast({
        title: "Success",
        message: "session created successfully.",
        toastType: "success",
        duration: 3000,
      });
    } catch (error: any) {
      showToast({
        title: "Error",
        message: error.message || "Failed to create session.",
        toastType: "error",
        duration: 3000,
      });
    } finally {
      loading.value = false;
    }
  };


  const setPayload = (data: any)  => {
     payload.value.name = data.name
     payload.value.description = data.description
  }

  return { payload, loading,  setPayload, createSession };
};