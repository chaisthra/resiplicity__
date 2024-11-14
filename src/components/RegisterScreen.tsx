import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  ChefHat, 
  Loader, 
  ArrowLeft, 
  AlertCircle, 
  Check, 
  Info,
  Mail,
  User,
  Lock
} from 'lucide-react';
import { signUp, signInWithGoogle } from '../services/supabase';

interface RegisterScreenProps {
  onRegister: () => void;
  onBackToLogin: () => void;
}

export const RegisterScreen: React.FC<RegisterScreenProps> = ({ onRegister, onBackToLogin }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    username: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const validatePassword = (password: string): string[] => {
    const issues: string[] = [];
    if (password.length < 8) {
      issues.push('Password must be at least 8 characters long');
    }
    if (!/[A-Z]/.test(password)) {
      issues.push('Include at least one uppercase letter');
    }
    if (!/[a-z]/.test(password)) {
      issues.push('Include at least one lowercase letter');
    }
    if (!/[0-9]/.test(password)) {
      issues.push('Include at least one number');
    }
    if (!/[!@#$%^&*]/.test(password)) {
      issues.push('Include at least one special character (!@#$%^&*)');
    }
    return issues;
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    
    const passwordIssues = validatePassword(formData.password);
    if (passwordIssues.length > 0) {
      newErrors.password = passwordIssues.join(', ');
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (Object.keys(newErrors).length > 0) {
      setError(Object.values(newErrors)[0]);
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    setError(null);

    try {
      const { error: signUpError } = await signUp(formData.email, formData.password, {
        full_name: formData.fullName,
        username: formData.username
      });

      if (signUpError) {
        throw signUpError;
      }

      onRegister();
      navigate('/dashboard');
    } catch (err) {
      console.error('Sign up error:', err);
      setError(err instanceof Error ? err.message : 'Failed to create account');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      setError(null);
      const { error } = await signInWithGoogle();
      if (error) throw error;
      
      onRegister();
      navigate('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to sign up with Google');
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4 overflow-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source
          src="https://cdn.pixabay.com/video/2023/06/29/169349-841069126_large.mp4"
          type="video/mp4"
        />
      </video>

      <div className="absolute inset-0 backdrop-blur-sm bg-brown-900/40" />

      <div className="w-full max-w-md relative z-10">
        <motion.button
          onClick={onBackToLogin}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="absolute left-0 top-0 -translate-y-16 text-cream flex items-center gap-2 hover:text-cream/80 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Login
        </motion.button>

        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", duration: 0.8 }}
          >
            <ChefHat className="w-16 h-16 mx-auto text-cream mb-4" />
          </motion.div>
          <motion.h1
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="font-display text-5xl text-cream mb-2 drop-shadow-lg"
          >
            Join Resiplicity
          </motion.h1>
          <motion.p
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-cream/90 text-lg drop-shadow-md"
          >
            Create your culinary profile
          </motion.p>
        </div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-white/20"
        >
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-200 flex items-center gap-2"
            >
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <p className="text-sm">{error}</p>
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-cream mb-1 drop-shadow-md">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-cream/50" />
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-white/20 focus:ring-2 focus:ring-brown-400 focus:border-transparent transition-all bg-white/20 text-cream placeholder-cream/50"
                  placeholder="John Doe"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-cream mb-1 drop-shadow-md">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-cream/50" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-white/20 focus:ring-2 focus:ring-brown-400 focus:border-transparent transition-all bg-white/20 text-cream placeholder-cream/50"
                  placeholder="john@example.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-cream mb-1 drop-shadow-md">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-cream/50" />
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-white/20 focus:ring-2 focus:ring-brown-400 focus:border-transparent transition-all bg-white/20 text-cream placeholder-cream/50"
                  placeholder="••••••••"
                  required
                />
              </div>
              <ul className="mt-2 space-y-1">
                {['8+ characters', 'Uppercase letter', 'Lowercase letter', 'Number', 'Special character'].map((req, index) => (
                  <li
                    key={index}
                    className={`flex items-center gap-1 text-xs ${
                      validatePassword(formData.password).length === 0
                        ? 'text-green-400'
                        : 'text-cream/70'
                    }`}
                  >
                    <Check className="w-3 h-3" />
                    {req}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <label className="block text-sm font-medium text-cream mb-1 drop-shadow-md">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-cream/50" />
                <input
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-white/20 focus:ring-2 focus:ring-brown-400 focus:border-transparent transition-all bg-white/20 text-cream placeholder-cream/50"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-lg font-medium bg-brown-600 hover:bg-brown-700 text-cream shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <Loader className="w-5 h-5 animate-spin mx-auto" />
              ) : (
                'Create Account'
              )}
            </button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/20"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 text-cream/70 bg-transparent">Or continue with</span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleGoogleSignUp}
              className="w-full py-3 px-4 rounded-lg font-medium bg-white text-gray-800 shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
            >
              <img
                src="https://www.google.com/favicon.ico"
                alt="Google"
                className="w-5 h-5"
              />
              Sign up with Google
            </button>

            <div className="text-center">
              <p className="text-sm text-cream/80">
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={onBackToLogin}
                  className="text-cream/90 hover:text-cream underline underline-offset-4 font-medium transition-colors"
                >
                  Sign in
                </button>
              </p>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};