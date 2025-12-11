"use client";

import { useState, useEffect, useRef } from 'react';

export default function VoiceChat() {
  const [isMuted, setIsMuted] = useState(false);
  const [isDeafened, setIsDeafened] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [connected, setConnected] = useState(false);
  const mediaStreamRef = useRef<MediaStream | null>(null);

  // Simulate WebRTC connection
  useEffect(() => {
    // In a real app, this would connect to a WebRTC signaling server
    const connect = async () => {
      try {
        // Simulate getting user media
        // const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
        // mediaStreamRef.current = stream;
        setConnected(true);
        console.log('Voice chat connected');
      } catch (error) {
        console.error('Failed to connect to voice chat:', error);
      }
    };

    connect();

    return () => {
      const stream = mediaStreamRef.current;
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const toggleMute = () => {
    setIsMuted(!isMuted);
    // In a real app, this would mute/unmute the microphone
  };

  const toggleDeafen = () => {
    setIsDeafened(!isDeafened);
    // In a real app, this would mute/unmute the speakers
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    // In a real app, this would start/stop recording
  };

  return (
    <div className="bg-gray-800 p-4 rounded-lg">
      <h3 className="font-semibold mb-3">Voice Chat</h3>
      
      {!connected ? (
        <div className="text-center py-4 text-gray-400">
          Connecting to voice chat...
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <div className="flex space-x-4 mb-4">
            <button
              onClick={toggleMute}
              className={`p-3 rounded-full ${
                isMuted ? 'bg-red-500' : 'bg-gray-700 hover:bg-gray-600'
              }`}
              title={isMuted ? "Unmute" : "Mute"}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                {isMuted ? (
                  <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.617.784L4.16 13H4a1 1 0 01-1-1V8a1 1 0 011-1h.16l4.16-4.16a1 1 0 011.077-.277zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.21-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z" clipRule="evenodd" />
                ) : (
                  <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.617.784L4.16 13H4a1 1 0 01-1-1V8a1 1 0 011-1h.16l4.16-4.16a1 1 0 011.077-.277zM12.293 7.293a1 1 0 011.414 0L15 8.586l1.293-1.293a1 1 0 111.414 1.414L16.414 10l1.293 1.293a1 1 0 01-1.414 1.414L15 11.414l-1.293 1.293a1 1 0 01-1.414-1.414L13.586 10l-1.293-1.293a1 1 0 010-1.414z" clipRule="evenodd" />
                )}
              </svg>
            </button>
            
            <button
              onClick={toggleDeafen}
              className={`p-3 rounded-full ${
                isDeafened ? 'bg-red-500' : 'bg-gray-700 hover:bg-gray-600'
              }`}
              title={isDeafened ? "Undeafen" : "Deafen"}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                {isDeafened ? (
                  <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.617.784L4.16 13H4a1 1 0 01-1-1V8a1 1 0 011-1h.16l4.16-4.16a1 1 0 011.077-.277zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.21-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z" clipRule="evenodd" />
                ) : (
                  <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.617.784L4.16 13H4a1 1 0 01-1-1V8a1 1 0 011-1h.16l4.16-4.16a1 1 0 011.077-.277zM12.293 7.293a1 1 0 011.414 0L15 8.586l1.293-1.293a1 1 0 111.414 1.414L16.414 10l1.293 1.293a1 1 0 01-1.414 1.414L15 11.414l-1.293 1.293a1 1 0 01-1.414-1.414L13.586 10l-1.293-1.293a1 1 0 010-1.414z" clipRule="evenodd" />
                )}
              </svg>
            </button>
            
            <button
              onClick={toggleRecording}
              className={`p-3 rounded-full ${
                isRecording ? 'bg-red-500 animate-pulse' : 'bg-gray-700 hover:bg-gray-600'
              }`}
              title={isRecording ? "Stop Recording" : "Start Recording"}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
          
          <div className="text-sm text-gray-400">
            {isMuted ? 'Muted' : 'Unmuted'} • {isDeafened ? 'Deafened' : 'Undeafened'}
          </div>
        </div>
      )}
    </div>
  );
}