import React from 'react';
import '../Styles/Botcard.css';

function BotCard({ bot, handleClick, isInArmy = false }) {
  const { name, bot_class, catchphrase, avatar_url, health, damage, armor } = bot;

  return (
    <div className={`bot-card ${isInArmy ? 'in-army' : ''}`} onClick={handleClick}>
      <img src={avatar_url} alt={`${name} avatar`} className="bot-avatar" />

      <div className="bot-info">
        <h3>{name}</h3>
        <p className="bot-class">{bot_class}</p>
        <p className="catchphrase">"{catchphrase}"</p>

        <div className="stats">
          <p>❤️ {health}</p>
          <p>💥 {damage}</p>
          <p>🛡️ {armor}</p>
        </div>
      </div>
    </div>
  );
}

export default BotCard;
