"use client";

import React, { FC, Suspense, useEffect } from "react";
import styles from "./page.module.css";
import ProductCard from "@/components/ProductCard";
import { useQuery } from "@tanstack/react-query";
import { axiosProducts } from "@/services/axiosProducts";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import Link from "next/link";

const ProductsContainer = () => {
  const router = useRouter();
  useEffect(() => {
    if (!Cookies.get("token")?.length) {
      router.push("/login");
    }
  }, [Cookies]);

  const { data, isLoading, error } = useQuery({
    queryKey: ["productsData"],
    queryFn: axiosProducts,
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  if (data) {
    return (
      <Suspense fallback={<div>...Loading</div>}>
        <div>Products</div>
        <p>{new Date().toLocaleString()}</p>
        <div className={styles.grid}>
          {data.map((eachProduct) => (
            <ProductCard eachProduct={eachProduct} key={eachProduct.id} />
          ))}
        </div>
        <Link href={"/login"}>Exit
        </Link>
      </Suspense>
    );
  }
};

export default ProductsContainer;
