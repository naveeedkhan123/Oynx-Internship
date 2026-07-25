import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Clock, Calendar as CalendarIcon } from "lucide-react";
import { mockUpcomingEvents } from "../../data/mockData";

export const CalendarWidget = () => {
  const [selectedDate, setSelectedDate] = useState(25);
  const currentMonth = "July 2026";

  const daysInMonth = Array.from({ length: 31 }, (_, i) => i + 1);
  const startDayOffset = 3; // Wednesday start

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <CalendarIcon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <h3 className="font-bold text-slate-900 dark:text-white text-base">{currentMonth}</h3>
        </div>
        <div className="flex items-center gap-1">
          <button className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1 text-center text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">
        <span>Su</span>
        <span>Mo</span>
        <span>Tu</span>
        <span>We</span>
        <span>Th</span>
        <span>Fr</span>
        <span>Sa</span>
      </div>

      <div className="grid grid-cols-7 gap-1 text-xs">
        {Array.from({ length: startDayOffset }).map((_, i) => (
          <div key={`empty-${i}`} className="p-2" />
        ))}
        {daysInMonth.map((day) => {
          const isSelected = day === selectedDate;
          const isToday = day === 25;
          const hasEvent = [25, 26, 28].includes(day);

          return (
            <button
              key={day}
              onClick={() => setSelectedDate(day)}
              className={`p-2 rounded-xl flex flex-col items-center justify-center relative transition-all ${
                isSelected
                  ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold shadow-md shadow-blue-500/30 scale-105"
                  : isToday
                  ? "border border-blue-500 text-blue-600 dark:text-blue-400 font-bold"
                  : "hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
              }`}
            >
              <span>{day}</span>
              {hasEvent && !isSelected && (
                <span className="w-1 h-1 rounded-full bg-blue-500 mt-0.5" />
              )}
            </button>
          );
        })}
      </div>

      {/* Upcoming Events for selected day */}
      <div className="mt-2 pt-4 border-t border-slate-100 dark:border-slate-800">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">
          Events for July {selectedDate}
        </h4>
        <div className="flex flex-col gap-2.5">
          {mockUpcomingEvents.map((evt) => (
            <div
              key={evt.id}
              className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 flex items-center justify-between"
            >
              <div className="flex flex-col">
                <span className="text-xs font-bold text-slate-800 dark:text-slate-100">{evt.title}</span>
                <span className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                  <Clock className="w-3 h-3 text-blue-500" /> {evt.time}
                </span>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 uppercase">
                {evt.type}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
