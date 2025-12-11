"use client";
import { useState, useEffect, useRef } from 'react';
import VoiceChat from './VoiceChat';
import FileUpload from './FileUpload';
import Notifications from './Notifications';

export default function ChatArea() {
  // Mock data for messages
  const [messages, setMessages] = useState([
    { id: '1', user: 'User1', content: 'Hello everyone!', timestamp: '10:00 AM' },
    { id: '2', user: 'User2', content: 'Hi User1!', timestamp: '10:01 AM' },
    { id: '3', user: 'User3', content: 'How is it going?', timestamp: '10:02 AM' },
  ]);

  const [newMessage, setNewMessage] = useState('');
  const wsRef = useRef<WebSocket | null>(null);

  // Initialize WebSocket connection
  useEffect(() => {
    // In a real app, connect to your WebSocket server
    // For demo purposes, we'll simulate connection
    console.log('Connecting to WebSocket...');
    
    // Simulate WebSocket connection
    const mockWs = {
      send: (data: string) => {
        console.log('Sending via WebSocket:', data);
        // Simulate receiving a message back
        setTimeout(() => {
          const simulatedMessage = {
            id: (messages.length + 1).toString(),
            user: 'SimulatedUser',
            content: 'This is a simulated message from WebSocket',
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          };
          setMessages(prev => [...prev, simulatedMessage]);
        }, 1000);
      },
      close: () => {},
    };
    
    wsRef.current = mockWs as any;

    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, []);

  const handleSendMessage = () => {
    if (newMessage.trim() === '') return;

    const message = {
      id: (messages.length + 1).toString(),
      user: 'CurrentUser',
      content: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages([...messages, message]);
    setNewMessage('');
    
    // Send via WebSocket
    if (wsRef.current) {
      wsRef.current.send(JSON.stringify(message));
    }
  };

  return (
    <div className="flex flex-col h-full bg-gray-700">
      {/* Chat header */}
      <div className="h-12 px-4 py-3 bg-gray-600 flex items-center justify-between">
        <h2 className="font-semibold"># general</h2>
        <button className="hover:bg-gray-500 rounded p-1">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
          </svg>
        </button>
      </div>

      {/* Main chat area */}
      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
        {/* Messages container */}
        <div className="flex-1">
          {messages.map((message) => (
            <div key={message.id} className="flex mb-4">
              <div className="mr-3">
                <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center">
                  <span className="text-lg">U</span>
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-baseline">
                  <span className="font-semibold mr-2">{message.user}</span>
                  <span className="text-xs text-gray-400">{message.timestamp}</span>
                </div>
                <p className="text-gray-200">{message.content}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Voice Chat, File Upload, Notifications */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <VoiceChat />
          <FileUpload />
          <Notifications />
        </div>
      </div>

      {/* Message input */}
      <div className="p-4">
        <div className="bg-gray-600 rounded-lg p-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="w-full bg-transparent border-none focus:outline-none text-white placeholder-gray-400"
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
          />
        </div>
      </div>
    </div>
  );
}