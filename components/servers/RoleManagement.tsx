"use client";

import { useState } from 'react';

interface Role {
  id: string;
  name: string;
  color: string;
  permissions: string[];
  hoist: boolean;
  mentionable: boolean;
}

export default function RoleManagement() {
  const [roles, setRoles] = useState<Role[]>([
    { id: '1', name: 'Administrator', color: 'red', permissions: ['manage_server', 'manage_channels'], hoist: true, mentionable: true },
    { id: '2', name: 'Moderator', color: 'orange', permissions: ['manage_channels'], hoist: true, mentionable: false },
    { id: '3', name: 'Member', color: 'gray', permissions: [], hoist: false, mentionable: false },
  ]);

  const [newRoleName, setNewRoleName] = useState('');
  const [newRoleColor, setNewRoleColor] = useState('blue');

  const handleAddRole = () => {
    if (!newRoleName.trim()) return;
    
    const newRole: Role = {
      id: (roles.length + 1).toString(),
      name: newRoleName,
      color: newRoleColor,
      permissions: [],
      hoist: false,
      mentionable: false
    };
    
    setRoles([...roles, newRole]);
    setNewRoleName('');
  };

  const handleDeleteRole = (id: string) => {
    setRoles(roles.filter(role => role.id !== id));
  };

  return (
    <div className="bg-gray-800 p-4 rounded-lg">
      <h3 className="font-semibold mb-3">Role Management</h3>
      
      <div className="mb-4">
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            value={newRoleName}
            onChange={(e) => setNewRoleName(e.target.value)}
            placeholder="Role name"
            className="flex-1 bg-gray-700 text-white rounded px-3 py-1 text-sm"
          />
          <select
            value={newRoleColor}
            onChange={(e) => setNewRoleColor(e.target.value)}
            className="bg-gray-700 text-white rounded px-3 py-1 text-sm"
          >
            <option value="blue">Blue</option>
            <option value="green">Green</option>
            <option value="yellow">Yellow</option>
            <option value="orange">Orange</option>
            <option value="red">Red</option>
            <option value="purple">Purple</option>
            <option value="gray">Gray</option>
          </select>
          <button
            onClick={handleAddRole}
            className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm"
          >
            Add
          </button>
        </div>
      </div>
      
      <div className="space-y-2 max-h-60 overflow-y-auto">
        {roles.map((role) => (
          <div key={role.id} className="flex items-center justify-between bg-gray-700 p-2 rounded">
            <div className="flex items-center">
              <div
                className="w-4 h-4 rounded mr-2"
                style={{ backgroundColor: role.color }}
              ></div>
              <span className="text-sm">{role.name}</span>
            </div>
            <button
              onClick={() => handleDeleteRole(role.id)}
              className="text-red-400 hover:text-red-300 text-sm"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}