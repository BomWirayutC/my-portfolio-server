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
    projectRoutes,
} from './routes';
import { checkAuthentication } from './middlewares/checkAuthentication';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Middlewares
app.use(errorHandler);
app.use(checkAuthentication);

// Routes
app.use('/', indexRoutes);
[profileRoutes, skillsRoutes, certificateRoutes, fileRoutes, projectRoutes].forEach(route => {
    app.use('/api', route);
});

export default app;