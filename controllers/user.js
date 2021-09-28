const { response, request } = require('express'); //Para poder poner res.algo


const userGet = (req = request, res = response ) => {
    //res.status
    const { q, nombre= 'No name', apikey, page = 1 , limit } = req.query;
    //Desestructuracion de argumentos para sacar lo que nos piden en la url

    res.json({
        msg: 'get API - controlador',
        q,
        nombre,
        apikey,
        page,
        limit
    })
  }

  const userPost = (req, res = response ) => {
    //const { nombre, edad } = req.body;
    const body = req.body; //Lo que solicita el usuario en el req.
    res.json({
        msg: 'get API - controlador',
        body
    })
  }

  const userPut = (req, res = response ) => {
    
    const id = req.params.userId;
    res.json({
        msg: 'get API - controlador',
        id
    })
  }

  const userPatch = (req, res = response ) => {
    
    res.json({
        msg: 'get API - controlador'
    })
  }

  const userDelete = (req, res = response ) => {
    
    res.json({
        msg: 'get API - controlador'
    })
  }

  
  

  module.exports = {
        userGet,
        userPost,
        userPut,
        userPatch,
        userDelete
  }