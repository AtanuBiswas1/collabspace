import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

// 1. Create standard Node HTTP server with Express
const server = http.createServer(app);

// 2. Attach Socket.io to the HTTP server with CORS enabled
const io = new Server(server, {
  cors: {
    origin: '*', // Allow React Vite frontend
    methods: ['GET', 'POST']
  }
});

// 3. Health check route
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'CollabSpace Real-Time Engine' });
});

// 4. Socket.io Connection Event
io.on('connection', (socket) => {
  console.log(`⚡ User connected: ${socket.id}`);

  // When a user joins a specific project or channel room
  socket.on('join_room', ({ roomId, user }) => {
    socket.join(roomId);
    console.log(`👤 ${user?.name || socket.id} joined room: ${roomId}`);
    
    // Notify other users in the room
    socket.to(roomId).emit('user_joined', { user, socketId: socket.id });
  });

  // When someone types code
  socket.on('code_change', ({ roomId, code, file }) => {
    // Broadcast code change to everyone else in this room
    socket.to(roomId).emit('code_updated', { code, file });
  });

  // When someone sends a chat message
  socket.on('send_message', ({ roomId, message }) => {
    // Broadcast message to everyone in the room (including sender)
    io.to(roomId).emit('new_message', message);
  });

  // When user disconnects
  socket.on('disconnect', () => {
    console.log(`❌ User disconnected: ${socket.id}`);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 CollabSpace Real-Time Server running on http://localhost:${PORT}`);
});
