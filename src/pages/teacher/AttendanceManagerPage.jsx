import React, { useState } from "react";
import { mockStudentsList, mockCourses } from "../../data/mockData";
import { Card, Button, Badge, Breadcrumb } from "../../components/common/UIComponents";
import { useToast } from "../../context/ToastContext";
import { Calendar as CalendarIcon, CheckCircle2, XCircle, Clock, Save } from "lucide-react";

export const AttendanceManagerPage = () => {
  const { showToast } = useToast();
  const [selectedCourse, setSelectedCourse] = useState(mockCourses[0].title);
  const [attendanceDate, setAttendanceDate] = useState("2026-07-25");
  const [students, setStudents] = useState(
    mockStudentsList.map((s) => ({ ...s, statusToday: "Present" }))
  );

  const toggleStatus = (id, newStatus) => {
    setStudents((prev) =>
      prev.map((s) => (s.id === id ? { ...s, statusToday: newStatus } : s))
    );
  };

  const handleMarkAllPresent = () => {
    setStudents((prev) => prev.map((s) => ({ ...s, statusToday: "Present" })));
    showToast("Marked all students as Present!", "info");
  };

  const handleSaveAttendance = () => {
    showToast(`Attendance register for ${selectedCourse} saved!`, "success");
  };

  return (
    <div className="space-y-6">
      <Breadcrumb items={[{ label: "Dashboard", href: "/teacher/dashboard" }, { label: "Attendance Register" }]} />

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">Attendance Register</h1>
          <p className="text-xs text-slate-500">Record daily classroom attendance for your enrolled students</p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleMarkAllPresent}>
            <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Mark All Present
          </Button>
          <Button variant="primary" size="sm" onClick={handleSaveAttendance}>
            <Save className="w-4 h-4" /> Save Register
          </Button>
        </div>
      </div>

      {/* Filter Controls */}
      <Card className="flex flex-col sm:flex-row items-center gap-4">
        <div className="w-full sm:w-1/2 space-y-1">
          <label className="text-xs font-semibold text-slate-500">Select Subject Course</label>
          <select
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            className="w-full text-xs rounded-xl bg-slate-100 dark:bg-slate-800 p-2.5 border border-transparent outline-none font-bold"
          >
            {mockCourses.map((c) => (
              <option key={c.id} value={c.title}>
                {c.title}
              </option>
            ))}
          </select>
        </div>

        <div className="w-full sm:w-1/2 space-y-1">
          <label className="text-xs font-semibold text-slate-500">Session Date</label>
          <input
            type="date"
            value={attendanceDate}
            onChange={(e) => setAttendanceDate(e.target.value)}
            className="w-full text-xs rounded-xl bg-slate-100 dark:bg-slate-800 p-2.5 border border-transparent outline-none font-bold"
          />
        </div>
      </Card>

      {/* Student List Attendance Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-800 text-slate-500 font-bold border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="p-3.5">Student Name</th>
                <th className="p-3.5">ID Number</th>
                <th className="p-3.5">Department</th>
                <th className="p-3.5">Overall %</th>
                <th className="p-3.5 text-right">Today's Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {students.map((std) => (
                <tr key={std.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                  <td className="p-3.5 font-bold text-slate-900 dark:text-white">{std.name}</td>
                  <td className="p-3.5 text-slate-500">{std.id}</td>
                  <td className="p-3.5 text-slate-500">{std.department}</td>
                  <td className="p-3.5 font-semibold text-blue-600">{std.attendance}</td>
                  <td className="p-3.5 text-right">
                    <div className="inline-flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
                      <button
                        onClick={() => toggleStatus(std.id, "Present")}
                        className={`px-3 py-1 rounded-lg font-bold text-[11px] transition ${
                          std.statusToday === "Present"
                            ? "bg-emerald-500 text-white shadow-sm"
                            : "text-slate-400 hover:text-emerald-500"
                        }`}
                      >
                        Present
                      </button>
                      <button
                        onClick={() => toggleStatus(std.id, "Absent")}
                        className={`px-3 py-1 rounded-lg font-bold text-[11px] transition ${
                          std.statusToday === "Absent"
                            ? "bg-rose-500 text-white shadow-sm"
                            : "text-slate-400 hover:text-rose-500"
                        }`}
                      >
                        Absent
                      </button>
                      <button
                        onClick={() => toggleStatus(std.id, "Late")}
                        className={`px-3 py-1 rounded-lg font-bold text-[11px] transition ${
                          std.statusToday === "Late"
                            ? "bg-amber-500 text-white shadow-sm"
                            : "text-slate-400 hover:text-amber-500"
                        }`}
                      >
                        Late
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};
