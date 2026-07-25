import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Search, ChevronLeft, ChevronRight, Eye, EyeOff, Loader2 } from "lucide-react";

// --- BUTTON COMPONENT ---
export const Button = ({
  children,
  variant = "primary",
  size = "md",
  loading = false,
  disabled = false,
  className = "",
  onClick,
  type = "button",
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]";

  const variants = {
    primary:
      "bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 shadow-md hover:shadow-lg shadow-blue-500/25 focus:ring-blue-500 dark:shadow-blue-900/30",
    secondary:
      "bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-100 hover:bg-slate-200 dark:hover:bg-slate-700 focus:ring-slate-400",
    outline:
      "border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 focus:ring-slate-400",
    danger:
      "bg-gradient-to-r from-rose-500 to-red-600 text-white hover:from-rose-600 hover:to-red-700 shadow-md shadow-rose-500/25 focus:ring-rose-500",
    ghost:
      "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 focus:ring-slate-400"
  };

  const sizes = {
    sm: "px-3 py-1.5 text-xs gap-1.5",
    md: "px-4 py-2 text-sm gap-2",
    lg: "px-6 py-3 text-base gap-2.5"
  };

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
      {children}
    </button>
  );
};

// --- INPUT COMPONENT ---
export const Input = ({
  label,
  error,
  type = "text",
  placeholder,
  value,
  onChange,
  icon: Icon,
  isPassword = false,
  className = "",
  required = false,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const inputType = isPassword ? (showPassword ? "text" : "password") : type;

  return (
    <div className={`w-full flex flex-col gap-1.5 ${className}`}>
      {label && (
        <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 tracking-wide">
          {label} {required && <span className="text-rose-500">*</span>}
        </label>
      )}
      <div className="relative flex items-center">
        {Icon && <Icon className="absolute left-3.5 w-4 h-4 text-slate-400 pointer-events-none" />}
        <input
          type={inputType}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          className={`w-full text-sm rounded-xl bg-white/80 dark:bg-slate-900/80 text-slate-900 dark:text-slate-100 border transition-all duration-200 outline-none ${
            Icon ? "pl-10" : "pl-3.5"
          } ${isPassword ? "pr-10" : "pr-3.5"} ${
            error
              ? "border-rose-500 focus:ring-2 focus:ring-rose-500/20"
              : "border-slate-200 dark:border-slate-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
          } py-2.5`}
          {...props}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 focus:outline-none"
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        )}
      </div>
      {error && <span className="text-xs text-rose-500 mt-0.5">{error}</span>}
    </div>
  );
};

// --- CARD COMPONENT ---
export const Card = ({ children, className = "", hoverable = false, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`glass-card rounded-2xl p-5 transition-all duration-300 ${
        hoverable ? "hover:-translate-y-1 hover:shadow-xl hover:border-blue-500/30 cursor-pointer" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
};

// --- MODAL COMPONENT ---
export const Modal = ({ isOpen, onClose, title, children, maxWidth = "max-w-lg" }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className={`relative w-full ${maxWidth} glass-card bg-white dark:bg-slate-900 rounded-2xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800 z-10`}
          >
            <div className="flex items-center justify-between p-5 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">{title}</h3>
              <button
                onClick={onClose}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 max-h-[80vh] overflow-y-auto">{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

// --- DRAWER COMPONENT ---
export const Drawer = ({ isOpen, onClose, title, children, position = "right" }) => {
  const isRight = position === "right";

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ x: isRight ? "100%" : "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: isRight ? "100%" : "-100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className={`fixed inset-y-0 ${isRight ? "right-0" : "left-0"} max-w-sm w-full bg-white dark:bg-slate-900 border-${
              isRight ? "l" : "r"
            } border-slate-200 dark:border-slate-800 shadow-2xl z-10 flex flex-col`}
          >
            <div className="flex items-center justify-between p-5 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">{title}</h3>
              <button
                onClick={onClose}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-5 flex-1 overflow-y-auto">{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

// --- BADGE COMPONENT ---
export const Badge = ({ children, variant = "info", className = "" }) => {
  const variants = {
    success: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
    warning: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
    danger: "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20",
    info: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
    indigo: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20",
    neutral: "bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-500/20"
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
};

// --- ALERT COMPONENT ---
export const Alert = ({ type = "info", title, children, onClose }) => {
  const styles = {
    info: "bg-blue-500/10 border-blue-500/20 text-blue-800 dark:text-blue-200",
    success: "bg-emerald-500/10 border-emerald-500/20 text-emerald-800 dark:text-emerald-200",
    warning: "bg-amber-500/10 border-amber-500/20 text-amber-800 dark:text-amber-200",
    error: "bg-rose-500/10 border-rose-500/20 text-rose-800 dark:text-rose-200"
  };

  return (
    <div className={`p-4 rounded-xl border flex items-start justify-between gap-3 ${styles[type]}`}>
      <div>
        {title && <h4 className="font-semibold text-sm mb-1">{title}</h4>}
        <p className="text-xs opacity-90">{children}</p>
      </div>
      {onClose && (
        <button onClick={onClose} className="opacity-60 hover:opacity-100">
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

// --- BREADCRUMB COMPONENT ---
export const Breadcrumb = ({ items = [] }) => {
  return (
    <nav className="flex items-center text-xs font-medium text-slate-500 dark:text-slate-400 gap-2 mb-4">
      {items.map((item, index) => (
        <React.Fragment key={index}>
          {index > 0 && <ChevronRight className="w-3.5 h-3.5 opacity-50 shrink-0" />}
          {item.href ? (
            <a href={item.href} className="hover:text-blue-600 dark:hover:text-blue-400 transition">
              {item.label}
            </a>
          ) : (
            <span className="text-slate-900 dark:text-white font-semibold">{item.label}</span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

// --- SEARCH BOX COMPONENT ---
export const SearchBox = ({ value, onChange, placeholder = "Search courses, users, assignments...", className = "" }) => {
  return (
    <div className={`relative flex items-center ${className}`}>
      <Search className="absolute left-3.5 w-4 h-4 text-slate-400" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-10 pr-4 py-2 text-sm bg-slate-100 dark:bg-slate-800/80 border border-transparent focus:border-blue-500 dark:focus:border-blue-500 rounded-xl text-slate-900 dark:text-slate-100 outline-none transition"
      />
      {value && (
        <button onClick={() => onChange("")} className="absolute right-3 text-slate-400 hover:text-slate-600">
          <X className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
};

// --- PAGINATION COMPONENT ---
export const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800 text-xs font-medium text-slate-600 dark:text-slate-400">
      <span>
        Page {currentPage} of {totalPages}
      </span>
      <div className="flex items-center gap-1.5">
        <Button
          variant="outline"
          size="sm"
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
        >
          <ChevronLeft className="w-4 h-4" /> Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
        >
          Next <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

// --- SKELETON COMPONENT ---
export const Skeleton = ({ className = "" }) => {
  return (
    <div
      className={`animate-pulse bg-slate-200 dark:bg-slate-800 rounded-xl ${className}`}
    />
  );
};

// --- EMPTY STATE COMPONENT ---
export const EmptyState = ({ title = "No data found", description = "Try refining your search filters.", icon: Icon }) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center glass-card rounded-2xl">
      {Icon && (
        <div className="w-14 h-14 rounded-2xl bg-blue-500/10 text-blue-600 flex items-center justify-center mb-4">
          <Icon className="w-7 h-7" />
        </div>
      )}
      <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">{title}</h3>
      <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm">{description}</p>
    </div>
  );
};
