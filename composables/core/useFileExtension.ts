// // /composables/useFileExtension.ts
// import { ref } from 'vue';

// export function useFileExtension() {
//   /**
//    * Extracts the file extension from a given URL.
//    * @param url - The URL of the file.
//    * @returns The file extension or an empty string if none is found.
//    */
//   const getFileExtension = (url: string): string => {
//     try {
//       // Extract the part after the last dot in the file name
//       const extension = url.split('/').pop()?.split('.').pop();
//       return extension || '';
//     } catch (error) {
//       console.error('Error extracting file extension:', error);
//       return '';
//     }
//   };

//   return { getFileExtension };
// }

// /composables/useFileExtension.ts
import { ref } from 'vue';

export function useFileExtension() {
  /**
   * Extracts the file extension from a given URL.
   * @param url - The URL of the file.
   * @returns The file extension or an empty string if none is found.
   */
  const getFileExtension = (url: string): string => {
    try {
      // Ensure the URL is valid and non-empty
      if (!url || typeof url !== 'string') {
        console.warn('Invalid URL provided:', url);
        return '';
      }

      // Extract the part after the last dot in the file name
      const parts = url.split('/');
      const fileName = parts.pop(); // Get the last part of the URL
      if (!fileName || !fileName.includes('.')) {
        console.warn('No file extension found in URL:', url);
        return '';
      }

      const extension = fileName.split('.').pop();
      return extension || '';
    } catch (error) {
      console.error('Error extracting file extension:', error);
      return '';
    }
  };

  return { getFileExtension };
}
