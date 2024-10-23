const { Router } = require("express");
const appRouter = Router();
const appController = require("../controllers/app.controller");

appRouter.get("/getData", appController.getData);
appRouter.post("/getDataById", appController.getDataById);
appRouter.post("/uploadVectorToDb", appController.publishVector);
module.exports = appRouter;
