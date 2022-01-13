import React from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { ReactComponent as SpinIcon } from "../../assets/loader.svg";
import { useMonoLink } from "../../hooks/mutations/mono";
import MonoConnect from "@mono.co/connect.js";
import { useQueryClient } from "react-query";
import { useGetAccountReauthToken } from "../../hooks/queries/mono";

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

export const MonoConnectButton: React.FC<{
  navigateTo?: string;
  [key: string]: any;
}> = ({ children, navigateTo, ...props }) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const mutation = useMonoLink({
    onSuccess: () => {
      toast.success("Account was linked successfully");
      queryClient.invalidateQueries();

      if (navigateTo) navigate(navigateTo, { replace: true });
    },
  });

  const handleClick = () => {
    const monoInstance = new MonoConnect({
      onSuccess: ({ code }) => {
        mutation.mutate({ code });
      },
      key: process.env.REACT_APP_MONO_PUBLIC_KEY,
    });

    monoInstance.setup();
    monoInstance.open();
  };

  return (
    <Button {...props} loading={mutation.isLoading} onClick={handleClick}>
      {children}
    </Button>
  );
};

export const MonoReAuthButton: React.FC<{
  accountId: string; // not mono account Id
  [key: string]: any;
}> = ({ children, accountId, ...props }) => {
  const queryClient = useQueryClient();
  const { refetch } = useGetAccountReauthToken(accountId, { enabled: false });

  const monoConnect = React.useMemo(() => {
    const monoInstance = new MonoConnect({
      onSuccess: () => {
        queryClient.invalidateQueries("user-accounts");
      },
      key: process.env.REACT_APP_MONO_PUBLIC_KEY,
    });

    return monoInstance;
  }, [queryClient]);

  const handleClick = async () => {
    const { data: res } = await refetch();

    if (res?.data) {
      monoConnect.reauthorise(res.data);
      monoConnect.open();
    }
  };

  return (
    <Button {...props} onClick={handleClick}>
      {children}
    </Button>
  );
};
