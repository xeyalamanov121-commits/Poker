/**
 * Kart sinfi - poker kartını təmsil edir
 */
class Card {
  constructor(suit, rank) {
    this.suit = suit;   // ♠ ♥ ♦ ♣
    this.rank = rank;   // 2-10, J, Q, K, A
    this.value = this.getRankValue(rank);
  }

  getRankValue(rank) {
    const values = {
      '2': 2, '3': 3, '4': 4, '5': 5, '6': 6,
      '7': 7, '8': 8, '9': 9, '10': 10,
      'J': 11, 'Q': 12, 'K': 13, 'A': 14
    };
    return values[rank];
  }

  toString() {
    return `${this.rank}${this.suit}`;
  }

  toJSON() {
    return {
      suit: this.suit,
      rank: this.rank,
      value: this.value
    };
  }

  getColor() {
    return (this.suit === '♥' || this.suit === '♦') ? 'red' : 'black';
  }
}

module.exports = Card;
