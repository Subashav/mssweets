import React, { createContext, useContext, useState, useEffect } from "react";
import { api } from "../services/api.js";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem("mithaira_token") || null);
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("mithaira_admin_user");
    return saved ? JSON.parse(saved) : null;
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function verifySession() {
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const res = await api.auth.me();
        if (res.user) {
          setUser(res.user);
        }
      } catch (err) {
        console.warn("Session expired or invalid:", err.message);
        logout();
      } finally {
        setLoading(false);
      }
    }
    verifySession();
  }, [token]);

  const login = async (username, password) => {
    const res = await api.auth.login(username, password);
    if (res.token) {
      setToken(res.token);
      setUser(res.user);
      localStorage.setItem("mithaira_token", res.token);
      localStorage.setItem("mithaira_admin_user", JSON.stringify(res.user));
      return res;
    }
    throw new Error("Login failed: no token received");
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("mithaira_token");
    localStorage.removeItem("mithaira_admin_user");
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        isAuthenticated: !!token,
        loading,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
