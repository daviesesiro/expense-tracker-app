import { useQuery } from "react-query";
import { authHeader, axiosClient } from "../../utils/axios";
import { useQueryOpts } from "../types";

export const useGetUserAccounts = (options?: useQueryOpts) =>
  useQuery(
    "user-accounts",
    () => axiosClient.get("/accounts", { headers: { ...authHeader } }),
    options
  );

export const useGetUserAccountsSummary = (options?: useQueryOpts) =>
  useQuery(
    "user-accounts-summary",
    () => axiosClient.get("/accounts/summary", { headers: { ...authHeader } }),
    options
  );

export const useGetUserTotalBalance = (options?: useQueryOpts) =>
  useQuery(
    "user-total-balance",
    () =>
      axiosClient.get("/accounts/total-balance", {
        headers: { ...authHeader },
      }),
    options
  );

export const useGetUserTransactions = (
  payload: { account_id?: string; limit: any },
  options?: useQueryOpts
) =>
  useQuery(
    ["user-transaction", payload],
    () =>
      axiosClient.get(
        `/accounts/transactions?${new URLSearchParams(payload).toString()}`,
        {
          headers: { ...authHeader },
        }
      ),
    options
  );

export const useGetUserTransactionsSummary = (options?: useQueryOpts) =>
  useQuery(
    ["user-transaction-summary"],
    () =>
      axiosClient.get(`/accounts/transaction-summary`, {
        headers: { ...authHeader },
      }),
    options
  );
