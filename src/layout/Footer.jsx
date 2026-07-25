import React from "react";
import { GraduationCap, Heart } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="w-full py-6 px-6 border-t border-slate-200/80 dark:border-slate-800/80 mt-auto glass-card flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 dark:text-slate-400 gap-3">
      <div className="flex items-center gap-2">
        <GraduationCap className="w-4 h-4 text-blue-600" />
        <span className="font-semibold text-slate-700 dark:text-slate-300">
          Academia LMS Platform © 2026
        </span>
        <span>— All rights reserved.</span>
      </div>
      <div className="flex items-center gap-1 text-[11px]">
        <span>Engineered with</span>
        <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
        <span>for modern education</span>
      </div>
    </footer>
  );
};
