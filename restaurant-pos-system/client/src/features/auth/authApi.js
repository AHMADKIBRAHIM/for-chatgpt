import apiClient from "../../services/apiClient"; export const login=(payload)=>apiClient.post("/auth/login",payload);
