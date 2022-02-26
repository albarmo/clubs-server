const routes = require( "express" )();
const UserController = require( "../controllers/userControllers" );

routes.get( "/", UserController.getAllUsers );
routes.post( "/register", UserController.register );
routes.post( "/login", UserController.login );
routes.delete( "/:id", UserController.deleteAccount );

module.exports = routes;
