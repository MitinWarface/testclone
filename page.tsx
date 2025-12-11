"use client";

import { useState } from 'react';
import ServerSidebar from './components/servers/ServerSidebar';
import ChannelSidebar from './components/channels/ChannelSidebar';
import ChatArea from './components/chat/ChatArea';
import PrivateMessagesList from './components/chat/PrivateMessagesList';
import ResponsiveLayout from './components/ResponsiveLayout';

export default function Home() {
  // State to toggle between server channels and private messages
  const [activeView, setActiveView] = useState<'server' | 'private'>('server');

  return (
    <ResponsiveLayout>
      {/* Server Sidebar */}
      <ServerSidebar />

      {/* Channel/Private Messages Sidebar */}
      {activeView === 'server' ? <ChannelSidebar /> : <PrivateMessagesList />}
      
      {/* Chat Area */}
      <ChatArea />
    </ResponsiveLayout>
  );
}