
import { group_api } from "@/api_factory/modules/group";
import { useCustomToast } from "@/composables/core/useCustomToast";

export const useLeaveGroup = () => {
    const { showToast } = useCustomToast();
    const loading = ref(false);
  
    const leaveGroupByUserId = async (groupId: any, userId: any,) => {
        loading.value = true;
        const res = await group_api.$_leave_group_by_user_id(groupId, userId);
        console.log(res, 'res jhere')
        if(res.status == 200 || res.status === 201){
         showToast({
          title: "Success",
          message: "Exited group successfully.",
          toastType: "success",
          duration: 3000,
        });
        } else {
        showToast({
          title: "Error",
          message: res?.data?.message || "Failed to leave group.",
          toastType: "error",
          duration: 3000,
        });
        }
        loading.value = false;
    //   loading.value = true;
    //   try {
    //     await group_api.$_leave_group_by_user_id(groupId, userId);
    //     showToast({
    //       title: "Success",
    //       message: "Exited group successfully.",
    //       toastType: "success",
    //       duration: 3000,
    //     });
    //   } catch (error: any) {
    //     console.log(error, 'error ')
    //     showToast({
    //       title: "Error",
    //       message: error.message || "Failed to leave group.",
    //       toastType: "error",
    //       duration: 3000,
    //     });
    //   } finally {
    //     loading.value = false;
    //   }
    };
  
    return { loading, leaveGroupByUserId };
  };
  