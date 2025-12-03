import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Settings } from 'lucide-react';
import { toast } from 'sonner';

export function AdminSettings() {
  const navigate = useNavigate();
  const [settings, setSettings] = useState({
    autoApproval: false,
    emailNotifications: true,
    agentAssignment: 'manual',
    maintenanceMode: false,
    maxProjectsPerAgent: 10,
    sessionTimeout: 30,
  });

  const handleSave = () => {
    toast.success('Settings saved successfully!');
  };

  return (
    <>
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="mb-2 text-[#0D1B2A]">Platform Settings</h1>
        <p className="text-[#4A5568]">Configure system preferences and platform behavior</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Settings */}
        <div className="lg:col-span-2 space-y-6">
          {/* User Management */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <Settings className="text-[#3498DB]" size={24} />
              <h3 className="text-[#0D1B2A]">User Management</h3>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-[#1A202C]">Auto-Approve Users</p>
                  <p className="text-sm text-[#4A5568]">Automatically approve new user registrations</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.autoApproval}
                    onChange={(e) => setSettings({ ...settings, autoApproval: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#2EC4B6]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#2EC4B6]"></div>
                </label>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg">
                <label className="block font-medium text-[#1A202C] mb-2">Session Timeout (minutes)</label>
                <input
                  type="number"
                  value={settings.sessionTimeout}
                  onChange={(e) => setSettings({ ...settings, sessionTimeout: parseInt(e.target.value) })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-[#2EC4B6] focus:ring-2 focus:ring-[#2EC4B6]/20"
                />
              </div>
            </div>
          </div>

          {/* Agent Management */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <Settings className="text-[#3498DB]" size={24} />
              <h3 className="text-[#0D1B2A]">Agent Management</h3>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <label className="block font-medium text-[#1A202C] mb-2">Agent Assignment</label>
                <select
                  value={settings.agentAssignment}
                  onChange={(e) => setSettings({ ...settings, agentAssignment: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-[#2EC4B6] focus:ring-2 focus:ring-[#2EC4B6]/20"
                >
                  <option value="manual">Manual Assignment</option>
                  <option value="auto">Automatic Assignment</option>
                  <option value="round-robin">Round Robin</option>
                </select>
                <p className="text-sm text-[#4A5568] mt-2">How service requests are assigned to agents</p>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg">
                <label className="block font-medium text-[#1A202C] mb-2">Max Projects Per Agent</label>
                <input
                  type="number"
                  value={settings.maxProjectsPerAgent}
                  onChange={(e) => setSettings({ ...settings, maxProjectsPerAgent: parseInt(e.target.value) })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-[#2EC4B6] focus:ring-2 focus:ring-[#2EC4B6]/20"
                />
              </div>
            </div>
          </div>

          {/* Notifications */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <Settings className="text-[#3498DB]" size={24} />
              <h3 className="text-[#0D1B2A]">Notification Settings</h3>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-[#1A202C]">Email Notifications</p>
                  <p className="text-sm text-[#4A5568]">Send email notifications for system events</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.emailNotifications}
                    onChange={(e) => setSettings({ ...settings, emailNotifications: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#2EC4B6]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#2EC4B6]"></div>
                </label>
              </div>
            </div>
          </div>

          {/* System */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <Settings className="text-[#3498DB]" size={24} />
              <h3 className="text-[#0D1B2A]">System Settings</h3>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-[#1A202C]">Maintenance Mode</p>
                  <p className="text-sm text-[#4A5568]">Disable platform access for maintenance</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.maintenanceMode}
                    onChange={(e) => setSettings({ ...settings, maintenanceMode: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#E74C3C]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#E74C3C]"></div>
                </label>
              </div>

              {settings.maintenanceMode && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <p className="text-sm text-red-800 font-medium">⚠️ Maintenance mode is enabled</p>
                  <p className="text-xs text-red-600 mt-1">Only administrators can access the platform</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
          {/* Platform Status */}
          <div className="bg-gradient-to-br from-[#2EC4B6] to-[#26a599] rounded-xl p-6 text-white shadow-lg">
            <h4 className="text-white mb-4">Platform Status</h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-white/90">Server Status</span>
                <span className="font-semibold">Online</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-white/90">Database</span>
                <span className="font-semibold">Connected</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-white/90">Last Backup</span>
                <span className="font-semibold">2h ago</span>
              </div>
              <div className="flex justify-between items-center pt-3 border-t border-white/20">
                <span className="text-sm text-white/90">Uptime</span>
                <span className="font-semibold">99.9%</span>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <h4 className="text-[#0D1B2A] mb-4">Quick Stats</h4>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-[#4A5568]">Total Users</span>
                <span className="font-semibold text-[#1A202C]">156</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-[#4A5568]">Active Agents</span>
                <span className="font-semibold text-[#1A202C]">12</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-[#4A5568]">Active Clients</span>
                <span className="font-semibold text-[#1A202C]">144</span>
              </div>
              <div className="flex justify-between pt-3 border-t border-gray-200">
                <span className="text-sm text-[#4A5568]">Storage Used</span>
                <span className="font-semibold text-[#1A202C]">2.4 GB</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="mt-6">
        <button
          onClick={handleSave}
          className="w-full md:w-auto bg-[#2EC4B6] hover:bg-[#26a599] text-white px-8 py-3 rounded-lg transition-all font-medium h-[48px]"
        >
          Save Settings
        </button>
      </div>
    </>
  );
}