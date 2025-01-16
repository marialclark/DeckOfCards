import { useState, useEffect } from 'react';
import Card from './Card';
import axios from 'axios';
import './Deck.css';

const Deck = () => {
  const [deck, setDeck] = useState(null);
  const [cards, setCards] = useState([]);
  const [isShuffling, setIsShuffling] = useState(false);

  useEffect(() => {
    async function fetchDeck() {
      const res = await axios.get('https://deckofcardsapi.com/api/deck/new/shuffle/');
      setDeck(res.data);
    }
    fetchDeck();
  }, []);

  async function drawCard() {
    if (!deck) return;

    try {
      const res = await axios.get(`https://deckofcardsapi.com/api/deck/${deck.deck_id}/draw/?count=1`);
      if (res.data.remaining === 0) {
        alert('Error: no cards remaining!');
        return;
      }
      setCards([...cards, ...res.data.cards]);
    } catch (err) {
      console.error(err);
    }
  }

  async function shuffleDeck() {
    if (!deck) return;
  
    setIsShuffling(true); // Disable the button while shuffling
    try {
      await axios.get(`https://deckofcardsapi.com/api/deck/${deck.deck_id}/shuffle/`);
      setCards([]); // Clear the displayed cards
    } catch (err) {
      console.error(err);
    } finally {
      setIsShuffling(false); // Re-enable the button
    }
  }

  return (
    <div className="Deck-container">
      <button className="Deck-button" onClick={drawCard}>Draw a Card</button>
      <div className="Card-stack">
        {cards.map((card, idx) => (
          <Card 
            key={card.code} 
            image={card.image} 
            name={`${card.value} of ${card.suit}`} 
            style={{ zIndex: idx }}
          />
        ))}
      </div>
      <button className="Deck-button" onClick={shuffleDeck} disabled={isShuffling}>
        {isShuffling ? "Shuffling..." : "Shuffle Deck"}
      </button>
    </div>
  );
}

export default Deck;