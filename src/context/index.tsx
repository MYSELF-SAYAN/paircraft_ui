"use client";
import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
const AuthContext = createContext({
    token: "",
    setToken: (token: string) => { },
    isAuthenticated: false,
    setIsAuthenticated: (isAuthenticated: boolean) => { },
    userId: "",
    username: "",
    logout: () => { }
});
export function AuthWrapper({ children }: { children: React.ReactNode }) {
    const [token, setToken] = useState("");
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userId, setUserId] = useState("");
    const [username, setUsername] = useState("");
    const logout = () => {
        localStorage.removeItem("token");
        setToken("");
        setIsAuthenticated(false);
    }
    useEffect(() => {
        const tokenId = localStorage.getItem("token");

        if (tokenId) {
            setToken(tokenId);
            setIsAuthenticated(true);

            axios.get(`${process.env.NEXT_PUBLIC_API_URL}/auth/user`, {
                headers: {
                    Authorization: `Bearer ${tokenId}`
                }
            }).then((response) => {
                setUserId(response.data.id);
                setUsername(response.data.username);
            }).catch(() => {
                logout(); 
            });
        }
        console.log("Context",isAuthenticated)
    }, []);
    return (
        <AuthContext.Provider value={{ token, setToken, isAuthenticated, setIsAuthenticated, userId, username, logout }}>
            {children}
        </AuthContext.Provider>
    )

}
export function useAuthContext() {
    return useContext(AuthContext);
}