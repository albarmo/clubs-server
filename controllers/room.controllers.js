const { Room, Message, User } = require( "../models" );

class RoomController
{
  static async getRooms( req, res )
  {
    try {
      const rooms = await Room.findAll( {
        include: {
          model: User,
          attributes: [ 'id', 'email', 'nickname', "fullname" ],
          order: [ [ 'title', 'ASC' ] ],
        }
      } )
      return res.status( 200 ).json( rooms )

    } catch ( error ) {
      return res.status( 500 ).json( { error } )
    }
  }

  static async createRoom( req, res )
  {
    try {
      const isRoomExist = await Room.findAll( {
        where: {
          user1: req.userData.id,
          user2: req.body.user2
        }
      } )

      if ( isRoomExist?.length ) {
        return res.status( 500 ).json( { message: "Room already exist" } )
      } else {
        let roomPayload = {
          type: 'public',
          user1: req.userData.id,
          user2: req.body.user2,
        };
        const create = await Room.create( roomPayload )
        return res.status( 202 ).json( create )
      }


    } catch ( error ) {
      return res.status( 500 ).json( error )
    }
  }

  static async deleteRoom( req, res )
  {
    const roomId = req.params.id
    try {
      const deleteRoom = await Room.destroy( { where: { id: roomId } } )
      return res.status( 200 ).json( { message: 'success delete room', affectedRow: deleteRoom } )

    } catch ( error ) {
      return res.status( 200 ).json( { message: error.data.message } )
    }
  }
}

module.exports = RoomController;
