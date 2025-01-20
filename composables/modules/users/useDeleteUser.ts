import { user_api } from "@/api_factory/modules/user";
import { useCustomToast } from "@/composables/core/useCustomToast";

export const useDeleteUser = (id: string) => {
  const { showToast } = useCustomToast();
  const loading = ref(false);

  const deleteUser = async () => {
    loading.value = true;
    const res = await user_api.$_delete_user(id) as any
     if(res.status === 200 || res.status === 201){
      showToast({
        title: "Success",
        toastType: "success",
        message: `User with ID ${id} deleted successfully`,
        duration: 3000,
      });
     } else {
        showToast({
            title: "Success",
            toastType: "success",
            message: res.data.message || `Failed to delete user with ID ${id}.`,
            duration: 3000,
          });
     }
     loading.value = false;
  };

  return { deleteUser, loading };
};
