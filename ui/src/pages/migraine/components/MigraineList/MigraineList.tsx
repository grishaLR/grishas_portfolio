import React from 'react';
import { useGetMigrainesQuery } from '../../../../redux/api/migraineApi';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Typography, CircularProgress, Box, Alert } from '@mui/material';

export interface Migraine {
  _id: string;
  name?: string;
  date_started: string;
  date_ended: string;
  type: {
    _id: string;
    name: string;
  };
}
export default (() => {
  const { data: migraines, error, isLoading } = useGetMigrainesQuery();

  if (isLoading)
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  if (error) return <Alert severity="error">Error loading migraines</Alert>;

  const columns: GridColDef[] = [
    {
      field: 'name',
      headerName: 'Name',
      width: 150,
    },
    { field: 'date_started', headerName: 'Date Started', width: 150 },
    { field: 'date_ended', headerName: 'Date Ended', width: 150 },
    {
      field: 'type',
      headerName: 'Type',
      width: 150,
      renderCell: (params) => params.row.type?.name || 'Unknown',
    },
  ];

  return (
    <Box>
      <Typography variant="h4" component="h2" gutterBottom>
        Migraines
      </Typography>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={migraines || []}
          columns={columns}
          pageSizeOptions={[5, 10, 20]}
          sortingOrder={['asc', 'desc']}
          pagination
          loading={isLoading}
          getRowId={(row: Migraine) => row._id}
        />
      </div>
    </Box>
  );
}) as React.FC;
