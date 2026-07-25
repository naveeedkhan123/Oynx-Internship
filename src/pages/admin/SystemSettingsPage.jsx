import React, { useState } from "react";
import { Card, Button, Input, Breadcrumb } from "../../components/common/UIComponents";
import { useToast } from "../../context/ToastContext";
import { ShieldCheck, Database, Mail, Sliders, Save } from "lucide-react";

export const SystemSettingsPage = () => {
  const { showToast } = useToast();
  const [siteName, setSiteName] = useState("Academia University Portal");
  const [allowRegistration, setAllowRegistration] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);

  const handleSaveSettings = (e) => {
    e.preventDefault();
    showToast("System configurations saved!", "success");
  };

  const handleTriggerBackup = () => {
    showToast("Full database backup snapshot generated!", "success");
  };

  return (
    <div className="space-y-6">
      <Breadcrumb items={[{ label: "Admin Dashboard", href: "/admin/dashboard" }, { label: "System Settings" }]} />

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">System Settings & Controls</h1>
          <p className="text-xs text-slate-500">Configure global portal parameters, security controls, and automated backups</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <form onSubmit={handleSaveSettings} className="space-y-5">
            <h3 className="font-bold text-base text-slate-900 dark:text-white pb-2 border-b border-slate-100 dark:border-slate-800">
              General System Configurations
            </h3>

            <Input
              label="Portal Branding Name"
              value={siteName}
              onChange={(e) => setSiteName(e.target.value)}
              required
            />

            <div className="space-y-3 pt-2">
              <label className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 cursor-pointer">
                <div>
                  <span className="text-xs font-bold text-slate-900 dark:text-white block">Allow Self-Registration</span>
                  <span className="text-[11px] text-slate-400">Permit new students to register accounts online</span>
                </div>
                <input
                  type="checkbox"
                  checked={allowRegistration}
                  onChange={(e) => setAllowRegistration(e.target.checked)}
                  className="w-4 h-4 text-emerald-600 rounded"
                />
              </label>

              <label className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 cursor-pointer">
                <div>
                  <span className="text-xs font-bold text-slate-900 dark:text-white block">System Dispatch Emails</span>
                  <span className="text-[11px] text-slate-400">Send assignment & grade email alerts</span>
                </div>
                <input
                  type="checkbox"
                  checked={emailNotifications}
                  onChange={(e) => setEmailNotifications(e.target.checked)}
                  className="w-4 h-4 text-emerald-600 rounded"
                />
              </label>
            </div>

            <Button type="submit" variant="primary" size="sm" className="font-bold bg-emerald-600 hover:bg-emerald-700">
              <Save className="w-4 h-4" /> Save System Settings
            </Button>
          </form>
        </Card>

        <Card className="space-y-4">
          <h3 className="font-bold text-base text-slate-900 dark:text-white">Database Backup & Maintenance</h3>
          <p className="text-xs text-slate-500">Create point-in-time PostgreSQL database snapshots</p>

          <Button variant="outline" size="sm" onClick={handleTriggerBackup} className="w-full justify-start text-xs font-bold">
            <Database className="w-4 h-4 text-emerald-500" /> Trigger Instant Snapshot
          </Button>
        </Card>
      </div>
    </div>
  );
};
