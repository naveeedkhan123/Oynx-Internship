import React from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell
} from "recharts";

const COLORS = ["#3B82F6", "#6366F1", "#10B981", "#F59E0B", "#EC4899"];

export const CourseProgressChart = ({ data = [] }) => {
  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
          <XAxis dataKey="title" tick={{ fontSize: 11, fill: "#94A3B8" }} />
          <YAxis tick={{ fontSize: 11, fill: "#94A3B8" }} domain={[0, 100]} />
          <Tooltip
            contentStyle={{
              backgroundColor: "rgba(15, 23, 42, 0.9)",
              border: "none",
              borderRadius: "12px",
              color: "#fff",
              fontSize: "12px"
            }}
          />
          <Bar dataKey="progress" fill="url(#blueGradient)" radius={[8, 8, 0, 0]}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export const AttendanceChart = ({ data = [] }) => {
  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="attendanceGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
          <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#94A3B8" }} />
          <YAxis tick={{ fontSize: 11, fill: "#94A3B8" }} domain={[50, 100]} />
          <Tooltip
            contentStyle={{
              backgroundColor: "rgba(15, 23, 42, 0.9)",
              border: "none",
              borderRadius: "12px",
              color: "#fff",
              fontSize: "12px"
            }}
          />
          <Area
            type="monotone"
            dataKey="percentage"
            stroke="#3B82F6"
            strokeWidth={3}
            fillOpacity={1}
            fill="url(#attendanceGradient)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export const PerformanceGraph = ({ data = [] }) => {
  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
          <XAxis dataKey="semester" tick={{ fontSize: 11, fill: "#94A3B8" }} />
          <YAxis tick={{ fontSize: 11, fill: "#94A3B8" }} domain={[3.0, 4.0]} />
          <Tooltip
            contentStyle={{
              backgroundColor: "rgba(15, 23, 42, 0.9)",
              border: "none",
              borderRadius: "12px",
              color: "#fff",
              fontSize: "12px"
            }}
          />
          <Line
            type="monotone"
            dataKey="gpa"
            stroke="#6366F1"
            strokeWidth={3}
            dot={{ r: 5, fill: "#6366F1", strokeWidth: 2, stroke: "#fff" }}
            activeDot={{ r: 7 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export const EnrolmentTrendChart = ({ data = [] }) => {
  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="adminGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10B981" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#10B981" stopOpacity={0.0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
          <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#94A3B8" }} />
          <YAxis tick={{ fontSize: 11, fill: "#94A3B8" }} />
          <Tooltip
            contentStyle={{
              backgroundColor: "rgba(15, 23, 42, 0.9)",
              border: "none",
              borderRadius: "12px",
              color: "#fff",
              fontSize: "12px"
            }}
          />
          <Area
            type="monotone"
            dataKey="students"
            stroke="#10B981"
            strokeWidth={3}
            fillOpacity={1}
            fill="url(#adminGradient)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
