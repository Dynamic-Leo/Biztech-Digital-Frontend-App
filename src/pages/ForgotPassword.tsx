import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle, Mail } from 'lucide-react';
import logoImage from '../assets/logo.png';
import api from '../services/api';
import { toast } from 'sonner';


export function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const validateEmail = (email: string) => {
    if (!email.trim()) {
      setError('Email is required');
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address');
      return false;
    }
    setError('');
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await api.post('/auth/forgot-password', { email });

      toast.success(response.message || 'Password reset email sent');
      setIsSubmitted(true);

      // Optional redirect after delay
      setTimeout(() => {
        navigate('/login');
      }, 3000);

    } catch (err: any) {
      const message =
        err?.message || 'Failed to send reset email. Please try again.';
      setError(message);
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };


  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#F5F7FA] to-[#E2E8F0] flex flex-col items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="mb-8 text-center">
            <div className="flex items-center justify-center gap-2 mb-6">
              <img src={logoImage} alt="BizTech" className="w-auto h-20" />
            </div>
          </div>

          {/* Success Card */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 sm:p-8 text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-[#2ECC71]/10 to-[#27ae60]/10 rounded-full flex items-center justify-center mx-auto mb-4 shadow-inner">
              <CheckCircle className="text-[#2ECC71]" size={32} />
            </div>
            
            <h2 className="mb-2 text-[#1A202C]">Check Your Email</h2>
            <p className="text-[#4A5568] mb-6">
              We've sent password reset instructions to
            </p>
            <div className="bg-gray-50 rounded-lg p-3 mb-6 inline-flex items-center gap-2">
              <Mail size={16} className="text-[#2EC4B6]" />
              <span className="text-sm text-[#1A202C]">{email}</span>
            </div>

            <div className="bg-gradient-to-r from-[#FFF5F5] to-[#FEE] border border-[#FED7D7] rounded-lg p-4 mb-6">
              <p className="text-sm text-[#742A2A]">
                <span className="font-medium">Didn't receive the email?</span>
                <br />
                Check your spam folder or request a new link below.
              </p>
            </div>

            <button
              onClick={() => navigate('/login')}
              className="w-full bg-gradient-to-r from-[#0D1B2A] to-[#1a2d42] hover:from-[#1a2d42] hover:to-[#0D1B2A] text-white py-3 rounded-lg transition-all shadow-md hover:shadow-lg mb-3 transform hover:scale-[1.02] active:scale-[0.98]"
            >
              Back to Sign In
            </button>

            <button
              onClick={() => setIsSubmitted(false)}
              className="w-full text-[#2EC4B6] hover:text-[#26a599] text-sm transition-colors py-2"
            >
              Resend Email
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5F7FA] to-[#E2E8F0] flex flex-col items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        {/* Logo and Header */}
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-6">
            <img src={logoImage} alt="BizTech" className="h-8 sm:h-10" />
          </div>
          
          <h1 className="mb-2 text-[#1A202C]">Reset Password</h1>
          <p className="text-[#4A5568] text-sm sm:text-base">Enter your email to receive reset instructions</p>
        </div>

        {/* Reset Password Card */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 sm:p-8">
          <button
            onClick={() => navigate('/login')}
            className="flex items-center gap-2 text-[#2EC4B6] hover:text-[#26a599] text-sm mb-6 transition-colors group hover:cursor-pointer"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Back to Sign In
          </button>

          <div className="mb-6">
            <h2 className="mb-1 text-[#1A202C]">Forgot Password?</h2>
            <p className="text-sm text-[#4A5568]">
              No worries, we'll send you reset instructions
            </p>
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
                  if (error) setError('');
                }}
                placeholder="you@company.com"
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all text-[#1A202C] placeholder:text-gray-400 ${
                  error
                    ? 'border-[#E74C3C] focus:ring-[#E74C3C]/20'
                    : 'border-gray-300 focus:border-[#2EC4B6] focus:ring-[#2EC4B6]/20'
                }`}
              />
              {error && (
                <p className="mt-1.5 text-xs text-[#E74C3C]">{error}</p>
              )}
              <p className="mt-2 text-xs text-[#718096]">
                We'll send you a secure link to reset your password
              </p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="hover:cursor-pointer w-full bg-gradient-to-r from-[#0D1B2A] to-[#1a2d42] hover:from-[#1a2d42] hover:to-[#0D1B2A] text-white py-3 rounded-lg transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98]"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Sending...
                </span>
              ) : (
                'Send Reset Link'
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center gap-4">
            <div className="flex-1 h-px bg-gray-200"></div>
            <span className="text-xs text-gray-500">or</span>
            <div className="flex-1 h-px bg-gray-200"></div>
          </div>

          {/* Create Account Link */}
          <button
            onClick={() => navigate('/register')}
            className="hover:cursor-pointer w-full border-2 border-[#2EC4B6] text-[#2EC4B6] hover:bg-[#2EC4B6] hover:text-white py-3 rounded-lg transition-all transform hover:scale-[1.02] active:scale-[0.98]"
          >
            Create New Account
          </button>
        </div>
      </div>
    </div>
  );
}