import { io } from "socket.io-client";

// Render-də aldığınız URL-i bura daxil edin
const SOCKET_URL = "https://poker-backend-916d.onrender.com"; 

const socket = io(SOCKET_URL);

// Serverə qoşulduqda:
socket.on("connect", () => {
  console.log("Serverlə əlaqə yaradıldı!");
});

// Serverdən oyun vəziyyətini aldıqda:
socket.on("gameUpdate", (gameState) => {
  console.log("Yeni oyun vəziyyəti:", gameState);
  // Burada gələn məlumatı ekranda göstərin (məsələn: kartları yeniləyin)
});

// Serverə hərəkət göndərdikdə:
function sendAction(action, amount) {
  socket.emit("playerAction", { action, amount });
}
