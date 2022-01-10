import {
  useGetUserAccounts,
  useGetUserTransactions,
} from "../../hooks/queries/mono";
import Select from "react-select";
import { useState } from "react";
import bankIcon from "../../assets/bank.svg";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { TransactionItem, Transaction } from "../../pages/Dashboard";
import { SingleValue, Option } from "./ReactSelectComponent";

export const TransactionsList = () => {
  const [accountsOpts, setAccountsOpts] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [selectAccount, setSelectAccount] = useState();

  useGetUserTransactions(
    { limit: 5, account_id: selectAccount || "" },
    {
      onSuccess: (res) => {
        setTransactions(res.data?.docs);
      },
    }
  );

  const { isLoading } = useGetUserAccounts({
    onSuccess: (res) => {
      setAccountsOpts(
        ([{ value: "", label: "All", icon: bankIcon }] as any).concat(
          res.data.map((a: any) => ({
            value: a.accountId,
            label: `${a.institutionName} - ${a.accountNumber}`,
            icon: a.institutionLogo,
          }))
        )
      );
    },
  });

  return (
    <div className="mb-8 ">
      <div className="mb-6 flex border-b pb-2 border-gray-200 items-center">
        <h1 className="text-2xl w-full">Latest Transactions</h1>
        <Select
          isLoading={isLoading}
          className="flex-grow max-w-[250px] w-full"
          options={accountsOpts}
          defaultValue={accountsOpts.find((a: any) => a.label === "All")}
          onChange={(e: any) => setSelectAccount(e.value)}
          components={{ Option, SingleValue }}
          placeholder="Select account"
        />
      </div>
      <div className="flex space-y-6 flex-col">
        {isLoading ? (
          <div className="item-center flex w-full h-80 justify-center ">
            <AiOutlineLoading3Quarters
              size={28}
              className="animate-spin mt-10"
            />
          </div>
        ) : (
          transactions.map((t: TransactionItem) => (
            <Transaction key={t?._id} {...t} />
          ))
        )}
      </div>
    </div>
  );
};
