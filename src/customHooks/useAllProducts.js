import { useQuery } from '@tanstack/react-query'
import axios from 'axios'


export default function useAllProducts() {
    function getAllProducts() {
        return axios.get("https://ecommerce.routemisr.com/api/v1/products");
    }
    const features = useQuery({
        queryKey: ["getallProducts"],
        queryFn: getAllProducts,
        refetchOnWindowFocus: false,
        refetchInterval: 15 * 60 * 1000,
        retry: 3,
        staleTime: 10 * 60 * 1000,
    });
    return features
}
