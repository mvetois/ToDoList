import express, { Express } from "express";

import cors from "cors";

import router from "./router/index";
import swagger from "./router/swagger";

const app : Express = express();

app.set("trust-proxy", 1);
app.use(cors({
    origin: "*"
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.listen(3001, () : void => {
    console.log("Api up !");
});

app.use("/api", router);
app.use("/doc", swagger);