import axios from 'axios';

const API_URL = 'http://localhost:3000';

export const addMigraineType = async (name: string) => {
  try {
    const response = await axios.post(`${API_URL}/migraine-types`, { name });
    return response.data;
  } catch (error) {
    console.error('Error fetching FPL data:', error);
    throw error;
  }
};
