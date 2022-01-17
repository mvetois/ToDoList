import { Router } from "express";
import swaggerJsDoc, { Options } from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const router: Router = Router();

const swaggerOptions: Options = {
    swaggerDefinition: {
        openapi: "3.0.3",
        components: {},
        info: {
            version: "1.0.0",
            title: "ToDoList API",
            description: "An API used to create and update a ToDo List",
            contact: {
                name: "mvetois"
            },
            servers: ["http://localhost:3001/"]
        }
    },
    apis: ["./src/router/**/*.ts"]
};

router.use("/", swaggerUi.serve, swaggerUi.setup(swaggerJsDoc(swaggerOptions)));


export default router;