import express, { Request, Response } from 'express';
import { errorHandler } from './middlewares/errorHandler';
import path from 'path';
import { indexRoutes, profileRoutes } from './routes';
import { testSupabaseConnection, onStartIntervalTestSupabaseConnection } from './controllers/supabaseController';

// testSupabaseConnection();
onStartIntervalTestSupabaseConnection();

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use('/', indexRoutes);
app.use('/api', profileRoutes);

// Global error handler (should be after routes)
app.use(errorHandler);

export default app;