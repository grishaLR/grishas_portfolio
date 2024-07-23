import React, { useState, useEffect } from 'react';
import { DataGrid, GridColDef, GridPaginationModel } from '@mui/x-data-grid';
import { CircularProgress } from '@mui/material';
import { FPL_GRID_COLUMNS, ERROR_TEXT } from '@consts';
import { useGetFPLDataQuery } from '../../redux/api/fplApi';
import Header from './components/Header/Header';
import type { Player, Team } from 'src/types';
import './styles.css';

export default (() => {
  const { data, error, isLoading } = useGetFPLDataQuery();
  const [filteredRows, setFilteredRows] = useState<Player[]>([]);
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    pageSize: 10,
    page: 0,
  });
  const teamName = (player: Player, allTeams: Team[]) => {
    const team = allTeams.find((team: Team) => team.id === player.team);
    return team ? team.name : 'Unknown';
  };
  const allTeams = data?.teams;

  const allPlayers: Player[] = data?.elements.map((player: Player) => ({
    ...player,
    team: teamName(player, allTeams),
  }));

  useEffect(() => {
    if (data) {
      setFilteredRows(allPlayers);
    }
  }, [data]);

  const handleFilterChange = (filters: any) => {
    setFilteredRows(
      allPlayers?.filter(
        (player: Player) =>
          (filters.name === '' ||
            player.web_name.toLowerCase().includes(filters.name.toLowerCase())) &&
          (filters.team === '' || player.team === filters.team)
      )
    );
  };

  if (error) return <div>{ERROR_TEXT}</div>;

  return (
    <div className="container">
      <Header onFilterChange={handleFilterChange} teams={allTeams} />
      <div className="grid-container">
        <DataGrid
          rows={filteredRows}
          columns={FPL_GRID_COLUMNS}
          paginationModel={paginationModel}
          onPaginationModelChange={(newModel) => setPaginationModel(newModel)}
          pageSizeOptions={[10, 20, 50]}
          sortingOrder={['asc', 'desc']}
          pagination
          loading={isLoading}
          getRowId={(row) => row.id}
        />
      </div>
    </div>
  );
}) as React.FC;
