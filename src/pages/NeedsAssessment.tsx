import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, ChevronLeft, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

export function NeedsAssessment() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    category: '',
    details: '',
    priority: 'medium'
  });

  const categories = [
    'Web Development',
    'SEO Services',
    'Digital Marketing',
    'Social Media Management',
    'Branding & Design',
    'Content Creation'
  ];

  const handleSubmit = () => {
    // Add your form submission logic here
    toast.success('Request submitted successfully!');
    navigate('/dashboard'); // Redirect to dashboard or any other page
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      {/* Header */}
      <header className="bg-[#0D1B2A] text-white py-6 px-8 shadow-lg">
        <div className="max-w-3xl mx-auto">
          <h2 className="mb-2">Service Request</h2>
          <p className="text-[#2EC4B6] text-sm">Tell us about your needs - we'll create a custom proposal for you</p>
        </div>
      </header>

      <div className="max-w-3xl mx-auto p-8">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {[1, 2, 3].map((s) => (
              <React.Fragment key={s}>
                <div className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                      currentStep >= s
                        ? 'bg-[#2EC4B6] text-white'
                        : 'bg-gray-300 text-gray-600'
                    }`}
                  >
                    {currentStep > s ? <CheckCircle size={20} /> : s}
                  </div>
                  <p className="text-xs mt-2 text-gray-600">
                    {s === 1 ? 'Category' : s === 2 ? 'Details' : 'Priority'}
                  </p>
                </div>
                {s < 3 && (
                  <div
                    className={`flex-1 h-1 mx-4 transition-all ${
                      currentStep > s ? 'bg-[#2EC4B6]' : 'bg-gray-300'
                    }`}
                  ></div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
          {/* Step 1: Category */}
          {currentStep === 1 && (
            <div>
              <h3 className="mb-2 text-[#0D1B2A]">Select Service Category</h3>
              <p className="text-gray-600 mb-6">What type of service do you need?</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setFormData({ ...formData, category })}
                    className={`p-4 rounded-lg border-2 text-left transition-all ${
                      formData.category === category
                        ? 'border-[#2EC4B6] bg-[#2EC4B6]/5'
                        : 'border-gray-200 hover:border-[#2EC4B6]/50'
                    }`}
                  >
                    <p className="text-[#0D1B2A]">{category}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Details */}
          {currentStep === 2 && (
            <div>
              <h3 className="mb-2 text-[#0D1B2A]">Describe Your Requirements</h3>
              <p className="text-gray-600 mb-6">
                Help us understand your goals, target audience, and any specific requirements
              </p>
              
              <textarea
                value={formData.details}
                onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                rows={8}
                placeholder="Example:&#10;- Goals: Increase online visibility and generate leads&#10;- Target Audience: B2B clients in UAE&#10;- Competitors: [List any competitor websites]&#10;- Specific Requirements: Modern design, mobile-friendly, Arabic support"
                className="w-full p-4 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#2EC4B6] resize-none"
              />
              
              <div className="mt-4 bg-[#2EC4B6]/5 border border-[#2EC4B6]/20 rounded-lg p-4">
                <p className="text-sm text-gray-700">
                  💡 <strong>Tip:</strong> The more details you provide, the more accurate your proposal will be. Include links to examples you like, competitor websites, or any reference materials.
                </p>
              </div>
            </div>
          )}

          {/* Step 3: Priority */}
          {currentStep === 3 && (
            <div>
              <h3 className="mb-2 text-[#0D1B2A]">Set Priority Level</h3>
              <p className="text-gray-600 mb-6">How urgent is this project?</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { value: 'low', label: 'Low', desc: 'No rush, flexible timeline', color: '#3498DB' },
                  { value: 'medium', label: 'Medium', desc: 'Standard timeline (2-4 weeks)', color: '#F39C12' },
                  { value: 'high', label: 'High', desc: 'Urgent, needs quick turnaround', color: '#E74C3C' }
                ].map((priority) => (
                  <button
                    key={priority.value}
                    onClick={() => setFormData({ ...formData, priority: priority.value })}
                    className={`p-6 rounded-lg border-2 text-center transition-all ${
                      formData.priority === priority.value
                        ? 'border-[#2EC4B6] bg-[#2EC4B6]/5'
                        : 'border-gray-200 hover:border-[#2EC4B6]/50'
                    }`}
                  >
                    <div
                      className="w-3 h-3 rounded-full mx-auto mb-3"
                      style={{ backgroundColor: priority.color }}
                    ></div>
                    <p className="text-[#0D1B2A] mb-2">{priority.label}</p>
                    <p className="text-sm text-gray-600">{priority.desc}</p>
                  </button>
                ))}
              </div>

              {/* Review Summary */}
              <div className="mt-8 bg-gray-50 rounded-lg p-6 border border-gray-200">
                <h4 className="mb-4 text-[#0D1B2A]">Request Summary</h4>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-600">Category</p>
                    <p className="text-[#0D1B2A]">{formData.category}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Details</p>
                    <p className="text-[#0D1B2A] text-sm line-clamp-3">{formData.details || 'No details provided'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Priority</p>
                    <p className="text-[#0D1B2A] capitalize">{formData.priority}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
            <button
              onClick={() => currentStep === 1 ? navigate('/dashboard') : setCurrentStep(currentStep - 1)}
              className="px-6 py-3 text-gray-600 hover:text-[#0D1B2A] transition-colors flex items-center gap-2"
            >
              <ChevronLeft size={20} />
              {currentStep === 1 ? 'Cancel' : 'Back'}
            </button>
            
            {currentStep < 3 ? (
              <button
                onClick={() => setCurrentStep(currentStep + 1)}
                disabled={currentStep === 1 && !formData.category}
                className="bg-[#2EC4B6] hover:bg-[#26a599] text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
                <ChevronRight size={20} />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="bg-[#2EC4B6] hover:bg-[#26a599] text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-colors"
              >
                <CheckCircle size={20} />
                Submit Request
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}