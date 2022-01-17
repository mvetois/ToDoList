import { Router, Request, Response } from "express";

import { data, IData, ICategories } from "../db/data";

const router : Router = Router();



/**
 * @swagger
 * components:
 *   schemas:
 *     Data:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Name of the category.
 *           example: List
 *         items:
 *           type: IData[]
 *           description: Item in the category.
 *           example: [{name : "Obj 1", checked: true}, {name: "Obj 2", checked: false}]
 */

/**
 * @swagger
 * /api/data:
 *   get:
 *     description: Use to request data about the cities with the name.
 *     tags:
 *       - API
 *       - Data
 *     responses:
 *       200:
 *         description: Sucess!
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Data'
 */

router.get("/", (req : Request, res : Response) => {
    res.status(200).json(data);
});

export default router;