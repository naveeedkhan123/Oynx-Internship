import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../context/ToastContext";
import { Card, Button, Badge, Modal, Input } from "../../components/common/UIComponents";
import { mockCourses, mockStudentsList, mockAssignments } from "../../data/mockData";
import {
  BookOpen,
  Users,
  FileCheck,
  Star,
  Plus,
  Calendar,
  Sparkles,
  BarChart2,
  Clock
} from "lucide-react";
import { motion } from "framer-motion";

export const TeacherDashboard = () => {
  const { user } = useAuth();
  const { showToast } = useToast();

  const [isAddCourseModalOpen, setIsAddCourseModalOpen] = useState(false);
  const [courseTitle, setCourseTitle] = useState("");
  const [category, setCategory] = useState("Computer Science");

  const handleCreateCourse = (e) => {
    e.preventDefault();
    showToast(`New Course '${courseTitle}' created successfully!`, "success");
    setIsAddCourseModalOpen(false);
    setCourseTitle("");
  };

  return (
    <div className="space-y-6">
      {/* Faculty Welcome Banner */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl p-6 lg:p-8 bg-gradient-to-r from-indigo-600 via-blue-600 to-indigo-700 text-white shadow-xl glow-indigo"
      >
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold text-white">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Faculty Portal • Fall 2026</span>
            </div>
            <h1 className="text-2xl lg:text-3xl font-extrabold tracking-tight">
              Welcome back, {user?.name}! 🎓
            </h1>
            <p className="text-xs lg:text-sm text-indigo-100/90 leading-relaxed">
              You are instructing 4 active courses with <span className="font-bold text-amber-300">142 total enrolled students</span>. You have 3 assignment submissions awaiting evaluation.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Button
              onClick={() => setIsAddCourseModalOpen(true)}
              variant="secondary"
              className="bg-white text-indigo-700 hover:bg-indigo-50 font-bold shadow-md"
            >
              <Plus className="w-4 h-4" /> Create Course
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Teacher Key Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card hoverable className="flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs font-semibold text-slate-500">Active Courses</span>
            <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white">4 Courses</h3>
            <span className="text-[11px] text-indigo-600 font-semibold">32 Modules Total</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-600 flex items-center justify-center">
            <BookOpen className="w-6 h-6" />
          </div>
        </Card>

        <Card hoverable className="flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs font-semibold text-slate-500">Total Enrolled</span>
            <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white">142 Students</h3>
            <span className="text-[11px] text-emerald-600 font-semibold">+18 New Enrolments</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-600 flex items-center justify-center">
            <Users className="w-6 h-6" />
          </div>
        </Card>

        <Card hoverable className="flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs font-semibold text-slate-500">Pending Grading</span>
            <h3 className="text-2xl font-extrabold text-amber-600">3 Submissions</h3>
            <span className="text-[11px] text-slate-400">Due for review</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center">
            <FileCheck className="w-6 h-6" />
          </div>
        </Card>

        <Card hoverable className="flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs font-semibold text-slate-500">Teacher Rating</span>
            <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white">4.9 / 5.0</h3>
            <span className="text-[11px] text-emerald-600 font-semibold">Based on 98 reviews</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
            <Star className="w-6 h-6 fill-emerald-600" />
          </div>
        </Card>
      </div>

      {/* Main Grid: Managed Courses & Student Submissions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-base text-slate-900 dark:text-white">My Active Courses</h3>
              <Link to="/teacher/courses" className="text-xs font-bold text-indigo-600 hover:underline">
                Manage All
              </Link>
            </div>

            <div className="space-y-3">
              {mockCourses.map((c) => (
                <div
                  key={c.id}
                  className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3">
                    <img src={c.banner} alt={c.title} className="w-16 h-12 rounded-lg object-cover" />
                    <div>
                      <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">{c.title}</h4>
                      <span className="text-[11px] text-slate-400">{c.enrolledCount} Enrolled • {c.totalLessons} Lessons</span>
                    </div>
                  </div>
                  <Badge variant="indigo">{c.category}</Badge>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Quick Actions Panel */}
        <div className="space-y-6">
          <Card>
            <h3 className="font-bold text-base text-slate-900 dark:text-white mb-3">Faculty Quick Tools</h3>
            <div className="space-y-2">
              <Link to="/teacher/assignments" className="w-full">
                <Button variant="outline" className="w-full justify-start text-xs font-semibold">
                  <FileCheck className="w-4 h-4 text-indigo-500" /> Post New Assignment
                </Button>
              </Link>
              <Link to="/teacher/attendance" className="w-full">
                <Button variant="outline" className="w-full justify-start text-xs font-semibold">
                  <Calendar className="w-4 h-4 text-blue-500" /> Mark Attendance Register
                </Button>
              </Link>
              <Link to="/teacher/gradebook" className="w-full">
                <Button variant="outline" className="w-full justify-start text-xs font-semibold">
                  <BarChart2 className="w-4 h-4 text-emerald-500" /> Grade Student Submissions
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </div>

      {/* Add Course Modal */}
      <Modal isOpen={isAddCourseModalOpen} onClose={() => setIsAddCourseModalOpen(false)} title="Create New Course">
        <form onSubmit={handleCreateCourse} className="space-y-4">
          <Input
            label="Course Title"
            placeholder="e.g. Distributed Cloud Computing"
            value={courseTitle}
            onChange={(e) => setCourseTitle(e.target.value)}
            required
          />
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full text-xs rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-2.5 outline-none"
            >
              <option value="Computer Science">Computer Science</option>
              <option value="Software Engineering">Software Engineering</option>
              <option value="Data Science">Data Science</option>
              <option value="Cyber Security">Cyber Security</option>
            </select>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="outline" size="sm" onClick={() => setIsAddCourseModalOpen(false)}>Cancel</Button>
            <Button type="submit" variant="primary" size="sm">Create Course</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
