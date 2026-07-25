import React, { useState } from "react";
import { mockAssignments, mockCourses } from "../../data/mockData";
import { Card, Button, Input, Breadcrumb, Badge } from "../../components/common/UIComponents";
import { DataTable } from "../../components/tables/DataTable";
import { useToast } from "../../context/ToastContext";
import { FileCheck, Plus, Clock, CheckCircle2 } from "lucide-react";

export const CreateAssignmentPage = () => {
  const { showToast } = useToast();
  const [assignments, setAssignments] = useState(mockAssignments);
  const [title, setTitle] = useState("");
  const [courseTitle, setCourseTitle] = useState(mockCourses[0].title);
  const [dueDate, setDueDate] = useState("2026-08-10");
  const [points, setPoints] = useState("100");
  const [description, setDescription] = useState("");

  const handleCreate = (e) => {
    e.preventDefault();
    const newAsn = {
      id: `ASN-${Math.floor(Math.random() * 900 + 100)}`,
      courseId: "CS-401",
      courseTitle,
      title,
      dueDate,
      dueTime: "11:59 PM",
      points: Number(points),
      status: "Pending",
      grade: null,
      instructor: "Dr. Eleanor Vance",
      description
    };
    setAssignments([newAsn, ...assignments]);
    showToast(`Assignment '${title}' published to students!`, "success");
    setTitle("");
    setDescription("");
  };

  const columns = [
    { header: "ID", key: "id", sortable: true },
    { header: "Title", key: "title", sortable: true },
    { header: "Course", key: "courseTitle", sortable: true },
    { header: "Due Date", key: "dueDate", sortable: true },
    { header: "Points", key: "points", sortable: true },
    { header: "Status", key: "status", sortable: true, render: (val) => <Badge variant="info">{val}</Badge> }
  ];

  return (
    <div className="space-y-6">
      <Breadcrumb items={[{ label: "Dashboard", href: "/teacher/dashboard" }, { label: "Assignments Manager" }]} />

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">Assignments & Course Tasks</h1>
          <p className="text-xs text-slate-500">Publish new homework assignments, labs, or project milestones</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Create Assignment Form */}
        <Card className="lg:col-span-1">
          <h3 className="font-bold text-base text-slate-900 dark:text-white mb-4">Post New Assignment</h3>
          <form onSubmit={handleCreate} className="space-y-4">
            <Input
              label="Assignment Title"
              placeholder="e.g. Graph Pathfinding Implementation"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Target Course</label>
              <select
                value={courseTitle}
                onChange={(e) => setCourseTitle(e.target.value)}
                className="w-full text-xs rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-2.5 outline-none"
              >
                {mockCourses.map((c) => (
                  <option key={c.id} value={c.title}>
                    {c.title}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <Input
                label="Due Date"
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                required
              />
              <Input
                label="Max Points"
                type="number"
                value={points}
                onChange={(e) => setPoints(e.target.value)}
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Instructions / Description</label>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Provide guidelines for students..."
                className="w-full text-xs rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-2.5 outline-none focus:border-blue-500"
                required
              />
            </div>

            <Button type="submit" variant="primary" className="w-full font-bold">
              <Plus className="w-4 h-4" /> Publish Assignment
            </Button>
          </form>
        </Card>

        {/* Existing Assignments Table */}
        <Card className="lg:col-span-2">
          <h3 className="font-bold text-base text-slate-900 dark:text-white mb-4">Published Assignments</h3>
          <DataTable columns={columns} data={assignments} itemsPerPage={5} />
        </Card>
      </div>
    </div>
  );
};
