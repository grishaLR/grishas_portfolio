import React, { useState } from 'react';
import {
  TextField,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Box,
  type SelectChangeEvent,
} from '@mui/material';
import {
  useAddMigraineMutation,
  useGetMigraineTypesQuery,
} from '../../../../redux/api/migraineApi';

export default (() => {
  const [name, setName] = useState('');
  const [dateStarted, setDateStarted] = useState('');
  const [dateEnded, setDateEnded] = useState('');
  const [migraineType, setMigraineType] = useState('');
  const {
    data: migraineTypes = [],
    error: typesError,
    isLoading: typesLoading,
  } = useGetMigraineTypesQuery();
  const [addMigraine] = useAddMigraineMutation();

  const handleAddMigraine = async () => {
    if (dateStarted && dateEnded) {
      try {
        await addMigraine({
          name,
          date_started: dateStarted,
          date_ended: dateEnded,
          type: migraineType,
        });
        setName('');
        setDateStarted('');
        setDateEnded('');
        setMigraineType('');
      } catch (error) {
        console.error('Failed to add migraine:', error);
      }
    }
  };

  if (typesLoading) return <div>Loading...</div>;
  if (typesError) return <div>Error loading migraine types</div>;

  const handleMigraineTypeChange = (event: SelectChangeEvent<string>) => {
    setMigraineType(event.target.value);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <TextField label="Migraine Name" value={name} onChange={(e) => setName(e.target.value)} />
      <TextField
        label="Date Started"
        type="date"
        value={dateStarted}
        onChange={(e) => setDateStarted(e.target.value)}
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField
        label="Date Ended"
        type="date"
        value={dateEnded}
        onChange={(e) => setDateEnded(e.target.value)}
        InputLabelProps={{
          shrink: true,
        }}
      />
      <FormControl>
        <InputLabel id="migraine-type-label">Migraine Type</InputLabel>
        <Select
          labelId="migraine-type-label"
          value={migraineType}
          onChange={handleMigraineTypeChange}
        >
          {migraineTypes.map((type: { _id: number; name: string }) => {
            return (
              <MenuItem key={type._id} value={type._id}>
                {type.name}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
      <Button variant="contained" color="primary" onClick={handleAddMigraine}>
        Add Migraine
      </Button>
    </Box>
  );
}) as React.FC;
