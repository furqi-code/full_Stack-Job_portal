import React_dom from "react-dom/client";
import { App } from "./App";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const root = React_dom.createRoot(document.querySelector("#root"));
root.render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
);
