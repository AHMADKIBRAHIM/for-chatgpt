export function setupSocket(io){ io.on("connection",(socket)=>{ socket.on("join:kitchen",()=>socket.join("kitchen")); }); }
