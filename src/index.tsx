import React from "react";
import ReactDOM from "react-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import { ReactQueryDevtools } from "react-query/devtools";
import "./index.css";
import { Toaster } from "react-hot-toast";

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: false, refetchOnWindowFocus: false } },
});

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <QueryClientProvider client={queryClient}>
        <Toaster />
        <App />
        <ReactQueryDevtools />
      </QueryClientProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
