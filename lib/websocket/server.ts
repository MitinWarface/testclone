import { WebSocketServer, WebSocket } from 'ws';
import { createServer, IncomingMessage, Server } from 'http';

let wss: WebSocketServer | null = null;
let httpServer: Server | null = null;

export function initWebSocketServer() {
  if (wss) return wss;

  httpServer = createServer();
  wss = new WebSocketServer({ server: httpServer });

  wss.on('connection', (ws: WebSocket, req: IncomingMessage) => {
    console.log('New client connected');

    // Send welcome message
    ws.send(JSON.stringify({
      type: 'welcome',
      message: 'Connected to Discord clone WebSocket server'
    }));

    ws.on('message', (message: Buffer) => {
      console.log('Received:', message.toString());
      
      try {
        const data = JSON.parse(message.toString());
        
        // Broadcast message to all clients except sender
        wss!.clients.forEach((client) => {
          if (client !== ws && client.readyState === ws.OPEN) {
            client.send(JSON.stringify(data));
          }
        });
      } catch (error) {
        console.error('Error parsing message:', error);
      }
    });

    ws.on('close', () => {
      console.log('Client disconnected');
    });

    ws.on('error', (error: Error) => {
      console.error('WebSocket error:', error);
    });
  });

  // Start listening on port 8080
  const PORT = process.env.WS_PORT ? parseInt(process.env.WS_PORT) : 8080;
  httpServer.listen(PORT, () => {
    console.log(`WebSocket server listening on port ${PORT}`);
  });

  return wss;
}

export function getWebSocketServer() {
  return wss;
}