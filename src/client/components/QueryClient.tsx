import React from "react";
import {
  QueryClient,
  QueryClientProvider as RQueryClientProvider,
} from "react-query";

const queryClient = new QueryClient();

export const QueryClientProvider: React.FC = ({ children }) => {
  return (
    <RQueryClientProvider client={queryClient}>{children}</RQueryClientProvider>
  );
};
