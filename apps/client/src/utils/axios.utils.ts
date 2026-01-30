/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosError } from "axios";
import { DURATION } from "../constants/global.constants";
import { GeneralServerResponse, ServerError } from "../types/api.types";
import { isJsonString, toSentenceCase } from "./common.utils";

export const getAxios = (withAuthentication = true) => {
  const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL as unknown as string;

  const axiosInstance = axios.create({
    baseURL: baseURL,
    timeout: DURATION.SECOND * 6,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    withCredentials: withAuthentication,
  });

  return axiosInstance;
};

// convert axios error to server error
export function formatErrorFromResponse(err: AxiosError): ServerError {
  let code = "";
  let message = "Something went  wrong";
  let status = 500;
  const error: any = err?.response?.data;
  if (error) {
    code =
      error?.code ||
      error?.status ||
      error?.statusCode ||
      error?.error_code ||
      error?.error_code;
    status =
      error?.status ||
      error?.statusCode ||
      error?.error_code ||
      error?.error_code;
    const messageVal = error?.message || "";
    let messageText = "";
    if (isJsonString(messageVal)) {
      const obj = JSON.parse(messageVal);
      messageText =
        obj?.message || obj?.error_message || "Something went  wrong";
    } else {
      messageText = messageVal;
    }
    message = messageText || "Something went  wrong";
  } else if (err?.message) {
    message = getMessageFromError(err);
    status = err?.status || 500;
  }

  return { code, message, status } as ServerError;
}

// build error message from error entries
export const getMessageFromError = (error: any) => {
  const msg = error?.message;

  if (typeof msg === "string") {
    return msg;
  }

  if (msg && typeof msg === "object") {
    // Try nested message fields
    if (typeof msg.message === "string") {
      return msg.message;
    }
    if (typeof msg.error === "string") {
      return msg.error;
    }
  }

  const errors = msg?.errors;
  if (errors) {
    const errorMessages = Object.values(errors)
      .map((error: any) => {
        let erMsg = toSentenceCase(error);
        if (!erMsg.endsWith(".")) {
          erMsg += ".";
        }
        return erMsg;
      })
      .join(" \n");
    return errorMessages;
  }
};

export const createAPIService = (isAuthenticated = true) => {
  const apiInstance = getAxios(isAuthenticated);

  return {
    get: async <T>(url: string) => {
      const res = await apiInstance.get<GeneralServerResponse<T>>(url);
      return res.data;
    },
    post: async <T>(url: string, body: unknown) => {
      const res = await apiInstance.post<GeneralServerResponse<T>>(url, body);
      return res.data;
    },
    put: async <T>(url: string, body: unknown) => {
      const res = await apiInstance.put<GeneralServerResponse<T>>(url, body);
      return res.data;
    },
    patch: async <T>(url: string, body: unknown) => {
      const res = await apiInstance.patch<GeneralServerResponse<T>>(url, body);
      return res.data;
    },
    delete: async <T>(url: string) => {
      const res = await apiInstance.delete<GeneralServerResponse<T>>(url);
      return res.data;
    },
  };
};
