"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import CartProvider from "./CartProvider";
import { useState } from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import NavProvider from "./NavProvider";

export default function Providers({ children }) {
  const [client] = useState(new QueryClient());

  return (
    <QueryClientProvider client={client}>
      <ReactQueryDevtools initialIsOpen={false} />
      <NavProvider>
        <CartProvider>{children}</CartProvider>
      </NavProvider>
    </QueryClientProvider>
  );
}
