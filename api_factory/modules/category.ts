import { GATEWAY_ENDPOINT } from "../axios.config";

export const category_api = {
  $_create_category: (payload: any) => {
    const url = "/materials/category";
    return GATEWAY_ENDPOINT.post(url, payload);
  },
  $_get_scategories: () => {
    const url = "/materials/categories";
    return GATEWAY_ENDPOINT.get(url);
  },
  $_update_category: (payload: any, id: any) => {
    const url = `/materials/category/${id}`;
    return GATEWAY_ENDPOINT.put(url, payload);
  },
  $_delete_category: (id: any) => {
    let url = `/materials/category/${id}`;
    return GATEWAY_ENDPOINT.delete(url);
  }
};
