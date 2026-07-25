import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../context/ToastContext";
import { Card, Input, Button, Badge } from "../../components/common/UIComponents";
import { GraduationCap, Mail, Lock, Sparkles, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export const Login = () => {
  const { login } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [email, setEmail] = useState("alexander.wright@academia.edu");
  const [password, setPassword] = useState("password123");
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [demoRole, setDemoRole] = useState("student");

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      login(email, password, demoRole);
      showToast(`Welcome back! Signed in as ${demoRole.toUpperCase()}`, "success");
      setLoading(false);

      if (demoRole === "student") navigate("/student/dashboard");
      else if (demoRole === "teacher") navigate("/teacher/dashboard");
      else navigate("/admin/dashboard");
    }, 600);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white relative overflow-hidden">
      {/* Background Glowing Blobs */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md z-10"
      >
        <Card className="glass-card backdrop-blur-2xl bg-slate-900/80 border-slate-800 p-8 shadow-2xl">
          {/* Logo Header */}
          <div className="flex flex-col items-center text-center mb-6">
            <div className="w-12 h-12 rounded-2xl gradient-primary flex items-center justify-center text-white shadow-lg shadow-blue-500/30 mb-3">
              <GraduationCap className="w-7 h-7" />
            </div>
            <h1 className="text-2xl font-extrabold tracking-tight text-white">
              Sign In to <span className="text-blue-400">Academia</span>
            </h1>
            <p className="text-xs text-slate-400 mt-1">Access your courses, grades, and faculty portal</p>
          </div>

          {/* Demo Role Switcher Bar */}
          <div className="mb-6 p-2 rounded-xl bg-slate-800/80 border border-slate-700/60">
            <span className="text-[10px] font-bold uppercase text-slate-400 block text-center mb-1.5 flex items-center justify-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-400" /> Demo One-Click Role Tester
            </span>
            <div className="grid grid-cols-3 gap-1 text-xs">
              <button
                type="button"
                onClick={() => {
                  setDemoRole("student");
                  setEmail("alexander.wright@academia.edu");
                }}
                className={`py-1.5 rounded-lg font-bold transition ${
                  demoRole === "student" ? "bg-blue-600 text-white shadow-sm" : "text-slate-400 hover:text-white"
                }`}
              >
                Student
              </button>
              <button
                type="button"
                onClick={() => {
                  setDemoRole("teacher");
                  setEmail("e.vance@academia.edu");
                }}
                className={`py-1.5 rounded-lg font-bold transition ${
                  demoRole === "teacher" ? "bg-indigo-600 text-white shadow-sm" : "text-slate-400 hover:text-white"
                }`}
              >
                Faculty
              </button>
              <button
                type="button"
                onClick={() => {
                  setDemoRole("admin");
                  setEmail("admin@academia.edu");
                }}
                className={`py-1.5 rounded-lg font-bold transition ${
                  demoRole === "admin" ? "bg-emerald-600 text-white shadow-sm" : "text-slate-400 hover:text-white"
                }`}
              >
                Admin
              </button>
            </div>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Email Address"
              type="email"
              placeholder="name@academia.edu"
              icon={Mail}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <Input
              label="Password"
              placeholder="••••••••"
              icon={Lock}
              isPassword
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 cursor-pointer text-slate-300">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-slate-700 bg-slate-800 text-blue-600 focus:ring-blue-500"
                />
                <span>Remember Me</span>
              </label>

              <Link to="/auth/forgot-password" className="text-blue-400 hover:underline font-semibold">
                Forgot password?
              </Link>
            </div>

            <Button type="submit" variant="primary" loading={loading} className="w-full mt-2 py-3 text-sm font-bold">
              Sign In to Portal <ArrowRight className="w-4 h-4" />
            </Button>
          </form>

          {/* Footer Navigation link */}
          <div className="mt-6 text-center text-xs text-slate-400 pt-4 border-t border-slate-800">
            Don't have an account yet?{" "}
            <Link to="/auth/register" className="text-blue-400 font-bold hover:underline">
              Create Account
            </Link>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};
