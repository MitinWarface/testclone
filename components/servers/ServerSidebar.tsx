import { useState } from 'react';
import ServerCreateModal from './ServerCreateModal';

export default function ServerSidebar() {
  // Mock data for servers
  const [servers] = useState([
    { id: '1', name: 'Server 1', icon: '🎮' },
    { id: '2', name: 'Server 2', icon: '🎨' },
    { id: '3', name: 'Server 3', icon: '📚' },
  ]);
  
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCreateServer = (name: string, icon?: string) => {
    console.log('Creating server:', name, icon);
    // In a real app, you would call an API to create the server
    setIsModalOpen(false);
  };

  return (
    <div className="w-16 bg-gray-900 flex flex-col items-center py-3 space-y-4">
      {/* Server items */}
      {servers.map((server) => (
        <div
          key={server.id}
          className="w-12 h-12 rounded-3xl bg-indigo-600 flex items-center justify-center cursor-pointer hover:rounded-2xl transition-all duration-200 ease-in-out"
        >
          <span className="text-xl">{server.icon}</span>
        </div>
      ))}
      
      {/* Create Server Button */}
      <div
        onClick={() => setIsModalOpen(true)}
        className="w-12 h-12 rounded-3xl bg-gray-700 flex items-center justify-center cursor-pointer hover:rounded-2xl transition-all duration-200 ease-in-out"
      >
        <span className="text-xl">+</span>
      </div>
      
      {/* Modal */}
      <ServerCreateModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={handleCreateServer}
      />
    </div>
  );
}