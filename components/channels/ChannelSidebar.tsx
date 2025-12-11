import { useState } from 'react';
import ChannelCreateModal from './ChannelCreateModal';

export default function ChannelSidebar() {
  // Mock data for channels
  const [channels] = useState([
    { id: '1', name: 'general', type: 'text' },
    { id: '2', name: 'random', type: 'text' },
    { id: '3', name: 'voice-chat', type: 'voice' },
  ]);

  // Mock data for users
  const [users] = useState([
    { id: '1', name: 'User1', status: 'online' },
    { id: '2', name: 'User2', status: 'idle' },
    { id: '3', name: 'User3', status: 'offline' },
  ]);
  
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCreateChannel = (name: string, type: 'text' | 'voice') => {
    console.log('Creating channel:', name, type);
    // In a real app, you would call an API to create the channel
    setIsModalOpen(false);
  };

  return (
    <div className="w-60 bg-gray-800 flex flex-col">
      {/* Channel header */}
      <div className="h-12 px-4 py-3 bg-gray-700 flex items-center justify-between">
        <h2 className="font-semibold">General</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="hover:bg-gray-600 rounded p-1"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
        </button>
      </div>

      {/* Channels list */}
      <div className="flex-1 overflow-y-auto p-2">
        <div className="mb-4">
          <h3 className="text-xs uppercase text-gray-400 font-semibold px-2 py-1">Text Channels</h3>
          {channels
            .filter((channel) => channel.type === 'text')
            .map((channel) => (
              <div
                key={channel.id}
                className="px-2 py-1 mx-1 rounded text-gray-300 hover:bg-gray-700 cursor-pointer flex items-center"
              >
                <span className="mr-1">#</span>
                <span>{channel.name}</span>
              </div>
            ))}
        </div>

        <div>
          <h3 className="text-xs uppercase text-gray-400 font-semibold px-2 py-1">Voice Channels</h3>
          {channels
            .filter((channel) => channel.type === 'voice')
            .map((channel) => (
              <div
                key={channel.id}
                className="px-2 py-1 mx-1 rounded text-gray-300 hover:bg-gray-700 cursor-pointer flex items-center"
              >
                <span className="mr-1">🔊</span>
                <span>{channel.name}</span>
              </div>
            ))}
        </div>
      </div>

      {/* Users list */}
      <div className="h-14 bg-gray-700 flex items-center px-4">
        <div className="flex -space-x-2">
          {users.slice(0, 3).map((user) => (
            <div
              key={user.id}
              className={`w-6 h-6 rounded-full border-2 border-gray-800 ${
                user.status === 'online' ? 'bg-green-500' : user.status === 'idle' ? 'bg-yellow-500' : 'bg-gray-500'
              }`}
            ></div>
          ))}
        </div>
        <span className="ml-2 text-sm text-gray-300">25 members</span>
      </div>
      
      {/* Modal */}
      <ChannelCreateModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={handleCreateChannel}
      />
    </div>
  );
}