import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Card, Button, Badge } from "../../components/common/UIComponents";
import { CourseProgressChart, AttendanceChart, PerformanceGraph } from "../../components/charts/Charts";
import { CalendarWidget } from "../../components/calendar/CalendarWidget";
import {
  mockCourses,
  mockAssignments,
  mockAttendanceData,
  mockGradesData,
  mockAnnouncements
} from "../../data/mockData";
import {
  BookOpen,
  FileCheck,
  Calendar as CalendarIcon,
  Award,
  ArrowUpRight,
  Clock,
  Sparkles,
  Megaphone,
  PlayCircle
} from "lucide-react";
import { motion } from "framer-motion";

export const StudentDashboard = () => {
  const { user } = useAuth();

  const activeAssignmentsCount = mockAssignments.filter((a) => a.status === "Pending").length;

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl p-6 lg:p-8 gradient-primary text-white shadow-xl glow-blue"
      >
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold text-white">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Fall Semester 2026</span>
            </div>
            <h1 className="text-2xl lg:text-3xl font-extrabold tracking-tight">
              Welcome back, {user?.name}! 👋
            </h1>
            <p className="text-xs lg:text-sm text-blue-100/90 leading-relaxed">
              You have <span className="font-bold text-amber-300">{activeAssignmentsCount} pending assignments</span> due this week and 1 upcoming midterm quiz.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link to="/student/courses">
              <Button variant="secondary" className="bg-white text-blue-700 hover:bg-blue-50 font-bold shadow-md">
                <PlayCircle className="w-4 h-4" /> Continue Learning
              </Button>
            </Link>
          </div>
        </div>
      </motion.div>

      {/* Top 4 Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Courses */}
        <Card hoverable className="flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Enrolled Courses</span>
            <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white">{mockCourses.length}</h3>
            <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-0.5">
              +1 Active this semester
            </span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-600 flex items-center justify-center">
            <BookOpen className="w-6 h-6" />
          </div>
        </Card>

        {/* Active Assignments */}
        <Card hoverable className="flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Assignments</span>
            <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white">{activeAssignmentsCount} Pending</h3>
            <span className="text-[11px] text-amber-600 font-semibold">2 Submissions Graded</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-600 flex items-center justify-center">
            <FileCheck className="w-6 h-6" />
          </div>
        </Card>

        {/* Attendance */}
        <Card hoverable className="flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Attendance Rate</span>
            <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white">
              {mockAttendanceData.overallPercentage}%
            </h3>
            <span className="text-[11px] text-emerald-600 font-semibold">114 Days Present</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
            <CalendarIcon className="w-6 h-6" />
          </div>
        </Card>

        {/* Cumulative GPA */}
        <Card hoverable className="flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Cumulative CGPA</span>
            <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white">{mockGradesData.cgpa}</h3>
            <span className="text-[11px] text-blue-600 font-semibold">Rank #3 in CS Dept</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-purple-500/10 text-purple-600 flex items-center justify-center">
            <Award className="w-6 h-6" />
          </div>
        </Card>
      </div>

      {/* Main Grid: Analytics Charts & Calendar Side Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2 Cols): Charts & In-Progress Courses */}
        <div className="lg:col-span-2 space-y-6">
          {/* Course Progress Chart Card */}
          <Card>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-bold text-base text-slate-900 dark:text-white">Course Completion Status</h3>
                <p className="text-xs text-slate-500">Progress across active subjects</p>
              </div>
              <Link to="/student/courses" className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1">
                View All <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            <CourseProgressChart data={mockCourses} />
          </Card>

          {/* Performance CGPA Trend Graph Card */}
          <Card>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-bold text-base text-slate-900 dark:text-white">Academic Performance Trend</h3>
                <p className="text-xs text-slate-500">GPA progression across 5 semesters</p>
              </div>
              <Badge variant="success">High Distinction</Badge>
            </div>
            <PerformanceGraph data={mockGradesData.semesterTrend} />
          </Card>

          {/* Recent Campus Announcements */}
          <Card>
            <div className="flex items-center gap-2 mb-4">
              <Megaphone className="w-5 h-5 text-blue-600" />
              <h3 className="font-bold text-base text-slate-900 dark:text-white">Campus Announcements</h3>
            </div>
            <div className="space-y-3">
              {mockAnnouncements.map((anc) => (
                <div
                  key={anc.id}
                  className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 flex flex-col gap-1"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900 dark:text-white">{anc.title}</span>
                    <Badge variant={anc.badge === "Important" ? "danger" : "info"}>{anc.badge}</Badge>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{anc.content}</p>
                  <span className="text-[10px] text-slate-400 mt-1">{anc.author} • {anc.date}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Right Column (1 Col): Calendar Widget & Quick Actions */}
        <div className="space-y-6">
          {/* Calendar Widget */}
          <Card>
            <CalendarWidget />
          </Card>

          {/* Quick Actions */}
          <Card>
            <h3 className="font-bold text-base text-slate-900 dark:text-white mb-3">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-2 text-xs font-semibold">
              <Link to="/student/quizzes" className="p-3 rounded-xl bg-blue-500/10 hover:bg-blue-500/20 text-blue-600 dark:text-blue-400 flex flex-col items-center justify-center gap-1.5 transition">
                <PlayCircle className="w-5 h-5" /> Take Quiz
              </Link>
              <Link to="/student/assignments" className="p-3 rounded-xl bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 flex flex-col items-center justify-center gap-1.5 transition">
                <FileCheck className="w-5 h-5" /> Submit Work
              </Link>
              <Link to="/student/grades" className="p-3 rounded-xl bg-purple-500/10 hover:bg-purple-500/20 text-purple-600 dark:text-purple-400 flex flex-col items-center justify-center gap-1.5 transition">
                <Award className="w-5 h-5" /> View Grades
              </Link>
              <Link to="/student/certificates" className="p-3 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex flex-col items-center justify-center gap-1.5 transition">
                <Sparkles className="w-5 h-5" /> Certificates
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
