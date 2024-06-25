"use client"

import { axiosProductsById } from "@/services/axiosProducts";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useRouter } from "next/router";
import { FC } from "react";

const EachProductCard: FC = () => {
//   const router = useRouter();
  const params = useParams();
  const { id } = params;

  const { data, error, isLoading } = useQuery({
    queryKey: ["productData", id],
    queryFn: () => axiosProductsById(id),
    enabled: !!id,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading product</div>;
  }

  if (!data) {
    return <div>No product found</div>;
  }
  return (
    <div>
      <Image src={data.image} alt="product" width={150} height={150} />
      <h1>{data?.title}</h1>
      <p>{data?.description}</p>
      <p>{data?.price}</p>
    </div>
  );
};

export default EachProductCard;
