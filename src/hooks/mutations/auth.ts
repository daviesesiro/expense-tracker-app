import { useMutation } from "react-query";
import { getAuthHeader, axiosClient } from "../../utils/axios";
import { UseMutationOpts } from "../types";

interface LoginData {
  email: string;
  password: string;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export const useLogin = (options?: UseMutationOpts<LoginData>) =>
  useMutation(
    (data: LoginData) => axiosClient.post("/auth/login", data),
    options
  );

export const useRegister = (options?: UseMutationOpts<RegisterData>) =>
  useMutation(
    (data: RegisterData) => axiosClient.post("/auth/register", data),
    options
  );

export const useCloseAccount = (options?: UseMutationOpts) =>
  useMutation(
    () =>
      axiosClient.delete(`/auth/close-account`, {
        headers: { ...getAuthHeader() },
      }),
    options
  );
