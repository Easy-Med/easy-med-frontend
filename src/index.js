import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import ThemeWrapper from "./app/theme/ThemeWrapper";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

ReactDOM.render(
  <QueryClientProvider client={queryClient}>
    <ThemeWrapper>
      <App />
    </ThemeWrapper>
    <ReactQueryDevtools initialIsOpen={false} position={"bottom-right"} />
  </QueryClientProvider>,
  document.getElementById("root")
);
