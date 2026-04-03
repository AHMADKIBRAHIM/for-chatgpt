import apiClient from "../../services/apiClient"; export const fetchCategories=()=>apiClient.get("/categories");
