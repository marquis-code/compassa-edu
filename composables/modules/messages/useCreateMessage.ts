import { message_api } from "@/api_factory/modules/message";
import { group_api } from "@/api_factory/modules/group";
import { useCustomToast } from "@/composables/core/useCustomToast";
import { ref } from "vue";

export const useCreateMessage = () => {
    const { showToast } = useCustomToast();
    const payload = ref({
      content: "",
      groupId: "",
    });
    const loading = ref(false);
  
    const createMessage = async () => {
      loading.value = true;
      try {
        const res = await message_api.$_create_message(payload.value);
        showToast({
          title: "Success",
          message: "Message sent successfully.",
          toastType: "success",
          duration: 3000,
        });
      } catch (error: any) {
        showToast({
          title: "Error",
          message: error.message || "Failed to send message.",
          toastType: "error",
          duration: 3000,
        });
      } finally {
        loading.value = false;
      }
    };
  
    const setPayload = (data: any) => {
      payload.value.content = data.content;
      payload.value.groupId = data.groupId;
    };
  
    return { payload, loading, setPayload, createMessage };
  };
  