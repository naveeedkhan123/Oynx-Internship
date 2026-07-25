import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "../../context/ToastContext";
import { Card, Input, Button } from "../../components/common/UIComponents";
import { GraduationCap, Lock, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

export const ResetPassword = () => {
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      showToast("Passwords do not match!", "error");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      showToast("Password updated successfully! Please sign in.", "success");
      navigate("/auth/login");
    }, 600);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white relative overflow-hidden">
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md z-10">
        <Card className="glass-card backdrop-blur-2xl bg-slate-900/80 border-slate-800 p-8 shadow-2xl">
          <div className="flex flex-col items-center text-center mb-6">
            <div className="w-12 h-12 rounded-2xl gradient-primary flex items-center justify-center text-white shadow-lg shadow-blue-500/30 mb-3">
              <GraduationCap className="w-7 h-7" />
            </div>
            <h1 className="text-2xl font-extrabold tracking-tight text-white">Create New Password</h1>
            <p className="text-xs text-slate-400 mt-1">Your new password must be at least 8 characters long</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="New Password"
              placeholder="••••••••"
              icon={Lock}
              isPassword
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            <Input
              label="Confirm New Password"
              placeholder="••••••••"
              icon={Lock}
              isPassword
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <Button type="submit" variant="primary" loading={loading} className="w-full py-3 text-sm font-bold">
              Update Password
            </Button>
          </form>

          <div className="mt-6 text-center text-xs text-slate-400 pt-4 border-t border-slate-800">
            <Link to="/auth/login" className="text-blue-400 font-bold hover:underline flex items-center justify-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5" /> Return to Login
            </Link>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};
