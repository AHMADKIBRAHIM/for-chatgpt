import { getSalesSummary } from "./reports.repository.js"; export const salesSummary=async()=>{const [row]=await getSalesSummary(); return row||{totalSales:0,orders:0};};
