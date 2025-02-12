import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

export default function useWishlist() {

    function GetAllProductwishlist() {
        return axios.get("https://ecommerce.routemisr.com/api/v1/wishlist", {
            headers: { token: localStorage.getItem("Token") },
        });
    }

    const features = useQuery({
        queryKey: ["GetAllProductwishlist"],
        queryFn: GetAllProductwishlist,
        // refetchInterval: 500,
    });
    return features
}
