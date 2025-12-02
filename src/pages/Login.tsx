import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'sonner';
import logoImage from 'figma:asset/8c308caf909810f493480578c4eab6aa4f6235bf.png';

export function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {};

    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    
    try {
      // 1. Attempt login via API
      await login(email, password);
      
      toast.success('Login successful!');
      
      // 2. Retrieve user data to determine redirect path
      // We grab it from localStorage because state updates are async
      const storedUser = localStorage.getItem('user');
      const userData = storedUser ? JSON.parse(storedUser) : null;
      const role = userData?.role || 'client';

      // 3. Determine destination
      let destination = '/client-dashboard';
      if (role === 'admin') destination = '/admin/dashboard';
      else if (role === 'agent') destination = '/agent/dashboard';
      
      // 4. Handle "Redirect Back" logic or go to dashboard
      const from = location.state?.from?.pathname || destination;
      navigate(from);

    } catch (error: any) {
      // Handle specific backend errors
      const errorMessage = error.message || 'Invalid email or password';
      
      if (errorMessage.includes('Pending Approval')) {
        toast.warning('Account Under Review', {
          description: 'Your account is currently pending administrator approval.'
        });
      } else {
        toast.error(errorMessage);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5F7FA] to-[#E2E8F0] flex flex-col items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        {/* Logo and Header */}
        <div className="mb-8 text-center">
          <button 
            onClick={() => navigate('/')}
            className="flex items-center justify-center gap-2 mb-6 mx-auto hover:opacity-80 transition-opacity"
          >
            <img src={logoImage} alt="BizTech" className="h-8 sm:h-10" />
          </button>
          
          <h1 className="mb-2 text-[#1A202C]">Welcome Back</h1>
          <p className="text-[#4A5568] text-sm sm:text-base">Sign in to access your business hub</p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 sm:p-8">
          <div className="mb-6">
            <h2 className="mb-1 text-[#1A202C]">Sign In</h2>
            <p className="text-sm text-[#4A5568]">Enter your credentials to continue</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm text-[#1A202C] mb-2">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) setErrors({ ...errors, email: undefined });
                }}
                placeholder="you@company.com"
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all text-[#1A202C] placeholder:text-gray-400 ${
                  errors.email
                    ? 'border-[#E74C3C] focus:ring-[#E74C3C]/20'
                    : 'border-gray-300 focus:border-[#2EC4B6] focus:ring-[#2EC4B6]/20'
                }`}
              />
              {errors.email && (
                <p className="mt-1.5 text-xs text-[#E74C3C]">{errors.email}</p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label htmlFor="password" className="block text-sm text-[#1A202C]">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => navigate('/forgot-password')}
                  className="text-xs text-[#2EC4B6] hover:text-[#26a599] transition-colors"
                >
                  Forgot?
                </button>
              </div>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errors.password) setErrors({ ...errors, password: undefined });
                  }}
                  placeholder="Enter your password"
                  className={`w-full px-4 py-3 pr-12 border rounded-lg focus:outline-none focus:ring-2 transition-all text-[#1A202C] placeholder:text-gray-400 ${
                    errors.password
                      ? 'border-[#E74C3C] focus:ring-[#E74C3C]/20'
                      : 'border-gray-300 focus:border-[#2EC4B6] focus:ring-[#2EC4B6]/20'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors p-1"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1.5 text-xs text-[#E74C3C]">{errors.password}</p>
              )}
            </div>

            {/* Sign In Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-[#0D1B2A] to-[#1a2d42] hover:from-[#1a2d42] hover:to-[#0D1B2A] text-white py-3 rounded-lg transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98]"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Signing in...
                </span>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center gap-4">
            <div className="flex-1 h-px bg-gray-200"></div>
            <span className="text-xs text-gray-500">New to BizSetup?</span>
            <div className="flex-1 h-px bg-gray-200"></div>
          </div>

          {/* Sign Up Link */}
          <button
            onClick={() => navigate('/register')}
            className="w-full border-2 border-[#2EC4B6] text-[#2EC4B6] hover:bg-[#2EC4B6] hover:text-white py-3 rounded-lg transition-all transform hover:scale-[1.02] active:scale-[0.98]"
          >
            Create an Account
          </button>
        </div>

        {/* Footer Note */}
        <p className="mt-6 text-xs text-[#718096] text-center">
          By signing in, you agree to our{' '}
          <button 
            onClick={() => alert('Terms of Service - Coming Soon')}
            className="text-[#2EC4B6] hover:underline"
          >
            Terms of Service
          </button>
          {' '}and{' '}
          <button 
            onClick={() => alert('Privacy Policy - Coming Soon')}
            className="text-[#2EC4B6] hover:underline"
          >
            Privacy Policy
          </button>
        </p>
      </div>
    </div>
  );
}