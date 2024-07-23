import React, { useState, useEffect } from 'react';
import type { Team } from 'src/types';
import {
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
} from '@mui/material';

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
    <Box
      className="header"
      sx={{
        padding: 2,
        backgroundColor: '#f5f5f5',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxSizing: 'border-box',
      }}
    >
      <Typography variant="h4">Fpl Stats</Typography>
      <Box className="filters" sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <TextField
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          variant="outlined"
          size="small"
        />
        <FormControl variant="outlined" size="small">
          <InputLabel>Team</InputLabel>
          <Select value={team} onChange={(e) => setTeam(e.target.value)} label="Team">
            <MenuItem value="">
              <em>All Teams</em>
            </MenuItem>
            {teams?.map(({ name }) => (
              <MenuItem key={name} value={name}>
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </Box>
  );
};

export default Header;
