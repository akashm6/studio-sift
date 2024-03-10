import React, { useState } from 'react';
import './GamesCard.css'; 

const GamesCard = (props) => {
  const [sortOrder, setSortOrder] = useState({ column: 'release', direction: 'asc' });

  const handleSort = (column) => {
    setSortOrder((prevSortOrder) => ({
      column,
      direction: prevSortOrder.direction === 'asc' ? 'desc' : 'asc',
    }));
  };

  const sortedGames = [...props.games].sort((a, b) => {
    const compareValue = (valueA, valueB) => {
      if (valueA === 'N/A' && valueB !== 'N/A') return 1;
      if (valueA !== 'N/A' && valueB === 'N/A') return -1;

      if (valueA < valueB) return -1;
      if (valueA > valueB) return 1;
      return 0;
    };

    const { column, direction } = sortOrder;

    if (column === 'name' || column === 'platforms' || column === 'tags' || column === 'stores') {
      return compareValue(a[column].toLowerCase(), b[column].toLowerCase()) * (direction === 'asc' ? 1 : -1);
    } else if (column === 'release') {
      return compareValue(new Date(a[column]), new Date(b[column])) * (direction === 'asc' ? 1 : -1);
    } else if (column === 'rating') {
      return compareValue(a[column] || 'N/A', b[column] || 'N/A') * (direction === 'asc' ? 1 : -1);
    }

    return 0;
  });

  return (
    <div className="games-card-container">
      <h3 className="games-card-title">Game Information</h3>
      <div className="sort-buttons">
        <button className = 'sort-button' onClick={() => handleSort('name')}>Sort by Name</button>
        <button className = 'sort-button' onClick={() => handleSort('release')}>Sort by Release Date</button>
        <button className = 'sort-button' onClick={() => handleSort('rating')}>Sort by Rating</button>
      </div>
      <table className="games-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Release Date</th>
            <th>Metacritic Rating</th>
            <th>Stores</th>
            <th>Platforms</th>
            <th>Tags</th>
          </tr>
        </thead>
        <tbody>
          {sortedGames.map((game, index) => (
            <tr key={index}>
              <td>{game.name}</td>
              <td>{game.release || 'N/A'}</td>
              <td>{game.rating || 'N/A'}</td>
              <td>{game.stores}</td>
              <td>{game.platforms || 'N/A'}</td>
              <td>{game.tags || 'N/A'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GamesCard;
