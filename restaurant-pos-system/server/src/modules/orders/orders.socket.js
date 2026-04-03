export const emitOrderUpdate=(io,payload)=>io.to("kitchen").emit("order:update",payload);
