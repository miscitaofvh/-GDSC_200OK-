import { requestAPI } from "../request";
const BASE_URL = "http://localhost:3000/api/auth";

export async function login(identifier: string, password: string) {

    try {
        const response = await requestAPI(BASE_URL, "/login", "POST", { identifier, password });
        const { data, status } = response;

        if (status === 200 && data.success) {
            localStorage.setItem("token", data.token); // check it later
            return { 
                success: true, 
                message: data.message || "Login successful!",
                data: data
            };
        } else {
            return { 
                success: false, 
                message: data.errors[0].msg || "Login failed",
                data: data
            };
        }
    } catch (error: any) {
        return {
            success: false,
            message: error.response?.data?.error || "Login failed",
            status: error.response?.status || 500, 
        };
    }
}

export async function register(username: string, email: string, password: string) {
    try {
        const response = await requestAPI(BASE_URL, "/register", "POST", { username, email, password });
        const { data, status } = response;

        if (status === 201 && data.success) {
            return { 
                success: true, 
                message: data.message || "Registration successful!",
                data: data
            };
        } else {
            return { 
                success: false, 
                message: data.errors[0].msg || "Registration failed",
                data: data
            };
        }
    } catch (error: any) {
        return {
            success: false,
            message: error.response?.data?.error || "Registration failed",
            status: error.response?.status || 500, // Capture status code
        };
    }
}