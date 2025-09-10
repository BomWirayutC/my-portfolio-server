import { Router, Request, Response } from 'express';
import path from 'path';

const router = Router();

router.get("/", (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, "..", "components", "index.html"));
});
router.get('/about', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, "..", "components", "about.html"));
});

export default router;