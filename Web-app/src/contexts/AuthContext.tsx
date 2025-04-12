import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { requestAPI } from "../utils/request";

const BASE_URL = "http://localhost:3000/api/auth";

interface AuthContextType {
    user: string | null;
    loading: boolean;
    checkAuth: () => Promise<void>;
    login: (username: string, password: string) => Promise<any>;
    register: (username: string, email: string, name: string, password: string) => Promise<any>;
    logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within an AuthProvider");
    return context;
}

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    const checkAuth = async () => {
        setLoading(true);
        try {
            const response = await requestAPI(BASE_URL, "/me", "GET");
            setUser(response.data.user);
        } catch (error) {
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        checkAuth();
    }, []);

    const login = async (identifier: string, password: string) => {
        try {
            const response = await requestAPI(BASE_URL, "/login", "POST", { identifier, password });
            const { data, status } = response;
            if (status === 200) {
                setUser(data.user);
                window.location.reload();
                return {
                    success: true,
                    message: data.message || "Login successful!",
                    data: data
                };
            }
            else {
                return {
                    success: false,
                    message: data.errors[0].msg || "Login failed",
                    data: data
                };
            }
        } catch (error) {
            console.error("Login failed:", error);
        }
    };

    const register = async (username: string, email: string, name: string, password: string) => {
        try {
            const response = await requestAPI(BASE_URL, "/register", "POST", { username, email, name, password });
            const { data, status } = response;
            if (status === 201) {
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
        } catch (error) {
            console.error("Registration failed:", error);
        }
    }
    const logout = async () => {
        try {
            await requestAPI(BASE_URL, "/logout", "POST");
        } catch (err) {
            console.error("Logout failed:", err);
        } finally {
            setUser(null);
        }
    };

    return (
        <AuthContext.Provider value={{ user, loading, checkAuth, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
}
