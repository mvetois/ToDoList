import express, { Express } from "express";

import router from "./router/index";

const app : Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.listen(3000, () : void => {
    console.log("Api up !");
});

app.use("/api", router)