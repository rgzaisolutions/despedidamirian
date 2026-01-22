import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import groupRoutes from './routes/groups.js';
import itineraryRoutes from './routes/itinerary.js';
import voteRoutes from './routes/votes.js';
import checklistRoutes from './routes/checklist.js';
import potRoutes from './routes/pot.js';

dotenv.config({ path: '../.env' });
console.log('DB Config:', {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME
});

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(helmet());
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization', 'x-group-id', 'x-group-pin']
}));
app.use(express.json({ limit: '10mb' }));

// Health Check
app.get('/health', (req, res) => {
    res.json({ status: 'ok', time: new Date().toISOString() });
});

// Routes
app.use('/api/groups', groupRoutes);
app.use('/api/itinerary', itineraryRoutes);
app.use('/api/votes', voteRoutes);
app.use('/api/checklist', checklistRoutes);
app.use('/api/pot', potRoutes);

// Start server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
