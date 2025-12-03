import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Layers, Loader2, Edit2, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import api from '../lib/api';

interface Category {
  id: number;
  name: string;
  description: string;
  createdAt: string;
}

export function AdminServices() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  
  // Form State
  const [formData, setFormData] = useState({
    name: '',
    description: ''
  });
  const [editingId, setEditingId] = useState<number | null>(null);

  const fetchCategories = async () => {
    try {
      const response = await api.get('/admin/categories');
      setCategories(response.data);
    } catch (error) {
      toast.error("Failed to load services");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleOpenAdd = () => {
    setEditingId(null);
    setFormData({ name: '', description: '' });
    setShowModal(true);
  };

  const handleEditClick = (category: Category) => {
    setEditingId(category.id);
    setFormData({ name: category.name, description: category.description });
    setShowModal(true);
  };

  const handleDeleteClick = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this service?")) return;

    try {
      await api.delete(`/admin/categories/${id}`);
      toast.success("Service deleted successfully");
      fetchCategories();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to delete service");
    }
  };

  const handleSubmit = async () => {
    if (!formData.name) {
      toast.error("Service name is required");
      return;
    }

    try {
      if (editingId) {
        // Update existing
        await api.put(`/admin/categories/${editingId}`, formData);
        toast.success("Service updated successfully!");
      } else {
        // Create new
        await api.post('/admin/categories', formData);
        toast.success("Service category created successfully!");
      }
      
      setShowModal(false);
      setFormData({ name: '', description: '' });
      fetchCategories();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Operation failed");
    }
  };

  return (
    <>
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="mb-2 text-[#0D1B2A]">Services Management</h1>
          <p className="text-[#4A5568]">Define the service categories available for clients</p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="flex items-center gap-2 bg-[#2EC4B6] text-white px-6 py-2.5 rounded-lg hover:bg-[#26a599] transition-all font-medium"
        >
          <Plus size={20} /> Add Service
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center p-12">
          <Loader2 className="w-8 h-8 text-[#2EC4B6] animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.length === 0 ? (
            <div className="col-span-full p-12 text-center bg-white rounded-xl border border-gray-200">
              <Layers className="mx-auto mb-4 text-gray-400" size={48} />
              <p className="text-[#4A5568]">No services defined yet.</p>
            </div>
          ) : (
            categories.map((cat) => (
              <div key={cat.id} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow group">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-[#0D1B2A] text-lg">{cat.name}</h3>
                  <div className="flex items-center gap-2">
                     {/* Edit Button */}
                    <button 
                      onClick={() => handleEditClick(cat)}
                      className="text-gray-400 hover:text-[#3498DB] p-1 rounded transition-colors"
                      title="Edit Service"
                    >
                      <Edit2 size={16} />
                    </button>
                    {/* Delete Button */}
                    <button 
                      onClick={() => handleDeleteClick(cat.id)}
                      className="text-gray-400 hover:text-[#E74C3C] p-1 rounded transition-colors"
                      title="Delete Service"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
                <p className="text-sm text-[#4A5568] mb-4">{cat.description || "No description provided."}</p>
                <div className="pt-4 border-t border-gray-100 flex justify-between items-center text-xs text-gray-400">
                  <span>Created: {new Date(cat.createdAt).toLocaleDateString()}</span>
                  <span className="font-mono">ID: {cat.id}</span>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-[#0D1B2A]">
                {editingId ? 'Edit Service' : 'Add New Service'}
              </h2>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600">✕</button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Service Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Web Development"
                  className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-[#2EC4B6]"
                />
              </div>
              <div> 
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Brief description of this service..."
                  rows={3}
                  className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-[#2EC4B6]"
                />
              </div>
              
              <button onClick={handleSubmit} className="w-full bg-[#2EC4B6] text-white py-3 rounded-lg hover:bg-[#26a599] font-medium">
                {editingId ? 'Update Service' : 'Create Service'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}