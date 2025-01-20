import { user_api } from "@/api_factory/modules/user";
import { useCustomToast } from "@/composables/core/useCustomToast";

export const useUpdateUser = (id: string) => {
    const { showToast } = useCustomToast();
    const loading = ref(false);
  
    const updateUser = async (payload: any) => {
      loading.value = true;
      const res = await user_api.$_update_user(id) as any
      if(res.status === 200 || res.status === 201){
        showToast({
            title: "Success",
            message: 'User was updated successfully',
            toastType: "success",
            duration: 3000,
          });
      } else {
        showToast({
            title: "Error",
            message: `${res.data.message}` || "Failed to fetch users.",
            toastType: "error",
            duration: 3000,
          });
      }
      loading.value = false;
    };
  
    return { updateUser, loading };
  };