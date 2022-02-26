const routes = require( "express" )();
const RoomController = require( "../controllers/room.controllers" );
const authentification = require( '../middlewares/Auth' );
const authorization = require( '../middlewares/Author' );


routes.use( authentification );
routes.get( "/", RoomController.getRooms );
routes.post( "/create", RoomController.createRoom );
routes.delete( "/:id", RoomController.deleteRoom );

module.exports = routes;
