import React from "react";
import { mockAdminStats } from "../../data/mockData";
import { Card, Badge, Breadcrumb } from "../../components/common/UIComponents";
import { Building, Users, BookOpen, GraduationCap } from "lucide-react";

export const ManageDepartmentsPage = () => {
  return (
    <div className="space-y-6">
      <Breadcrumb items={[{ label: "Admin Dashboard", href: "/admin/dashboard" }, { label: "Departments" }]} />

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">Academic Departments</h1>
          <p className="text-xs text-slate-500">Overview of institutional departments, faculty chairs, and student ratios</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mockAdminStats.departmentStats.map((dept, i) => (
          <Card key={i} hoverable className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
                  <Building className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-base text-slate-900 dark:text-white">{dept.name}</h3>
                  <span className="text-xs text-slate-400">Head of Dept: Dr. Eleanor Vance</span>
                </div>
              </div>
              <Badge variant="success">Active</Badge>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Enrolled Students</span>
                <span className="font-extrabold text-slate-900 dark:text-white text-base">{dept.students}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Active Courses</span>
                <span className="font-extrabold text-slate-900 dark:text-white text-base">{dept.courses}</span>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
