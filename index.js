import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import consultationRoutes from './src/routes/consultation.routes.js';
import { errorHandler } from './src/middle-ware/error.middleware.js';
import { connectDB } from './src/config/db.config.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: [
    'https://saryarka-solutions.kz',
    'http://localhost:3000',
    'https://outsource-website.vercel.app'
  ],
  methods: ['GET', 'POST', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
  credentials: true
}));

// Парсинг данных
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/consultation', consultationRoutes);
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Error handling
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

export default app;