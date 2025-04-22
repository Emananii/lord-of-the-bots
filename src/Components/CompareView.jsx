import React from 'react';
import BotCard from './BotCard';
import '../Styles/CompareView.css';

function CompareView({ bots, army, onBotClick }) {
  return (
    <div className="compare-view">
      <div className="compare-section">
        <h2>Bot Collection</h2>
        <div className="bot-grid">
          {bots.map(bot => (
            <BotCard 
              key={bot.id} 
              bot={bot} 
              handleClick={() => onBotClick(bot)} 
              isInArmy={false}
            />
          ))}
        </div>
      </div>

      <div className="vs-divider">⚔️</div>

      <div className="compare-section">
        <h2>Your Bot Army</h2>
        {army.length === 0 ? (
          <p className="empty-message">You have no warriors in your ranks. Choose wisely.</p>
        ) : (
          <div className="bot-grid">
            {army.map(bot => (
              <BotCard 
                key={bot.id} 
                bot={bot} 
                handleClick={() => onBotClick(bot)} 
                isInArmy={true}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default CompareView;
