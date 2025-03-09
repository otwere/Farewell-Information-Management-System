import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import Dashboard from "./pages/Dashboard";
import DeceasedRecords from "./pages/DeceasedRecords";
import FuneralManagement from "./pages/FuneralManagement";
import EmbalmentTracking from "./pages/EmbalmentTracking";
import FamilyManagement from "./pages/FamilyManagement";
import FinanceBilling from "./pages/FinanceBilling";
import InventoryManagement from "./pages/InventoryManagement";
import StaffManagement from "./pages/StaffManagement";
import SecurityAccess from "./pages/SecurityAccess";
import Reports from "./pages/Reports";
import TransportServices from "./pages/TransportServices";
import Layout from "./components/Layout";
import LoginPage from "./pages/LoginPage";
import { AppProvider } from "./contexts/AppContext";
import LoadingSpinner from "./components/common/LoadingSpinner";
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
      // 1 minute
      retry: 1
    }
  }
});
export function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem("token");
        setIsAuthenticated(!!token);
      } catch (error) {
        console.error("Auth check failed:", error);
      } finally {
        setIsLoading(false);
      }
    };
    checkAuth();
  }, []);
  const handleLogin = () => {
    setIsAuthenticated(true);
    localStorage.setItem("token", "dummy-token");
  };
  if (isLoading) {
    return <div className="h-screen flex items-center justify-center">
        <LoadingSpinner size={40} />
      </div>;
  }
  return <QueryClientProvider client={queryClient}>
      <AppProvider>
        <Router>
          {isAuthenticated ? <Layout>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/deceased-records" element={<DeceasedRecords />} />
                <Route path="/funeral-management" element={<FuneralManagement />} />
                <Route path="/embalment-tracking" element={<EmbalmentTracking />} />
                <Route path="/family-management" element={<FamilyManagement />} />
                <Route path="/finance-billing" element={<FinanceBilling />} />
                <Route path="/inventory-management" element={<InventoryManagement />} />
                <Route path="/staff-management" element={<StaffManagement />} />
                <Route path="/security-access" element={<SecurityAccess />} />
                <Route path="/reports" element={<Reports />} />
                <Route path="/transport-services" element={<TransportServices />} />
              </Routes>
            </Layout> : <LoginPage onLogin={handleLogin} />}
        </Router>
        <Toaster position="top-right" expand={false} richColors closeButton />
      </AppProvider>
    </QueryClientProvider>;
}