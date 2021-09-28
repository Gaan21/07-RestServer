
const express = require('express');
const cors = require('cors');


class Server {

    constructor() { //En el constructor se declaran las propiedades en javascript

        this.app = express(); //Creamos la app de express como propiedad en la clase
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';

        //Midlewares:  Funciones que se van a ejecutar siempre cuando levantemos el servidor
        this.middlewares();

        //Rutas de mi app:
        this.routes();
    }


    middlewares() {

        //CORS: te quita muchos errores con navegadores. Protege el servidor de manera superficial.
        this.app.use( cors() );

        //Lectura y parseo del body:
        this.app.use( express.json() ); //cualquier info que venga la intenta serializar a JSON.

        //Directorio publico:   //Sirve el contenido que hay en la carpeta public en index.html
        this.app.use( express.static('public') ); 
    }

    
    routes() {
            //Midleware condicional, se solicita a /usuarios y se llama a /routes/user
      this.app.use(this.usuariosPath, require('../routes/user'));
      //Nuevo path que hay que poner en el navegador
    }


    listen(){
        
        this.app.listen( this.port, () => {

            console.log('Servidor corriendo en el puerto: ', this.port )
        });
    }
}


module.exports = Server;