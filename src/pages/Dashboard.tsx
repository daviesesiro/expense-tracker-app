import { Accounts } from "../components/dashboard/Accounts";
import { GreetingAvatar } from "../components/dashboard/GreetingAvatar";
import { TransactionSummaryChart } from "../components/dashboard/TransactionSummaryChart";
import { TransactionsList } from "../components/shared/TransactionsList";
import { withAuthRoute } from "../components/shared/withRoute";
import { useGetUserAccounts } from "../hooks/queries/mono";
import { TotalBalance } from "../components/dashboard/TotalBalance";

const Dashboard = () => {
  return (
    <div className="flex ">
      <div className="md:w-3/5 p-4 md:p-12 w-full">
        <GreetingAvatar className="mb-5" />
        <Accounts />
        <TransactionSummaryChart />
        <TransactionsList mini title="Latest Transactions" />
      </div>
      <div className="md:w-2/5 p-4 md:p-8 min-h-screen xl:p-16 bg-[#F8FAFF] hidden md:block">
        <TotalBalance />
        <DashboardBalances />
      </div>
    </div>
  );
};

const DashboardBalances = () => {
  const { data: res } = useGetUserAccounts();
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

export default withAuthRoute(Dashboard);
