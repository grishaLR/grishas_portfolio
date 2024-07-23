import React, { useState, useEffect } from 'react';
import type { Team } from 'src/types';

interface HeaderProps {
  onFilterChange: (filters: any) => void;
  teams: Team[];
}

const Header: React.FC<HeaderProps> = ({ teams, onFilterChange }) => {
  const [name, setName] = useState('');
  const [team, setTeam] = useState('');

  useEffect(() => {
    onFilterChange({ name, team });
  }, [name, team]);

  return (
    <div className="header">
      <h1>Fpl Stats</h1>
      <div className="filters">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="filter-input"
        />
        <select value={team} onChange={(e) => setTeam(e.target.value)} className="filter-input">
          <option value="">All Teams</option>
          {teams?.map(({ name }) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Header;
