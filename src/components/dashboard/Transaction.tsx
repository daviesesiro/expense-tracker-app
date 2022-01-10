import { BsArrowDownLeft, BsArrowUpRight } from "react-icons/bs";

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
