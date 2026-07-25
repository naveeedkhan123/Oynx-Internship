import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { mockCourses } from "../../data/mockData";
import { Card, Button, Badge, Breadcrumb } from "../../components/common/UIComponents";
import { useToast } from "../../context/ToastContext";
import {
  PlayCircle,
  CheckCircle,
  Circle,
  Clock,
  BookOpen,
  Download,
  Star,
  ChevronDown,
  ChevronUp,
  FileText
} from "lucide-react";

export const CourseDetailPage = () => {
  const { id } = useParams();
  const { showToast } = useToast();

  const course = mockCourses.find((c) => c.id === id) || mockCourses[0];
  const [activeLesson, setActiveLesson] = useState(course.modules[0]?.lessons[0]);
  const [openModules, setOpenModules] = useState({ "mod-1": true, "mod-2": true });

  const toggleModule = (modId) => {
    setOpenModules((prev) => ({ ...prev, [modId]: !prev[modId] }));
  };

  const handleLessonComplete = (lessonId) => {
    showToast("Lesson progress updated!", "success");
  };

  return (
    <div className="space-y-6">
      <Breadcrumb
        items={[
          { label: "Dashboard", href: "/student/dashboard" },
          { label: "My Courses", href: "/student/courses" },
          { label: course.title }
        ]}
      />

      {/* Header Banner */}
      <div className="flex flex-col lg:flex-row items-start justify-between gap-4 p-6 glass-card rounded-2xl">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Badge variant="indigo">{course.category}</Badge>
            <span className="text-xs text-slate-400">ID: {course.id}</span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-extrabold text-slate-900 dark:text-white">
            {course.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500">
            <span className="flex items-center gap-1">
              <img src={course.instructorAvatar} className="w-5 h-5 rounded-full object-cover" />
              {course.instructor}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4 text-blue-500" /> {course.duration}
            </span>
            <span className="flex items-center gap-1 text-amber-400 font-bold">
              <Star className="w-4 h-4 fill-amber-400" /> {course.rating}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" onClick={() => showToast("Course syllabus downloaded (PDF)", "info")}>
            <Download className="w-4 h-4" /> Syllabus PDF
          </Button>
        </div>
      </div>

      {/* Main Grid: Video Player + Module Lesson Tree */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Video Player & Description */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-0 overflow-hidden bg-slate-950 border-slate-800">
            <div className="relative aspect-video w-full flex items-center justify-center bg-black">
              {activeLesson ? (
                <video
                  key={activeLesson.id}
                  controls
                  className="w-full h-full object-cover"
                  src={activeLesson.videoUrl}
                />
              ) : (
                <div className="text-center text-slate-400 p-8">
                  <PlayCircle className="w-16 h-16 text-blue-500 mx-auto mb-2" />
                  <p className="text-sm font-semibold">Select a lesson to begin streaming</p>
                </div>
              )}
            </div>

            <div className="p-5 flex items-center justify-between border-t border-slate-800 bg-slate-900 text-white">
              <div>
                <h3 className="font-bold text-base text-white">{activeLesson?.title || "Course Introduction"}</h3>
                <span className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                  <Clock className="w-3.5 h-3.5" /> Duration: {activeLesson?.duration || "30 min"}
                </span>
              </div>
              <Button
                variant="primary"
                size="sm"
                onClick={() => handleLessonComplete(activeLesson?.id)}
              >
                Mark Complete <CheckCircle className="w-4 h-4" />
              </Button>
            </div>
          </Card>

          {/* Description & Resources */}
          <Card>
            <h3 className="font-bold text-base text-slate-900 dark:text-white mb-2">About This Course</h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{course.description}</p>

            <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 space-y-3">
              <h4 className="font-bold text-xs uppercase text-slate-500 tracking-wider">Lesson Attachments & Code Labs</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div
                  onClick={() => showToast("Downloaded lab starter repository (.zip)", "success")}
                  className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 flex items-center justify-between cursor-pointer hover:border-blue-500 transition"
                >
                  <div className="flex items-center gap-2.5">
                    <FileText className="w-4 h-4 text-blue-500" />
                    <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                      Module_01_Starter_Code.zip
                    </span>
                  </div>
                  <Download className="w-4 h-4 text-slate-400" />
                </div>
                <div
                  onClick={() => showToast("Downloaded Lecture Notes PDF", "success")}
                  className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 flex items-center justify-between cursor-pointer hover:border-blue-500 transition"
                >
                  <div className="flex items-center gap-2.5">
                    <FileText className="w-4 h-4 text-indigo-500" />
                    <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                      Algorithms_Reference_Guide.pdf
                    </span>
                  </div>
                  <Download className="w-4 h-4 text-slate-400" />
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Right 1 Col: Course Modules Tree */}
        <div className="space-y-6">
          <Card>
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="font-bold text-base text-slate-900 dark:text-white">Course Content</h3>
              <span className="text-xs font-semibold text-blue-600">{course.completedLessons}/{course.totalLessons} Lessons</span>
            </div>

            <div className="space-y-3 max-h-[600px] overflow-y-auto pr-1">
              {course.modules.map((mod) => (
                <div key={mod.id} className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
                  <button
                    onClick={() => toggleModule(mod.id)}
                    className="w-full p-3 bg-slate-50 dark:bg-slate-800/70 flex items-center justify-between text-left text-xs font-bold text-slate-800 dark:text-slate-200"
                  >
                    <span>{mod.title}</span>
                    {openModules[mod.id] ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>

                  {openModules[mod.id] && (
                    <div className="divide-y divide-slate-100 dark:divide-slate-800 bg-white dark:bg-slate-900">
                      {mod.lessons.map((les) => {
                        const isActive = activeLesson?.id === les.id;
                        return (
                          <div
                            key={les.id}
                            onClick={() => setActiveLesson(les)}
                            className={`p-3 flex items-center justify-between text-xs cursor-pointer transition ${
                              isActive
                                ? "bg-blue-50 dark:bg-slate-800 text-blue-600 dark:text-blue-400 font-bold"
                                : "hover:bg-slate-50 dark:hover:bg-slate-800/40 text-slate-700 dark:text-slate-300"
                            }`}
                          >
                            <div className="flex items-center gap-2.5">
                              {les.completed ? (
                                <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                              ) : (
                                <Circle className="w-4 h-4 text-slate-400 shrink-0" />
                              )}
                              <span className="line-clamp-1">{les.title}</span>
                            </div>
                            <span className="text-[10px] text-slate-400 shrink-0">{les.duration}</span>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
