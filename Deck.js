const Card = require('./Card');

/**
 * Kart göyərtəsi sinfi - 52 kartlı dəstə
 */
class Deck {
  constructor() {
    this.cards = [];
    this.reset();
  }

  reset() {
    this.cards = [];
    const suits = ['♠', '♥', '♦', '♣'];
    const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

    for (let suit of suits) {
      for (let rank of ranks) {
        this.cards.push(new Card(suit, rank));
      }
    }
  }

  shuffle() {
    for (let i = this.cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
    }
  }

  deal() {
    if (this.cards.length === 0) throw new Error('Dəstədə kart qalmadı!');
    return this.cards.pop();
  }
}

module.exports = Deck;

