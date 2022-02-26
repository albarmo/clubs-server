const routes = require( "express" )();
const MessageController = require( "../controllers/mesage.controllers" );
const authentification = require( '../middlewares/Auth' );
const authorization = require( '../middlewares/Author' );

routes.use( authentification );
routes.get( "/:roomId", MessageController.getMessages );
routes.post( "/send", MessageController.sendMessage );

routes.put( "/:id", authorization, MessageController.updateMessage );
routes.delete( "/:id", authorization, MessageController.deleteMessage );

module.exports = routes;
