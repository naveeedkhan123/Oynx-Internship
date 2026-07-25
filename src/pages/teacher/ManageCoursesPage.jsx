import React, { useState } from "react";
import { mockCourses } from "../../data/mockData";
import { Card, Button, Badge, Modal, Input, Breadcrumb } from "../../components/common/UIComponents";
import { DataTable } from "../../components/tables/DataTable";
import { useToast } from "../../context/ToastContext";
import { BookOpen, Plus, Edit, Trash2, Users, Star } from "lucide-react";

export const ManageCoursesPage = () => {
  const { showToast } = useToast();
  const [courses, setCourses] = useState(mockCourses);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Computer Science");

  const handleDeleteCourse = (id) => {
    setCourses((prev) => prev.filter((c) => c.id !== id));
    showToast("Course removed from syllabus", "info");
  };

  const handleAddCourse = (e) => {
    e.preventDefault();
    const newCourse = {
      id: `CS-${Math.floor(Math.random() * 900 + 100)}`,
      title,
      category,
      instructor: "Dr. Eleanor Vance",
      instructorAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200",
      banner: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=600",
      progress: 0,
      completedLessons: 0,
      totalLessons: 20,
      duration: "30 Hours",
      rating: 5.0,
      enrolledCount: 1,
      description: "Newly created faculty course unit."
    };
    setCourses([newCourse, ...courses]);
    showToast("New Course Added!", "success");
    setIsModalOpen(false);
    setTitle("");
  };

  const columns = [
    { header: "Course ID", key: "id", sortable: true },
    {
      header: "Title",
      key: "title",
      sortable: true,
      render: (val, row) => (
        <div className="flex items-center gap-2.5">
          <img src={row.banner} className="w-10 h-8 rounded object-cover" />
          <span className="font-bold text-slate-900 dark:text-white">{val}</span>
        </div>
      )
    },
    { header: "Category", key: "category", sortable: true, render: (val) => <Badge variant="indigo">{val}</Badge> },
    { header: "Enrolled", key: "enrolledCount", sortable: true, render: (val) => `${val} Students` },
    { header: "Rating", key: "rating", sortable: true, render: (val) => `⭐ ${val}` }
  ];

  return (
    <div className="space-y-6">
      <Breadcrumb items={[{ label: "Dashboard", href: "/teacher/dashboard" }, { label: "Manage Courses" }]} />

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">Course Management</h1>
          <p className="text-xs text-slate-500">Create, edit, or publish academic courses and lesson modules</p>
        </div>
        <Button variant="primary" size="sm" onClick={() => setIsModalOpen(true)}>
          <Plus className="w-4 h-4" /> Create New Course
        </Button>
      </div>

      <Card>
        <DataTable
          columns={columns}
          data={courses}
          actions={(row) => (
            <div className="flex items-center gap-2 justify-end">
              <button
                onClick={() => showToast(`Editing ${row.title}`, "info")}
                className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <Edit className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleDeleteCourse(row.id)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          )}
        />
      </Card>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Create New Faculty Course">
        <form onSubmit={handleAddCourse} className="space-y-4">
          <Input
            label="Course Title"
            placeholder="e.g. Distributed Database Systems"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full text-xs rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-2.5 outline-none"
            >
              <option value="Computer Science">Computer Science</option>
              <option value="Software Engineering">Software Engineering</option>
              <option value="Data Science">Data Science</option>
              <option value="Cyber Security">Cyber Security</option>
            </select>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="outline" size="sm" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button type="submit" variant="primary" size="sm">Publish Course</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
