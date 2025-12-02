import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'sonner';
import logoImage from 'figma:asset/8c308caf909810f493480578c4eab6aa4f6235bf.png';

export function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();
  
  const [formData, setFormData] = useState({
    fullName: '',
    companyName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '' 
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});

  // 1. Centralized Rules for Consistency
  const passwordRules = {
    length: (pw: string) => pw.length >= 8,
    number: (pw: string) => /\d/.test(pw),
    uppercase: (pw: string) => /[A-Z]/.test(pw),
  };

  const passwordRequirements = [
    { label: 'At least 8 characters', test: passwordRules.length },
    { label: 'Contains a number', test: passwordRules.number },
    { label: 'Contains uppercase', test: passwordRules.uppercase },
  ];

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // 2. Updated Password Validation to enforce all rules
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else {
      if (!passwordRules.length(formData.password)) {
        newErrors.password = 'Password must be at least 8 characters';
      } else if (!passwordRules.number(formData.password)) {
        newErrors.password = 'Password must contain at least one number';
      } else if (!passwordRules.uppercase(formData.password)) {
        newErrors.password = 'Password must contain at least one uppercase letter';
      }
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      // If validation fails, mark all fields as touched to show errors
      setTouched({
        fullName: true,
        email: true,
        password: true,
        confirmPassword: true,
        companyName: true,
        phone: true
      });
      toast.error("Please fix the errors in the form.");
      return;
    }

    setIsLoading(true);
    
    try {
      await register(formData);
      toast.success("Account created successfully! Please wait for admin approval.");
      navigate('/pending-approval');
    } catch (error: any) {
      toast.error(error.message || "Failed to create account. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear specific field error when user types
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleBlur = (field: string) => {
    setTouched(prev => ({ ...prev, [field]: true }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5F7FA] to-[#E2E8F0] flex flex-col items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
      <div className="w-full max-w-2xl">
        <div className="mb-8 text-center">
          <button 
            onClick={() => navigate('/')}
            className="flex items-center justify-center gap-2 mb-6 mx-auto hover:opacity-80 transition-opacity"
          >
            <img src={logoImage} alt="BizTech" className="h-8 sm:h-10" />
          </button>
          
          <h1 className="mb-2 text-[#1A202C]">Create Your Account</h1>
          <p className="text-[#4A5568] text-sm sm:text-base">Join BizSetup to streamline your business setup</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 sm:p-8">
          <div className="mb-6">
            <h2 className="mb-1 text-[#1A202C]">Client Registration</h2>
            <p className="text-sm text-[#4A5568]">
              Fill in your details below. Your account will require admin approval.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label htmlFor="fullName" className="block text-sm text-[#1A202C] mb-2">
                  Full Name <span className="text-[#E74C3C]">*</span>
                </label>
                <input
                  id="fullName"
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => handleChange('fullName', e.target.value)}
                  onBlur={() => handleBlur('fullName')}
                  placeholder="John Doe"
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all text-[#1A202C] placeholder:text-gray-400 ${
                    errors.fullName && touched.fullName
                      ? 'border-[#E74C3C] focus:ring-[#E74C3C]/20'
                      : 'border-gray-300 focus:border-[#2EC4B6] focus:ring-[#2EC4B6]/20'
                  }`}
                />
                {errors.fullName && touched.fullName && (
                  <p className="mt-1.5 text-xs text-[#E74C3C] flex items-center gap-1">
                    <AlertCircle size={12} />
                    {errors.fullName}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="companyName" className="block text-sm text-[#1A202C] mb-2">
                  Company Name <span className="text-[#718096] text-xs">(Optional)</span>
                </label>
                <input
                  id="companyName"
                  type="text"
                  value={formData.companyName}
                  onChange={(e) => handleChange('companyName', e.target.value)}
                  placeholder="Your Company LLC"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#2EC4B6] focus:ring-2 focus:ring-[#2EC4B6]/20 transition-all text-[#1A202C] placeholder:text-gray-400"
                />
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm text-[#1A202C] mb-2">
                Email Address <span className="text-[#E74C3C]">*</span>
              </label>
              <input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                onBlur={() => handleBlur('email')}
                placeholder="you@company.com"
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all text-[#1A202C] placeholder:text-gray-400 ${
                  errors.email && touched.email
                    ? 'border-[#E74C3C] focus:ring-[#E74C3C]/20'
                    : 'border-gray-300 focus:border-[#2EC4B6] focus:ring-[#2EC4B6]/20'
                }`}
              />
              {errors.email && touched.email && (
                <p className="mt-1.5 text-xs text-[#E74C3C] flex items-center gap-1">
                  <AlertCircle size={12} />
                  {errors.email}
                </p>
              )}
            </div>

            {/* Phone Field */}
            <div>
              <label htmlFor="phone" className="block text-sm text-[#1A202C] mb-2">
                Phone Number <span className="text-[#718096] text-xs">(Optional)</span>
              </label>
              <input
                id="phone"
                type="text"
                value={formData.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                placeholder="+971 50 000 0000"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#2EC4B6] focus:ring-2 focus:ring-[#2EC4B6]/20 transition-all text-[#1A202C] placeholder:text-gray-400"
              />
            </div>

            {/* Password Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label htmlFor="password" className="block text-sm text-[#1A202C] mb-2">
                  Password <span className="text-[#E74C3C]">*</span>
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => handleChange('password', e.target.value)}
                    onBlur={() => handleBlur('password')}
                    placeholder="Create password"
                    className={`w-full px-4 py-3 pr-12 border rounded-lg focus:outline-none focus:ring-2 transition-all text-[#1A202C] placeholder:text-gray-400 ${
                      errors.password && touched.password
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
                {errors.password && touched.password && (
                  <p className="mt-1.5 text-xs text-[#E74C3C] flex items-center gap-1">
                    <AlertCircle size={12} />
                    {errors.password}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm text-[#1A202C] mb-2">
                  Confirm Password <span className="text-[#E74C3C]">*</span>
                </label>
                <div className="relative">
                  <input
                    id="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={formData.confirmPassword}
                    onChange={(e) => handleChange('confirmPassword', e.target.value)}
                    onBlur={() => handleBlur('confirmPassword')}
                    placeholder="Confirm password"
                    className={`w-full px-4 py-3 pr-12 border rounded-lg focus:outline-none focus:ring-2 transition-all text-[#1A202C] placeholder:text-gray-400 ${
                      errors.confirmPassword && touched.confirmPassword
                        ? 'border-[#E74C3C] focus:ring-[#E74C3C]/20'
                        : 'border-gray-300 focus:border-[#2EC4B6] focus:ring-[#2EC4B6]/20'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors p-1"
                    aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                  >
                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                {errors.confirmPassword && touched.confirmPassword && (
                  <p className="mt-1.5 text-xs text-[#E74C3C] flex items-center gap-1">
                    <AlertCircle size={12} />
                    {errors.confirmPassword}
                  </p>
                )}
              </div>
            </div>

            {/* 3. Visual Password Strength Indicator */}
            {/* Display requirements if user has started typing or touched the field */}
            {(formData.password || touched.password) && (
              <div className="bg-gray-50 rounded-lg p-4 space-y-2 border border-gray-100">
                <p className="text-xs text-[#4A5568] mb-2 font-medium">Password requirements:</p>
                {passwordRequirements.map((req, index) => {
                  const isPassed = req.test(formData.password);
                  return (
                    <div key={index} className="flex items-center gap-2 transition-all duration-300">
                      {isPassed ? (
                        <CheckCircle2 size={14} className="text-[#2ECC71]" />
                      ) : (
                        <div className="w-3.5 h-3.5 border-2 border-gray-300 rounded-full" />
                      )}
                      <span className={`text-xs ${isPassed ? 'text-[#2ECC71] font-medium' : 'text-[#718096]'}`}>
                        {req.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}

            <div className="bg-gradient-to-r from-[#EBF8FF] to-[#E0F2FE] border border-[#BEE3F8] rounded-lg p-4">
              <div className="flex gap-3">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-[#3498DB]/10 rounded-full flex items-center justify-center">
                    <AlertCircle size={16} className="text-[#3498DB]" />
                  </div>
                </div>
                <div>
                  <p className="text-sm text-[#2C5282]">
                    <span className="font-medium">Admin Approval Required</span>
                    <br />
                    Your account will be reviewed by our team. You'll receive an email once approved (typically within 24-48 hours).
                  </p>
                </div>
              </div>
            </div>

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
                  Creating Account...
                </span>
              ) : (
                'Create Account'
              )}
            </button>
          </form>

          <div className="my-6 flex items-center gap-4">
            <div className="flex-1 h-px bg-gray-200"></div>
            <span className="text-xs text-gray-500">Already registered?</span>
            <div className="flex-1 h-px bg-gray-200"></div>
          </div>

          <button
            onClick={() => navigate('/login')}
            className="w-full border-2 border-[#2EC4B6] text-[#2EC4B6] hover:bg-[#2EC4B6] hover:text-white py-3 rounded-lg transition-all transform hover:scale-[1.02] active:scale-[0.98]"
          >
            Sign In Instead
          </button>
        </div>

        <p className="mt-6 text-xs text-[#718096] text-center">
          By creating an account, you agree to our{' '}
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