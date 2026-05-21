const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const PokerGame = require('./game/PokerGame.js');

const app = express();
const server = http.createServer(app);

// CORS parametrləri - hər yerdən gələn sorğuya icazə verir
const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

app.use(cors());
app.use(express.json());

// --- API ENDPOINT-LƏR ---

// 1. Sağlamlıq yoxlanışı (Serverin işlədiyini yoxlamaq üçün)
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// 2. Otaqların siyahısını almaq
app.get('/api/rooms', (req, res) => {
  // Burada aktiv otaqların siyahısını qaytarırsınız
  res.json({ rooms: [] }); 
});

// --- SOCKET.IO MƏNTİQİ ---

io.on('connection', (socket) => {
  console.log(`Yeni oyunçu qoşuldu: ${socket.id}`);

  // Oyunçunun qeydiyyatı
  socket.on('register', (username) => {
    socket.emit('registered', { username, chips: 1000 });
  });

  // Otağa qoşulma
  socket.on('joinRoom', (roomId) => {
    socket.join(roomId);
    socket.to(roomId).emit('playerJoined', { id: socket.id });
  });

  // Oyun hərəkətləri
  socket.on('playerAction', (data) => {
    console.log('Oyunçu hərəkəti:', data);
    // Burada PokerGame sinfindən istifadə edib məntiqi işlədəcəksiniz
  });

  socket.on('disconnect', () => {
    console.log('Oyunçu ayrıldı');
  });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server uğurla ${PORT} portunda başladı.`);
});
