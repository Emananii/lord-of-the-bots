import React from 'react';
import '../Styles/Sortbar.css';

const BOT_CLASSES = ["Support", "Medic", "Assault", "Defender", "Captain", "Witch"];

function SortBar({ sortBy, setSortBy, selectedClasses, toggleClassFilter }) {
  return (
    <div className="sort-bar">
      <div className="sort-section">
        <label>Sort By: </label>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="">None</option>
          <option value="health">Health</option>
          <option value="damage">Damage</option>
          <option value="armor">Armor</option>
        </select>
      </div>

      <div className="filter-section">
        <label>Filter By Class:</label>
        <div className="class-filters">
          {BOT_CLASSES.map((botClass) => (
            <label key={botClass}>
              <input
                type="checkbox"
                checked={selectedClasses.includes(botClass)}
                onChange={() => toggleClassFilter(botClass)}
              />
              {botClass}
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SortBar;
