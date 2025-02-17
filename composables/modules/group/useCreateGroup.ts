import { group_api } from "@/api_factory/modules/group";
import { useCustomToast } from "@/composables/core/useCustomToast";
import { useGenerateInvite } from "@/composables/modules/group/useGenerateInvite";

import { ref } from "vue";

export const useCreateGroup = () => {
  const { showToast } = useCustomToast();
  const { generateInvite } = useGenerateInvite();
  
  const payload = ref({
    name: "",
    description: "",
    status: "public",
    generateInvite: false, // New property to handle invite link generation
  });

  const loading = ref(false);
  const inviteLink = ref<string | null>(null);

  const createGroup = async () => {
    loading.value = true;
    inviteLink.value = null;

    const payloadObj = { 
      name: payload.value.name,
      description: payload.value.description,
      status: payload.value.status
    }
    
    try {
      const res = await group_api.$_create_group(payloadObj);
      console.log(res, 'create res')
      showToast({
        title: "Success",
        message: "Group created successfully.",
        toastType: "success",
        duration: 3000,
      });

      // If the group is private and generateInvite is true, generate an invite link
      if (payload.value.status === "private" && payload.value.generateInvite) {
        const inviteRes = await generateInvite(res?.data?._id) as any
        console.log(inviteRes, 'invite generation res')
        inviteLink.value = inviteRes?.dat?.inviteLink;
      }

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

  const setSingleCreatePayload = (data: any) => {
    payload.value.name = data.name;
    payload.value.status = data.status;
    payload.value.description = data.description;
    payload.value.generateInvite = data.generateInvite || false;
  };

  return { payload, loading, inviteLink, setSingleCreatePayload, createGroup };
};
