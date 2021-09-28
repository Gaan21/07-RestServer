const { Router } = require('express');

const { userGet, userPut, userPost, userDelete, userPatch } = require('../controllers/user');


const router = Router();

router.get('/', userGet ); //No ejecutamos la funcion, sino que llamamos la referencia a la misma

  router.put('/:userId', userPut );

  router.post('/', userPost);

  router.delete('/', userDelete);

  router.patch('/', userPatch);


  module.exports = router;