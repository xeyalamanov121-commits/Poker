/**
 * PokerGame.js - Oyunun əsas məntiqi
 */
class PokerGame {
  constructor(roomId) {
    this.roomId = roomId;
    this.players = [];
    this.status = 'waiting';
  }

  // Oyunçu hərəkətini emal et
  playerAction(playerId, action, amount) {
    // Burada hərəkət məntiqini (fold, call, raise) yazacaqsınız
    return { valid: true, message: 'Hərəkət qəbul edildi' };
  }

  // Yeni raund başla
  startNewRound(players, minBet) {
    this.players = players;
    this.status = 'playing';
  }

  // Oyun vəziyyətini qaytar
  getGameState() {
    return { status: this.status, players: this.players };
  }

  reset() {
    this.status = 'waiting';
  }
}

module.exports = PokerGame;

