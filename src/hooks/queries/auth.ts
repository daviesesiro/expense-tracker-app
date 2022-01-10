import { AxiosResponse } from "axios";
import { useQuery, UseQueryOptions } from "react-query";
import { getAuthHeader, axiosClient } from "../../utils/axios";

type opts =
  | Omit<
      UseQueryOptions<
        AxiosResponse<any, any>,
        unknown,
        AxiosResponse<any, any>,
        "current-user"
      >,
      "queryKey" | "queryFn"
    >
  | undefined;

export const useGetCurrentUser = (options: opts) =>
  useQuery(
    "current-user",
    () =>
      axiosClient.get("/auth/current-user", {
        headers: { ...getAuthHeader() },
      }),
    options
  );
