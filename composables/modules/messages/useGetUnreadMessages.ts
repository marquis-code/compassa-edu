import { message_api } from "@/api_factory/modules/message";
import { group_api } from "@/api_factory/modules/group";
import { useCustomToast } from "@/composables/core/useCustomToast";
import { ref } from "vue";


export const useGetUnreadMessages = () => {
    const { showToast } = useCustomToast();
    const unreadMessages = ref([]);
    const loading = ref(false);
  
    const fetchUnreadMessages = async (groupId: any) => {
      loading.value = true;
      try {
        const res = await message_api.$_get_unread_messages(groupId);
        unreadMessages.value = res.data;
      } catch (error: any) {
        showToast({
          title: "Error",
          message: error.message || "Failed to fetch unread messages.",
          toastType: "error",
          duration: 3000,
        });
      } finally {
        loading.value = false;
      }
    };
  
    return { unreadMessages, loading, fetchUnreadMessages };
  };