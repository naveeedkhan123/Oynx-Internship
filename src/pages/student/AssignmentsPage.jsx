import React, { useState } from "react";
import { mockAssignments } from "../../data/mockData";
import { Card, Button, Badge, Modal, Input, Breadcrumb } from "../../components/common/UIComponents";
import { useToast } from "../../context/ToastContext";
import { FileCheck, Clock, Upload, CheckCircle2, AlertCircle } from "lucide-react";

export const AssignmentsPage = () => {
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState("All");
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [submissionComments, setSubmissionComments] = useState("");
  const [fileName, setFileName] = useState("");

  const filteredAssignments = mockAssignments.filter((asn) => {
    if (activeTab === "All") return true;
    return asn.status === activeTab;
  });

  const handleOpenSubmit = (asn) => {
    setSelectedAssignment(asn);
    setIsSubmitModalOpen(true);
  };

  const handleConfirmSubmit = (e) => {
    e.preventDefault();
    if (!fileName) {
      showToast("Please attach a file before submitting.", "warning");
      return;
    }

    showToast(`Assignment '${selectedAssignment?.title}' submitted successfully!`, "success");
    setIsSubmitModalOpen(false);
    setFileName("");
    setSubmissionComments("");
  };

  return (
    <div className="space-y-6">
      <Breadcrumb items={[{ label: "Dashboard", href: "/student/dashboard" }, { label: "Assignments" }]} />

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">Academic Assignments</h1>
          <p className="text-xs text-slate-500">Track deadlines, grade feedback, and submit course project deliverables</p>
        </div>

        {/* Status Filter Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-800 text-xs">
          {["All", "Pending", "Submitted", "Graded"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1.5 rounded-lg font-bold transition ${
                activeTab === tab
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Assignment Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredAssignments.map((asn) => {
          const isPending = asn.status === "Pending";
          const isGraded = asn.status === "Graded";

          return (
            <Card key={asn.id} hoverable className="flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Badge variant={isPending ? "warning" : isGraded ? "success" : "info"}>
                    {asn.status}
                  </Badge>
                  <span className="text-xs font-semibold text-slate-400">{asn.points} Points</span>
                </div>

                <h3 className="font-bold text-base text-slate-900 dark:text-white">{asn.title}</h3>
                <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 block">
                  {asn.courseTitle}
                </span>

                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed pt-1">
                  {asn.description}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs text-slate-500">
                  <Clock className="w-3.5 h-3.5 text-blue-500" />
                  <span>Due: {asn.dueDate} at {asn.dueTime}</span>
                </div>

                {isPending && (
                  <Button size="sm" variant="primary" onClick={() => handleOpenSubmit(asn)}>
                    <Upload className="w-4 h-4" /> Submit File
                  </Button>
                )}
                {asn.status === "Submitted" && (
                  <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" /> Submitted
                  </span>
                )}
                {isGraded && (
                  <div className="flex items-center gap-1 text-xs font-extrabold text-emerald-600">
                    <span>Grade:</span>
                    <span className="px-2 py-0.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                      {asn.grade}
                    </span>
                  </div>
                )}
              </div>
            </Card>
          );
        })}
      </div>

      {/* Submission Modal */}
      <Modal
        isOpen={isSubmitModalOpen}
        onClose={() => setIsSubmitModalOpen(false)}
        title={`Submit Deliverable: ${selectedAssignment?.title}`}
      >
        <form onSubmit={handleConfirmSubmit} className="space-y-4">
          <div className="p-3 rounded-xl bg-blue-50/50 dark:bg-slate-800/50 border border-blue-200 dark:border-slate-700 text-xs">
            <span className="font-bold text-slate-900 dark:text-white">Instructor: </span>
            <span className="text-slate-600 dark:text-slate-300">{selectedAssignment?.instructor}</span>
            <div className="mt-1 text-slate-500">Maximum score: {selectedAssignment?.points} Points</div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Upload Project Archive / PDF Document
            </label>
            <div className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-2xl p-6 text-center hover:border-blue-500 transition cursor-pointer">
              <Upload className="w-8 h-8 text-blue-500 mx-auto mb-2" />
              <input
                type="file"
                id="file-upload"
                className="hidden"
                onChange={(e) => setFileName(e.target.files[0]?.name || "")}
              />
              <label htmlFor="file-upload" className="cursor-pointer text-xs font-bold text-blue-600 hover:underline">
                Click to select file from device
              </label>
              <p className="text-[11px] text-slate-400 mt-1">Accepted format: .zip, .pdf, .docx (Max 50MB)</p>
              {fileName && (
                <div className="mt-3 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 font-bold text-xs">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Attached: {fileName}
                </div>
              )}
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Notes for Instructor (Optional)
            </label>
            <textarea
              rows={3}
              value={submissionComments}
              onChange={(e) => setSubmissionComments(e.target.value)}
              placeholder="Add any comments or GitHub repository links..."
              className="w-full text-xs rounded-xl bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-800 p-3 outline-none focus:border-blue-500"
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-2">
            <Button variant="outline" size="sm" onClick={() => setIsSubmitModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="sm">
              Confirm Final Submission
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
