import { GATEWAY_ENDPOINT } from "../axios.config";

export const material_api = {
  $_get_user_materials: () => {
    let url = "/users/my-materials";
    return GATEWAY_ENDPOINT.get(url);
  },
  $_get_all_materials: (academicLevel = '', semester = '', materialType = '', status = 'approved') => {
    let url = `/users/all-materials?status=${status}`;
    if (academicLevel) {
        url += `?academicLevel=${academicLevel}`;
      }
  
      if (semester) {
        url += `&semester=${semester}`;
      }
  
      if (materialType) {
          url += `&materialType=${materialType}`;
        }
  
        // if (status) {
        //   url += `&status=${status}`;
        // }
    return GATEWAY_ENDPOINT.get(url);
  },
  $_get_pending_materials: (academicLevel = '', semester = '', materialType = '', status = '') => {
    let url = "/users/pending-materials";
    const params = new URLSearchParams();

    if (academicLevel) {
        params.append('academicLevel', academicLevel);
    }

    if (semester) {
        params.append('semester', semester);
    }

    if (materialType) {
        params.append('materialType', materialType);
    }

    if (status) {
        params.append('status', status);
    }

    // Append the query parameters to the URL if any exist
    if ([...params].length > 0) {
        url += `?${params.toString()}`;
    }

    return GATEWAY_ENDPOINT.get(url);
},

  $_get_approved_materials: (academicLevel = '', semester = '', materialType = '', status = '') => {
    let url = "/users/approved-materials";
    if (academicLevel) {
        url += `&academicLevel=${academicLevel}`;
      }
  
      if (semester) {
        url += `&semester=${semester}`;
      }
  
      if (materialType) {
          url += `&materialType=${materialType}`;
        }
  
        if (status) {
          url += `&status=${status}`;
        }
    return GATEWAY_ENDPOINT.get(url);
  },
  $_upload_material: (payload: any) => {
    const url = "/users/upload-material";
    return GATEWAY_ENDPOINT.post(url, payload);
  },
  $_batch_update_material_status: (payload: any) => {
    const url = "/materials/batch-update-status";
    return GATEWAY_ENDPOINT.patch(url, payload);
  },
  $_update_material_status: (payload: any) => {
    const url = `/users/update-material-status?userId=${payload.userId}&materialId=${payload.materialId}&status=${payload.status}`;
    return GATEWAY_ENDPOINT.post(url);
  },
  $_get_materials_by_user_id: (id: any) => {
    let url = `/materials/user/${id}`;
    return GATEWAY_ENDPOINT.get(url);
  },
  $_batch_upload_material: (payload: any) => {
    const url = "/materials/batch-upload-materials";
    return GATEWAY_ENDPOINT.post(url, payload);
  },
};
