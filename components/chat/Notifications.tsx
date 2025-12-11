"use client";

import { useState, useEffect } from 'react';

export default function Notifications() {
  const [notifications, setNotifications] = useState([
    { id: '1', type: 'mention', content: 'User1 mentioned you in #general', time: '2 min ago', read: false },
    { id: '2', type: 'message', content: 'User2 sent you a direct message', time: '1 hour ago', read: false },
    { id: '3', type: 'server', content: 'You were added to Server1', time: '1 day ago', read: true },
  ]);

  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const count = notifications.filter(n => !n.read).length;
    setUnreadCount(prev => count);
  }, [notifications]);

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  return (
    <div className="bg-gray-800 p-4 rounded-lg">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-semibold">Notifications</h3>
        {unreadCount > 0 && (
          <button 
            onClick={markAllAsRead}
            className="text-xs text-blue-400 hover:text-blue-300"
          >
            Mark all as read
          </button>
        )}
      </div>
      
      {notifications.length === 0 ? (
        <p className="text-gray-400 text-sm text-center py-2">No notifications</p>
      ) : (
        <div className="space-y-2 max-h-60 overflow-y-auto">
          {notifications.map((notification) => (
            <div 
              key={notification.id} 
              className={`p-2 rounded ${
                notification.read ? 'bg-gray-700' : 'bg-blue-900/30 border border-blue-700/50'
              }`}
            >
              <div className="flex justify-between">
                <span className="text-sm">{notification.content}</span>
                {!notification.read && (
                  <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                )}
              </div>
              <div className="flex justify-between items-center mt-1">
                <span className="text-xs text-gray-400">{notification.time}</span>
                {!notification.read && (
                  <button 
                    onClick={() => markAsRead(notification.id)}
                    className="text-xs text-blue-400 hover:text-blue-300"
                  >
                    Mark as read
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}