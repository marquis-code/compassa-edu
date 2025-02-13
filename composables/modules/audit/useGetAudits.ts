

import { audit_api } from "@/api_factory/modules/audits";
import { useCustomToast } from "@/composables/core/useCustomToast";

export const useGetAudits = () => {
    const { showToast } = useCustomToast();
    const auditsList = ref([]);
    const loading = ref(false);
  
    const fetchAudits = async () => {
      loading.value = true;
      try {
        const res = await audit_api.$_get_audit_logs();
        console.log(res, 'Audit res here')
        auditsList.value = res?.data?.logs || [];
      } catch (error: any) {
        showToast({
          title: "Error",
          message: error.message || "Failed to fetch auditsList.",
          toastType: "error",
          duration: 3000,
        });
      } finally {
        loading.value = false;
      }
    };

    onMounted(() => {
      fetchAudits()
    })
  
    return { auditsList, loading, fetchAudits };
  };