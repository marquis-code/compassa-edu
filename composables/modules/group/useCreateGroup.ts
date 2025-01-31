
import { group_api } from "@/api_factory/modules/group";
import { useCustomToast } from "@/composables/core/useCustomToast";

import { ref } from "vue";
export const useCreateGroup = () => {
    const { showToast } = useCustomToast();
    const payload = ref({
      name: "",
      description: "",
      status: ''
    });
    const loading = ref(false);
  
    const createGroup = async () => {
      loading.value = true;
      try {
        const res = await group_api.$_create_group(payload.value);
        showToast({
          title: "Success",
          message: "Group created successfully.",
          toastType: "success",
          duration: 3000,
        });
      } catch (error: any) {
        showToast({
          title: "Error",
          message: error.message || "Failed to create group.",
          toastType: "error",
          duration: 3000,
        });
      } finally {
        loading.value = false;
      }
    };
  
    const setPayloadObj = (data: any) => {
      payload.value.name = data.name;
      payload.value.status = data.status;
      payload.value.description = data.description;
    };
  
    return { payload, loading, setPayloadObj, createGroup };
  };
  