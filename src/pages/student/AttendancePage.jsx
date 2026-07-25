import React from "react";
import { mockAttendanceData } from "../../data/mockData";
import { Card, Badge, Breadcrumb } from "../../components/common/UIComponents";
import { AttendanceChart } from "../../components/charts/Charts";
import { Calendar as CalendarIcon, CheckCircle2, XCircle, Clock } from "lucide-react";

export const AttendancePage = () => {
  const { overallPercentage, presentDays, absentDays, lateDays, subjectBreakdown, monthlyLog } =
    mockAttendanceData;

  return (
    <div className="space-y-6">
      <Breadcrumb items={[{ label: "Dashboard", href: "/student/dashboard" }, { label: "Attendance Record" }]} />

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">Attendance Overview</h1>
          <p className="text-xs text-slate-500">Subject-wise class presence and monthly academic log</p>
        </div>
        <Badge variant={overallPercentage >= 85 ? "success" : "warning"} className="text-sm py-1.5 px-3">
          Overall Status: {overallPercentage}% Good Standing
        </Badge>
      </div>

      {/* Top Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-500">Days Present</span>
            <h3 className="text-2xl font-extrabold text-emerald-600">{presentDays} Days</h3>
            <span className="text-[11px] text-slate-400">94.2% Attendance Rate</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
            <CheckCircle2 className="w-6 h-6" />
          </div>
        </Card>

        <Card className="flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-500">Days Absent</span>
            <h3 className="text-2xl font-extrabold text-rose-600">{absentDays} Days</h3>
            <span className="text-[11px] text-slate-400">Excused Absence: 5</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-rose-500/10 text-rose-600 flex items-center justify-center">
            <XCircle className="w-6 h-6" />
          </div>
        </Card>

        <Card className="flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-500">Late Arrivals</span>
            <h3 className="text-2xl font-extrabold text-amber-600">{lateDays} Days</h3>
            <span className="text-[11px] text-slate-400">Under 15 mins delay</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center">
            <Clock className="w-6 h-6" />
          </div>
        </Card>
      </div>

      {/* Monthly Attendance Chart & Subject Breakdown Table */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <h3 className="font-bold text-base text-slate-900 dark:text-white mb-4">Monthly Attendance Trends</h3>
          <AttendanceChart data={monthlyLog} />
        </Card>

        {/* Subject Breakdown Cards */}
        <Card>
          <h3 className="font-bold text-base text-slate-900 dark:text-white mb-4">Subject Attendance Breakdown</h3>
          <div className="space-y-4">
            {subjectBreakdown.map((subj, idx) => (
              <div key={idx} className="space-y-1.5 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-slate-800 dark:text-slate-200">{subj.subject}</span>
                  <span className="text-blue-600 dark:text-blue-400">{subj.percentage}%</span>
                </div>
                <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-600 rounded-full"
                    style={{ width: `${subj.percentage}%` }}
                  />
                </div>
                <div className="text-[10px] text-slate-400 text-right">
                  {subj.attended} of {subj.total} Lectures Attended
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};
