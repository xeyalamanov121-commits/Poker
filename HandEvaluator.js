/**
 * Poker əl qiymətləndiricisi
 */
class HandEvaluator {
  static evaluateHand(playerCards, communityCards) {
    const allCards = [...playerCards, ...communityCards];
    
    if (allCards.length < 5) {
      return { rank: 0, name: 'Etibarsız Əl', cards: [], value: 0 };
    }
    // Bura qiymətləndirmə məntiqinizi tamamlaya bilərsiniz
  }
}
module.exports = HandEvaluator;

