import React from "react";
import { useNavigate } from "react-router-dom";
import { Loader } from "../components/shared/Loader";
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
  signout: () => void;
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
        <Loader size={35} />
      </div>
    );
  }

  let signin = (newUser: User, callback?: VoidFunction) => {
    setUser(newUser);
    callback && callback();
  };

  let signout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  let value = { user, signin, signout };

  return <AuthContext.Provider value={value}>{children} </AuthContext.Provider>;
};

export const useAuth = () => {
  return React.useContext(AuthContext);
};
