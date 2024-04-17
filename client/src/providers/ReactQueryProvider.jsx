import React, { Fragment } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 2000,
      cacheTime: 2000,
    },
    mutations: {
      networkMode: "always",
    },
  },
});

export const ReactQueryProvider = (props) => {
  return (
    <Fragment>
      <QueryClientProvider client={queryClient}>
        {props.children}
      </QueryClientProvider>
    </Fragment>
  );
};
