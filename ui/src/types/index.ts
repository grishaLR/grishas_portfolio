export interface Player {
  // information used in grid
  web_name: string;
  now_cost: number;
  total_points: number;
  team: number;
  minutes: number;
  goals_scored: number;
  assists: number;
  clean_sheets: number;
  goals_conceded: number;
  saves: number;
  bonus: number;
  bps: number;
  influence: string;

  // not used in app
  id: number;
  first_name: string;
  second_name: string;
  points_per_game: string;
  form: string;
  own_goals: number;
  penalties_saved: number;
  penalties_missed: number;
  yellow_cards: number;
  red_cards: number;
  creativity: string;
  threat: string;
  ict_index: string;
}

export interface Team {
  name: string;
  id: number;
}
