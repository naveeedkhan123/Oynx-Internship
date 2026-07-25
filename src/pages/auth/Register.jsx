import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../context/ToastContext";
import { Card, Input, Button } from "../../components/common/UIComponents";
import { GraduationCap, Mail, Lock, User, Building, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export const Register = () => {
  const { login } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [roleSelection, setRoleSelection] = useState("student");
  const [department, setDepartment] = useState("Computer Science");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleRegister = (e) => {
    e.preventDefault();
    if (!acceptedTerms) {
      showToast("Please accept the terms and conditions.", "warning");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      login(email, password, roleSelection);
      showToast("Account created successfully! Welcome to Academia.", "success");
      setLoading(false);
      navigate(`/${roleSelection}/dashboard`);
    }, 600);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white relative overflow-hidden">
      <div className="absolute top-10 right-10 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-lg z-10"
      >
        <Card className="glass-card backdrop-blur-2xl bg-slate-900/80 border-slate-800 p-8 shadow-2xl">
          <div className="flex flex-col items-center text-center mb-6">
            <div className="w-12 h-12 rounded-2xl gradient-primary flex items-center justify-center text-white shadow-lg shadow-blue-500/30 mb-3">
              <GraduationCap className="w-7 h-7" />
            </div>
            <h1 className="text-2xl font-extrabold tracking-tight text-white">
              Create <span className="text-blue-400">Academia</span> Account
            </h1>
            <p className="text-xs text-slate-400 mt-1">Join students and faculty across campus</p>
          </div>

          <form onSubmit={handleRegister} className="space-y-4">
            {/* Account Type Selection */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">I am registering as a:</label>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => setRoleSelection("student")}
                  className={`py-2 rounded-xl font-bold border transition ${
                    roleSelection === "student"
                      ? "bg-blue-600/20 border-blue-500 text-blue-400"
                      : "border-slate-800 bg-slate-800/40 text-slate-400 hover:text-white"
                  }`}
                >
                  Student
                </button>
                <button
                  type="button"
                  onClick={() => setRoleSelection("teacher")}
                  className={`py-2 rounded-xl font-bold border transition ${
                    roleSelection === "teacher"
                      ? "bg-indigo-600/20 border-indigo-500 text-indigo-400"
                      : "border-slate-800 bg-slate-800/40 text-slate-400 hover:text-white"
                  }`}
                >
                  Faculty / Professor
                </button>
              </div>
            </div>

            <Input
              label="Full Name"
              placeholder="e.g. Alexander Wright"
              icon={User}
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />

            <Input
              label="Institutional Email"
              type="email"
              placeholder="name@academia.edu"
              icon={Mail}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Department</label>
              <div className="relative">
                <Building className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                <select
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="w-full text-xs rounded-xl bg-slate-900/80 text-slate-100 border border-slate-800 pl-10 pr-3.5 py-2.5 outline-none focus:border-blue-500"
                >
                  <option value="Computer Science">Computer Science & Engineering</option>
                  <option value="Data Science">Data Science & AI</option>
                  <option value="Software Engineering">Software Engineering</option>
                  <option value="Cyber Security">Cyber Security</option>
                </select>
              </div>
            </div>

            <Input
              label="Password"
              placeholder="Minimum 8 characters"
              icon={Lock}
              isPassword
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <label className="flex items-start gap-2.5 cursor-pointer text-xs text-slate-300 pt-1">
              <input
                type="checkbox"
                checked={acceptedTerms}
                onChange={(e) => setAcceptedTerms(e.target.checked)}
                className="mt-0.5 rounded border-slate-700 bg-slate-800 text-blue-600 focus:ring-blue-500"
              />
              <span>
                I agree to the <a href="#" className="text-blue-400 hover:underline">Academic Honor Code</a> and {" "}
                <a href="#" className="text-blue-400 hover:underline">Terms of Service</a>.
              </span>
            </label>

            <Button type="submit" variant="primary" loading={loading} className="w-full mt-2 py-3 text-sm font-bold">
              Complete Registration <ArrowRight className="w-4 h-4" />
            </Button>
          </form>

          <div className="mt-6 text-center text-xs text-slate-400 pt-4 border-t border-slate-800">
            Already have an account?{" "}
            <Link to="/auth/login" className="text-blue-400 font-bold hover:underline">
              Sign In
            </Link>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};
