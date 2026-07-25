import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { DashboardLayout } from "../layout/DashboardLayout";

// Auth Pages
import { Login } from "../pages/auth/Login";
import { Register } from "../pages/auth/Register";
import { ForgotPassword } from "../pages/auth/ForgotPassword";
import { ResetPassword } from "../pages/auth/ResetPassword";

// Student Pages
import { StudentDashboard } from "../pages/student/StudentDashboard";
import { CoursesPage } from "../pages/student/CoursesPage";
import { CourseDetailPage } from "../pages/student/CourseDetailPage";
import { AssignmentsPage } from "../pages/student/AssignmentsPage";
import { QuizPage } from "../pages/student/QuizPage";
import { AttendancePage } from "../pages/student/AttendancePage";
import { GradesPage } from "../pages/student/GradesPage";
import { CertificatesPage } from "../pages/student/CertificatesPage";

// Teacher Pages
import { TeacherDashboard } from "../pages/teacher/TeacherDashboard";
import { ManageCoursesPage } from "../pages/teacher/ManageCoursesPage";
import { CreateAssignmentPage } from "../pages/teacher/CreateAssignmentPage";
import { AttendanceManagerPage } from "../pages/teacher/AttendanceManagerPage";
import { GradeBookPage } from "../pages/teacher/GradeBookPage";

// Admin Pages
import { AdminDashboard } from "../pages/admin/AdminDashboard";
import { ManageUsersPage } from "../pages/admin/ManageUsersPage";
import { ManageDepartmentsPage } from "../pages/admin/ManageDepartmentsPage";
import { SystemSettingsPage } from "../pages/admin/SystemSettingsPage";
import { ReportsPage } from "../pages/admin/ReportsPage";

// Profile & Settings
import { UserProfilePage } from "../pages/profile/UserProfilePage";
import { SettingsPage } from "../pages/settings/SettingsPage";
import { NotFoundPage } from "../pages/error/NotFoundPage";

const RoleRedirect = () => {
  const { role } = useAuth();
  if (role === "admin") return <Navigate to="/admin/dashboard" replace />;
  if (role === "teacher") return <Navigate to="/teacher/dashboard" replace />;
  return <Navigate to="/student/dashboard" replace />;
};

export const AppRoutes = () => {
  return (
    <Routes>
      {/* Auth Routes */}
      <Route path="/auth/login" element={<Login />} />
      <Route path="/auth/register" element={<Register />} />
      <Route path="/auth/forgot-password" element={<ForgotPassword />} />
      <Route path="/auth/reset-password" element={<ResetPassword />} />

      {/* Main Dashboard Layout Routes */}
      <Route path="/" element={<DashboardLayout />}>
        <Route index element={<RoleRedirect />} />

        {/* Student Routes */}
        <Route path="student/dashboard" element={<StudentDashboard />} />
        <Route path="student/courses" element={<CoursesPage />} />
        <Route path="student/courses/:id" element={<CourseDetailPage />} />
        <Route path="student/assignments" element={<AssignmentsPage />} />
        <Route path="student/quizzes" element={<QuizPage />} />
        <Route path="student/attendance" element={<AttendancePage />} />
        <Route path="student/grades" element={<GradesPage />} />
        <Route path="student/certificates" element={<CertificatesPage />} />

        {/* Teacher Routes */}
        <Route path="teacher/dashboard" element={<TeacherDashboard />} />
        <Route path="teacher/courses" element={<ManageCoursesPage />} />
        <Route path="teacher/assignments" element={<CreateAssignmentPage />} />
        <Route path="teacher/attendance" element={<AttendanceManagerPage />} />
        <Route path="teacher/gradebook" element={<GradeBookPage />} />
        <Route path="teacher/students" element={<ManageUsersPage />} />

        {/* Admin Routes */}
        <Route path="admin/dashboard" element={<AdminDashboard />} />
        <Route path="admin/students" element={<ManageUsersPage />} />
        <Route path="admin/teachers" element={<ManageUsersPage />} />
        <Route path="admin/courses" element={<ManageCoursesPage />} />
        <Route path="admin/departments" element={<ManageDepartmentsPage />} />
        <Route path="admin/reports" element={<ReportsPage />} />
        <Route path="admin/settings" element={<SystemSettingsPage />} />

        {/* Common Routes */}
        <Route path="profile" element={<UserProfilePage />} />
        <Route path="settings" element={<SettingsPage />} />

        {/* Catch All 404 */}
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};
