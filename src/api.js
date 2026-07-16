import axios from "axios";


export const WS_URL = import.meta.env.VITE_API_URL.replace(/^http/, 'ws');

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("access_token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error) 

);
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response.status === 401 &&
            !error.response.config.url.includes('/auth/login')
        ) {
            localStorage.removeItem("access_token");
            localStorage.removeItem("authData");

            sessionStorage.setItem(
                'message',
                'Su sesión ha expirado. Inicia sesión nuevamente.'
            )

            window.location.href = "/apptraining/login";
        }
        return Promise.reject(error);
    }
)

export default api;
