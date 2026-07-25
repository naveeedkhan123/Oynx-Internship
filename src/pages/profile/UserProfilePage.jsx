import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../context/ToastContext";
import { Card, Button, Input, Breadcrumb, Badge } from "../../components/common/UIComponents";
import { User, Mail, Phone, MapPin, Building, GraduationCap, Camera, Save } from "lucide-react";

export const UserProfilePage = () => {
  const { user, updateUserProfile } = useAuth();
  const { showToast } = useToast();

  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState(user?.phone || "+1 (555) 234-5678");
  const [address, setAddress] = useState(user?.address || "452 Academic Way, Cambridge, MA");
  const [bio, setBio] = useState(user?.bio || "Passionate computer science major.");

  const handleSave = (e) => {
    e.preventDefault();
    updateUserProfile({ name, email, phone, address, bio });
    showToast("Profile details updated!", "success");
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <Breadcrumb items={[{ label: "Dashboard", href: "/" }, { label: "User Profile" }]} />

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">User Profile</h1>
          <p className="text-xs text-slate-500">Manage your personal, contact, and academic credentials</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column: Avatar & Quick Info */}
        <Card className="md:col-span-1 text-center p-6 space-y-4">
          <div className="relative inline-block mx-auto">
            <img
              src={user?.avatar}
              alt={user?.name}
              className="w-28 h-28 rounded-full object-cover ring-4 ring-blue-500/30 shadow-xl"
            />
            <button
              onClick={() => showToast("Avatar upload modal opened", "info")}
              className="absolute bottom-0 right-0 p-2 rounded-full bg-blue-600 text-white shadow-md hover:bg-blue-700 transition"
            >
              <Camera className="w-4 h-4" />
            </button>
          </div>

          <div>
            <h3 className="font-extrabold text-lg text-slate-900 dark:text-white">{user?.name}</h3>
            <Badge variant="indigo" className="mt-1 capitalize">{user?.role} Portal</Badge>
          </div>

          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-2 text-xs text-left">
            <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
              <GraduationCap className="w-4 h-4 text-blue-500 shrink-0" />
              <span>{user?.department || "Computer Science"}</span>
            </div>
            <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
              <Building className="w-4 h-4 text-indigo-500 shrink-0" />
              <span>{user?.semester || "6th Semester"}</span>
            </div>
          </div>
        </Card>

        {/* Right 2 Columns: Editable Details Form */}
        <Card className="md:col-span-2">
          <form onSubmit={handleSave} className="space-y-4">
            <h3 className="font-bold text-base text-slate-900 dark:text-white mb-2">Personal & Academic Details</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input label="Full Name" icon={User} value={name} onChange={(e) => setName(e.target.value)} required />
              <Input label="Email" type="email" icon={Mail} value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input label="Phone Number" icon={Phone} value={phone} onChange={(e) => setPhone(e.target.value)} />
              <Input label="Residential Address" icon={MapPin} value={address} onChange={(e) => setAddress(e.target.value)} />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Bio Statement</label>
              <textarea
                rows={3}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-full text-xs rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-3 outline-none focus:border-blue-500"
              />
            </div>

            <Button type="submit" variant="primary" size="sm" className="font-bold">
              <Save className="w-4 h-4" /> Save Profile Updates
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
};
