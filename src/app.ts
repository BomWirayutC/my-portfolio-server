import express from 'express';
import cors from 'cors';
import { errorHandler } from './middlewares/errorHandler';
import path from 'path';
import { indexRoutes, profileRoutes, SkillsRoutes } from './routes';
import { onDailyInsertData, onStartIntervalOnDailyInsertData } from './controllers/supabaseController';
import { isOnVercelEnv } from './utils/healper';

if (isOnVercelEnv()) {
    onDailyInsertData();
}
onStartIntervalOnDailyInsertData();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use('/', indexRoutes);
app.use('/api', profileRoutes);
app.use('/api', SkillsRoutes);

// Global error handler (should be after routes)
app.use(errorHandler);

export default app;