import React from "react";
import { Link } from "react-router-dom";
import { Card, Button, Badge } from "../common/UIComponents";
import { Clock, BookOpen, Star, PlayCircle } from "lucide-react";

export const CourseCard = ({ course }) => {
  const isCompleted = course.progress === 100;

  return (
    <Card hoverable className="flex flex-col h-full overflow-hidden p-0 group">
      {/* Banner Image */}
      <div className="relative h-44 w-full overflow-hidden bg-slate-900">
        <img
          src={course.banner}
          alt={course.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-90 group-hover:opacity-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
        <div className="absolute top-3 left-3">
          <Badge variant="info" className="bg-slate-900/80 backdrop-blur-md text-white border-white/20">
            {course.category}
          </Badge>
        </div>
        <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-amber-400 text-xs font-bold">
          <Star className="w-3.5 h-3.5 fill-amber-400" />
          <span>{course.rating}</span>
        </div>
      </div>

      {/* Content Body */}
      <div className="p-5 flex-1 flex flex-col justify-between gap-4">
        <div>
          <h3 className="font-bold text-base text-slate-900 dark:text-white line-clamp-1 group-hover:text-blue-600 transition">
            {course.title}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mt-1.5 leading-relaxed">
            {course.description}
          </p>
        </div>

        {/* Instructor */}
        <div className="flex items-center gap-2.5 pt-2 border-t border-slate-100 dark:border-slate-800">
          <img
            src={course.instructorAvatar}
            alt={course.instructor}
            className="w-8 h-8 rounded-full object-cover border border-blue-500/30"
          />
          <div className="flex flex-col">
            <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
              {course.instructor}
            </span>
            <span className="text-[10px] text-slate-400">{course.enrolledCount} Students Enrolled</span>
          </div>
        </div>

        {/* Progress Bar & Stats */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold">
            <span className="text-slate-500 dark:text-slate-400">Progress</span>
            <span className="text-blue-600 dark:text-blue-400 font-bold">{course.progress}%</span>
          </div>
          <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                isCompleted ? "bg-emerald-500" : "bg-gradient-to-r from-blue-600 to-indigo-600"
              }`}
              style={{ width: `${course.progress}%` }}
            />
          </div>
        </div>

        {/* Footer Meta & Button */}
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" /> {course.duration}
            </span>
            <span className="flex items-center gap-1">
              <BookOpen className="w-3.5 h-3.5" /> {course.totalLessons} Lessons
            </span>
          </div>

          <Link to={`/student/courses/${course.id}`}>
            <Button size="sm" variant={isCompleted ? "secondary" : "primary"}>
              <PlayCircle className="w-4 h-4" />
              {isCompleted ? "Review" : "Continue"}
            </Button>
          </Link>
        </div>
      </div>
    </Card>
  );
};
