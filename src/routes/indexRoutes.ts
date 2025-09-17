import { Router, Request, Response } from 'express';
import path from 'path';
import { onDailyInsertData } from "../controllers/supabaseController";

const router = Router();

router.get("/", (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, "..", "components", "index.html"));
});
router.get('/about', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, "..", "components", "about.html"));
});
router.all("/daily_app_health", async (req: Request, res: Response) => {
    if (req.query.secret !== process.env.CRON_SECRET) {
        return res.status(401).json({ "status": "false", "message": "unauthorized" });
    }
    try {
        await onDailyInsertData();
        res.status(200).json({ "status": "OK", "message": "Health check updated" });
    } catch (e) {
        res.status(500).json({ "status": "Error", "message": `Health check failed: ${e}` });
    }
});

export default router;