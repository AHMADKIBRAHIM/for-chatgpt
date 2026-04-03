import apiClient from "../../services/apiClient"; export const fetchUsers=()=>apiClient.get("/users");
