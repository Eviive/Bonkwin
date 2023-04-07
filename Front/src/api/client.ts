import axios, { AxiosRequestConfig } from "axios";

export const httpClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
        "Accept": "application/json"
    }
});

export const request = async (url: string, config?: AxiosRequestConfig) => {
    const res = await httpClient.request({
        url,
        method: "GET",
        withCredentials: true, // cookies do not work without this
        ...config
    });
    return res.data;
};
