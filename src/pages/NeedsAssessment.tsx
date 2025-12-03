import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, ChevronLeft, CheckCircle, Loader2, PlusCircle } from 'lucide-react';
import { toast } from 'sonner';
import api from '../lib/api';

interface Category {
  id: number;
  name: string;
  description: string;
}

export function NeedsAssessment() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);

  // Form State
  const [formData, setFormData] = useState({
    categoryId: 0,
    customServiceName: '', // New field for custom input
    isCustom: false,       // Flag to track if user picked 'Other'
    details: '',
    priority: 'Medium'
  });

  // Fetch Categories from Backend
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get('/admin/categories');
        setCategories(response.data);
      } catch (error) {
        console.error("Failed to fetch categories", error);
        toast.error("Failed to load service categories.");
      } finally {
        setIsLoadingCategories(false);
      }
    };
    fetchCategories();
  }, []);

  const handleCategorySelect = (id: number) => {
    setFormData({ ...formData, categoryId: id, isCustom: false, customServiceName: '' });
  };

  const handleCustomSelect = () => {
    setFormData({ ...formData, categoryId: 0, isCustom: true });
  };

  const handleSubmit = async () => {
    // Validation
    if (!formData.categoryId && !formData.isCustom) {
      toast.error("Please select a service category");
      return;
    }
    if (formData.isCustom && !formData.customServiceName.trim()) {
      toast.error("Please enter the name of the custom service");
      return;
    }
    if (!formData.details.trim()) {
      toast.error("Please provide details for your request");
      return;
    }

    setLoading(true);
    try {
      let finalCategoryId = formData.categoryId;
      let finalDetails = formData.details;

      // Logic for Custom Service
      if (formData.isCustom) {
        // Append custom name to details so Agents see it immediately
        finalDetails = `[CUSTOM REQUEST: ${formData.customServiceName}]\n\n${formData.details}`;
        
        // Find a category named "Other" or "General" to map to, otherwise fallback to first available
        // This is a workaround because DB requires a valid categoryId
        const otherCategory = categories.find(c => c.name.toLowerCase() === 'other' || c.name.toLowerCase() === 'general');
        if (otherCategory) {
          finalCategoryId = otherCategory.id;
        } else if (categories.length > 0) {
          finalCategoryId = categories[0].id; // Fallback
        } else {
          throw new Error("No service categories available in system. Please contact admin.");
        }
      }

      await api.post('/requests', {
        categoryId: finalCategoryId,
        details: finalDetails,
        priority: formData.priority
      });

      toast.success('Request submitted successfully!');
      navigate('/client-dashboard');
    } catch (error: any) {
      console.error("Submission failed", error);
      toast.error(error.message || "Failed to submit request. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      <header className="bg-[#0D1B2A] text-white py-6 px-8 shadow-lg">
        <div className="max-w-3xl mx-auto">
          <h2 className="mb-2 text-2xl font-semibold">Service Request</h2>
          <p className="text-[#2EC4B6] text-sm">Tell us about your needs - we'll create a custom proposal for you</p>
        </div>
      </header>

      <div className="max-w-3xl mx-auto p-8">
        {/* Steps Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {[1, 2, 3].map((s) => (
              <React.Fragment key={s}>
                <div className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                      currentStep >= s ? 'bg-[#2EC4B6] text-white' : 'bg-gray-300 text-gray-600'
                    }`}
                  >
                    {currentStep > s ? <CheckCircle size={20} /> : s}
                  </div>
                  <p className="text-xs mt-2 text-gray-600">
                    {s === 1 ? 'Category' : s === 2 ? 'Details' : 'Priority'}
                  </p>
                </div>
                {s < 3 && (
                  <div className={`flex-1 h-1 mx-4 transition-all ${currentStep > s ? 'bg-[#2EC4B6]' : 'bg-gray-300'}`}></div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Form Content */}
        <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
          
          {/* Step 1: Category Selection */}
          {currentStep === 1 && (
            <div>
              <h3 className="mb-2 text-[#0D1B2A] text-xl font-semibold">Select Service Category</h3>
              <p className="text-gray-600 mb-6">What type of service do you need?</p>
              
              {isLoadingCategories ? (
                <div className="flex justify-center py-8">
                  <Loader2 className="animate-spin text-[#2EC4B6]" size={32} />
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => handleCategorySelect(cat.id)}
                      className={`p-4 rounded-lg border-2 text-left transition-all ${
                        formData.categoryId === cat.id
                          ? 'border-[#2EC4B6] bg-[#2EC4B6]/5'
                          : 'border-gray-200 hover:border-[#2EC4B6]/50'
                      }`}
                    >
                      <p className="text-[#0D1B2A] font-medium">{cat.name}</p>
                      {cat.description && <p className="text-sm text-gray-500 mt-1 line-clamp-2">{cat.description}</p>}
                    </button>
                  ))}
                  
                  {/* Custom Option */}
                  <button
                    onClick={handleCustomSelect}
                    className={`p-4 rounded-lg border-2 text-left transition-all flex flex-col justify-center ${
                      formData.isCustom
                        ? 'border-[#2EC4B6] bg-[#2EC4B6]/5'
                        : 'border-gray-200 hover:border-[#2EC4B6]/50'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <PlusCircle size={18} className={formData.isCustom ? 'text-[#2EC4B6]' : 'text-gray-400'} />
                      <p className="text-[#0D1B2A] font-medium">Other / Custom</p>
                    </div>
                    <p className="text-sm text-gray-500">I need something else</p>
                  </button>
                </div>
              )}

              {/* Custom Service Input */}
              {formData.isCustom && (
                <div className="mt-6 animate-in fade-in slide-in-from-top-2 duration-300">
                  <label className="block text-sm font-medium text-[#1A202C] mb-2">Custom Service Name</label>
                  <input 
                    type="text" 
                    value={formData.customServiceName}
                    onChange={(e) => setFormData({ ...formData, customServiceName: e.target.value })}
                    placeholder="e.g. Mobile App Maintenance"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#2EC4B6] focus:ring-1 focus:ring-[#2EC4B6]"
                  />
                </div>
              )}
            </div>
          )}

          {/* Step 2: Details */}
          {currentStep === 2 && (
            <div>
              <h3 className="mb-2 text-[#0D1B2A] text-xl font-semibold">Describe Your Requirements</h3>
              <p className="text-gray-600 mb-6">
                Help us understand your goals, target audience, and any specific requirements.
              </p>
              
              <textarea
                value={formData.details}
                onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                rows={8}
                placeholder="Example:&#10;- Goals: Increase online visibility&#10;- Target Audience: B2B clients&#10;- Specific Requirements: Modern design, mobile-friendly"
                className="w-full p-4 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#2EC4B6] resize-none"
              />
            </div>
          )}

          {/* Step 3: Priority */}
          {currentStep === 3 && (
            <div>
              <h3 className="mb-2 text-[#0D1B2A] text-xl font-semibold">Set Priority Level</h3>
              <p className="text-gray-600 mb-6">How urgent is this project?</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { value: 'Low', label: 'Low', desc: 'Flexible timeline', color: '#3498DB' },
                  { value: 'Medium', label: 'Medium', desc: 'Standard timeline', color: '#F39C12' },
                  { value: 'High', label: 'High', desc: 'Urgent turnaround', color: '#E74C3C' }
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
                    <div className="w-3 h-3 rounded-full mx-auto mb-3" style={{ backgroundColor: priority.color }}></div>
                    <p className="text-[#0D1B2A] mb-2 font-medium">{priority.label}</p>
                    <p className="text-sm text-gray-600">{priority.desc}</p>
                  </button>
                ))}
              </div>

              {/* Summary */}
              <div className="mt-8 bg-gray-50 rounded-lg p-6 border border-gray-200">
                <h4 className="mb-4 text-[#0D1B2A] font-semibold">Request Summary</h4>
                <div className="space-y-3">
                  <div className="grid grid-cols-3 border-b border-gray-200 pb-2">
                    <p className="text-sm text-gray-600">Category</p>
                    <p className="text-[#0D1B2A] col-span-2 font-medium">
                      {formData.isCustom ? `Custom: ${formData.customServiceName}` : categories.find(c => c.id === formData.categoryId)?.name || 'Unknown'}
                    </p>
                  </div>
                  <div className="grid grid-cols-3 border-b border-gray-200 pb-2">
                    <p className="text-sm text-gray-600">Details</p>
                    <p className="text-[#0D1B2A] text-sm line-clamp-3 col-span-2">{formData.details || 'No details'}</p>
                  </div>
                  <div className="grid grid-cols-3">
                    <p className="text-sm text-gray-600">Priority</p>
                    <p className="text-[#0D1B2A] font-medium">{formData.priority}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
            <button
              onClick={() => currentStep === 1 ? navigate('/client-dashboard') : setCurrentStep(currentStep - 1)}
              className="px-6 py-3 text-gray-600 hover:text-[#0D1B2A] transition-colors flex items-center gap-2 font-medium"
              disabled={loading}
            >
              <ChevronLeft size={20} />
              {currentStep === 1 ? 'Cancel' : 'Back'}
            </button>
            
            {currentStep < 3 ? (
              <button
                onClick={() => setCurrentStep(currentStep + 1)}
                disabled={(currentStep === 1 && !formData.categoryId && !formData.isCustom) || (formData.isCustom && !formData.customServiceName)}
                className="bg-[#2EC4B6] hover:bg-[#26a599] text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
              >
                Next
                <ChevronRight size={20} />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="bg-[#2EC4B6] hover:bg-[#26a599] text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-colors disabled:opacity-70 font-medium"
              >
                {loading ? <Loader2 className="animate-spin" size={20} /> : <CheckCircle size={20} />}
                {loading ? 'Submitting...' : 'Submit Request'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}