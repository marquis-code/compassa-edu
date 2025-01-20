import { GATEWAY_ENDPOINT } from "../axios.config";

export const user_api = {
    $_fetch_user_profile: () => {
        const url = '/users/profile';
        return GATEWAY_ENDPOINT.get(url);
      },
     $_get_users: () => {
      const url = '/users';
      return GATEWAY_ENDPOINT.get(url);
     },
     $_get_user_by_id: (id: string) => {
      const url = `/users/${id}`;
      return GATEWAY_ENDPOINT.get(url);
     },
     $_update_user: (id: string) => {
      const url = `/users/${id}`;
      return GATEWAY_ENDPOINT.put(url);
     },
     $_delete_user: (id: string) => {
      const url = `/users/${id}`;
      return GATEWAY_ENDPOINT.delete(url);
     }
};
