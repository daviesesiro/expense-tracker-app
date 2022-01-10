import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Layout } from "./components/Layout/Layout";
import { AuthProvider } from "./context/AuthContext";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Balances from "./pages/Balances";
import Connect from "./pages/Connect";
import Dashboard from "./pages/Dashboard";

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
    path: "balances",
    element: <Balances />,
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
