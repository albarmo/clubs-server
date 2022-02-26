const { comparePassword } = require( "../helpers/bcrypt" );
const { getToken } = require( "../helpers/jwt" );
const { User } = require( "../models" );

class UserController
{
  static getAllUsers( req, res )
  {
    User.findAll()
      .then( ( data ) =>
      {
        return res.status( 200 ).json( data );
      } )
      .catch( ( error ) =>
      {
        return res.status( 500 ).json( { error: error.message } );
      } );
  }

  static register( req, res )
  {
    let registerData = {
      fullname: req.body.fullname,
      nickname: req.body.nickname,
      status: req.body.status,
      email: req.body.email,
      phone: req.body.phone,
      password: req.body.password,
      type: 'public'
    };


    User.create( registerData )
      .then( ( dataRegister ) =>
      {
        return res.status( 201 ).json( dataRegister );
      } )
      .catch( ( error ) =>
      {
        return res.status( 500 ).json( { message: error.message } );
      } );
  }

  static login( req, res )
  {
    let dataLogin = {
      email: req.body.email,
      password: req.body.password,
    };

    User.findOne( {
      where: {
        email: dataLogin.email,
      },
    } )
      .then( ( data ) =>
      {
        if ( !data ) {
          res.status( 401 ).json( {
            name: "Failed Login",
            message: "Username / Password Wrong",
          } );
        } else if ( !comparePassword( dataLogin.password, data.password ) ) {
          res.status( 401 ).json( {
            name: "Failed Login",
            message: "Username / Password Wrong",
          } );
        } else {
          const access_token = getToken( { id: data.id, email: data.email } );
          return res.status( 200 ).json( { access_token } );
        }
      } )
      .catch( ( error ) =>
      {
        return res.status( 500 ).json( { message: error.message } );
      } );
  }

  static deleteAccount( req, res )
  {
    User.destroy( {
      where: { id: +req.params.id },
      returning: true,
    } )
      .then( ( data ) =>
      {
        return res.status( 200 ).json( data );
      } )
      .catch( ( error ) =>
      {
        return res.status( 500 ).json( { error: error.message } );
      } );
  }
}

module.exports = UserController;
