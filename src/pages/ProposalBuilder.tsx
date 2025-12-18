import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Plus, Trash2, FileText, Send } from 'lucide-react';
import { toast } from 'sonner';

interface ProposalItem {
  id: string;
  description: string;
  price: number;
}

export function ProposalBuilder() {
  const navigate = useNavigate();
  const { requestId } = useParams<{ requestId: string }>();

  const [items, setItems] = useState<ProposalItem[]>([
    { id: '1', description: 'Website Design & Development', price: 15000 },
    { id: '2', description: 'CMS Integration', price: 3000 },
    { id: '3', description: 'Multi-language Setup (EN/AR)', price: 2000 }
  ]);

  const [notes, setNotes] = useState('Project timeline: 6-8 weeks\nIncludes 2 rounds of revisions\n3 months free support');

  const addItem = () => {
    const newItem: ProposalItem = {
      id: Date.now().toString(),
      description: '',
      price: 0
    };
    setItems([...items, newItem]);
  };

  const updateItem = (id: string, field: keyof ProposalItem, value: string | number) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  const removeItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const total = items.reduce((sum, item) => sum + (item.price || 0), 0);

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      {/* Header */}
      <header className="bg-[#0D1B2A] text-white py-6 px-8 shadow-lg">
        <div className="max-w-5xl mx-auto">
          <button
            onClick={() => navigate('/queue')}
            className="text-[#2EC4B6] hover:text-white mb-4 flex items-center gap-2 transition-colors"
          >
            <ArrowLeft size={20} />
            Back to Queue
          </button>
          <h2 className="mb-2">Proposal Builder</h2>
          <p className="text-gray-400 text-sm">Request #REQ-{requestId} • ABC Trading LLC</p>
        </div>
      </header>

      <div className="max-w-5xl mx-auto p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Proposal Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-[#0D1B2A]">Proposal Items</h3>
                <button
                  onClick={addItem}
                  className="text-[#2EC4B6] hover:text-[#26a599] flex items-center gap-2 transition-colors text-sm"
                >
                  <Plus size={16} />
                  Add Item
                </button>
              </div>

              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-3 items-start">
                    <div className="flex-1">
                      <input
                        type="text"
                        value={item.description}
                        onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                        placeholder="Item description"
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#2EC4B6] mb-2"
                      />
                    </div>
                    <div className="w-32">
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">AED</span>
                        <input
                          type="number"
                          value={item.price}
                          onChange={(e) => updateItem(item.id, 'price', parseFloat(e.target.value) || 0)}
                          placeholder="0"
                          className="w-full pl-12 pr-3 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#2EC4B6]"
                        />
                      </div>
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="p-3 text-gray-400 hover:text-[#E74C3C] transition-colors"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                ))}
              </div>

              {/* Additional Notes */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <label className="block mb-2 text-sm text-gray-700">Additional Notes & Terms</label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={4}
                  placeholder="Timeline, deliverables, payment terms, etc."
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#2EC4B6] resize-none"
                />
              </div>
            </div>
          </div>

          {/* Right Column - Summary & Actions */}
          <div className="space-y-6">
            {/* Total Summary */}
            <div className="bg-gradient-to-br from-[#0D1B2A] to-[#1B2838] rounded-xl shadow-lg p-6 text-white">
              <h4 className="mb-4">Proposal Summary</h4>
              
              <div className="space-y-3 mb-6">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-gray-300 truncate mr-2">{item.description || 'Untitled Item'}</span>
                    <span className="text-white whitespace-nowrap">AED {item.price.toLocaleString()}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-white/20">
                <div className="flex justify-between items-center">
                  <span className="text-[#2EC4B6]">Total</span>
                  <span className="metric text-3xl">AED {total.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h4 className="mb-4 text-[#0D1B2A]">Actions</h4>
              
              <button className="w-full mb-3 bg-white border-2 border-gray-200 hover:border-[#2EC4B6] text-[#0D1B2A] px-4 py-3 rounded-lg flex items-center justify-center gap-2 transition-colors">
                <FileText size={18} />
                Preview PDF
              </button>

              <button
                onClick={() => {
                  // TODO: Implement proposal generation
                  // ProposalGenerator component should be used as JSX, not called as function
                  toast.success('Proposal generated and sent successfully!');
                }}
                className="w-full bg-[#2EC4B6] hover:bg-[#26a599] text-white px-4 py-3 rounded-lg flex items-center justify-center gap-2 transition-colors"
              >
                <Send size={18} />
                Generate & Send
              </button>

              <p className="text-xs text-gray-500 mt-4 text-center">
                This will generate a branded PDF and email it to the client
              </p>
            </div>

            {/* Client Info */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h4 className="mb-3 text-[#0D1B2A] text-sm">Client Information</h4>
              <div className="space-y-2 text-sm">
                <div>
                  <p className="text-gray-600">Company</p>
                  <p className="text-[#0D1B2A]">ABC Trading LLC</p>
                </div>
                <div>
                  <p className="text-gray-600">Contact</p>
                  <p className="text-[#0D1B2A]">contact@abctrading.ae</p>
                </div>
                <div>
                  <p className="text-gray-600">Service Requested</p>
                  <p className="text-[#0D1B2A]">Web Development</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}