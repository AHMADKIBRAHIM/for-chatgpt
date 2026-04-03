import http from 'http';
import { Server } from 'socket.io';
import app from './app.js';
import { env } from './config/env.js';
import { connectDB } from './config/db.js';
import { setupSocket } from './config/socket.js';

const server=http.createServer(app);
const io=new Server(server,{cors:{origin:env.clientUrl,credentials:true}});
setupSocket(io);

connectDB().then(()=>{
  server.listen(env.port,()=>console.log(`API listening on ${env.port}`));
}).catch((err)=>{console.error('DB connection failed',err);process.exit(1);});
