import { GATEWAY_ENDPOINT } from "../axios.config";

export const message_api = {
  $_create_message: (payload: any) => {
    const url = "/messages";
    return GATEWAY_ENDPOINT.post(url, payload);
  },
  $_get_group_messages: (groupId: string) => {
    const url = `/messages/group/${groupId}`;
    return GATEWAY_ENDPOINT.get(url);
  },
  $_get_unread_messages: (groupId: string) => {
    const url = `/messages/group/${groupId}/unread`;
    return GATEWAY_ENDPOINT.get(url);
  },
  $_mark_messages_as_reaed: (groupId: any) => {
    let url = `/messages/group/${groupId}/mark-read`;
    return GATEWAY_ENDPOINT.post(url);
  }
};
