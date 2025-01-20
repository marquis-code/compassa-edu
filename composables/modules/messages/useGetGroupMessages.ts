import { message_api } from "@/api_factory/modules/message";
import { group_api } from "@/api_factory/modules/group";
import { useCustomToast } from "@/composables/core/useCustomToast";
import { ref } from "vue";

export const useGetGroupMessages = () => {
    const { showToast } = useCustomToast();
    const messages = ref([]);
    const loading = ref(false);
  
    const fetchGroupMessages = async (groupId: any) => {
      loading.value = true;
      try {
        const res = await message_api.$_get_group_messages(groupId);
        messages.value = res.data;
      } catch (error: any) {
        showToast({
          title: "Error",
          message: error.message || "Failed to fetch group messages.",
          toastType: "error",
          duration: 3000,
        });
      } finally {
        loading.value = false;
      }
    };
  
    return { messages, loading, fetchGroupMessages };
  };
