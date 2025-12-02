import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, Shield, ArrowLeft, CheckCircle } from 'lucide-react';
import logoImage from 'figma:asset/8c308caf909810f493480578c4eab6aa4f6235bf.png';

export function PendingApproval() {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5F7FA] to-[#E2E8F0] flex items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-lg">
        {/* Logo */}
        <div className="mb-8 text-center">
          <button 
            onClick={() => navigate('/')}
            className="flex items-center justify-center gap-2 mb-6 mx-auto hover:opacity-80 transition-opacity"
          >
            <img src={logoImage} alt="BizTech" className="h-8 sm:h-10" />
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 sm:p-12 text-center">
          {/* Icon */}
          <div className="mb-6 flex justify-center">
            <div className="relative">
              <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-[#2EC4B6]/10 to-[#2EC4B6]/5 rounded-full flex items-center justify-center shadow-inner">
                <Shield className="w-10 h-10 sm:w-12 sm:h-12 text-[#2EC4B6]" />
              </div>
              <div className="absolute -bottom-2 -right-2 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-[#F39C12] to-[#e67e22] rounded-full flex items-center justify-center shadow-lg">
                <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
            </div>
          </div>
          
          <h2 className="mb-3 text-[#1A202C]">Account Under Review</h2>
          
          <p className="text-[#4A5568] mb-8 max-w-md mx-auto">
            Thank you for registering! Our admin team is currently reviewing your account to ensure quality and security.
          </p>
          
          {/* Status Timeline */}
          <div className="mb-8 space-y-4 max-w-sm mx-auto">
            <div className="flex items-start gap-3 text-left">
              <div className="flex-shrink-0 w-6 h-6 bg-[#2ECC71] rounded-full flex items-center justify-center mt-0.5">
                <CheckCircle size={14} className="text-white" />
              </div>
              <div>
                <p className="text-sm text-[#1A202C]">Registration Completed</p>
                <p className="text-xs text-[#718096]">Your details have been submitted</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 text-left">
              <div className="flex-shrink-0 w-6 h-6 bg-[#F39C12] rounded-full flex items-center justify-center mt-0.5 relative">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              </div>
              <div>
                <p className="text-sm text-[#1A202C]">Admin Review</p>
                <p className="text-xs text-[#718096]">Currently in progress</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 text-left">
              <div className="flex-shrink-0 w-6 h-6 border-2 border-gray-300 rounded-full mt-0.5"></div>
              <div>
                <p className="text-sm text-[#4A5568]">Email Confirmation</p>
                <p className="text-xs text-[#718096]">You'll receive notification</p>
              </div>
            </div>
          </div>

          {/* Info Box */}
          <div className="bg-gradient-to-r from-[#EBF8FF] to-[#E0F2FE] border border-[#BEE3F8] rounded-lg p-4 mb-6">
            <p className="text-sm text-[#2C5282]">
              <span className="font-medium">⏱️ Expected Timeline</span>
              <br />
              Most accounts are reviewed within 24-48 hours during business days.
            </p>
          </div>
          
          <div className="flex items-center justify-center gap-2 text-sm text-[#4A5568] mb-6">
            <div className="w-2 h-2 bg-[#F39C12] rounded-full animate-pulse"></div>
            <span>Pending admin approval</span>
          </div>

          <button
            onClick={() => navigate('/login')}
            className="inline-flex items-center gap-2 text-[#2EC4B6] hover:text-[#26a599] text-sm transition-colors group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Back to Sign In
          </button>
        </div>

        {/* Help Text */}
        <p className="mt-6 text-xs text-[#718096] text-center">
          Questions about your account?{' '}
          <button 
            onClick={() => alert('Contact Support - Email: services@biztech.ae | Phone: +971 50 328 8786')}
            className="text-[#2EC4B6] hover:underline"
          >
            Contact Support
          </button>
        </p>
      </div>
    </div>
  );
}