import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Layout } from "./components/Layout/Layout";
import { AuthProvider } from "./context/AuthContext";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Accounts from "./pages/Account";
import Connect from "./pages/Connect";
import Transactions from "./pages/Transactions";
import Dashboard from "./pages/Dashboard";
import Settings from "./pages/Settings";

const authRoutes = [
  {
    path: "/auth/login",
    element: <Login />,
  },
  {
    path: "/auth/register",
    element: <Register />,
  },
];
const dashboardRoutes = [
  {
    path: "/",
    element: <Dashboard />,
    index: true,
  },
  {
    path: "accounts",
    element: <Accounts />,
  },
  {
    path: "settings",
    element: <Settings />,
  },
  {
    path: "transactions",
    element: <Transactions />,
  },
  {
    path: "connect",
    element: <Connect />,
  },
  {
    path: "*",
    element: <div>Nothing is here</div>,
  },
];

function App() {
  return (
    <AuthProvider>
      <Routes>
        {authRoutes.map((r, idx) => (
          <Route key={idx} path={r.path} element={r.element} />
        ))}
        <Route path="/" element={<Layout />}>
          {dashboardRoutes.map((r, idx) => (
            <Route {...r} key={"dash-route" + idx} />
          ))}
        </Route>

        <Route path={"*"} element={<div>Nothing is here</div>} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
