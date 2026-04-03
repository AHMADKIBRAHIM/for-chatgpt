import apiClient from "../../services/apiClient"; export const fetchSettings=()=>apiClient.get("/settings");
