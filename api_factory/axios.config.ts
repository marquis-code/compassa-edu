import axios, { AxiosResponse } from "axios";
import { useUser } from "@/composables/auth/user";
import { useCustomToast } from '@/composables/core/useCustomToast'
const { showToast } = useCustomToast();

const { token, logOut } = useUser();

const $GATEWAY_ENDPOINT_WITHOUT_VERSION = import.meta.env.VITE_BASE_URL as string;
// const $GATEWAY_UPLOAD_ENDPOINT_WITHOUT_VERSION = import.meta.env.VITE_UPLOAD_BASE_URL as string;mm
const $GATEWAY_ENDPOINT = import.meta.env.VITE_BASE_URL + "/api/v1";
const $GATEWAY_UPLOAD_ENDPOINT = import.meta.env.VITE_UPLOAD_BASE_URL + "/v1";
const $IMAGE_UPLOAD_ENDPOINT = import.meta.env
  .VITE_IMAGE_UPLOAD_BASE_URL as string;

export const GATEWAY_ENDPOINT = axios.create({
  baseURL: $GATEWAY_ENDPOINT,
});

const blackCountryToksn = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFiYWhtYXJxdWlzQGdtYWlsLmNvbSIsInN1YiI6IjUxZDcxZDA4LTQ2MmMtNGViMS1hNzM5LTg2MDQzMWQzYTFlZCIsInJvbGUiOiJQUk9QRVJUWV9NQU5BR0VSIiwiaWF0IjoxNzM3MzUxNTI3LCJleHAiOjE3NzE5MTE1Mjd9.l460xVII6_QPGphkLyIO1Gr4hxyj7V68q_wZbOZFH6U'
export const GATEWAY_ENDPOINT_WITH_AUTH = axios.create({
  baseURL: $GATEWAY_ENDPOINT,
  headers: {
    Authorization: `Bearer ${token.value}`,
  },
});

export const GATEWAY_UPLOAD_ENDPOINT_WITH_AUTH = axios.create({
  baseURL: $GATEWAY_UPLOAD_ENDPOINT,
  headers: {
    Authorization: `Bearer ${blackCountryToksn}`,
  },
});

export const GATEWAY_ENDPOINT_WITH_AUTH_FORM_DATA = axios.create({
  baseURL: $GATEWAY_ENDPOINT,
  headers: {
    Authorization: `Bearer ${token.value}`,
    "Content-Type": "multipart/form-data",
  },
});

export const GATEWAY_ENDPOINT_WITHOUT_VERSION = axios.create({
  baseURL: $GATEWAY_ENDPOINT_WITHOUT_VERSION,
});
export const GATEWAY_ENDPOINT_WITHOUT_VERSION_WITH_AUTH = axios.create({
  baseURL: $GATEWAY_ENDPOINT_WITHOUT_VERSION,
  headers: {
    Authorization: `Bearer ${token.value}`,
  },
});
export const IMAGE_UPLOAD_ENDPOINT = axios.create({
  baseURL: $IMAGE_UPLOAD_ENDPOINT,
});
export interface CustomAxiosResponse extends AxiosResponse {
  value?: any;
  type?: string;
}

const instanceArray = [
  GATEWAY_ENDPOINT,
  GATEWAY_ENDPOINT_WITH_AUTH,
  GATEWAY_ENDPOINT_WITHOUT_VERSION,
  GATEWAY_UPLOAD_ENDPOINT_WITH_AUTH,
  GATEWAY_ENDPOINT_WITHOUT_VERSION_WITH_AUTH,
];

instanceArray.forEach((instance) => {
  instance.interceptors.request.use((config: any) => {
    if (token.value) {
      config.headers.Authorization = `Bearer ${token.value}`;
    }
    return config;
  });

  instance.interceptors.response.use(
    (response: CustomAxiosResponse) => {
      return response;
    },
    (err: any) => {
      if (typeof err.response === "undefined") {
        showToast({
          title: "Error",
          message: "kindly check your network connection",
          toastType: "error",
          duration: 3000
        });
        return {
          type: "ERROR",
          ...err.response,
        };
      }
      if (err.response.status === 401) {
        logOut()
        showToast({
          title: "Error",
          message:  Array.isArray(err?.response?.data?.message) ? err?.response?.data?.message?.join(" , ") : err?.response?.data?.message,
          toastType: "error",
          duration: 3000
        });
        return {
          type: "ERROR",
          ...err.response,
        };
      } else if (statusCodeStartsWith(err.response.status, 4)) {
        console.log(err.response, 'error')
        if (err.response.data.message) {
          showToast({
            title: "Error",
            message: Array.isArray(err?.response?.data?.message) ? err?.response?.data?.message?.join(" , ") : err?.response?.data?.message,
            toastType: "error",
            duration: 3000
          });
        }
        return {
          type: "ERROR",
          ...err.response,
        };
      } else if (err.response.status === 500) {
        showToast({
          title: "Error",
          message:  Array.isArray(err?.response?.data?.message) ? err?.response?.data?.message?.join(" , ") : err?.response?.data?.message,
          toastType: "error",
          duration: 3000
        });
        return {
          type: "ERROR",
          ...err.response,
        };
      } else if (err.response.status === 409) {
        showToast({
          title: "Error",
          message:  Array.isArray(err?.response?.data?.message) ? err?.response?.data?.message?.join(" , ") : err?.response?.data?.message,
          toastType: "error",
          duration: 3000
        });
      }
    }
  );
});

const statusCodeStartsWith = (
  statusCode: number,
  startNumber: number
): boolean => {
  const statusCodeString = statusCode.toString();
  const startNumberString = startNumber.toString();

  return statusCodeString.startsWith(startNumberString);
};
