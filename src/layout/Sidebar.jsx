import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  LayoutDashboard,
  BookOpen,
  FileCheck,
  HelpCircle,
  Calendar,
  Award,
  BarChart2,
  User,
  Settings,
  Users,
  Building,
  ClipboardList,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  GraduationCap
} from "lucide-react";

export const Sidebar = ({ collapsed, onToggleCollapse, isMobile, onCloseMobile }) => {
  const { role } = useAuth();

  const studentLinks = [
    { label: "Dashboard", path: "/student/dashboard", icon: LayoutDashboard },
    { label: "My Courses", path: "/student/courses", icon: BookOpen },
    { label: "Assignments", path: "/student/assignments", icon: FileCheck },
    { label: "Quizzes", path: "/student/quizzes", icon: HelpCircle },
    { label: "Attendance", path: "/student/attendance", icon: Calendar },
    { label: "Grades & CGPA", path: "/student/grades", icon: BarChart2 },
    { label: "Certificates", path: "/student/certificates", icon: Award },
    { label: "Profile", path: "/profile", icon: User },
    { label: "Settings", path: "/settings", icon: Settings }
  ];

  const teacherLinks = [
    { label: "Dashboard", path: "/teacher/dashboard", icon: LayoutDashboard },
    { label: "Manage Courses", path: "/teacher/courses", icon: BookOpen },
    { label: "Assignments", path: "/teacher/assignments", icon: FileCheck },
    { label: "Attendance Register", path: "/teacher/attendance", icon: Calendar },
    { label: "Gradebook", path: "/teacher/gradebook", icon: BarChart2 },
    { label: "Students", path: "/teacher/students", icon: Users },
    { label: "Profile", path: "/profile", icon: User },
    { label: "Settings", path: "/settings", icon: Settings }
  ];

  const adminLinks = [
    { label: "Admin Dashboard", path: "/admin/dashboard", icon: LayoutDashboard },
    { label: "Manage Students", path: "/admin/students", icon: Users },
    { label: "Manage Teachers", path: "/admin/teachers", icon: GraduationCap },
    { label: "Manage Courses", path: "/admin/courses", icon: BookOpen },
    { label: "Departments", path: "/admin/departments", icon: Building },
    { label: "Attendance Reports", path: "/admin/reports", icon: ClipboardList },
    { label: "System Settings", path: "/admin/settings", icon: ShieldCheck },
    { label: "Profile", path: "/profile", icon: User }
  ];

  const activeLinks =
    role === "admin" ? adminLinks : role === "teacher" ? teacherLinks : studentLinks;

  return (
    <aside
      className={`h-[calc(100vh-4rem)] sticky top-16 transition-all duration-300 z-20 flex flex-col justify-between glass-card border-r border-slate-200/80 dark:border-slate-800/80 ${
        collapsed ? "w-20" : "w-64"
      }`}
    >
      {/* Upper Section: Nav items */}
      <div className="p-3 overflow-y-auto space-y-6">
        {/* Role Badge Indicator */}
        {!collapsed && (
          <div className="px-3 py-2 rounded-xl bg-gradient-to-r from-blue-500/10 to-indigo-500/10 border border-blue-500/20 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
            <div className="flex flex-col">
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                Current Portal
              </span>
              <span className="text-xs font-extrabold capitalize text-blue-600 dark:text-blue-400">
                {role} View
              </span>
            </div>
          </div>
        )}

        <div className="space-y-1">
          {activeLinks.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={isMobile ? onCloseMobile : undefined}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-semibold text-xs transition-all group ${
                    isActive
                      ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/25"
                      : "text-slate-600 dark:text-slate-400 hover:bg-blue-50/60 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-white"
                  }`
                }
              >
                <Icon className="w-5 h-5 shrink-0 transition-transform group-hover:scale-110" />
                {!collapsed && <span className="truncate">{item.label}</span>}
              </NavLink>
            );
          })}
        </div>
      </div>

      {/* Footer Collapse Button */}
      {!isMobile && (
        <div className="p-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end">
          <button
            onClick={onToggleCollapse}
            className="w-full py-2 px-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 flex items-center justify-center gap-2 text-xs font-bold transition"
          >
            {collapsed ? (
              <ChevronRight className="w-5 h-5" />
            ) : (
              <>
                <ChevronLeft className="w-5 h-5" />
                <span>Collapse Menu</span>
              </>
            )}
          </button>
        </div>
      )}
    </aside>
  );
};
