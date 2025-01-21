

import { ref } from 'vue';
import { core_apis } from '@/api_factory/core/upload';

export const useUploadFile = () => {
  const loading = ref(false);
  const uploadResponse = ref({} as any);
  
  const { $_upload } = core_apis;

  const uploadFile = async (file: File) => {
    loading.value = true;
    try {
      // Create FormData and append the file directly
      const formData = new FormData();
      formData.append('file', file);  // Append the file, no conversion to Base64

      // Make the API call with FormData
      const res = await $_upload(formData) as any;
      console.log(res, 'tes here')
      if (res.type !== 'ERROR') {
        uploadResponse.value = res?.data ?? {};
        return res?.data
      }
    } catch (error) {
      console.error('Error uploading file:', error);
    } finally {
      loading.value = false;
    }
  };

  return { uploadFile, loading, uploadResponse };
};
