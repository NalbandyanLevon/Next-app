'use client'

import { FC } from "react";
import AddToCard from "../AddToCard/AddToCard";
import { EachProduct } from "@/types/types";
import styles from "../../page.module.css";
import Image from "next/image";

interface IProps {
  eachProduct: EachProduct;
}

const ProductCard: FC<IProps> = ({ eachProduct }) => {
  return (
    <div className={styles.card}>
      <Image
        src={eachProduct.image}
        alt={eachProduct.title}
        width={150}
        height={150}
      />
      <div className={styles.title}>{eachProduct.title}</div>
      <h2 className={styles.description}>{eachProduct.description}</h2>
      <AddToCard id={eachProduct.id} />
    </div>
  );
};

export default ProductCard;
