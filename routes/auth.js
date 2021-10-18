const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos, validarJWT } = require('../middlewares');

const { login, googleSignIn, renovarToken } = require('../controllers/auth');



const router = Router();


router.post('/login', [
    
    check('correo', 'El correo es obligatorio').isEmail(),
    check('contraseña', 'La contraseña es obligatoria').not().isEmpty(),
    validarCampos
], login  );  //Se importa el controlador 'login'
//No se pone auth/login porque ya esta puesto en el const de la clase Router


router.post('/google', [
    
    check('id_token', 'id_token es necesario').not().isEmpty(),
    
    validarCampos
], googleSignIn  );


router.get('/', validarJWT, renovarToken )


module.exports =  router; 