import { user_api } from "@/api_factory/modules/user";
import { useCustomToast } from "@/composables/core/useCustomToast";

export const useGetUserById = () => {
    const { showToast } = useCustomToast();
    const user = ref(null);
    const loading = ref(false);
    const route =  useRoute() as any
  
    const getUserById = async () => {
      loading.value = true;
      try {
        const res = await user_api.$_get_user_by_id(route.params.id) as any
        user.value = res.data;
      } catch (error: any) {
        showToast({
          title: "Error",
          message: error.message || `Failed to fetch user with ID ${route.params.id}.`,
          toastType: "error",
          duration: 3000,
        });
      } finally {
        loading.value = false;
      }
    };

    onMounted(() => {
      getUserById()
    })

  
    return { user, getUserById, loading };
  };
  