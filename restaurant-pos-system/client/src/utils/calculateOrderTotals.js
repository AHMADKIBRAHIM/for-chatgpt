export default (items=[])=>{const subtotal=items.reduce((s,i)=>s+i.price*i.qty,0);const tax=subtotal*0.08;return{subtotal,tax,total:subtotal+tax};};
