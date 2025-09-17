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
    await onDailyInsertData();
    res.status(200).json({ status: "OK", message: "Health check updated" });
});

export default router;