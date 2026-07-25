import React, { useState } from "react";
import { mockCourses } from "../../data/mockData";
import { CourseCard } from "../../components/courses/CourseCard";
import { SearchBox, Breadcrumb, EmptyState } from "../../components/common/UIComponents";
import { BookOpen } from "lucide-react";

export const CoursesPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Computer Science", "Software Engineering", "Data Science", "Cyber Security"];

  const filteredCourses = mockCourses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || course.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      <Breadcrumb items={[{ label: "Dashboard", href: "/student/dashboard" }, { label: "My Courses" }]} />

      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">Enrolled Courses</h1>
          <p className="text-xs text-slate-500">Track your learning progress, lessons, and course resources</p>
        </div>
        <SearchBox value={searchQuery} onChange={setSearchQuery} placeholder="Search courses or faculty..." className="w-full md:w-80" />
      </div>

      {/* Category Pills Filter */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition ${
              selectedCategory === cat
                ? "bg-blue-600 text-white shadow-md shadow-blue-500/25"
                : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 border border-slate-200 dark:border-slate-800"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Course Cards Grid */}
      {filteredCourses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      ) : (
        <EmptyState title="No Courses Found" description="No enrolled courses match your filter criteria." icon={BookOpen} />
      )}
    </div>
  );
};
