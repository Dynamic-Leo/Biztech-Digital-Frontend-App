import { useState, useEffect } from 'react';
import { Edit2, Save, X as Mail, Building, User as UserIcon, Shield, Loader2 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { ProfileFormData } from '../types';
import api from '../lib/api';
import { toast } from 'sonner';


export function MyProfile() {
 
  const { user, updateUser } = useAuth(); // Get logout
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState<ProfileFormData>({
    fullName: '',
    email: '',
    phone: '',
    companyName: '',
    industry: '',
    companySize: '',
    address: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const initialData = {
          fullName: user?.name || '',
          email: user?.email || '',
          phone: user?.phone || '',
          companyName: user?.company || '',
          industry: '',
          companySize: '',
          address: '',
          websiteUrl: ''
        };

        const response = await api.get('/clients/me');
        const clientData = response.data;

        setFormData({
          ...initialData,
          companyName: clientData.companyName || initialData.companyName,
          industry: clientData.industry || '',
          address: clientData.websiteUrl || '', 
        });

      } catch (error) {
        console.error("Failed to fetch profile:", error);
        if (user) {
          setFormData(prev => ({
            ...prev,
            fullName: user.name,
            email: user.email,
            companyName: user.company || ''
          }));
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user]);

  const handleSave = async () => {
    try {
      await api.put('/clients/me', {
        industry: formData.industry,
        websiteUrl: formData.address 
      });

      updateUser({
        name: formData.fullName,
        phone: formData.phone,
        company: formData.companyName
      });

      toast.success("Profile updated successfully!");
      setIsEditing(false);
    } catch (error) {
      console.error("Update failed", error);
      toast.error("Failed to update profile. Some fields may not be editable.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F5F7FA] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-[#2EC4B6] animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F7FA]">
   

      {/* Profile Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8 ">
        {/* Page Header */}
        <div className="flex md:flex-row flex-col justify-between items-start mb-8">
          <div>
            <h1 className="mb-2 text-[#0D1B2A]">My Profile</h1>
            <p className="text-[#4A5568]">Manage your account information and preferences</p>
          </div>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="flex items-center md:mt-0 mt-5 gap-2 px-6 py-2.5 rounded-lg font-medium transition-all h-[44px] border-2 border-gray-200 text-[#1A202C] hover:border-[#2EC4B6] hover:bg-[#F0FDFA]"
          >
            <Edit2 size={18} />
            {isEditing ? 'Cancel Edit' : 'Edit Profile'}
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
              <div className="text-center mb-6">
                <div className="w-24 h-24 bg-gradient-to-br from-[#2EC4B6] to-[#26a599] rounded-full mx-auto mb-4 flex items-center justify-center text-white text-3xl font-semibold uppercase">
                  {formData.fullName.charAt(0) || 'U'}
                </div>
                <h3 className="text-[#0D1B2A] mb-1">{formData.fullName}</h3>
                <p className="text-sm text-[#4A5568]">{formData.companyName}</p>
              </div>

              <div className="space-y-4 pt-4 border-t border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#2EC4B6]/10 rounded-lg flex items-center justify-center">
                    <Mail className="text-[#2EC4B6]" size={18} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-[#4A5568]">Email</p>
                    <p className="text-sm font-medium text-[#1A202C] truncate" title={formData.email}>{formData.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#3498DB]/10 rounded-lg flex items-center justify-center">
                    <Building className="text-[#3498DB]" size={18} />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-[#4A5568]">Industry</p>
                    <p className="text-sm font-medium text-[#1A202C]">{formData.industry || 'Not set'}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#F39C12]/10 rounded-lg flex items-center justify-center">
                    <UserIcon className="text-[#F39C12]" size={18} />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-[#4A5568]">Role</p>
                    <p className="text-sm font-medium text-[#1A202C]">Admin / Owner</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Account Stats */}
            <div className="bg-gradient-to-br from-[#0D1B2A] to-[#1a2d42] rounded-xl p-6 text-white shadow-lg mt-6">
              <h4 className="text-white mb-4">Account Stats</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-300">Member Since</span>
                  <span className="font-semibold">
                    {new Date().getFullYear()}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Information */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
              <h3 className="text-[#0D1B2A] mb-6">Personal Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-[#1A202C] mb-2">Full Name</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-[#2EC4B6]"
                    />
                  ) : (
                    <p className="text-[#4A5568] bg-gray-50 px-4 py-2.5 rounded-lg">{formData.fullName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#1A202C] mb-2">Email Address</label>
                  {isEditing ? (
                    <input
                      type="email"
                      value={formData.email}
                      disabled
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-gray-100 text-gray-500 cursor-not-allowed"
                      title="Email cannot be changed directly"
                    />
                  ) : (
                    <p className="text-[#4A5568] bg-gray-50 px-4 py-2.5 rounded-lg">{formData.email}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#1A202C] mb-2">Phone Number</label>
                  {isEditing ? (
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-[#2EC4B6]"
                    />
                  ) : (
                    <p className="text-[#4A5568] bg-gray-50 px-4 py-2.5 rounded-lg">{formData.phone || 'N/A'}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#1A202C] mb-2">Industry</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={formData.industry}
                      onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-[#2EC4B6]"
                    />
                  ) : (
                    <p className="text-[#4A5568] bg-gray-50 px-4 py-2.5 rounded-lg">{formData.industry || 'N/A'}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Business Information */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
              <h3 className="text-[#0D1B2A] mb-6">Business Information</h3>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-[#1A202C] mb-2">Company Name</label>
                  <p className="text-[#4A5568] bg-gray-50 px-4 py-2.5 rounded-lg">{formData.companyName}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#1A202C] mb-2">Website / Address</label>
                  {isEditing ? (
                    <textarea
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      rows={2}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-[#2EC4B6]"
                    />
                  ) : (
                    <p className="text-[#4A5568] bg-gray-50 px-4 py-2.5 rounded-lg">{formData.address || 'N/A'}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Security Settings */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <Shield className="text-[#2EC4B6]" size={24} />
                <h3 className="text-[#0D1B2A]">Security Settings</h3>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[#1A202C] mb-2">Change Password</label>
                  <input
                    type="password"
                    placeholder="Current password"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-[#2EC4B6] mb-3"
                    disabled={!isEditing}
                  />
                  <input
                    type="password"
                    placeholder="New password"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-[#2EC4B6]"
                    disabled={!isEditing}
                  />
                </div>

                <button 
                  className="w-full bg-gray-100 text-gray-500 py-3 rounded-lg font-medium mt-4 cursor-not-allowed"
                  disabled
                >
                  Update Password (Contact Admin)
                </button>
              </div>
            </div>

            {/* Save Changes */}
            {isEditing && (
              <div className="flex gap-4">
                <button
                  onClick={handleSave}
                  className="flex-1 bg-[#2EC4B6] hover:bg-[#26a599] text-white py-3 rounded-lg transition-all font-medium h-[48px] flex items-center justify-center gap-2"
                >
                  <Save size={18} />
                  Save Changes
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="flex-1 bg-white border-2 border-gray-300 text-[#1A202C] py-3 rounded-lg hover:bg-gray-50 transition-all font-medium h-[48px]"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}