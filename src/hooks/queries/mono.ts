import { useInfiniteQuery, useQuery } from "react-query";
import { getAuthHeader, axiosClient } from "../../utils/axios";
import { useQueryOpts } from "../types";

export const useGetUserAccounts = (options?: useQueryOpts) =>
  useQuery(
    "user-accounts",
    () => axiosClient.get("/accounts", { headers: { ...getAuthHeader() } }),
    options
  );

export const useGetUserAccountsSummary = (options?: useQueryOpts) =>
  useQuery(
    "user-accounts-summary",
    () =>
      axiosClient.get("/accounts/summary", {
        headers: { ...getAuthHeader() },
      }),
    options
  );

export const useGetUserTotalBalance = (options?: useQueryOpts) =>
  useQuery(
    "user-total-balance",
    () =>
      axiosClient.get("/accounts/total-balance", {
        headers: { ...getAuthHeader() },
      }),
    options
  );

export const useGetUserTransactions = (payload: {
  account_id?: any;
  limit: any;
}) => {
  payload.account_id = payload.account_id === 0 ? "" : payload.account_id;
  return useInfiniteQuery(
    ["user-transactions", payload?.account_id || 0],
    async ({ pageParam = 1 }) => {
      const res = await axiosClient.get(
        `/accounts/transactions?${new URLSearchParams(
          payload
        )}&page=${pageParam}`,
        { headers: { ...getAuthHeader() } }
      );
      return res.data;
    },
    {
      getPreviousPageParam: (firstPage) => firstPage.page - 1 ?? false,
      getNextPageParam: (lastPage) => lastPage.nextPage ?? false,
    }
  );
};

export const useGetUserTransactionsSummary = (options?: useQueryOpts) =>
  useQuery(
    ["user-transaction-summary"],
    () =>
      axiosClient.get(`/accounts/transaction-summary`, {
        headers: { ...getAuthHeader() },
      }),
    options
  );
