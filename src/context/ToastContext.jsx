import React, { createContext, useContext, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, AlertTriangle, Info, XCircle, X } from "lucide-react";

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const showToast = (message, type = "info") => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-3 max-w-sm w-full pointer-events-none">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, x: 50, scale: 0.9 }}
              className="pointer-events-auto flex items-center justify-between p-4 rounded-xl shadow-xl glass-card backdrop-blur-lg border border-slate-200 dark:border-slate-800"
            >
              <div className="flex items-center gap-3">
                {toast.type === "success" && <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />}
                {toast.type === "warning" && <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0" />}
                {toast.type === "error" && <XCircle className="w-5 h-5 text-rose-500 shrink-0" />}
                {toast.type === "info" && <Info className="w-5 h-5 text-blue-500 shrink-0" />}
                <p className="text-sm font-medium text-slate-800 dark:text-slate-100">{toast.message}</p>
              </div>
              <button
                onClick={() => removeToast(toast.id)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 ml-2"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) throw new Error("useToast must be used within ToastProvider");
  return context;
};
