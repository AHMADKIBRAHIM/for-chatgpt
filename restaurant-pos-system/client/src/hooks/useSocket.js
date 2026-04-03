import { useEffect } from "react"; import socket from "../app/socket"; export default function useSocket(){ useEffect(()=>{socket.connect(); return ()=>socket.disconnect();},[]); return socket; }
