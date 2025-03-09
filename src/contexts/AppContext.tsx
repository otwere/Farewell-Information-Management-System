import React, { useCallback, useState, createContext, useContext } from "react";
import { User, Notification } from "../utils/types";
import { toast } from "sonner";
interface AppContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  darkMode: boolean;
  toggleDarkMode: () => void;
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, "id" | "timestamp" | "read">) => void;
  markNotificationAsRead: (id: string) => void;
  clearNotifications: () => void;
}
const AppContext = createContext<AppContextType | undefined>(undefined);
export const AppProvider: React.FC<{
  children: React.ReactNode;
}> = ({
  children
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("darkMode") === "true";
    }
    return false;
  });
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const toggleDarkMode = useCallback(() => {
    setDarkMode(prev => {
      const newValue = !prev;
      localStorage.setItem("darkMode", String(newValue));
      document.documentElement.classList.toggle("dark", newValue);
      return newValue;
    });
  }, []);
  const addNotification = useCallback((notification: Omit<Notification, "id" | "timestamp" | "read">) => {
    const newNotification: Notification = {
      ...notification,
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date(),
      read: false
    };
    setNotifications(prev => [newNotification, ...prev]);
    // Show toast notification
    toast[notification.type](notification.title, {
      description: notification.message
    });
  }, []);
  const markNotificationAsRead = useCallback((id: string) => {
    setNotifications(prev => prev.map(notification => notification.id === id ? {
      ...notification,
      read: true
    } : notification));
  }, []);
  const clearNotifications = useCallback(() => {
    setNotifications([]);
  }, []);
  return <AppContext.Provider value={{
    user,
    setUser,
    darkMode,
    toggleDarkMode,
    notifications,
    addNotification,
    markNotificationAsRead,
    clearNotifications
  }}>
      {children}
    </AppContext.Provider>;
};
export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};