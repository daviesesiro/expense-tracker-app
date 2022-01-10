import React from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useGetCurrentUser } from "../hooks/queries/auth";

let AuthContext = React.createContext<AuthContextType>(null!);

interface User {
  name: string;
  email: string;
  accounts: number;
}

interface AuthContextType {
  user: User | null;
  signin: (user: User, callback?: VoidFunction) => void;
  signout: (callback: VoidFunction) => void;
}

export const AuthProvider: React.FC = ({ children }) => {
  let [user, setUser] = React.useState<User | null>(null);
  const navigate = useNavigate();

  const { isLoading } = useGetCurrentUser({
    onSuccess: (res) => {
      setUser(res.data);

      if (res.data?.accounts === 0) {
        navigate("/connect");
      }
    },
    onError: (err) => {
      console.error(err);
    },
    retry: false,
  });

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <AiOutlineLoading3Quarters className="animate-spin w-6 h-6" />
      </div>
    );
  }

  let signin = (newUser: User, callback?: VoidFunction) => {
    setUser(newUser);
    callback && callback();
  };

  let signout = (callback: VoidFunction) => {
    return ({} as any).signout(() => {
      setUser(null);
      callback();
    });
  };

  let value = { user, signin, signout };

  return <AuthContext.Provider value={value}>{children} </AuthContext.Provider>;
};

export const useAuth = () => {
  return React.useContext(AuthContext);
};
