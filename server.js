const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const PokerGame = require('./game/PokerGame.js');

const app = express();
const server = http.createServer(app);

// CORS konfiqurasiyası
const io = socketIo(server, {
  cors: {
    origin: "*", 
    methods: ["GET", "POST"]
  }
});

app.use(cors());
app.use(express.json());

// Otaqları yadda saxlamaq üçün obyekt
const rooms = {};

// Sağlamlıq yoxlanışı
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', serverTime: new Date().toISOString() });
});

// Socket.io əlaqəsi
io.on('connection', (socket) => {
  console.log(`Oyunçu qoşuldu: ${socket.id}`);

  // 1. Yeni otaq yaratma
  socket.on('createRoom', () => {
    const roomId = uuidv4().substring(0, 6).toUpperCase();
    rooms[roomId] = new PokerGame(roomId);
    socket.join(roomId);
    socket.emit('roomCreated', roomId);
    console.log(`Yeni otaq yaradıldı: ${roomId}`);
  });

  // 2. Otağa qoşulma
  socket.on('joinRoom', (roomId) => {
    if (rooms[roomId]) {
      socket.join(roomId);
      socket.to(roomId).emit('playerJoined', { playerId: socket.id });
      // Oyun vəziyyətini yeni oyunçuya göndər
      socket.emit('gameState', rooms[roomId].getGameState());
    } else {
      socket.emit('error', 'Otaq tapılmadı!');
    }
  });

  // 3. Oyun hərəkətləri
  socket.on('playerAction', (data) => {
    const { roomId, action, amount } = data;
    const game = rooms[roomId];

    if (game) {
      game.playerAction(socket.id, action, amount);
      // Hər kəsə yenilənmiş vəziyyəti göndər
      io.to(roomId).emit('gameState', game.getGameState());
    }
  });

  socket.on('disconnect', () => {
    console.log(`Oyunçu ayrıldı: ${socket.id}`);
  });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server uğurla ${PORT} portunda başladı.`);
});
