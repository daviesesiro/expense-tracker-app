import { useMutation } from "react-query";
import { authHeader, axiosClient } from "../../utils/axios";
import { UseMutationOpts } from "../types";

interface LinkData {
  code: string;
}

export const useMonoLink = (options?: UseMutationOpts<LinkData>) =>
  useMutation(
    (data: LinkData) =>
      axiosClient.post(
        "/accounts/link",
        { token: data.code },
        { headers: { ...authHeader } }
      ),
    options
  );
