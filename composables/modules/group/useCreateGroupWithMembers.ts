import { group_api } from "@/api_factory/modules/group";
import { useCustomToast } from "@/composables/core/useCustomToast";
import { useGenerateInvite } from "@/composables/modules/group/useGenerateInvite";

import { ref } from "vue";

export const useCreateGroupWithMembers = () => {
  const { showToast } = useCustomToast();

  const payload = ref({
    name: "",
    description: "",
    status: "public",
    matricNumbers: []
  });

  const loading = ref(false);

  const createGroupWithMembers = async () => {
    loading.value = true;

    const payloadObj = { 
      name: payload.value.name,
      description: payload.value.description,
      status: payload.value.status,
      matricNumbers: payload.value.matricNumbers
    }
    
    try {
      const res = await group_api.$_create_group_with_members(payloadObj);
      console.log(res, 'create res')
      showToast({
        title: "Success",
        message: "Group created and members added successfully..",
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
    payload.value.matricNumbers = data.matricNumbers|| [];
  };

  return { payload, loading, setPayloadObj, createGroupWithMembers };
};
