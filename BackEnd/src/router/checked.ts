import { Router, Request, Response } from "express";

import { data, ICategories } from "../db/data";

const router : Router = Router();

router.post("/", (req : Request, res : Response) => {
    if (!req.body.name || !req.body.category)
        return (res.status(400).json({error: "Error : item name or category name is missing !"}));
    if (!data.find((o) => o.name == req.body.category))
        return (res.status(400).json({error: "Error : category is not created !"}));
    const category : ICategories = data.find((o) => o.name == req.body.category);
    if (category.items.length <= 0 || !category.items.find((o) => o.name == req.body.name))
        return (res.status(400).json({error: "Error : item not in the category !"}));
    const index : number = data[data.indexOf(category)].items.indexOf(category.items.find((o) => o.name == req.body.name));
    data[data.indexOf(category)].items[index].checked = data[data.indexOf(category)].items[index].checked == true ? false : true;
    return (res.status(200).json({message: "Item checked !"}));
});

export default router;