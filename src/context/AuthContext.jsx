import React, { createContext, useContext, useState } from "react";
import { mockUser } from "../data/mockData";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("academia_user");
    return savedUser ? JSON.parse(savedUser) : mockUser;
  });

  const [isAuthenticated, setIsAuthenticated] = useState(true);

  const login = (email, password, role = "student") => {
    let name = "Alexander Wright";
    if (role === "teacher") name = "Dr. Eleanor Vance";
    if (role === "admin") name = "Administrator (Dean)";

    const updatedUser = {
      ...mockUser,
      email: email || mockUser.email,
      name,
      role
    };

    setUser(updatedUser);
    setIsAuthenticated(true);
    localStorage.setItem("academia_user", JSON.stringify(updatedUser));
    return true;
  };

  const setRole = (newRole) => {
    let name = user.name;
    let avatar = user.avatar;

    if (newRole === "student") {
      name = "Alexander Wright";
      avatar = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250";
    } else if (newRole === "teacher") {
      name = "Dr. Eleanor Vance";
      avatar = "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200";
    } else if (newRole === "admin") {
      name = "Administrator (Dean Office)";
      avatar = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250";
    }

    const updatedUser = { ...user, role: newRole, name, avatar };
    setUser(updatedUser);
    localStorage.setItem("academia_user", JSON.stringify(updatedUser));
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("academia_user");
  };

  const updateUserProfile = (fields) => {
    const updatedUser = { ...user, ...fields };
    setUser(updatedUser);
    localStorage.setItem("academia_user", JSON.stringify(updatedUser));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        role: user?.role || "student",
        login,
        logout,
        setRole,
        updateUserProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
