const routes = require( "express" ).Router();
const userRouter = require( "./userRouter.js" );
const roomRouter = require( './room.router' )
const messageRouter = require( './message.router' )

routes.use( "/user", userRouter );
routes.use( "/room", roomRouter );
routes.use( "/message", messageRouter );

module.exports = routes;
