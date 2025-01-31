

import { group_api } from "@/api_factory/modules/group";
import { useCustomToast } from "@/composables/core/useCustomToast";

export const useGetUserGroups = () => {
    const { showToast } = useCustomToast();
    const userGroupsList = ref([]);
    const loading = ref(false);
  
    const fetchUserGroups = async () => {
      loading.value = true;
      try {
        const res = await group_api.$_get_user_groups();
        // console.log(res, 'user griups here')
        userGroupsList.value = res.data;
        return res.data
      } catch (error: any) {
        showToast({
          title: "Error",
          message: error.message || "Failed to fetch groups.",
          toastType: "error",
          duration: 3000,
        });
      } finally {
        loading.value = false;
      }
    };

    onMounted(async () => {
      await fetchUserGroups()
    })
  
    return { userGroupsList, loading, fetchUserGroups };
  };