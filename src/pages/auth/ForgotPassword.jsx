import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useToast } from "../../context/ToastContext";
import { Card, Input, Button } from "../../components/common/UIComponents";
import { GraduationCap, Mail, ArrowLeft, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

export const ForgotPassword = () => {
  const { showToast } = useToast();
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      showToast("Password reset link sent to your email!", "success");
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
            <h1 className="text-2xl font-extrabold tracking-tight text-white">Reset Password</h1>
            <p className="text-xs text-slate-400 mt-1">Enter your email to receive recovery instructions</p>
          </div>

          {submitted ? (
            <div className="text-center space-y-4 py-4">
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <p className="text-sm font-semibold text-white">Reset Email Dispatched</p>
              <p className="text-xs text-slate-400">
                We sent a password reset link to <span className="text-blue-400 font-bold">{email}</span>. Please check your inbox or spam folder.
              </p>
              <Link to="/auth/reset-password">
                <Button variant="outline" className="w-full mt-4 text-xs">
                  Proceed to Reset Screen (Demo)
                </Button>
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Institutional Email"
                type="email"
                placeholder="name@academia.edu"
                icon={Mail}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Button type="submit" variant="primary" loading={loading} className="w-full py-3 text-sm font-bold">
                Send Reset Link
              </Button>
            </form>
          )}

          <div className="mt-6 text-center text-xs text-slate-400 pt-4 border-t border-slate-800">
            <Link to="/auth/login" className="text-blue-400 font-bold hover:underline flex items-center justify-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Sign In
            </Link>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};
