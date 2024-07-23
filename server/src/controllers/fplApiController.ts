import { Request, Response } from 'express';
import axios from 'axios';

export const getFPLData = async (req: Request, res: Response) => {
  try {
    const response = await axios.get('https://fantasy.premierleague.com/api/bootstrap-static/');
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching data from Fantasy Premier League API', error });
  }
};
