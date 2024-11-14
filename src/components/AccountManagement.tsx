import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  User,
  Mail,
  Lock,
  Trash2,
  AlertCircle,
  Loader,
  Save
} from 'lucide-react';
import { supabase } from '../services/supabase';

export const AccountManagement: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userData, setUserData] = useState({
    email: '',
    fullName: '',
    avatar_url: null as string | null
  });
  const [newPassword, setNewPassword] = useState('');
  const [confirmDelete, setConfirmDelete] = useState(false);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError) throw userError;
      if (!user) throw new Error('No user found');

      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (profileError) throw profileError;

      setUserData({
        email: user.email || '',
        fullName: profile.full_name || '',
        avatar_url: profile.avatar_url
      });
    } catch (err) {
      console.error('Error fetching user data:', err);
      setError(err instanceof Error ? err.message : 'Failed to load user data');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProfile = async () => {
    try {
      setSaving(true);
      setError(null);

      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError) throw userError;
      if (!user) throw new Error('No user found');

      const updates = {
        id: user.id,
        full_name: userData.fullName,
        updated_at: new Date().toISOString()
      };

      const { error: updateError } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', user.id);

      if (updateError) throw updateError;

      if (newPassword) {
        const { error: passwordError } = await supabase.auth.updateUser({
          password: newPassword
        });

        if (passwordError) throw passwordError;
      }

      // Refresh the data
      await fetchUserData();
    } catch (err) {
      console.error('Error updating profile:', err);
      setError(err instanceof Error ? err.message : 'Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (!confirmDelete) {
      setConfirmDelete(true);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const { error } = await supabase.auth.admin.deleteUser(
        (await supabase.auth.getUser()).data.user?.id || ''
      );

      if (error) throw error;

      await supabase.auth.signOut();
      navigate('/');
    } catch (err) {
      console.error('Error deleting account:', err);
      setError(err instanceof Error ? err.message : 'Failed to delete account');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader className="w-8 h-8 animate-spin text-brown-600" />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg shadow-lg p-6"
      >
        <h2 className="text-2xl font-display text-brown-800 mb-6">Account Settings</h2>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-600">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <p>{error}</p>
          </div>
        )}

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-brown-700 mb-1">
              Email Address
            </label>
            <div className="flex items-center gap-2 p-3 bg-brown-50 rounded-lg">
              <Mail className="w-5 h-5 text-brown-400" />
              <span className="text-brown-800">{userData.email}</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-brown-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              value={userData.fullName}
              onChange={(e) => setUserData(prev => ({ ...prev, fullName: e.target.value }))}
              className="w-full p-3 rounded-lg border border-brown-200 focus:ring-2 focus:ring-brown-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-brown-700 mb-1">
              New Password
            </label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Leave blank to keep current password"
              className="w-full p-3 rounded-lg border border-brown-200 focus:ring-2 focus:ring-brown-400"
            />
          </div>

          <div className="pt-6 border-t border-brown-200">
            <button
              onClick={handleUpdateProfile}
              disabled={saving}
              className="w-full py-3 bg-brown-600 text-cream rounded-lg hover:bg-brown-700 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {saving ? (
                <>
                  <Loader className="w-5 h-5 animate-spin" />
                  Saving Changes...
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  Save Changes
                </>
              )}
            </button>
          </div>

          <div className="pt-6 border-t border-brown-200">
            <button
              onClick={handleDeleteAccount}
              disabled={loading}
              className="w-full py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            >
              <Trash2 className="w-5 h-5" />
              {confirmDelete ? 'Click again to confirm deletion' : 'Delete Account'}
            </button>
            {confirmDelete && (
              <p className="mt-2 text-sm text-red-600 text-center">
                This action cannot be undone. All your data will be permanently deleted.
              </p>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};