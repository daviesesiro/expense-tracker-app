import { useMutation } from "react-query";
import { getAuthHeader, axiosClient } from "../../utils/axios";
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
        { headers: { ...getAuthHeader() } }
      ),
    options
  );

export const useMonoUnlink = (
  options?: UseMutationOpts<{ account_id: string }>
) =>
  useMutation(
    ({ account_id }) =>
      axiosClient.delete(`/accounts/${account_id}`, {
        headers: { ...getAuthHeader() },
      }),
    options
  );
