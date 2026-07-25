import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar";
import { Sidebar } from "./Sidebar";
import { Footer } from "./Footer";
import { Drawer } from "../components/common/UIComponents";

export const DashboardLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-[#0B0F19] text-slate-900 dark:text-slate-100 transition-colors">
      <Navbar onOpenMobileSidebar={() => setMobileDrawerOpen(true)} />

      <div className="flex flex-1 relative">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block shrink-0">
          <Sidebar
            collapsed={collapsed}
            onToggleCollapse={() => setCollapsed(!collapsed)}
          />
        </div>

        {/* Mobile Sidebar Drawer */}
        <Drawer
          isOpen={mobileDrawerOpen}
          onClose={() => setMobileDrawerOpen(false)}
          title="Academia Navigation"
          position="left"
        >
          <Sidebar isMobile onCloseMobile={() => setMobileDrawerOpen(false)} />
        </Drawer>

        {/* Main Content Area */}
        <main className="flex-1 flex flex-col min-w-0 p-4 lg:p-8">
          <div className="flex-1 max-w-7xl w-full mx-auto space-y-6">
            <Outlet />
          </div>
          <Footer />
        </main>
      </div>
    </div>
  );
};
