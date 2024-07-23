import axios from 'axios';
import { BASE_URL } from '@consts';

export const fetchFPLData = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/fpl`);
    return response.data;
  } catch (error) {
    console.error('Error fetching FPL data:', error);
    throw error;
  }
};
