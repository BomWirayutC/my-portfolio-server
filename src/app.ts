import express, { Request, Response } from 'express';
import itemRoutes from './routes/itemRoutes';
import { errorHandler } from './middlewares/errorHandler';
import path from 'path';

const app = express();

app.use(express.json());

// Routes
app.use(express.static(path.join(__dirname, "public")));
app.get("/", (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, "components", "index.html"));
});
app.get('/about', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, "components", "about.html"));
});
app.use('/api', itemRoutes);

// Global error handler (should be after routes)
app.use(errorHandler);

export default app;