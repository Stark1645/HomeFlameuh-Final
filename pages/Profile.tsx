
import React, { useState } from 'react';
import { User } from '../types';
import { mockApi } from '../services/mockApi';

interface ProfileProps {
  user: User;
  onUpdate: (updatedUser: User) => void;
}

const Profile: React.FC<ProfileProps> = ({ user, onUpdate }) => {
  const [formData, setFormData] = useState({ ...user });
  const [isUpdating, setIsUpdating] = useState(false);
  const [passwordForm, setPasswordForm] = useState({ current: '', next: '' });

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);
    try {
      const res = await mockApi.users.updateProfile(user.id, formData);
      onUpdate(res.data);
      alert("Profile updated successfully!");
    } catch (err) {
      alert("Update failed.");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    alert("Password updated! (Simulated)");
    setPasswordForm({ current: '', next: '' });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-extrabold text-slate-900 mb-10">Account Settings</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-8">
          <section className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
            <h2 className="text-xl font-bold mb-6">Personal Information</h2>
            <form onSubmit={handleUpdate} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Full Name</label>
                  <input 
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2"
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Phone Number</label>
                  <input 
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2"
                    value={formData.phone || ''}
                    onChange={e => setFormData({...formData, phone: e.target.value})}
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Delivery Address</label>
                <textarea 
                  rows={3}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2"
                  value={formData.address || ''}
                  onChange={e => setFormData({...formData, address: e.target.value})}
                />
              </div>
              <button 
                type="submit" 
                disabled={isUpdating}
                className="bg-orange-600 text-white px-8 py-3 rounded-xl font-bold shadow-lg hover:bg-orange-700 disabled:opacity-50"
              >
                {isUpdating ? 'Saving...' : 'Save Changes'}
              </button>
            </form>
          </section>

          <section className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
            <h2 className="text-xl font-bold mb-6">Security</h2>
            <form onSubmit={handleChangePassword} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Current Password</label>
                <input 
                  type="password"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2"
                  value={passwordForm.current}
                  onChange={e => setPasswordForm({...passwordForm, current: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1">New Password</label>
                <input 
                  type="password"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2"
                  value={passwordForm.next}
                  onChange={e => setPasswordForm({...passwordForm, next: e.target.value})}
                />
              </div>
              <button 
                type="submit"
                className="bg-slate-900 text-white px-8 py-3 rounded-xl font-bold shadow-lg hover:bg-slate-800"
              >
                Change Password
              </button>
            </form>
          </section>
        </div>

        <div>
          <div className="bg-slate-900 text-white p-8 rounded-3xl sticky top-24">
             <div className="text-center mb-6">
                <div className="w-24 h-24 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl font-extrabold">
                  {user.name.charAt(0)}
                </div>
                <h3 className="text-xl font-bold">{user.name}</h3>
                <p className="text-slate-400 text-sm">{user.email}</p>
             </div>
             <div className="pt-6 border-t border-slate-800 space-y-4">
               <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-500">Member Since</span>
                  <span className="font-bold">Jan 2025</span>
               </div>
               <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-500">Account Type</span>
                  <span className="font-bold capitalize">{user.role}</span>
               </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
