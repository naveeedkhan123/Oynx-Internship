import React, { useState } from "react";
import { mockStudentsList, mockTeachersList } from "../../data/mockData";
import { Card, Button, Badge, Modal, Input, Breadcrumb } from "../../components/common/UIComponents";
import { DataTable } from "../../components/tables/DataTable";
import { useToast } from "../../context/ToastContext";
import { Users, Plus, Edit, Trash2, UserCheck, UserX } from "lucide-react";

export const ManageUsersPage = () => {
  const { showToast } = useToast();

  const combinedUsers = [
    ...mockStudentsList.map((s) => ({ ...s, userRole: "Student" })),
    ...mockTeachersList.map((t) => ({ ...t, userRole: "Teacher", cgpa: "N/A" }))
  ];

  const [users, setUsers] = useState(combinedUsers);
  const [roleFilter, setRoleFilter] = useState("All");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [userRole, setUserRole] = useState("Student");
  const [department, setDepartment] = useState("Computer Science");

  const filteredUsers = users.filter((u) => {
    if (roleFilter === "All") return true;
    return u.userRole === roleFilter;
  });

  const handleToggleStatus = (id) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === id ? { ...u, status: u.status === "Active" ? "Inactive" : "Active" } : u
      )
    );
    showToast("User account status updated!", "info");
  };

  const handleAddUser = (e) => {
    e.preventDefault();
    const newUser = {
      id: `${userRole === "Student" ? "STD" : "TCH"}-${Math.floor(Math.random() * 900 + 100)}`,
      name,
      email,
      department,
      userRole,
      status: "Active",
      cgpa: "3.80"
    };
    setUsers([newUser, ...users]);
    showToast(`New ${userRole} account created for ${name}!`, "success");
    setIsAddModalOpen(false);
    setName("");
    setEmail("");
  };

  const columns = [
    { header: "ID", key: "id", sortable: true },
    { header: "Full Name", key: "name", sortable: true },
    { header: "Email", key: "email", sortable: true },
    { header: "Role", key: "userRole", sortable: true, render: (val) => <Badge variant={val === "Teacher" ? "indigo" : "info"}>{val}</Badge> },
    { header: "Department", key: "department", sortable: true },
    { header: "Status", key: "status", sortable: true, render: (val) => <Badge variant={val === "Active" ? "success" : "danger"}>{val}</Badge> }
  ];

  return (
    <div className="space-y-6">
      <Breadcrumb items={[{ label: "Admin Dashboard", href: "/admin/dashboard" }, { label: "Manage Users" }]} />

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">User Directory & Accounts</h1>
          <p className="text-xs text-slate-500">Manage student enrolments, faculty profiles, and access credentials</p>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center p-1 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-800 text-xs">
            {["All", "Student", "Teacher"].map((tab) => (
              <button
                key={tab}
                onClick={() => setRoleFilter(tab)}
                className={`px-3 py-1.5 rounded-lg font-bold transition ${
                  roleFilter === tab ? "bg-emerald-600 text-white shadow-sm" : "text-slate-500 hover:text-slate-800"
                }`}
              >
                {tab}s
              </button>
            ))}
          </div>

          <Button variant="primary" size="sm" onClick={() => setIsAddModalOpen(true)}>
            <Plus className="w-4 h-4" /> Add User
          </Button>
        </div>
      </div>

      <Card>
        <DataTable
          columns={columns}
          data={filteredUsers}
          actions={(row) => (
            <div className="flex items-center justify-end gap-2">
              <button
                onClick={() => handleToggleStatus(row.id)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-emerald-600 hover:bg-slate-100 dark:hover:bg-slate-800"
                title="Toggle Status"
              >
                {row.status === "Active" ? <UserX className="w-4 h-4 text-rose-500" /> : <UserCheck className="w-4 h-4 text-emerald-500" />}
              </button>
            </div>
          )}
        />
      </Card>

      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Register New User Account">
        <form onSubmit={handleAddUser} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Account Role</label>
            <select
              value={userRole}
              onChange={(e) => setUserRole(e.target.value)}
              className="w-full text-xs rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-2.5 outline-none font-bold"
            >
              <option value="Student">Student</option>
              <option value="Teacher">Teacher / Faculty</option>
            </select>
          </div>

          <Input label="Full Name" placeholder="e.g. Samuel Jackson" value={name} onChange={(e) => setName(e.target.value)} required />
          <Input label="Institutional Email" type="email" placeholder="name@academia.edu" value={email} onChange={(e) => setEmail(e.target.value)} required />

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Department</label>
            <select
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="w-full text-xs rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-2.5 outline-none"
            >
              <option value="Computer Science">Computer Science</option>
              <option value="Data Science">Data Science</option>
              <option value="Software Engineering">Software Engineering</option>
              <option value="Cyber Security">Cyber Security</option>
            </select>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button variant="outline" size="sm" onClick={() => setIsAddModalOpen(false)}>Cancel</Button>
            <Button type="submit" variant="primary" size="sm">Create Account</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
