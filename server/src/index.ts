import express, { Application } from 'express';
import mongoose from 'mongoose';
import axios from 'axios';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import migraineRoutes from './routes/migraineRoutes';
import migraineTypeRoutes from './routes/migraineTypeRoutes';
import fplApiRoutes from './routes/fplApiRoutes';

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB connection
const mongoUri = process.env.MONGO_URI;
console.log('MongoDB URI:', mongoUri); // Add this line

if (!mongoUri) {
  console.error('MongoDB connection error: MONGO_URI is not defined in .env file');
  process.exit(1);
}

mongoose
  .connect(mongoUri)
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

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, '../../ui/public')));

// For all GET requests, send back index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../ui/dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
