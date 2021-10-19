const jwt = require('jsonwebtoken');
<<<<<<< HEAD

=======
const { Usuario } = require('../models')
>>>>>>> 0a27de5bce3bb7a5f08b06388a38dc9379a072c9


const generarJWT = ( uid = '') => { //Esta funcion al ser llamada recibe un userId
//Trabaja con callbacks asi que hay que generar una promesa manualmente.
//Hay que poner return para poder hacer un await al llamar a esta funcion
    return new Promise ((resolve, reject) =>{

        const payload = { uid }; //Se puede almacenar lo que quieras
        
        jwt.sign( payload, process.env.SECRETORPRIVATEKEY, {//Crear JWT
            expiresIn:'8h'//Opciones del token

        }, ( err, token) => { //Callback del token
            if (err) {
                console.log(err);
                reject('No se puedo generar el token')
            } else{
                resolve(token);
                //console.log(payload);
                //console.log(token);
            }
        })
    })

}


<<<<<<< HEAD
module.exports = {
    generarJWT
=======
const comprobarJWT = async( token = '') => {
    
    try {
        
        if ( token.length < 10 ) {
            return null;
        }

        const { uid } = jwt.verify( token, process.env.SECRETORPRIVATEKEY );

        const usuario = await Usuario.findById(uid);

        if (usuario) {
            if (usuario.estado) {
                return usuario
            } else {
                return null;
            }    
        } else {
            return null;
        }

    } catch (error) {
        return null;
    }
}


module.exports = {
    generarJWT,
    comprobarJWT
>>>>>>> 0a27de5bce3bb7a5f08b06388a38dc9379a072c9
}