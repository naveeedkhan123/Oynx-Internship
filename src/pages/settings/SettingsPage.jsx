import React, { useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import { useToast } from "../../context/ToastContext";
import { Card, Button, Input, Breadcrumb } from "../../components/common/UIComponents";
import { Sun, Moon, Lock, Globe, Bell, Save } from "lucide-react";

export const SettingsPage = () => {
  const { isDark, toggleTheme } = useTheme();
  const { showToast } = useToast();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [language, setLanguage] = useState("English (US)");

  const [emailAlerts, setEmailAlerts] = useState(true);
  const [inAppAlerts, setInAppAlerts] = useState(true);

  const handlePasswordChange = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      showToast("New passwords do not match!", "error");
      return;
    }
    showToast("Password updated successfully!", "success");
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  const handleSaveNotifications = (e) => {
    e.preventDefault();
    showToast("Preferences saved!", "success");
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <Breadcrumb items={[{ label: "Dashboard", href: "/" }, { label: "Account Settings" }]} />

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">Account Settings & Preferences</h1>
          <p className="text-xs text-slate-500">Configure portal appearance, security passwords, and notification channels</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Security Password Change Card */}
          <Card>
            <form onSubmit={handlePasswordChange} className="space-y-4">
              <div className="flex items-center gap-2 mb-2 pb-2 border-b border-slate-100 dark:border-slate-800">
                <Lock className="w-5 h-5 text-blue-600" />
                <h3 className="font-bold text-base text-slate-900 dark:text-white">Security & Password</h3>
              </div>

              <Input
                label="Current Password"
                isPassword
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
              />
              <Input
                label="New Password"
                isPassword
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
              <Input
                label="Confirm New Password"
                isPassword
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />

              <Button type="submit" variant="primary" size="sm" className="font-bold">
                <Save className="w-4 h-4" /> Change Password
              </Button>
            </form>
          </Card>

          {/* Notification Preferences */}
          <Card>
            <form onSubmit={handleSaveNotifications} className="space-y-4">
              <div className="flex items-center gap-2 mb-2 pb-2 border-b border-slate-100 dark:border-slate-800">
                <Bell className="w-5 h-5 text-indigo-600" />
                <h3 className="font-bold text-base text-slate-900 dark:text-white">Notification Preferences</h3>
              </div>

              <div className="space-y-3">
                <label className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 cursor-pointer">
                  <div>
                    <span className="text-xs font-bold text-slate-900 dark:text-white block">Email Notifications</span>
                    <span className="text-[11px] text-slate-400">Receive assignment deadlines and grade alerts via email</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={emailAlerts}
                    onChange={(e) => setEmailAlerts(e.target.checked)}
                    className="w-4 h-4 text-blue-600 rounded"
                  />
                </label>

                <label className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 cursor-pointer">
                  <div>
                    <span className="text-xs font-bold text-slate-900 dark:text-white block">In-App Popups</span>
                    <span className="text-[11px] text-slate-400">Show real-time toast popups during live sessions</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={inAppAlerts}
                    onChange={(e) => setInAppAlerts(e.target.checked)}
                    className="w-4 h-4 text-blue-600 rounded"
                  />
                </label>
              </div>

              <Button type="submit" variant="primary" size="sm" className="font-bold">
                <Save className="w-4 h-4" /> Save Notification Settings
              </Button>
            </form>
          </Card>
        </div>

        {/* Theme & Language Column */}
        <div className="space-y-6">
          <Card className="space-y-4">
            <h3 className="font-bold text-base text-slate-900 dark:text-white">Theme & Appearance</h3>
            <p className="text-xs text-slate-500">Toggle between Light Mode and Dark Mode</p>

            <button
              onClick={toggleTheme}
              className="w-full p-4 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-between font-bold text-xs transition hover:scale-[1.02]"
            >
              <span className="flex items-center gap-2">
                {isDark ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-slate-700" />}
                {isDark ? "Dark Theme Enabled" : "Light Theme Enabled"}
              </span>
              <span className="text-[10px] uppercase font-bold text-blue-600 px-2 py-1 bg-blue-500/10 rounded-lg">
                Switch
              </span>
            </button>
          </Card>

          <Card className="space-y-4">
            <h3 className="font-bold text-base text-slate-900 dark:text-white">Language & Regional</h3>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-500 flex items-center gap-1.5">
                <Globe className="w-4 h-4 text-blue-500" /> Interface Language
              </label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full text-xs rounded-xl bg-slate-100 dark:bg-slate-800 p-2.5 outline-none font-bold"
              >
                <option value="English (US)">English (US)</option>
                <option value="Spanish">Spanish (Español)</option>
                <option value="French">French (Français)</option>
                <option value="German">German (Deutsch)</option>
              </select>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
