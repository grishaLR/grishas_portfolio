import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import { useAddMigraineTypeMutation } from '../../../../redux/api/migraineApi';

export default (() => {
  const [name, setName] = useState('');
  const [addMigraineType] = useAddMigraineTypeMutation();

  const handleAddType = async () => {
    try {
      await addMigraineType(name);
      setName('');
    } catch (error) {
      console.error('Failed to add migraine type:', error);
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <TextField
        label="Migraine Type Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter migraine type name"
      />
      <Button variant="contained" color="primary" onClick={handleAddType}>
        Add Migraine Type
      </Button>
    </Box>
  );
}) as React.FC;
