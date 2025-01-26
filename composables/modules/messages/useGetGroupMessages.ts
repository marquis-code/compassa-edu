import { message_api } from "@/api_factory/modules/message";
import { group_api } from "@/api_factory/modules/group";
import { useCustomToast } from "@/composables/core/useCustomToast";
import { ref } from "vue";
const router = useRouter()
const route = useRoute()

export const useGetGroupMessages = () => {
    const { showToast } = useCustomToast();
    const router = useRouter()
    const route = useRoute()
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

    watch(() => route.query.group, (newGroup, oldGroup) => {
      console.log(newGroup, 'new group value');
      if (newGroup) {
        fetchGroupMessages(newGroup);
      }
    }, { immediate: true });
  
    return { messages, loading, fetchGroupMessages };
  };
