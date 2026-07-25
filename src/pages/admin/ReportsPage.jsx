import React from "react";
import { Card, Button, Badge, Breadcrumb } from "../../components/common/UIComponents";
import { useToast } from "../../context/ToastContext";
import { FileText, Download, BarChart2 } from "lucide-react";

export const ReportsPage = () => {
  const { showToast } = useToast();

  const handleExport = (reportName) => {
    showToast(`Exporting '${reportName}' to CSV...`, "success");
  };

  return (
    <div className="space-y-6">
      <Breadcrumb items={[{ label: "Admin Dashboard", href: "/admin/dashboard" }, { label: "Attendance Reports" }]} />

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">Institutional Reports & Audits</h1>
          <p className="text-xs text-slate-500">Download system compliance, attendance aggregates, and academic transcript logs</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card hoverable className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-600 flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-base text-slate-900 dark:text-white">Student Attendance Audit</h3>
              <span className="text-xs text-slate-400">Monthly breakdown per department</span>
            </div>
          </div>
          <Button variant="primary" size="sm" onClick={() => handleExport("Student Attendance Audit")}>
            <Download className="w-4 h-4" /> Download Export (CSV)
          </Button>
        </Card>

        <Card hoverable className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-600 flex items-center justify-center">
              <BarChart2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-base text-slate-900 dark:text-white">Faculty Course Grading Ledger</h3>
              <span className="text-xs text-slate-400">End-of-term score reports</span>
            </div>
          </div>
          <Button variant="primary" size="sm" onClick={() => handleExport("Faculty Grading Ledger")}>
            <Download className="w-4 h-4" /> Download Export (PDF)
          </Button>
        </Card>
      </div>
    </div>
  );
};
