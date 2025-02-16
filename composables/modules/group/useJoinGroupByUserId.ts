
import { group_api } from "@/api_factory/modules/group";
import { useCustomToast } from "@/composables/core/useCustomToast";

export const useJoinGroupByUserId = () => {
    const { showToast } = useCustomToast();
    const loading = ref(false);
  
    const joinGroupByUserId = async (groupId: any, userId: any) => {
      loading.value = true;
      const res = await group_api.$_join_group_by_group_id(groupId);
      console.log(res, 'res jhere')
      if(res.status == 200 || res.status === 201){
       showToast({
        title: "Success",
        message: "Joined group successfully.",
        toastType: "success",
        duration: 3000,
      });
      } else {
      showToast({
        title: "Error",
        message: res?.data?.message || "Failed to join group.",
        toastType: "error",
        duration: 3000,
      });
      }
      loading.value = false;
      // loading.value = true;
      // try {
      //   await group_api.$_join_group_by_user_id(groupId, userId);
      //   showToast({
      //     title: "Success",
      //     message: "Joined group successfully.",
      //     toastType: "success",
      //     duration: 3000,
      //   });
      // } catch (error: any) {
      //   showToast({
      //     title: "Error",
      //     message: error.message || "Failed to join group.",
      //     toastType: "error",
      //     duration: 3000,
      //   });
      // } finally {
      //   loading.value = false;
      // }
    };
  
    return { loading, joinGroupByUserId };
  };
  