"use client";

import { useState } from 'react';

interface ChannelCreateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (name: string, type: 'text' | 'voice') => void;
}

export default function ChannelCreateModal({ isOpen, onClose, onCreate }: ChannelCreateModalProps) {
  const [name, setName] = useState('');
  const [type, setType] = useState<'text' | 'voice'>('text');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCreate(name, type);
    setName('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4 text-white">Create Channel</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-300 mb-2" htmlFor="channelName">
              Channel Name
            </label>
            <input
              id="channelName"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-300 mb-2">Channel Type</label>
            <div className="flex space-x-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  checked={type === 'text'}
                  onChange={() => setType('text')}
                  className="text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-2 text-gray-300">Text</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  checked={type === 'voice'}
                  onChange={() => setType('voice')}
                  className="text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-2 text-gray-300">Voice</span>
              </label>
            </div>
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}