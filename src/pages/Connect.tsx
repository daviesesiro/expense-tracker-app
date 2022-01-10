import MonoConnect from "@mono.co/connect.js";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { AiFillLock, AiOutlineArrowUp } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/shared/Button";
import { withAuthRoute } from "../components/shared/withRoute";
import { useAuth } from "../context/AuthContext";
import { useMonoLink } from "../hooks/mutations/mono";

const Connect = () => {
  const navigate = useNavigate();
  const auth = useAuth();

  useEffect(() => {
    if ((auth.user?.accounts || 0) > 0) {
      navigate("/");
    }
  }, [auth.user, navigate]);

  const mutation = useMonoLink({
    onSuccess: (res) => {
      toast.success("Account was linked successfully");
      navigate("/", { replace: true });
    },
  });

  const monoConnect = React.useMemo(() => {
    const monoInstance = new MonoConnect({
      onSuccess: ({ code }) => {
        console.log(`Linked successfully: ${code}`);
        mutation.mutate({ code });
      },
      key: process.env.REACT_APP_MONO_PUBLIC_KEY,
    });

    monoInstance.setup();

    return monoInstance;
  }, [mutation]);

  return (
    <div className="flex items-center w-full justify-center min-h-screen">
      <div className="flex items-center justify-center bg-black max-w-[400px] flex-col text-white w-full rounded-xl py-11">
        <AiFillLock className=" w-[60px] h-[60px] mb-3" />
        <p className="text-[28px] font-light mb-3">Final Step</p>
        <p className="text-lg w-52 font-light text-center mb-6">
          Link your Bank Account in seconds
        </p>
        <Button
          loading={mutation.isLoading}
          onClick={() => monoConnect.open()}
          type="white"
          className="px-10"
        >
          <span>LINK NOW </span>
          <span className="ml-2 rotate-45 transform">
            <AiOutlineArrowUp />
          </span>
        </Button>
      </div>
    </div>
  );
};

export default withAuthRoute(Connect);
