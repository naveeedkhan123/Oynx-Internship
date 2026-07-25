import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { mockNotifications } from "../data/mockData";
import {
  Bell,
  Sun,
  Moon,
  Search,
  Menu,
  User,
  Settings,
  LogOut,
  GraduationCap,
  Shield,
  BookOpen,
  CheckCircle2,
  ChevronDown
} from "lucide-react";
import { Badge } from "../components/common/UIComponents";

export const Navbar = ({ onOpenMobileSidebar }) => {
  const { user, role, setRole, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [notifications, setNotifications] = useState(mockNotifications);

  const unreadCount = notifications.filter((n) => n.unread).length;

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  const handleLogout = () => {
    logout();
    navigate("/auth/login");
  };

  return (
    <header className="sticky top-0 z-30 w-full h-16 glass-card border-b border-slate-200/80 dark:border-slate-800/80 px-4 lg:px-6 flex items-center justify-between transition-all">
      {/* Left: Mobile Menu Toggle & Brand Logo */}
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenMobileSidebar}
          className="lg:hidden p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
        >
          <Menu className="w-5 h-5" />
        </button>

        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center text-white shadow-md shadow-blue-500/30 group-hover:scale-105 transition-transform">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-lg text-slate-900 dark:text-white tracking-tight leading-none">
              Academia<span className="text-blue-600 dark:text-blue-400">LMS</span>
            </span>
            <span className="text-[10px] font-semibold text-slate-400 tracking-wider uppercase mt-0.5">
              Portal
            </span>
          </div>
        </Link>
      </div>

      {/* Center: Search Bar */}
      <div className="hidden md:flex items-center relative w-72 lg:w-96">
        <Search className="absolute left-3.5 w-4 h-4 text-slate-400" />
        <input
          type="text"
          placeholder="Search courses, assignments, faculty..."
          className="w-full pl-10 pr-4 py-2 text-xs rounded-xl bg-slate-100/80 dark:bg-slate-800/80 text-slate-900 dark:text-slate-100 border border-transparent focus:border-blue-500 outline-none transition"
        />
        <span className="absolute right-3 text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-700 text-slate-500">
          ⌘K
        </span>
      </div>

      {/* Right Controls: Role Switcher, Theme, Notifications, Profile */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Role Switcher Pill for seamless demo testing */}
        <div className="hidden sm:flex items-center bg-slate-100 dark:bg-slate-800/90 p-1 rounded-xl border border-slate-200 dark:border-slate-700 text-xs">
          <button
            onClick={() => setRole("student")}
            className={`px-2.5 py-1 rounded-lg font-bold transition ${
              role === "student"
                ? "bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-sm"
                : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
            }`}
          >
            Student
          </button>
          <button
            onClick={() => setRole("teacher")}
            className={`px-2.5 py-1 rounded-lg font-bold transition ${
              role === "teacher"
                ? "bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm"
                : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
            }`}
          >
            Teacher
          </button>
          <button
            onClick={() => setRole("admin")}
            className={`px-2.5 py-1 rounded-lg font-bold transition ${
              role === "admin"
                ? "bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-sm"
                : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
            }`}
          >
            Admin
          </button>
        </div>

        {/* Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          title="Toggle Theme"
        >
          {isDark ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-slate-700" />}
        </button>

        {/* Notifications Dropdown */}
        <div className="relative">
          <button
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowUserDropdown(false);
            }}
            className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 relative transition"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-rose-500 rounded-full animate-ping" />
            )}
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-rose-500 rounded-full" />
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-3 w-80 sm:w-96 glass-dropdown rounded-2xl p-4 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white">Notifications</h4>
                  {unreadCount > 0 && <Badge variant="danger">{unreadCount} New</Badge>}
                </div>
                <button
                  onClick={markAllRead}
                  className="text-[11px] font-semibold text-blue-600 hover:underline flex items-center gap-1"
                >
                  <CheckCircle2 className="w-3 h-3" /> Mark read
                </button>
              </div>

              <div className="divide-y divide-slate-100 dark:divide-slate-800 max-h-80 overflow-y-auto my-2">
                {notifications.map((ntf) => (
                  <div
                    key={ntf.id}
                    className={`py-3 px-2 rounded-xl transition ${
                      ntf.unread ? "bg-blue-50/50 dark:bg-slate-800/50" : "hover:bg-slate-50 dark:hover:bg-slate-800/30"
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <h5 className="text-xs font-bold text-slate-800 dark:text-slate-100">{ntf.title}</h5>
                      <span className="text-[10px] text-slate-400">{ntf.time}</span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-normal">{ntf.message}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User Profile Avatar & Dropdown */}
        <div className="relative">
          <button
            onClick={() => {
              setShowUserDropdown(!showUserDropdown);
              setShowNotifications(false);
            }}
            className="flex items-center gap-2.5 p-1 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          >
            <img
              src={user?.avatar}
              alt={user?.name}
              className="w-9 h-9 rounded-xl object-cover ring-2 ring-blue-500/40"
            />
            <div className="hidden xl:flex flex-col text-left">
              <span className="text-xs font-bold text-slate-800 dark:text-slate-100 line-clamp-1">{user?.name}</span>
              <span className="text-[10px] font-semibold uppercase text-blue-600 dark:text-blue-400">{role}</span>
            </div>
            <ChevronDown className="w-4 h-4 text-slate-400 hidden xl:block" />
          </button>

          {showUserDropdown && (
            <div className="absolute right-0 mt-3 w-56 glass-dropdown rounded-2xl p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="p-3 border-b border-slate-100 dark:border-slate-800 mb-1">
                <p className="text-xs font-bold text-slate-900 dark:text-white">{user?.name}</p>
                <p className="text-[11px] text-slate-500 truncate">{user?.email}</p>
              </div>

              <Link
                to={`/profile`}
                onClick={() => setShowUserDropdown(false)}
                className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-blue-50 dark:hover:bg-slate-800 rounded-xl transition"
              >
                <User className="w-4 h-4 text-blue-500" /> My Profile
              </Link>
              <Link
                to={`/settings`}
                onClick={() => setShowUserDropdown(false)}
                className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-blue-50 dark:hover:bg-slate-800 rounded-xl transition"
              >
                <Settings className="w-4 h-4 text-indigo-500" /> Account Settings
              </Link>

              <div className="pt-1 border-t border-slate-100 dark:border-slate-800 mt-1">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-xl transition text-left"
                >
                  <LogOut className="w-4 h-4" /> Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
