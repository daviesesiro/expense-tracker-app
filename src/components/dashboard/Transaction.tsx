import { BsArrowDownLeft, BsArrowUpRight } from "react-icons/bs";

export interface TransactionItem {
  amount: string;
  currency: string;
  type: string;
  _id: string;
  narration: string;
  date: string;
}

export const Transaction: React.FC<TransactionItem> = ({
  amount,
  type,
  narration,
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
      <div className="flex justify-between w-full items-center">
        <div>
          <p className="ml-auto font-semibold text-sm xs:text-base">
            {narration || "N/A"}
          </p>
          <p className="mt-1 text-xs text-gray-500 font-light xs:text-sm">
            {new Date(date).toLocaleString("en-NG", {
              hour12: true,
            })}
            • {type}
          </p>
        </div>
        <p className="ml-auto text-xs xs:text-base font-bold text-right">
          NGN {Number(amount).toLocaleString()}
        </p>
      </div>
    </div>
  );
};
