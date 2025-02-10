import { useQuery } from "@tanstack/react-query";
import axios from "axios";
export default function useCategories() {
    function getAllCategories() {
        return axios.get("https://ecommerce.routemisr.com/api/v1/categories");
    }
    const features = useQuery({
        queryKey: ["getAllCategories"],
        queryFn: getAllCategories,
    });
    return features;
}
