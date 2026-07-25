import React, { useState } from "react";
import { mockAssignments, mockStudentsList } from "../../data/mockData";
import { Card, Button, Badge, Modal, Input, Breadcrumb } from "../../components/common/UIComponents";
import { useToast } from "../../context/ToastContext";
import { BarChart2, Edit3, CheckCircle2, FileText } from "lucide-react";

export const GradeBookPage = () => {
  const { showToast } = useToast();

  const [submissions, setSubmissions] = useState([
    {
      id: "SUB-01",
      studentName: "Alexander Wright",
      studentId: "STD-101",
      assignmentTitle: "Graph Shortest Path & Flow Network Optimization",
      course: "Advanced Data Structures & Algorithms",
      submittedDate: "2026-07-24",
      status: "Submitted",
      grade: null,
      file: "Alexander_Wright_Graph_Lab.zip"
    },
    {
      id: "SUB-02",
      studentName: "Olivia Chen",
      studentId: "STD-102",
      assignmentTitle: "Graph Shortest Path & Flow Network Optimization",
      course: "Advanced Data Structures & Algorithms",
      submittedDate: "2026-07-23",
      status: "Graded",
      grade: "98 / 100",
      file: "Olivia_Chen_Dijkstra_Flow.pdf"
    },
    {
      id: "SUB-03",
      studentName: "Liam O'Connor",
      studentId: "STD-103",
      assignmentTitle: "Custom React Context & Auth Middleware",
      course: "Full-Stack Web Engineering",
      submittedDate: "2026-07-22",
      status: "Graded",
      grade: "92 / 100",
      file: "Liam_React_Auth_Middleware.zip"
    }
  ]);

  const [selectedSub, setSelectedSub] = useState(null);
  const [gradeInput, setGradeInput] = useState("95");
  const [feedback, setFeedback] = useState("");
  const [isGradeModalOpen, setIsGradeModalOpen] = useState(false);

  const handleOpenGradeModal = (sub) => {
    setSelectedSub(sub);
    setGradeInput(sub.grade ? sub.grade.split(" ")[0] : "95");
    setIsGradeModalOpen(true);
  };

  const handleSaveGrade = (e) => {
    e.preventDefault();
    setSubmissions((prev) =>
      prev.map((s) =>
        s.id === selectedSub.id
          ? { ...s, status: "Graded", grade: `${gradeInput} / 100` }
          : s
      )
    );
    showToast(`Grade assigned to ${selectedSub.studentName}: ${gradeInput}/100`, "success");
    setIsGradeModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <Breadcrumb items={[{ label: "Dashboard", href: "/teacher/dashboard" }, { label: "Gradebook Evaluation" }]} />

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">Faculty Gradebook Evaluation</h1>
          <p className="text-xs text-slate-500">Assess student submissions, assign marks, and issue feedback notes</p>
        </div>
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-800 text-slate-500 font-bold border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="p-3.5">Student</th>
                <th className="p-3.5">Assignment Deliverable</th>
                <th className="p-3.5">Submitted On</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5">Score</th>
                <th className="p-3.5 text-right">Evaluate</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {submissions.map((sub) => (
                <tr key={sub.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                  <td className="p-3.5">
                    <div className="font-bold text-slate-900 dark:text-white">{sub.studentName}</div>
                    <div className="text-[10px] text-slate-400">{sub.studentId}</div>
                  </td>
                  <td className="p-3.5">
                    <div className="font-semibold text-slate-800 dark:text-slate-200">{sub.assignmentTitle}</div>
                    <div className="text-[10px] text-blue-600 dark:text-blue-400">{sub.course}</div>
                  </td>
                  <td className="p-3.5 text-slate-500">{sub.submittedDate}</td>
                  <td className="p-3.5">
                    <Badge variant={sub.status === "Graded" ? "success" : "warning"}>{sub.status}</Badge>
                  </td>
                  <td className="p-3.5 font-extrabold text-emerald-600">
                    {sub.grade || "Not Graded"}
                  </td>
                  <td className="p-3.5 text-right">
                    <Button size="sm" variant="primary" onClick={() => handleOpenGradeModal(sub)}>
                      <Edit3 className="w-3.5 h-3.5" /> Grade Work
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Grade Input Modal */}
      <Modal
        isOpen={isGradeModalOpen}
        onClose={() => setIsGradeModalOpen(false)}
        title={`Grade Work: ${selectedSub?.studentName}`}
      >
        <form onSubmit={handleSaveGrade} className="space-y-4">
          <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs space-y-1">
            <span className="font-bold text-slate-900 dark:text-white">{selectedSub?.assignmentTitle}</span>
            <div className="flex items-center gap-2 text-blue-600 font-semibold">
              <FileText className="w-3.5 h-3.5" /> Attachment: {selectedSub?.file}
            </div>
          </div>

          <Input
            label="Assign Score (out of 100)"
            type="number"
            value={gradeInput}
            onChange={(e) => setGradeInput(e.target.value)}
            required
          />

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Feedback Comments</label>
            <textarea
              rows={3}
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Great code structure and clear complexity analysis..."
              className="w-full text-xs rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-2.5 outline-none focus:border-blue-500"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button variant="outline" size="sm" onClick={() => setIsGradeModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="sm">
              Save Grade
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
