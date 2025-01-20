import { GATEWAY_ENDPOINT } from "../axios.config";

export const session_api = {
  $_create_session: (payload: any) => {
    const url = "/materials/session";
    return GATEWAY_ENDPOINT.post(url, payload);
  },
  $_get_ssessions: () => {
    const url = "/materials/sessions";
    return GATEWAY_ENDPOINT.get(url);
  },
  $_update_session: (payload: any, id: any) => {
    const url = `/materials/session/${id}`;
    return GATEWAY_ENDPOINT.put(url, payload);
  },
  $_delete_session: (id: any) => {
    let url = `/materials/session/${id}`;
    return GATEWAY_ENDPOINT.delete(url);
  }
};
