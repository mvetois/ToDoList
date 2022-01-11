import { Router, Request, Response } from "express";

import { data } from "../db/data";

const router : Router = Router();

router.get("/", (req : Request, res : Response) => {
    res.status(200).json(data);
});

export default router;