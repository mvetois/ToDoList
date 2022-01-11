import { Router, Request, Response } from "express";

import { data } from "../db/data";

const router : Router = Router();

router.use("/", (req : Request, res : Response) => {
    res.status(200).json({ message: "Categories managment !" });
});

router.post("/add", (req : Request, res : Response) => {
    if (!req.body.name)
        return (res.status(400).json({error: "Error : name is missing !"}));
    if (data.find((o) => o.name == req.body.name))
        return (res.status(400).json({error: "Error : name is allready used !"}));
    data.push({name: req.body.name, items: []})
    return (res.status(200).json({message: "Category added !"}));
});

router.post("/rem", (req : Request, res : Response) => {
    if (!req.body.name)
        return (res.status(400).json({error: "Error : name is missing :"}));
    if (!data.find((o) => o.name == req.body.name))
        return (res.status(400).json({error: "Error : name is not defind !"}));
    data.splice(data.indexOf(data.find((o) => o.name == req.body.name)), 1);
    return (res.status(200).json({message: "Category removed !"}));
});

export default router;