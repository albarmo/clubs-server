const { Message } = require( "../models" );

class MessageController
{
  static async getMessages( req, res )
  {
    try {
      const messages = await Message.findAll( { where: { roomId: req.params.roomId } } )
      return res.status( 200 ).json( messages )

    } catch ( error ) {
      return res.status( 500 ).json( { error } )
    }
  }

  static async sendMessage( req, res )
  {
    try {
      let messagePayload = {
        senderId: req.userData.id,
        recipentId: req.body.recipentId,
        roomId: req.body.roomId,
        content: req.body.content,
        date: new Date()
      };
      const create = await Message.create( messagePayload )
      return res.status( 202 ).json( create )

    } catch ( error ) {
      return res.status( 500 ).json( error )
    }
  }


  static async updateMessage( req, res )
  {
    try {
      const updateMessage = await Message.update( { content: req.body.content }, {
        where: {
          id: req.params.id,
        },
        returning: true,
      } );

      return res.status( 200 ).json( updateMessage );
    } catch ( error ) {
      return res.status( 500 ).json( error );
    }
  }


  static async deleteMessage( req, res )
  {
    const messageId = req.params.id
    try {
      const deleteMessage = await Message.destroy( { where: { id: messageId } } )
      return res.status( 200 ).json( { message: 'success delete Message', affectedRow: deleteMessage } )

    } catch ( error ) {
      return res.status( 200 ).json( { message: error.data.message } )
    }
  }
}

module.exports = MessageController;
