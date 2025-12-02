import React, { useState } from 'react';
import { Eye, EyeOff, Copy, Lock } from 'lucide-react';

interface VaultInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function VaultInput({ label, value, onChange, placeholder }: VaultInputProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mb-4">
      <label className="block text-sm mb-2 text-[#0D1B2A]">{label}</label>
      <div className="relative">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#2EC4B6]">
          <Lock size={18} />
        </div>
        <input
          type={isVisible ? 'text' : 'password'}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full pl-10 pr-20 py-3 border-2 border-[#2EC4B6]/30 rounded-lg focus:outline-none focus:border-[#2EC4B6] bg-white"
        />
        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-2">
          <button
            type="button"
            onClick={() => setIsVisible(!isVisible)}
            className="text-gray-500 hover:text-[#0D1B2A] transition-colors"
          >
            {isVisible ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
          <button
            type="button"
            onClick={handleCopy}
            className="text-gray-500 hover:text-[#2EC4B6] transition-colors"
          >
            <Copy size={18} />
          </button>
        </div>
      </div>
      {copied && (
        <p className="text-xs text-[#2ECC71] mt-1">Copied to clipboard!</p>
      )}
    </div>
  );
}
