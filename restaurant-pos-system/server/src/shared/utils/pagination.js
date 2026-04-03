export const getPagination=(q)=>({page:Math.max(Number(q.page)||1,1),limit:Math.min(Number(q.limit)||20,100)});
