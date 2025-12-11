"use client";

import { useState } from 'react';

interface PrivateMessage {
  id: string;
  user: {
    id: string;
    name: string;
    avatar?: string;
    status: 'online' | 'idle' | 'offline';
  };
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
}

export default function PrivateMessagesList() {
  // Mock data for private messages
  const [conversations] = useState<PrivateMessage[]>([
    {
      id: '1',
      user: {
        id: 'user1',
        name: 'Alice Johnson',
        status: 'online'
      },
      lastMessage: 'Hey, how are you doing?',
      timestamp: '10:30 AM',
      unreadCount: 2
    },
    {
      id: '2',
      user: {
        id: 'user2',
        name: 'Bob Smith',
        status: 'idle'
      },
      lastMessage: 'Did you see the game last night?',
      timestamp: 'Yesterday',
      unreadCount: 0
    },
    {
      id: '3',
      user: {
        id: 'user3',
        name: 'Charlie Brown',
        status: 'offline'
      },
      lastMessage: 'Thanks for your help!',
      timestamp: 'Monday',
      unreadCount: 0
    }
  ]);

  const [activeConversation, setActiveConversation] = useState<string>('1');

  return (
    <div className="w-60 bg-gray-800 flex flex-col">
      {/* Private messages header */}
      <div className="h-12 px-4 py-3 bg-gray-700 flex items-center justify-between">
        <h2 className="font-semibold">Direct Messages</h2>
        <button className="hover:bg-gray-600 rounded p-1">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
        </button>
      </div>

      {/* Conversations list */}
      <div className="flex-1 overflow-y-auto p-2">
        {conversations.map((conversation) => (
          <div
            key={conversation.id}
            onClick={() => setActiveConversation(conversation.id)}
            className={`px-2 py-2 mx-1 rounded cursor-pointer flex items-center ${
              activeConversation === conversation.id ? 'bg-gray-700' : 'hover:bg-gray-700'
            }`}
          >
            <div className="relative mr-2">
              <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center">
                <span className="text-sm">U</span>
              </div>
              <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-gray-800 ${
                conversation.user.status === 'online' ? 'bg-green-500' : 
                conversation.user.status === 'idle' ? 'bg-yellow-500' : 'bg-gray-500'
              }`}></div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-baseline">
                <span className="font-medium truncate">{conversation.user.name}</span>
                <span className="text-xs text-gray-400">{conversation.timestamp}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-400 truncate">{conversation.lastMessage}</span>
                {conversation.unreadCount > 0 && (
                  <span className="bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {conversation.unreadCount}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}