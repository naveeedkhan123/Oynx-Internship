import React from "react";
import { mockGradesData } from "../../data/mockData";
import { Card, Badge, Breadcrumb } from "../../components/common/UIComponents";
import { DataTable } from "../../components/tables/DataTable";
import { PerformanceGraph } from "../../components/charts/Charts";
import { Award, BookOpen, BarChart2 } from "lucide-react";

export const GradesPage = () => {
  const { cgpa, totalCredits, completedSemesters, subjects, semesterTrend } = mockGradesData;

  const columns = [
    { header: "Subject Code", key: "code", sortable: true },
    { header: "Course Title", key: "title", sortable: true },
    { header: "Credits", key: "credit", sortable: true },
    { header: "Marks", key: "marks", sortable: true, render: (val) => `${val} / 100` },
    {
      header: "Grade",
      key: "grade",
      sortable: true,
      render: (val) => (
        <Badge variant={val.startsWith("A") ? "success" : "info"}>{val}</Badge>
      )
    },
    { header: "Grade Points", key: "points", sortable: true }
  ];

  return (
    <div className="space-y-6">
      <Breadcrumb items={[{ label: "Dashboard", href: "/student/dashboard" }, { label: "Academic Grades & CGPA" }]} />

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">Academic Performance & CGPA</h1>
          <p className="text-xs text-slate-500">Official transcripts, subject grade breakdown, and credit statistics</p>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-500">Cumulative GPA (CGPA)</span>
            <h3 className="text-3xl font-black text-blue-600 dark:text-blue-400">{cgpa}</h3>
            <span className="text-[11px] text-emerald-600 font-semibold">Scale: 4.00</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-600 flex items-center justify-center">
            <Award className="w-6 h-6" />
          </div>
        </Card>

        <Card className="flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-500">Earned Credit Hours</span>
            <h3 className="text-3xl font-black text-slate-900 dark:text-white">{totalCredits} Credits</h3>
            <span className="text-[11px] text-slate-400">120 Total Required</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-600 flex items-center justify-center">
            <BookOpen className="w-6 h-6" />
          </div>
        </Card>

        <Card className="flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-500">Completed Terms</span>
            <h3 className="text-3xl font-black text-slate-900 dark:text-white">{completedSemesters} Semesters</h3>
            <span className="text-[11px] text-emerald-600 font-semibold">Clean Academic Record</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-purple-500/10 text-purple-600 flex items-center justify-center">
            <BarChart2 className="w-6 h-6" />
          </div>
        </Card>
      </div>

      {/* Semester Trend Chart */}
      <Card>
        <h3 className="font-bold text-base text-slate-900 dark:text-white mb-4">Semester GPA Trajectory</h3>
        <PerformanceGraph data={semesterTrend} />
      </Card>

      {/* Subject Grades Table */}
      <Card>
        <h3 className="font-bold text-base text-slate-900 dark:text-white mb-4">Current Semester Subject Transcripts</h3>
        <DataTable columns={columns} data={subjects} itemsPerPage={5} />
      </Card>
    </div>
  );
};
