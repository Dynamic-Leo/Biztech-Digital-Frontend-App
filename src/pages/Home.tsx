import { useNavigate } from 'react-router-dom';
import { ArrowRight,  Shield, Zap, Users, FileText, BarChart, Lock, Phone, Mail } from 'lucide-react';
import logoImage from 'figma:asset/8c308caf909810f493480578c4eab6aa4f6235bf.png';

export function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5F7FA] to-[#E2E8F0]">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-20">
            <button onClick={() => navigate('/')} className="flex items-center hover:opacity-80 transition-opacity">
              <img src={logoImage} alt="BizTech" className="h-8 sm:h-10" />
            </button>
            <div className="flex items-center gap-2 sm:gap-4">
              <button
                onClick={() => navigate('/login')}
                className="text-[#1A202C] hover:text-[#2EC4B6] transition-colors text-sm sm:text-base px-3 sm:px-4 py-2"
              >
                Sign In
              </button>
              <button
                onClick={() => navigate('/register')}
                className="bg-gradient-to-r from-[#2EC4B6] to-[#26a599] text-white px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg hover:shadow-lg transition-all text-sm sm:text-base"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-20 pb-16 sm:pb-24">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#2EC4B6]/10 to-[#2EC4B6]/5 border border-[#2EC4B6]/20 rounded-full px-4 sm:px-6 py-2 mb-6 sm:mb-8">
            <Zap size={16} className="text-[#2EC4B6]" />
            <span className="text-xs sm:text-sm text-[#1A202C]">Streamline Your Digital Services</span>
          </div>
          
          <h1 className="mb-4 sm:mb-6 text-[#0D1B2A] text-3xl sm:text-5xl lg:text-6xl font-bold">
            Agency Management Portal for <span className="text-[#2EC4B6]">Digital Services</span>
          </h1>
          
          <p className="text-base sm:text-lg lg:text-xl text-[#4A5568] mb-8 sm:mb-10 max-w-3xl mx-auto px-4">
            Replace traditional e-commerce with a consultative sales process. From needs assessment to project delivery, manage everything in one secure platform.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <button
              onClick={() => navigate('/register')}
              className="w-full sm:w-auto min-w-[160px] bg-gradient-to-r from-[#2EC4B6] to-[#26a599] text-white px-8 py-3 rounded-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 group h-[48px]"
            >
              Get Started
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => navigate('/login')}
              className="w-full sm:w-auto min-w-[160px] border-2 border-[#0D1B2A] text-[#0D1B2A] px-8 py-3 rounded-lg hover:bg-[#0D1B2A] hover:text-white transition-all h-[48px]"
            >
              Sign In
            </button>
          </div>
        </div>

        {/* Hero Image/Dashboard Preview */}
        <div className="mt-12 sm:mt-20 relative">
          <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 p-4 sm:p-6 mx-auto max-w-5xl">
            <div className="bg-gradient-to-b from-gray-100 via-gray-200 to-gray-300 rounded-xl p-4 sm:p-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 bg-[#FF5F56] rounded-full"></div>
                <div className="w-3 h-3 bg-[#FFBD2E] rounded-full"></div>
                <div className="w-3 h-3 bg-[#27C93F] rounded-full"></div>
              </div>
              
              <div className="bg-gradient-to-br from-[#1e293b] via-[#334155] to-[#475569] rounded-lg p-6 sm:p-8">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                  {/* Active Requests Card */}
                  <div className="bg-[#2d3b4e]/80 backdrop-blur-sm border border-white/10 rounded-xl p-5 sm:p-6">
                    <p className="text-sm text-[#2EC4B6] mb-3">Active Requests</p>
                    <p className="text-4xl sm:text-5xl text-white mb-2">24</p>
                    <p className="text-xs text-gray-400">↑ 12% from last week</p>
                  </div>
                  
                  {/* In Progress Card */}
                  <div className="bg-[#2d3b4e]/80 backdrop-blur-sm border border-white/10 rounded-xl p-5 sm:p-6">
                    <p className="text-sm text-[#2EC4B6] mb-3">In Progress</p>
                    <p className="text-4xl sm:text-5xl text-white mb-2">12</p>
                    <p className="text-xs text-gray-400">8 due this week</p>
                  </div>
                  
                  {/* Completed Card */}
                  <div className="bg-[#2d3b4e]/80 backdrop-blur-sm border border-white/10 rounded-xl p-5 sm:p-6">
                    <p className="text-sm text-[#2EC4B6] mb-3">Completed</p>
                    <p className="text-4xl sm:text-5xl text-white mb-2">156</p>
                    <p className="text-xs text-gray-400">98% satisfaction</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="mb-3 sm:mb-4 text-[#0D1B2A] text-2xl sm:text-3xl lg:text-4xl font-bold">Everything You Need</h2>
            <p className="text-base sm:text-lg text-[#4A5568] max-w-2xl mx-auto">
              Built specifically for digital service agencies managing web development, SEO, and marketing projects
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {/* Feature 1 */}
            <div className="bg-gradient-to-br from-[#F5F7FA] to-white p-6 sm:p-8 rounded-xl border border-gray-200 hover:shadow-lg transition-all group">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-[#2EC4B6]/10 to-[#2EC4B6]/5 rounded-lg flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform">
                <FileText className="text-[#2EC4B6]" size={24} />
              </div>
              <h3 className="mb-2 sm:mb-3 text-[#1A202C] text-lg sm:text-xl font-semibold">Needs Assessment</h3>
              <p className="text-sm sm:text-base text-[#4A5568]">
                Smart questionnaire engine replaces traditional carts with consultative discovery
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-gradient-to-br from-[#F5F7FA] to-white p-6 sm:p-8 rounded-xl border border-gray-200 hover:shadow-lg transition-all group">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-[#2EC4B6]/10 to-[#2EC4B6]/5 rounded-lg flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform">
                <Users className="text-[#2EC4B6]" size={24} />
              </div>
              <h3 className="mb-2 sm:mb-3 text-[#1A202C] text-lg sm:text-xl font-semibold">Role-Based Access</h3>
              <p className="text-sm sm:text-base text-[#4A5568]">
                Separate portals for Clients, Agents, and Admins with gated approval workflow
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-gradient-to-br from-[#F5F7FA] to-white p-6 sm:p-8 rounded-xl border border-gray-200 hover:shadow-lg transition-all group">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-[#2EC4B6]/10 to-[#2EC4B6]/5 rounded-lg flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform">
                <Lock className="text-[#2EC4B6]" size={24} />
              </div>
              <h3 className="mb-2 sm:mb-3 text-[#1A202C] text-lg sm:text-xl font-semibold">Technical Vault</h3>
              <p className="text-sm sm:text-base text-[#4A5568]">
                Secure credential sharing with masked inputs and encrypted storage
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-gradient-to-br from-[#F5F7FA] to-white p-6 sm:p-8 rounded-xl border border-gray-200 hover:shadow-lg transition-all group">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-[#2EC4B6]/10 to-[#2EC4B6]/5 rounded-lg flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform">
                <BarChart className="text-[#2EC4B6]" size={24} />
              </div>
              <h3 className="mb-2 sm:mb-3 text-[#1A202C] text-lg sm:text-xl font-semibold">Project Tracking</h3>
              <p className="text-sm sm:text-base text-[#4A5568]">
                Milestone-driven progress with real-time updates and file management
              </p>
            </div>

            {/* Feature 5 */}
            <div className="bg-gradient-to-br from-[#F5F7FA] to-white p-6 sm:p-8 rounded-xl border border-gray-200 hover:shadow-lg transition-all group">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-[#2EC4B6]/10 to-[#2EC4B6]/5 rounded-lg flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform">
                <Shield className="text-[#2EC4B6]" size={24} />
              </div>
              <h3 className="mb-2 sm:mb-3 text-[#1A202C] text-lg sm:text-xl font-semibold">Admin Controls</h3>
              <p className="text-sm sm:text-base text-[#4A5568]">
                Full user management, request triage, and quality assurance controls
              </p>
            </div>

            {/* Feature 6 */}
            <div className="bg-gradient-to-br from-[#F5F7FA] to-white p-6 sm:p-8 rounded-xl border border-gray-200 hover:shadow-lg transition-all group">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-[#2EC4B6]/10 to-[#2EC4B6]/5 rounded-lg flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform">
                <Zap className="text-[#2EC4B6]" size={24} />
              </div>
              <h3 className="mb-2 sm:mb-3 text-[#1A202C] text-lg sm:text-xl font-semibold">Proposal Builder</h3>
              <p className="text-sm sm:text-base text-[#4A5568]">
                Create detailed proposals with scope, pricing, and timeline management
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Workflow Section */}
      <section className="py-16 sm:py-24" data-workflow>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="mb-3 sm:mb-4 text-[#0D1B2A] text-2xl sm:text-3xl lg:text-4xl font-bold">Linear Workflow</h2>
            <p className="text-base sm:text-lg text-[#4A5568] max-w-2xl mx-auto">
              From initial contact to final delivery, every step is tracked and managed
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-0 lg:space-x-0">
            {/* Step 1 */}
            <div className="relative flex items-center">
              <div className="bg-white rounded-2xl p-6 border-2 border-[#2EC4B6] shadow-lg flex-1 flex flex-col">
                <div className="w-12 h-12 bg-[#2EC4B6] text-white rounded-full flex items-center justify-center mb-4 font-semibold text-lg">
                  1
                </div>
                <h3 className="mb-2 text-[#1A202C] text-lg font-semibold">Request</h3>
                <p className="text-sm text-[#4A5568] flex-1">Client submits needs via assessment</p>
              </div>
              {/* Connector */}
              <div className="hidden lg:flex absolute left-full top-1/2 -translate-y-1/2 items-center z-10">
                <div className="w-2 h-2 bg-white border-2 border-[#2EC4B6] rounded-full"></div>
                <div className="w-6 h-0.5 bg-[#2EC4B6]"></div>
                <div className="w-2 h-2 bg-white border-2 border-[#2EC4B6] rounded-full"></div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative flex items-center lg:pl-8">
              <div className="bg-white rounded-2xl p-6 border-2 border-[#2EC4B6] shadow-lg flex-1 flex flex-col">
                <div className="w-12 h-12 bg-[#2EC4B6] text-white rounded-full flex items-center justify-center mb-4 font-semibold text-lg">
                  2
                </div>
                <h3 className="mb-2 text-[#1A202C] text-lg font-semibold">Proposal</h3>
                <p className="text-sm text-[#4A5568] flex-1">Agent creates detailed proposal</p>
              </div>
              {/* Connector */}
              <div className="hidden lg:flex absolute left-full top-1/2 -translate-y-1/2 items-center z-10">
                <div className="w-2 h-2 bg-white border-2 border-[#2EC4B6] rounded-full"></div>
                <div className="w-6 h-0.5 bg-[#2EC4B6]"></div>
                <div className="w-2 h-2 bg-white border-2 border-[#2EC4B6] rounded-full"></div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative flex items-center lg:pl-8">
              <div className="bg-white rounded-2xl p-6 border-2 border-[#2EC4B6] shadow-lg flex-1 flex flex-col">
                <div className="w-12 h-12 bg-[#2EC4B6] text-white rounded-full flex items-center justify-center mb-4 font-semibold text-lg">
                  3
                </div>
                <h3 className="mb-2 text-[#1A202C] text-lg font-semibold">Project</h3>
                <p className="text-sm text-[#4A5568] flex-1">Work begins with milestones</p>
              </div>
              {/* Connector */}
              <div className="hidden lg:flex absolute left-full top-1/2 -translate-y-1/2 items-center z-10">
                <div className="w-2 h-2 bg-white border-2 border-[#2EC4B6] rounded-full"></div>
                <div className="w-6 h-0.5 bg-[#2EC4B6]"></div>
                <div className="w-2 h-2 bg-white border-2 border-[#2EC4B6] rounded-full"></div>
              </div>
            </div>

            {/* Step 4 */}
            <div className="flex items-center lg:pl-8">
              <div className="bg-white rounded-2xl p-6 border-2 border-[#2EC4B6] shadow-lg flex-1 flex flex-col">
                <div className="w-12 h-12 bg-[#2EC4B6] text-white rounded-full flex items-center justify-center mb-4 font-semibold text-lg">
                  4
                </div>
                <h3 className="mb-2 text-[#1A202C] text-lg font-semibold">Delivery</h3>
                <p className="text-sm text-[#4A5568] flex-1">Final delivery and handoff</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-[#0D1B2A] to-[#1a2d42] py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-12 sm:mb-16">
          <h2 className="mb-3 sm:mb-4 text-white text-2xl sm:text-3xl lg:text-4xl font-bold">
            Ready to Get Started?
          </h2>
          <p className="text-base sm:text-lg text-gray-300 mb-8 sm:mb-10">
            Transform your digital service delivery with our comprehensive agency management platform
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <button
              onClick={() => navigate('/register')}
              className="w-full sm:w-auto min-w-[160px] bg-gradient-to-r from-[#2EC4B6] to-[#26a599] text-white px-8 py-3 rounded-lg hover:shadow-2xl transition-all font-medium h-[48px]"
            >
              Create Account
            </button>
            <button
              onClick={() => navigate('/login')}
              className="w-full sm:w-auto min-w-[160px] bg-white text-[#0D1B2A] px-8 py-3 rounded-lg hover:bg-gray-100 transition-all font-medium h-[48px]"
            >
              Sign In
            </button>
          </div>
        </div>

        {/* Footer Links Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-white/10 pt-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 mb-12">
            {/* Logo Section */}
            <div className="col-span-1 sm:col-span-2 lg:col-span-1">
              <img src={logoImage} alt="BizTech Biz Digital" className="h-8 sm:h-10 mb-4 brightness-0 invert" />
              <p className="text-sm text-gray-400">
                Streamline your digital agency operations with our comprehensive management platform for web development, SEO, and marketing services
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-white font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-3">
                <li>
                  <button 
                    onClick={() => navigate('/login')}
                    className="text-sm text-gray-400 hover:text-[#2EC4B6] transition-colors"
                  >
                    Request Services
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => navigate('/register')}
                    className="text-sm text-gray-400 hover:text-[#2EC4B6] transition-colors"
                  >
                    Become an Agent
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => {
                      const workflowSection = document.querySelector('[data-workflow]');
                      workflowSection?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="text-sm text-gray-400 hover:text-[#2EC4B6] transition-colors"
                  >
                    How It Works
                  </button>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3 className="text-white font-semibold mb-4">Legal</h3>
              <ul className="space-y-3">
                <li>
                  <button 
                    onClick={() => alert('Terms of Service - Coming Soon')}
                    className="text-sm text-gray-400 hover:text-[#2EC4B6] transition-colors"
                  >
                    Terms of Service
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => alert('Privacy Policy - Coming Soon')}
                    className="text-sm text-gray-400 hover:text-[#2EC4B6] transition-colors"
                  >
                    Privacy Policy
                  </button>
                </li>
              </ul>
            </div>

            {/* Contact Us */}
            <div>
              <h3 className="text-white font-semibold mb-4">Contact Us</h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-2 text-sm text-gray-400">
                  <Phone size={16} className="text-[#2EC4B6]" />
                  <a 
                    href="tel:+97150328786"
                    className="hover:text-[#2EC4B6] transition-colors"
                  >
                    +971 50 328 8786
                  </a>
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-400">
                  <Mail size={16} className="text-[#2EC4B6]" />
                  <a 
                    href="mailto:services@biztech.ae"
                    className="hover:text-[#2EC4B6] transition-colors"
                  >
                    services@biztech.ae
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-white/10 pt-8 text-center">
            <p className="text-sm text-gray-400">
              BizTech Biz Digital Copyright © 2025. All Rights Reserved.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}