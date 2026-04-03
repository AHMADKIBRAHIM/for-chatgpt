import Order from "../orders/order.model.js"; export const getSalesSummary=()=>Order.aggregate([{ $group:{ _id:null,totalSales:{ $sum:"$total" },orders:{ $sum:1 } } }]);
