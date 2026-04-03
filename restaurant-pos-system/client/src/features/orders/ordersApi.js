import apiClient from "../../services/apiClient"; export const fetchOrders=()=>apiClient.get("/orders");
