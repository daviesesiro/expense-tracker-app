import { MonoConnectButton } from "../shared/Button";
import { Loader } from "../shared/Loader";
import { useGetUserTotalBalance } from "../../hooks/queries/mono";

export const TotalBalance = () => {
  const { isLoading, data: res } = useGetUserTotalBalance();

  return (
    <div className="rounded-lg shadow-lg px-12 py-9 text-center bg-white mb-12">
      <p className="text-xl mb-6">TOTAL BALANCE</p>
      <p className="text-5xl mb-2 flex justify-center font-medium">
        {isLoading ? <Loader /> : (Number(res?.data) || 0).toLocaleString()}
      </p>
      <p className="text-gray-500 mb-8">Your balance across all banks</p>
      <MonoConnectButton className="w-full btn-blue">
        LINK BANK ACCOUNT
      </MonoConnectButton>
    </div>
  );
};
