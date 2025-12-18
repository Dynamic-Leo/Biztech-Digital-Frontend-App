

type StatusType = 'pending' | 'in-progress' | 'action-required' | 'delivered' | 'approved' | 'rejected' | 'Pending Review' | 'Awaiting Quote' | 'Action Required';

interface StatusBadgeProps {
  status: StatusType | string;
  label?: string;
}

export function StatusBadge({ status, label }: StatusBadgeProps) {
  const statusConfig: Record<string, { bg: string; text: string; label: string }> = {
    'pending': { bg: 'bg-[#F39C12]', text: 'text-white', label: 'Pending Triage' },
    'in-progress': { bg: 'bg-[#3498DB]', text: 'text-white', label: 'In Progress' },
    'action-required': { bg: 'bg-[#E74C3C]', text: 'text-white', label: 'Action Required' },
    'delivered': { bg: 'bg-[#2ECC71]', text: 'text-white', label: 'Delivered' },
    'approved': { bg: 'bg-[#2ECC71]', text: 'text-white', label: 'Approved' },
    'rejected': { bg: 'bg-[#E74C3C]', text: 'text-white', label: 'Rejected' },
    'Pending Review': { bg: 'bg-[#F39C12]', text: 'text-white', label: 'Pending Review' },
    'Awaiting Quote': { bg: 'bg-[#3498DB]', text: 'text-white', label: 'Awaiting Quote' },
    'Action Required': { bg: 'bg-[#E74C3C]', text: 'text-white', label: 'Action Required' }
  };

  const config = statusConfig[status] || { bg: 'bg-gray-500', text: 'text-white', label: status };

  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
      {label || config.label}
    </span>
  );
}