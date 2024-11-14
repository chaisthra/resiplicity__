import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ChefHat, Loader, ArrowLeft, AlertCircle, Info, Mail } from 'lucide-react';
import { signInWithEmail, signInWithGoogle } from '../services/supabase';

interface LoginScreenProps {
  onLogin: () => void;
  onRegister: () => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin, onRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      if (!email.trim() || !password.trim()) {
        throw new Error('Please enter both email and password');
      }

      const { error: signInError } = await signInWithEmail(email, password);
      
      if (signInError) {
        if (signInError.message.includes('Invalid login credentials')) {
          throw new Error('Invalid email or password');
        }
        throw signInError;
      }

      onLogin();
      navigate('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to sign in');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setError(null);
      const { error } = await signInWithGoogle();
      if (error) throw error;
      
      onLogin();
      navigate('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to sign in with Google');
    }
  };

  const setDemoCredentials = () => {
    setEmail('demouser@gmail.com');
    setPassword('demo@123');
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
            Resiplicity
          </motion.h1>
          <motion.p
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-cream/90 text-lg drop-shadow-md"
          >
            Your culinary journey begins here
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

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mb-4 p-3 rounded-lg bg-brown-600/20 border border-brown-500/20 text-cream/90 flex items-start gap-2"
          >
            <Info className="w-4 h-4 flex-shrink-0 mt-0.5" />
            <div className="text-sm">
              <p className="mb-1">Try our demo account:</p>
              <p><strong>Email:</strong> demouser@gmail.com</p>
              <p><strong>Password:</strong> demo@123</p>
              <button
                onClick={setDemoCredentials}
                className="mt-2 text-cream/80 hover:text-cream underline underline-offset-2"
              >
                Click to autofill demo credentials
              </button>
            </div>
          </motion.div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-cream mb-1 drop-shadow-md">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-white/20 focus:ring-2 focus:ring-brown-400 focus:border-transparent transition-all bg-white/20 text-cream placeholder-cream/50"
                placeholder="Enter your email"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-cream mb-1 drop-shadow-md">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-white/20 focus:ring-2 focus:ring-brown-400 focus:border-transparent transition-all bg-white/20 text-cream placeholder-cream/50"
                placeholder="Enter your password"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-lg font-medium bg-brown-600 hover:bg-brown-700 text-cream shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <Loader className="w-5 h-5 animate-spin mx-auto" />
              ) : (
                'Login'
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
              onClick={handleGoogleSignIn}
              className="w-full py-3 px-4 rounded-lg font-medium bg-white text-gray-800 shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
            >
              <img
                src="https://www.google.com/favicon.ico"
                alt="Google"
                className="w-5 h-5"
              />
              Sign in with Google
            </button>

            <button
              type="button"
              onClick={() => navigate('/register')}
              className="w-full py-3 px-4 rounded-lg font-medium bg-white/90 hover:bg-white text-gray-800 shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
            >
              Create New Account
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};