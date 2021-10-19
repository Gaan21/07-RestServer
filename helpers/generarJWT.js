const jwt = require('jsonwebtoken');



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


module.exports = {
    generarJWT
}