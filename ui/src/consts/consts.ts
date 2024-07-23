import { GridColDef } from '@mui/x-data-grid';

export const BASE_URL: string = 'http://localhost:3000/api';

export const DEFAULT_TEXT: string = 'Hello Ramp';

export const LOADING_TEXT: string = 'Loading...';

export const ERROR_TEXT: string = 'Error loading your application. Please contact support.';

export const HALF_SECOND_TIMEOUT: number = 500;

export const DORMANT_TIMEOUT: number = 6000;

export const FPL_GRID_COLUMNS: GridColDef[] = [
  { field: 'web_name', headerName: 'Name', width: 150 },
  { field: 'now_cost', headerName: 'Price', width: 100 },
  { field: 'total_points', headerName: 'Points', width: 100 },
  { field: 'team', headerName: 'Team', width: 100 },
  { field: 'minutes', headerName: 'Minutes', width: 100 },
  { field: 'goals_scored', headerName: 'Goals Scored', width: 150 },
  { field: 'assists', headerName: 'Assists', width: 100 },
  { field: 'clean_sheets', headerName: 'Clean Sheets', width: 150 },
  { field: 'goals_conceded', headerName: 'Goals Conceded', width: 150 },
  { field: 'saves', headerName: 'Saves', width: 100 },
  { field: 'bonus', headerName: 'Bonus', width: 100 },
  { field: 'bps', headerName: 'BPS', width: 100 },
  { field: 'influence', headerName: 'Influence', width: 150 },
];
