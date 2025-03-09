import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
interface LayoutProps {
  children: React.ReactNode;
}
const Layout: React.FC<LayoutProps> = ({
  children
}) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };
  return <div className="flex h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Background Pattern */}
      <div className="fixed inset-0 z-0 opacity-[0.03] corporate-pattern" />
      {/* Background Gradient Orbs */}
      <div className="fixed inset-0 z-0">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob" />
        <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000" />
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000" />
      </div>
      <div className="relative z-10 flex w-full">
        <Sidebar collapsed={sidebarCollapsed} onToggle={toggleSidebar} />
        <div className="flex flex-col flex-1 overflow-hidden">
          <Header toggleSidebar={toggleSidebar} />
          <main className="flex-1 overflow-y-auto p-4 relative">
            {/* Content Background */}
            <div className="absolute inset-0 z-0 fancy-gradient dark:fancy-gradient-dark" />
            {/* Glass Effect Overlay */}
            <div className="absolute inset-0 z-0 bg-white/30 dark:bg-gray-900/30 backdrop-blur-sm" />
            {/* Main Content */}
            <div className="relative z-10">{children}</div>
          </main>
        </div>
      </div>
    </div>;
};
export default Layout;