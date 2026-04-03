import apiClient from "../../services/apiClient"; export const fetchTables=()=>apiClient.get("/tables");
