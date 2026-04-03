const KEY='pos_token';
export default {getToken:()=>localStorage.getItem(KEY),setToken:(v)=>localStorage.setItem(KEY,v),clearToken:()=>localStorage.removeItem(KEY)};
