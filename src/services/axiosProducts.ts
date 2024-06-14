import { EachProduct } from "@/types/types"
import axios from "axios"

const BASE_URL = 'https://fakestoreapi.com/products'

export const axiosProducts = async (): Promise<EachProduct[]> => {
    const response = await axios.get<EachProduct[]>(BASE_URL)
    return response.data
}

export const axiosProductsById = async (id: string): Promise<EachProduct> => {
    const response = await axios.get<EachProduct>(`${BASE_URL}/${id}`)
    return response.data
}