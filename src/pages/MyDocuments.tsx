import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Upload, Folder, Lock, Eye, Download, Trash2, Plus } from 'lucide-react';
import { Document } from '../types';
import logoImage from 'figma:asset/8c308caf909810f493480578c4eab6aa4f6235bf.png';

export function MyDocuments() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'credentials' | 'documents'>('credentials');

  const [documents, setDocuments] = useState<Document[]>([
    { id: '1', name: 'Passport Copy', required: true, status: 'not-uploaded' },
    { id: '2', name: 'Visa Page', required: true, status: 'not-uploaded' },
    { id: '3', name: 'Emirates ID', required: true, status: 'not-uploaded' },
    { id: '4', name: 'Educational Certificate', required: true, status: 'not-uploaded' },
    { id: '5', name: 'Bank Statement', required: false, status: 'not-uploaded' }
  ]);

  const [showDateWarning, setShowDateWarning] = useState(true);

  return (
    <div className="min-h-screen bg-[#F5F7FA]">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#2EC4B6] rounded flex items-center justify-center">
                <span className="text-white text-sm">BT</span>
              </div>
              <span className="text-[#1A202C]">BizTech</span>
            </div>
            <nav className="flex gap-6">
              <button onClick={() => navigate('/dashboard')} className="text-gray-600 hover:text-[#1A202C] pb-1">Dashboard</button>
              <button className="text-[#2EC4B6] border-b-2 border-[#2EC4B6] pb-1">My Documents</button>
              <button className="text-gray-600 hover:text-[#1A202C] pb-1">My Profile</button>
            </nav>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/dashboard')}
              className="text-[#2EC4B6] hover:text-[#26a599] text-sm transition-colors"
            >
              Back to Dashboard
            </button>
            <div className="w-8 h-8 bg-gray-900 rounded-full"></div>
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-6 py-8">
        {/* Page Header */}
        <div className="mb-6">
          <h1 className="mb-2 text-[#1A202C]">My Documents</h1>
          <p className="text-[#4A5568]">Upload and manage your required documents</p>
        </div>

        {/* Warning Banner */}
        {showDateWarning && (
          <div className="bg-[#E74C3C] text-white px-4 py-3 rounded-lg mb-6 flex justify-between items-center">
            <span className="text-sm">Please Enter Expiration Date to upload the document</span>
            <button
              onClick={() => setShowDateWarning(false)}
              className="text-white hover:text-gray-200"
            >
              ✕
            </button>
          </div>
        )}

        {/* Documents List */}
        <div className="space-y-4">
          {documents.map((doc) => (
            <div
              key={doc.id}
              className="bg-white rounded-lg border border-gray-200 p-6"
            >
              <div className="flex items-center gap-6">
                {/* Upload Icon */}
                <div className="text-gray-400">
                  <Upload size={24} />
                </div>

                {/* Document Info */}
                <div className="flex-1">
                  <h4 className="text-[#1A202C] mb-1">{doc.name}</h4>
                  <p className="text-sm text-[#2EC4B6]">
                    {doc.required ? 'Required Document' : 'Optional Document'}
                  </p>
                </div>

                {/* Date Picker */}
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                  <input
                    type="text"
                    placeholder={doc.required ? "dd/mm/yyyy" : "Optional (DD/MM/YYYY)"}
                    className="w-40 pl-10 pr-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-[#2EC4B6]"
                  />
                </div>

                {/* Status Badge */}
                <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded text-sm min-w-[100px] text-center">
                  Not Uploaded
                </span>

                {/* Upload Button */}
                <button className="bg-[#2EC4B6] hover:bg-[#26a599] text-white px-4 py-2 rounded flex items-center gap-2 transition-colors">
                  <Upload size={16} />
                  Upload File
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}