// utils/axios.ts
import axios from "axios";

// Frontend/src/utils/axios.ts
const api = axios.create({
    baseURL: "/api/", // Sadece göreli yol (vercel.json'a güveniyoruz)
    withCredentials: true,
});
// ...

export default api;
