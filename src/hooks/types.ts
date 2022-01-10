import { AxiosResponse } from "axios";
import { UseMutationOptions, UseQueryOptions } from "react-query";

export type UseMutationOpts<T> = Omit<
  UseMutationOptions<AxiosResponse<any, any>, unknown, T, unknown>,
  "mutationFn"
>;

export type useQueryOpts =
  | Omit<
      UseQueryOptions<
        AxiosResponse<any, any>,
        unknown,
        AxiosResponse<any, any>
      >,
      "queryKey" | "queryFn"
    >
  | undefined;
