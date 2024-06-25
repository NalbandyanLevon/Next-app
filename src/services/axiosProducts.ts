import { EachProduct } from "@/types/types";
import { QueryClient, dehydrate } from "@tanstack/react-query";
import axios from "axios";

export const BASE_URL = "https://fakestoreapi.com";

export const axiosProducts = async (): Promise<EachProduct[]> => {
  const response = await axios.get<EachProduct[]>(`${BASE_URL}/products`);
  return response.data;
};

export const axiosProductsById = async (
  id: string | string[] | undefined
): Promise<EachProduct> => {
  const response = await axios.get<EachProduct>(`${BASE_URL}/products/${id}`);
  return response.data;
};

export const getStaticProps = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["productsData"],
    queryFn: axiosProducts,
  });
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: 10,
  };
};
