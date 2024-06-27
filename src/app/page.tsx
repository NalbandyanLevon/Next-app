"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ProductsContainer from "./products/page";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const Home = () => {
  const router = useRouter();
  useEffect(() => {
    if (!Cookies.get("authToken")?.length) {
      router.push("/login");
    }
  }, [router]);

  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <ProductsContainer />
    </QueryClientProvider>
  );
};

export default Home;
