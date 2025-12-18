
import { useNavigate } from 'react-router-dom';
import { Mail, Phone, ArrowRight } from 'lucide-react';
import logoImage from 'figma:asset/8c308caf909810f493480578c4eab6aa4f6235bf.png';

export function Footer() {
  const navigate = useNavigate();

  return (
    <footer className="bg-[#0D1B2A] text-white">
      {/* CTA Section */}
      <div className="border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h2 className="mb-4 text-white text-3xl font-heading font-bold">
            Ready to Transform Your Business?
          </h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
            Join hundreds of successful businesses who trust BizTech for their growth journey.
            <br className="hidden md:block" />
            Let's discuss how we can help you achieve your goals.
          </p>

          {/* External Link Button */}
          <a
            href="https://biztech.ae/" 
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#2EC4B6] hover:bg-[#26a599] text-white px-8 py-3 rounded-md transition-colors inline-flex items-center gap-2 cursor-pointer font-medium"
          >
            Visit BizTech Website
            <ArrowRight size={20} />
          </a>
        </div>
      </div>

      {/* Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <img src={logoImage} alt="BizTech Biz Digital" className="h-8" />
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Streamline your digital agency operations with our comprehensive management platform for web development, SEO, and marketing services
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <button
                  onClick={() => navigate('/login')}
                  className="text-gray-400 hover:text-[#2EC4B6] transition-colors text-sm"
                >
                  Request Services
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/register')}
                  className="text-gray-400 hover:text-[#2EC4B6] transition-colors text-sm"
                >
                  Become an Agent
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/')}
                  className="text-gray-400 hover:text-[#2EC4B6] transition-colors text-sm"
                >
                  How It Works
                </button>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-white mb-4">Legal</h3>
            <ul className="space-y-3">
              <li>
                <button
                  onClick={() => navigate('/')}
                  className="text-gray-400 hover:text-[#2EC4B6] transition-colors text-sm"
                >
                  Terms of Service
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/')}
                  className="text-gray-400 hover:text-[#2EC4B6] transition-colors text-sm"
                >
                  Privacy Policy
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h3 className="text-white mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <Phone size={16} className="text-[#2EC4B6]" />
                <a
                  href="tel:+97150328786"
                  className="text-gray-400 hover:text-[#2EC4B6] transition-colors text-sm"
                >
                  +971 50 328 8786
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={16} className="text-[#2EC4B6]" />
                <a
                  href="mailto:services@biztech.ae"
                  className="text-gray-400 hover:text-[#2EC4B6] transition-colors text-sm"
                >
                  services@biztech.ae
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/10 mt-12 pt-8 text-center">
          <p className="text-gray-500 text-sm">
            BizTech Biz Digital Copyright © 2025. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}