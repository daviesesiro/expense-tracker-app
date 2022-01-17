import { AiFillLock, AiOutlineArrowUp } from "react-icons/ai";
import { MonoConnectButton } from "../components/shared/Button";
import { withAuthRoute } from "../components/shared/withRoute";

const Connect = () => {
  return (
    <div className="flex items-center w-full justify-center min-h-screen px-5 xs:px-0">
      <div className="flex items-center justify-center bg-black max-w-[400px] flex-col text-white w-full rounded-xl py-11">
        <AiFillLock className=" w-[60px] h-[60px] mb-3" />
        <p className="text-[28px] font-light mb-3">Final Step</p>
        <p className="text-lg w-52 font-light text-center mb-6">
          Link your Bank Account in seconds
        </p>
        <MonoConnectButton navigateTo="/" className="btn-white px-10">
          <span>LINK NOW </span>
          <span className="ml-2 rotate-45 transform">
            <AiOutlineArrowUp />
          </span>
        </MonoConnectButton>
      </div>
    </div>
  );
};

export default withAuthRoute(Connect);
