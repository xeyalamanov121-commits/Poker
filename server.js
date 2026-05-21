const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const PokerGame = require('./game/PokerGame');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, { cors: { origin: "*" } });

app.use(cors());
app.use(express.json());

// ... (Burada yuxarıda göndərdiyiniz socket.io və API məntiqi yerləşir)

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server ${PORT} portunda işə düşdü.`);
});

