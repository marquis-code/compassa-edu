import { message_api } from "@/api_factory/modules/message";
import { group_api } from "@/api_factory/modules/group";
import { useCustomToast } from "@/composables/core/useCustomToast";
import { ref } from "vue";

export const useMarkMessagesAsRead = () => {
    const { showToast } = useCustomToast();
    const loading = ref(false);
  
    const markMessagesAsRead = async (groupId: any) => {
      loading.value = true;
      try {
        await message_api.$_mark_messages_as_reaed(groupId);
        showToast({
          title: "Success",
          message: "Messages marked as read successfully.",
          toastType: "success",
          duration: 3000,
        });
      } catch (error: any) {
        showToast({
          title: "Error",
          message: error.message || "Failed to mark messages as read.",
          toastType: "error",
          duration: 3000,
        });
      } finally {
        loading.value = false;
      }
    };
  
    return { loading, markMessagesAsRead };
  };
  