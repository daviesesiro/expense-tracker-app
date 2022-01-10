import {
  useGetUserAccountsSummary,
  useGetUserTotalBalance,
} from "../../hooks/queries/mono";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export const Accounts = () => {
  const { data, isLoading } = useGetUserAccountsSummary();
  const { data: totalBalanceRes, isLoading: isBalanceLoading } =
    useGetUserTotalBalance();

  const summary = [
    { title: "Saving Account", value: data?.data?.savings },
    { title: "Current Account", value: data?.data?.current },
  ];

  return (
    <div className="mb-2">
      <SummaryItem
        className="mb-4 md:hidden"
        isLoading={isBalanceLoading}
        title="Total Balance"
        value={totalBalanceRes?.data}
      />
      <div className="flex mb-4">
        {summary.map((s) => (
          <SummaryItem
            key={s.title}
            isLoading={isLoading}
            title={s.title}
            value={s.value}
          />
        ))}
      </div>
    </div>
  );
};
const SummaryItem: React.FC<{
  isLoading: boolean;
  value: string;
  className?: string;
  title: string;
}> = ({ isLoading, value, title, className }) => {
  return (
    <div className={`${className} flex-grow`}>
      <p className="mb-2 sm:mb-3 font-light">{title}</p>{" "}
      <p className="text-2xl sm:text-5xl font-bold">
        {!isLoading ? (
          Number(value).toLocaleString()
        ) : (
          <AiOutlineLoading3Quarters className="animate-spin" />
        )}
      </p>
    </div>
  );
};
