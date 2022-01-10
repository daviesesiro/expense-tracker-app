import React from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { ReactComponent as SpinIcon } from "../../assets/loader.svg";
import { useMonoLink } from "../../hooks/mutations/mono";
import MonoConnect from "@mono.co/connect.js";
import { useQueryClient } from "react-query";

interface Props {
  [key: string]: any;
  loading?: boolean;
  className?: string;
}

export const Button: React.FC<Props> = ({
  children,
  className,
  type,
  loading,
  ...props
}) => {
  return (
    <button
      disabled={loading}
      className={`flex justify-center items-center rounded-md disabled:cursor-not-allowed p-4 duration-100 ${className}`}
      {...props}
    >
      {loading ? <SpinIcon className="animate-spin" /> : children}
    </button>
  );
};

export const MonoButton: React.FC<{
  navigateTo?: string;
  [key: string]: any;
}> = ({ children, navigateTo, ...props }) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const mutation = useMonoLink({
    onSuccess: (res) => {
      toast.success("Account was linked successfully");
      queryClient.invalidateQueries();

      if (navigateTo) navigate(navigateTo, { replace: true });
    },
  });

  const monoConnect = React.useMemo(() => {
    const monoInstance = new MonoConnect({
      onSuccess: ({ code }) => {
        mutation.mutate({ code });
      },
      key: process.env.REACT_APP_MONO_PUBLIC_KEY,
    });

    monoInstance.setup();

    return monoInstance;
  }, [mutation]);

  return (
    <Button
      {...props}
      loading={mutation.isLoading}
      onClick={() => {
        monoConnect.open();
      }}
    >
      {children}
    </Button>
  );
};
