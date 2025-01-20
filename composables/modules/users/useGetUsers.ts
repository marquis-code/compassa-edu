import { user_api } from "@/api_factory/modules/user";
import { useCustomToast } from "@/composables/core/useCustomToast";

export const useGetUsers = () => {
    const { showToast } = useCustomToast();
    const users = ref([]);
    const loading = ref(false);
  
    const getUsers = async () => {
      loading.value = true;
      try {
        const res = await user_api.$_get_users() as any
        users.value = res.data;
      } catch (error: any) {
        showToast({
          title: "Error",
          message: error.message || "Failed to fetch users.",
          toastType: "error",
          duration: 3000,
        });
      } finally {
        loading.value = false;
      }
    };

    onMounted(() => {
      getUsers()
    })
  
    return { users, getUsers, loading };
  };