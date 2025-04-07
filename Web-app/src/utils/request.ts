import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

const apiClient = axios.create({
    headers: {
        "Content-Type": "application/json",
    },
});

export async function requestAPI(
    baseURL: string,
    endpoint: string,
    method: "GET" | "POST" | "PUT" | "DELETE",
    payload?: any,
    token?: string | null
) {
    try {
        const config: AxiosRequestConfig = {
            baseURL,
            url: endpoint,
            method,
            data: payload,
            headers: {
                Authorization: token ? `Bearer ${token}` : undefined,
            },
            withCredentials: true,
        };
        const response: AxiosResponse = await apiClient(config);

        return {
            data: response.data,
            status: response.status,
        };
    } catch (error: any) {
        return {
            error: error.message,
            status: error.response?.status || 500,
            data: error.response?.data || null,
        };
    }
}
