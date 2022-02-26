const routes = require("express")();
const UserController = require("../controllers/userControllers");
const UserControllers = require("../controllers/userControllers");
const { route } = require("./chatRouter");

routes.get("/", UserController.getAllUsers);
routes.post("/register", UserController.register);
routes.post("/login", UserController.login);
routes.delete("/:id", UserController.deleteAccount);

module.exports = routes;
