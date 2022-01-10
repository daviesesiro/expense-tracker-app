import toast from "react-hot-toast";
import { useQueryClient } from "react-query";
import { Button } from "../components/shared/Button";
import { Loader } from "../components/shared/Loader";
import { withAuthRoute } from "../components/shared/withRoute";
import { useMonoUnlink } from "../hooks/mutations/mono";
import {
  useGetUserAccounts,
  useGetUserTotalBalance,
} from "../hooks/queries/mono";

const Accounts = () => {
  const { data: res } = useGetUserAccounts();
  const { data: balanceRes, isLoading: isBalanceLoading } =
    useGetUserTotalBalance();

  return (
    <div className="p-4 md:p-12">
      <div className="mb-6 flex border-b pb-2 border-gray-200 items-center">
        <h1 className="text-xl sm:text-2xl w-full">Accounts</h1>
        <p className="ml-auto text-xl sm:text-2xl">
          {isBalanceLoading ? (
            <Loader />
          ) : (
            "NGN" + Number(balanceRes?.data).toLocaleString()
          )}
        </p>
      </div>

      <div className="xs:grid-cols-flexible grid-cols-flexible-sm gap-x-6 gap-y-10 justify-items-center grid">
        {res?.data.map((a: Account) => (
          <AccountItem key={a._id} {...a} className="w-full" />
        ))}
      </div>
    </div>
  );
};

interface Account {
  _id: string;
  balance: string;
  name: string;
  institutionName: string;
  institutionLogo: string;
  type: string;
  accountNumber: string;
}

const AccountItem: React.FC<{
  className?: string;
  balance: string;
  name: string;
  institutionName: string;
  institutionLogo: string;
  _id: string;
  type: string;
  accountNumber: string;
}> = ({ className, ...props }) => {
  const cardType = props.type.split("_")[0]?.toUpperCase();
  const queryClient = useQueryClient();

  const mutation = useMonoUnlink({
    onSuccess: () => {
      toast.success("Successfully unlinked account");
      queryClient.invalidateQueries();
    },
    onError: (err: any) => {
      console.log(err);
      if (err?.response?.data?.messsage)
        toast.error(err?.response?.data?.message);
      else toast.error(err?.message);
    },
  });
  return (
    <div
      className={`aspect-[86/54] p-3 xs:py-7 xs:px-5 relative rounded-3xl max-w-[400px] border-[#C59900] border-[3px] bg-[#C59900]/5 ${className}`}
    >
      <div
        className={`${
          cardType === "SAVINGS"
            ? "bg-gold/20 text-gold"
            : "bg-green-500/20 text-green-500"
        } absolute top-3 right-3 xs:top-7 xs:right-5 text-[10px] xs:text-xs p-1 rounded-md`}
      >
        {cardType}
      </div>

      <Button
        loading={mutation.isLoading}
        onClick={() => mutation.mutate({ account_id: props._id })}
        className="absolute top-12 text-[8px] right-3 xs:top-16 bg-red-500/20 text-red-500 xs:right-5 xs:text-xs p-1 rounded-md"
      >
        UNLINK ACCOUNT
      </Button>

      <div className="flex flexc justify-between h-full flex-col">
        <p className="text-brown mb-1 xs:mb-3 text-xs">BALANCE</p>
        <p className="text-brown text-base xs:text-2xl font-bold">
          NGN {Number(props.balance).toLocaleString("en-NG")}
        </p>

        <div className="flex items-center mt-auto">
          <img
            src={props.institutionLogo}
            className="mr-2 xs:w-10 xs:h-10 h-6 w-6"
            alt="logo"
          />
          <div className="flex flex-col">
            <p className="text-[10px] text-brown">{props.institutionName}</p>
            <p className="text-brown text-xs xs:text-base">
              {props.accountNumber}
            </p>
          </div>
          <div className="ml-auto flex flex-col">
            <p className="text-brown text-[10px] xs:text-xs">ACCOUNT NAME</p>
            <p className="text-gold font-bold uppercase text-xs xs:text-base">
              {props.name}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default withAuthRoute(Accounts);
