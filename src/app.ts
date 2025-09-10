import express, { Request, Response } from 'express';
import { errorHandler } from './middlewares/errorHandler';
import path from 'path';
import { indexRoutes, itemRoutes } from './routes';
import { testSupabaseConnection, onStartIntervalTestSupabaseConnection } from './controllers/supabaseController';

testSupabaseConnection();
onStartIntervalTestSupabaseConnection();

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use('/', indexRoutes);
app.use('/api', itemRoutes);

// Global error handler (should be after routes)
app.use(errorHandler);

export default app;