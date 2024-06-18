'use client'

import { EachProduct } from "@/types/types";
import React, { useEffect } from "react";
// import styles from "./ProductsContainer.module.css";
import styles from './ProductsContainer.module.css'
import ProductCard from "@/components/ProductCard";
import { useQuery } from "@tanstack/react-query";
import { axiosProducts } from "@/services/axiosProducts";

const ProductsContainer =  () => {
  const { data, error, isLoading } = useQuery<EachProduct[]>({
    queryKey: ["products"],
    queryFn: axiosProducts,
  });

  console.log(data);
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  if (data) {
    return (
      <>
        <div>Products</div>
        <p>{new Date().toLocaleString()}</p>
        <div className={styles.grid}>
          {data.map((eachProduct) => (
            <ProductCard eachProduct={eachProduct} key={eachProduct.id} />
          ))}
        </div>
      </>
    );
  }
};

export default ProductsContainer;
