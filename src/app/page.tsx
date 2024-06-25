"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ProductsContainer from "./products/page";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

const Home = () => {
  useEffect(() => {
    if (!Cookies.get("token")?.length) {
      location.pathname = '/login'
    }
  }, [location.pathname]);

  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <ProductsContainer />
    </QueryClientProvider>
  );
};

export default Home;
