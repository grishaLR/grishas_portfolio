import express, { Application } from 'express';
import mongoose from 'mongoose';
import axios from 'axios';
import cors from 'cors';
import dotenv from 'dotenv';
import migraineRoutes from './routes/migraineRoutes';
import migraineTypeRoutes from './routes/migraineTypeRoutes';
import fplApiRoutes from './routes/fplApiRoutes';

const app: Application = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB connection
const mongoUri = process.env.MONGO_URI;
mongoose
  .connect(mongoUri || '')
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });

// Routes
app.use('/migraines', migraineRoutes);
app.use('/migraine-types', migraineTypeRoutes);

app.get('/api/fpl', async (req, res) => {
  try {
    const response = await axios.get('https://fantasy.premierleague.com/api/bootstrap-static/');
    res.json(response.data);
  } catch (error) {
    res.status(500).send('Error fetching data from Fantasy Premier League API');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
