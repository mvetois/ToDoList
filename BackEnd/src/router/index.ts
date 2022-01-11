import { Router } from "express";

import categories from "./categories";
import items from "./items";
import checked from "./checked";
import data from "./data";

const router : Router = Router();

router.use("/categories", categories);
router.use("/items", items);
router.use("/checked", checked);
router.use("/data", data);

export default router;