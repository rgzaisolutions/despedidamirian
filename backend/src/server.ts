import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import groupRoutes from './routes/groups';
import itineraryRoutes from './routes/itinerary';
import voteRoutes from './routes/votes';
import checklistRoutes from './routes/checklist';
import potRoutes from './routes/pot';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(helmet());
app.use(cors({
    origin: process.env.CORS_ORIGIN || '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization', 'x-group-id', 'x-group-pin']
}));
app.use(express.json({ limit: '10mb' }));

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 200 // limit each IP to 200 requests per windowMs
});
app.use(limiter);

// Health Check
app.get('/health', (req, res) => {
    res.json({ status: 'ok', time: new Date().toISOString() });
});

// Routes
app.use('/api/groups', groupRoutes);
app.use('/api/itinerary', itineraryRoutes);
app.use('/api/votes', voteRoutes);
app.use('/api/checklist', checklistRoutes);

// Start server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
