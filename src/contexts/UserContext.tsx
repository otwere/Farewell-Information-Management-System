import React, { useEffect, useState, createContext, useContext } from "react";
interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
  status: "online" | "busy" | "away" | "offline";
  preferences?: {
    theme: "light" | "dark" | "system";
    language: string;
    notifications: boolean;
    emailNotifications: boolean;
  };
  lastActive?: string;
}
interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => void;
  updateStatus: (status: User["status"]) => void;
  updatePreferences: (preferences: Partial<User["preferences"]>) => void;
}
const UserContext = createContext<UserContextType | undefined>(undefined);
export function UserProvider({
  children
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    }
  }, [user]);
  const logout = () => {
    setUser(null);
  };
  const updateStatus = (status: User["status"]) => {
    if (user) {
      setUser({
        ...user,
        status,
        lastActive: new Date().toISOString()
      });
    }
  };
  const updatePreferences = (preferences: Partial<User["preferences"]>) => {
    if (user && user.preferences) {
      setUser({
        ...user,
        preferences: {
          ...user.preferences,
          ...preferences
        }
      });
    }
  };
  return <UserContext.Provider value={{
    user,
    setUser,
    logout,
    updateStatus,
    updatePreferences
  }}>
      {children}
    </UserContext.Provider>;
}
export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}