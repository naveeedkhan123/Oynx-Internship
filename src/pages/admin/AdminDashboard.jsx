import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Card, Button, Badge } from "../../components/common/UIComponents";
import { EnrolmentTrendChart } from "../../components/charts/Charts";
import { mockAdminStats } from "../../data/mockData";
import {
  Users,
  GraduationCap,
  BookOpen,
  Building,
  Activity,
  ShieldCheck,
  Download,
  Sparkles,
  Settings
} from "lucide-react";
import { motion } from "framer-motion";

export const AdminDashboard = () => {
  const { user } = useAuth();
  const { totalStudents, totalTeachers, totalCourses, activeDepartments, systemUptime, monthlyEnrolments } =
    mockAdminStats;

  return (
    <div className="space-y-6">
      {/* Admin Welcome Banner */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl p-6 lg:p-8 bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 text-white shadow-xl glow-emerald"
      >
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold text-white">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>System Administrator Control Center</span>
            </div>
            <h1 className="text-2xl lg:text-3xl font-extrabold tracking-tight">
              Institutional Admin Overview 🛡️
            </h1>
            <p className="text-xs lg:text-sm text-emerald-100/90 leading-relaxed">
              Academia LMS cluster operating at <span className="font-bold text-amber-300">{systemUptime} Uptime</span>. Managing {totalStudents} students and {totalTeachers} active faculty members across {activeDepartments} academic departments.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link to="/admin/settings">
              <Button variant="secondary" className="bg-white text-emerald-700 hover:bg-emerald-50 font-bold shadow-md">
                <Settings className="w-4 h-4" /> System Settings
              </Button>
            </Link>
          </div>
        </div>
      </motion.div>

      {/* Admin 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card hoverable className="flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs font-semibold text-slate-500">Total Enrolled</span>
            <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white">{totalStudents}</h3>
            <span className="text-[11px] text-emerald-600 font-semibold">+12% vs last term</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
            <Users className="w-6 h-6" />
          </div>
        </Card>

        <Card hoverable className="flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs font-semibold text-slate-500">Faculty Members</span>
            <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white">{totalTeachers}</h3>
            <span className="text-[11px] text-blue-600 font-semibold">Across 8 Depts</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-600 flex items-center justify-center">
            <GraduationCap className="w-6 h-6" />
          </div>
        </Card>

        <Card hoverable className="flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs font-semibold text-slate-500">Active Courses</span>
            <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white">{totalCourses}</h3>
            <span className="text-[11px] text-indigo-600 font-semibold">1,240 Total Modules</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-600 flex items-center justify-center">
            <BookOpen className="w-6 h-6" />
          </div>
        </Card>

        <Card hoverable className="flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs font-semibold text-slate-500">Server Health</span>
            <h3 className="text-2xl font-extrabold text-emerald-600">{systemUptime}</h3>
            <span className="text-[11px] text-emerald-600 font-semibold">0 Critical Incidents</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-purple-500/10 text-purple-600 flex items-center justify-center">
            <Activity className="w-6 h-6" />
          </div>
        </Card>
      </div>

      {/* Main Grid: Enrolment Growth Chart & Department Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-base text-slate-900 dark:text-white">Monthly Enrolment Analytics</h3>
              <p className="text-xs text-slate-500">Student registrations growth timeline</p>
            </div>
            <Badge variant="success">+18.4% Growth</Badge>
          </div>
          <EnrolmentTrendChart data={monthlyEnrolments} />
        </Card>

        <Card>
          <h3 className="font-bold text-base text-slate-900 dark:text-white mb-4">Department Distribution</h3>
          <div className="space-y-3">
            {mockAdminStats.departmentStats.map((dept, i) => (
              <div key={i} className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 space-y-1">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-slate-900 dark:text-white">{dept.name}</span>
                  <span className="text-emerald-600">{dept.students} Students</span>
                </div>
                <div className="text-[10px] text-slate-400">{dept.courses} Published Courses</div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};
