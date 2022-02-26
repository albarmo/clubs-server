const { Message } = require( "../models" );

const authorization = ( req, res, next ) =>
{
  Message.findOne( { where: { id: req.params.id } } )
    .then( ( data ) =>
    {
      if ( !data ) {
        return res.status( 404 ).json( { mesage: "data not found!" } );
      } else if ( data.senderId !== req.userData.id ) {
        return res
          .status( 401 )
          .json( { msg: "You dont have access to this message" } );
      } else {
        next();
      }
    } )
    .catch( ( error ) =>
    {
      return res.status( 500 ).json( { message: error.message } );
    } );
};

module.exports = authorization;
