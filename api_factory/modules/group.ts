import { GATEWAY_ENDPOINT } from "../axios.config";

export const group_api = {
  $_create_group: (payload: any) => {
    const url = "/groups";
    return GATEWAY_ENDPOINT.post(url, payload);
  },
  $_get_all_groups: () => {
    const url = '/groups';
    return GATEWAY_ENDPOINT.get(url);
  },
  $_get_group_by_id: (groupId: string) => {
    const url = `/groups/${groupId}`;
    return GATEWAY_ENDPOINT.get(url);
  },
  $_uptate_group: (groupId: any, payload: any) => {
    let url = `/groups/${groupId}`;
    return GATEWAY_ENDPOINT.patch(url);
  },
  $_delete_group: (groupId: any) => {
    let url = `/groups/${groupId}`;
    return GATEWAY_ENDPOINT.delete(url);
  },
  $_join_group_by_user_id: (userId: any, groupId: any) => {
    const url = `/groups/join-by-user/${groupId}/${userId}`;
    return GATEWAY_ENDPOINT.post(url);
  },
  $_join_group_by_group_id: (groupId: any) => {
    const url = `/groups/join/${groupId}`;
    return GATEWAY_ENDPOINT.post(url);
  },
};
