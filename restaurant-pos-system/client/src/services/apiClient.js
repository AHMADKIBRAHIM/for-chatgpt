import axios from 'axios';
import tokenService from './tokenService';
const apiClient=axios.create({baseURL:import.meta.env.VITE_API_URL});
apiClient.interceptors.request.use((config)=>{const t=tokenService.getToken();if(t)config.headers.Authorization=`Bearer ${t}`;return config;});
export default apiClient;
