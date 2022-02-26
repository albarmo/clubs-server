const routes = require("express")();
const ChatsController = require("../controllers/chatController");
const authorization = require("../middlewares/Author");

routes.get("/", ChatsController.GetAllChats);
routes.post("/", ChatsController.SendMessages);
routes.delete("/:id", authorization, ChatsController.deleteMessage);

module.exports = routes;
