"use client";

import { FC } from "react";
import AddToCard from "../AddToCard/AddToCard";
import { EachProduct } from "@/types/types";
// import styles from "../../page.module.css";
import styles from "@/app/page.module.css";
import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";

interface IProps {
  eachProduct: EachProduct;
}

const ProductCard: FC<IProps> = ({ eachProduct }) => {
  // const router = useRouter();
  // const handleOnClick = (id: number) => {
  //   router.push(`/products/${id}`);
  // };
  return (
    <div className={styles.card}>
      <Link href={`/products/${eachProduct.id}`}>
        <Image
          src={eachProduct.image}
          alt={eachProduct.title}
          width={150}
          height={150}
        />
        <div className={styles.title}>{eachProduct.title}</div>
        <h2 className={styles.description}>{eachProduct.description}</h2>
        <AddToCard id={eachProduct.id} />
      </Link>
    </div>
  );
};

export default ProductCard;
