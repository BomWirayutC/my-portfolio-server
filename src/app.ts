import express from 'express';
import cors from 'cors';
import { errorHandler } from './middlewares/errorHandler';
import path from 'path';
import {
    indexRoutes,
    profileRoutes,
    skillsRoutes,
    certificateRoutes,
    fileRoutes,
} from './routes';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use('/', indexRoutes);
[profileRoutes, skillsRoutes, certificateRoutes, fileRoutes].forEach(route => {
    app.use('/api', route);
});

// Global error handler (should be after routes)
app.use(errorHandler);

export default app;