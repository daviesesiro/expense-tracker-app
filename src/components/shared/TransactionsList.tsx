import {
  useGetUserAccounts,
  useGetUserTransactions,
} from "../../hooks/queries/mono";
import Select from "react-select";
import { useState } from "react";
import bankIcon from "../../assets/bank.svg";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { TransactionItem, Transaction } from "../dashboard/Transaction";
import { SingleValue, Option } from "./ReactSelectComponent";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export const TransactionsList: React.FC<{ title: string; mini?: boolean }> = ({
  title,
  mini,
}) => {
  const [accountsOpts, setAccountsOpts] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [selectAccount, setSelectAccount] = useState();

  const navigate = useNavigate();
  const { isLoading: isGetUserTransactionLoading } = useGetUserTransactions(
    { limit: mini ? 5 : 10, account_id: selectAccount || "" },
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
            value: a._id,
            label: `${a.institutionName} - ${a.accountNumber}`,
            icon: a.institutionLogo,
          }))
        )
      );
    },
  });

  const handleViewMore = () => {
    if (mini) {
      navigate("/transactions");
    }
  };

  let viewMore;
  if (mini) {
    viewMore = <Link to="transactions">View More</Link>;
  } else {
    viewMore = (
      <button onClick={handleViewMore} className="flex justify-center">
        View more
      </button>
    );
  }

  return (
    <div className="mb-8 ">
      <div className="mb-6 flex border-b pb-2 border-gray-200 items-center">
        <h1 className="text-2xl w-full">{title}</h1>
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
      <div className="flex space-y-4 flex-col">
        {isGetUserTransactionLoading ? (
          <div className="item-center flex w-full h-80 justify-center ">
            <AiOutlineLoading3Quarters
              size={28}
              className="animate-spin mt-10"
            />
          </div>
        ) : transactions.length > 0 ? (
          <>
            {transactions.map((t: TransactionItem) => (
              <Transaction key={t?._id} {...t} />
            ))}
            <div className=" flex justify-center mt-4">{viewMore}</div>
          </>
        ) : (
          <div className="h-20 text-lg items-end justify-center flex">
            No Transactions yet
          </div>
        )}
      </div>
    </div>
  );
};
