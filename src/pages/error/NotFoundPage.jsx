import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../../components/common/UIComponents";
import { Home, AlertTriangle } from "lucide-react";

export const NotFoundPage = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center p-6 space-y-4">
      <div className="w-24 h-24 rounded-3xl bg-rose-500/10 text-rose-500 flex items-center justify-center mb-2">
        <AlertTriangle className="w-12 h-12" />
      </div>
      <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white">404 - Page Not Found</h1>
      <p className="text-xs sm:text-sm text-slate-500 max-w-md">
        The academic portal route you requested does not exist or has been relocated to another department.
      </p>
      <Link to="/">
        <Button variant="primary" size="md" className="font-bold mt-2">
          <Home className="w-4 h-4" /> Return to Home Dashboard
        </Button>
      </Link>
    </div>
  );
};
