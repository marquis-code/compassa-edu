import { GATEWAY_ENDPOINT } from "../axios.config";

export const audit_api = {
  $_get_audit_logs: () => {
    const url = "/admin/audit";
    return GATEWAY_ENDPOINT.get(url);
  }
};
