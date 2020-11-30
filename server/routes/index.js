const routes = require("express").Router();
const userRouter = require("./userRouter.js");
const chatRouter = require("./chatRouter.js");
const authentification = require("../middlewares/Auth");

routes.use("/users", userRouter);
// chat needs to authentification
routes.use(authentification);
routes.use("/chats", chatRouter);

module.exports = routes;
