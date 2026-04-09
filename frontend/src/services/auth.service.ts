import axios, { AxiosError } from "axios";
import {
  ApiUser,
  RegisterPayload,
  ApiErrorResponse,
} from "../types/auth.types";

// Axios instance — swap baseURL with your own MockAPI project URL
const apiClient = axios.create({
  baseURL: "https://vi-notes-av4n.onrender.com/api/auth",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  timeout: 10_000,
});

export const registerUser = async (
  payload: RegisterPayload,
): Promise<ApiUser> => {
  try {
    const { data } = await apiClient.post<ApiUser>("/register", payload);
    return data;
  } catch (err) {
    const axiosErr = err as AxiosError<ApiErrorResponse>;
    const message =
      axiosErr.response?.data?.message ??
      axiosErr.message ??
      "Something went wrong.";
    throw new Error(message);
  }
};
export const loginUser = async (
  payload: import("../types/auth.types").LoginPayload,
): Promise<import("../types/auth.types").LoginResponse> => {
  try {
    const { data } = await apiClient.post<
      import("../types/auth.types").LoginResponse
    >("/login", payload);

    return data;
  } catch (err) {
    const axiosErr = err as import("axios").AxiosError<
      import("../types/auth.types").ApiErrorResponse
    >;

    const message =
      axiosErr.response?.data?.message || axiosErr.message || "Login failed.";

    throw new Error(message);
  }
};
