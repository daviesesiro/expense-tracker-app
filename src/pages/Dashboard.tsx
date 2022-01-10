import { withAuthRoute } from "../components/shared/withRoute";

import {
  useGetUserAccounts,
  useGetUserTotalBalance,
} from "../hooks/queries/mono";
import { GreetingAvatar } from "../components/dashboard/GreetingAvatar";
import { Option, SingleValue } from "../components/shared/ReactSelectComponent";
import { useEffect } from "react";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { TransactionSummaryChart } from "../components/dashboard/TransactionSummaryChart";
import { Accounts } from "../components/dashboard/Accounts";
import { BsArrowDownLeft, BsArrowUpRight } from "react-icons/bs";
import { Button } from "../components/shared/Button";
import { Loader } from "../components/shared/Loader";
import { TransactionsList } from "../components/shared/TransactionsList";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  return (
    <div className="flex ">
      <div className="md:w-3/5 p-4 md:p-12 w-full">
        <GreetingAvatar className="mb-5" />
        <Accounts />
        <TransactionSummaryChart />
        <TransactionsList />
      </div>
      <div className="md:w-2/5 p-4 md:p-8 xl:p-16 bg-[#F8FAFF] hidden md:block">
        <TotalBalance />
        <DashboardBalance />
      </div>
    </div>
  );
};

const TotalBalance = () => {
  const { isLoading, data: res } = useGetUserTotalBalance();

  return (
    <div className="rounded-lg shadow-lg px-12 py-9 text-center bg-white mb-12">
      <p className="text-xl mb-6">TOTAL BALANCE</p>
      <p className="text-5xl mb-2 flex justify-center font-medium">
        {isLoading ? <Loader /> : (Number(res?.data) || 0).toLocaleString()}
      </p>
      <p className="text-gray-500 mb-8">Your balance across all banks</p>
      <Button className="w-full btn-blue">LINK BANK ACCOUNT</Button>
    </div>
  );
};

const DashboardBalance = () => {
  const { data: res } = useGetUserAccounts();
  console.log(res?.data);
  return (
    <div className="">
      <h2 className="border-b pb-2 text-2xl mb-4">Balances</h2>
      <div className="flex flex-col space-y-4">
        {(res?.data || []).map((a: any) => (
          <div key={"t-" + a?._id} className="flex items-center">
            <div className="flex items-center">
              <img
                src={a?.institutionLogo}
                alt="logo"
                className="rounded-ful mr-2 l w-10 h-10"
              />
              <span className="text-lg"> {a.institutionName}</span>
            </div>
            <p className="ml-auto">{Number(a.balance || 0).toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export interface TransactionItem {
  amount: string;
  currency: string;
  type: string;
  _id: string;
  date: string;
}

export const Transaction: React.FC<TransactionItem> = ({
  amount,
  type,
  date,
}) => {
  const isCredit = type === "credit";
  return (
    <div
      className={`flex items-center hover:bg-gray-100 duration-100 px-1 py-2 rounded-md`}
    >
      <div
        className={`${
          isCredit ? "bg-green-500" : "bg-red-400"
        } rounded-full text-white mr-2 w-12 h-12 flex items-center justify-center bg-black`}
      >
        {isCredit ? (
          <BsArrowUpRight className="stroke-1" />
        ) : (
          <BsArrowDownLeft className="stroke-1" />
        )}
      </div>
      <div>
        <p className="ml-auto font-bold">
          NGN {Number(amount).toLocaleString()}
        </p>
        <p className="mt-1 text-gray-500 font-light text-sm">
          {new Date(date).toLocaleString("en-NG", {
            hour12: true,
          })}{" "}
          • {type}
        </p>
      </div>
    </div>
  );
};

export default withAuthRoute(Dashboard);
