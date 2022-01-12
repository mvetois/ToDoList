import { Router, Request, Response } from "express";

import { data, ICategories } from "../db/data";

const router : Router = Router();

router.post("/add", (req : Request, res : Response) => {
    if (!req.body.name || !req.body.category)
        return (res.status(400).json({error: "Error : name or category is missing !"}));
    if (!data.find((o) => o.name == req.body.category))
        return (res.status(400).json({error: "Error : category is not created !"}));
    const category : ICategories = data.find((o) => o.name == req.body.category);
    if (category.items.length > 0 && category.items.find((o) => o.name == req.body.name))
        return (res.status(400).json({error: "Error : name is allready used !"}));
    data[data.indexOf(category)].items.push({name: req.body.name, checked: false});
    return (res.status(200).json({message: "Item added !"}));
});

router.post("/rem", (req : Request, res : Response) => {
    if (!req.body.name || !req.body.category)
        return (res.status(400).json({error: "Error : name or category is missing !"}));
    if (!data.find((o) => o.name == req.body.category))
        return (res.status(400).json({error: "Error : category is not created !"}));
    const category : ICategories = data.find((o) => o.name == req.body.category);
    if (!category.items.find((o) => o.name == req.body.name))
        return (res.status(400).json({error: "Error : name is not defined !"}));
        data[data.indexOf(category)].items.splice(data.indexOf(data.find((o) => o.name == req.body.name)), 1);
    return (res.status(200).json({message: "Item removed !"}));
});

export default router;