import apiClient from "../../services/apiClient"; export const fetchProducts=()=>apiClient.get("/products");
