
const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const { createServer } = require('http');

const { dbConnection } = require('../database/config');
const { socketController } = require('../sockets/controller');


class Server {

    constructor() { //En el constructor se declaran las propiedades en javascript

        this.app = express(); //Creamos la app de express como propiedad en la clase
        this.port = process.env.PORT;

        this.server = createServer( this.app );
        this.io     = require('socket.io')(this.server);

        //Paths para la autenticacion y para los usuarios
        this.paths = {
            auth:       '/api/auth'     ,
            buscar:     '/api/buscar'   ,
            usuarios:   '/api/usuarios' ,
            productos:  '/api/productos',
            categorias: '/api/categorias',
            uploads:    '/api/uploads'
        }
       
        //Conectar a base de datos:
        this.conectarDB();

        //Midlewares:  Funciones que se van a ejecutar siempre cuando levantemos el servidor
        this.middlewares();

        //Rutas de mi app:
        this.routes();

        //Sockets
        this.sockets();
    }


    async conectarDB() {

        await dbConnection();
    }


    middlewares() { //Todo esto se ejecuta antes de llegar a las rutas

        //CORS: te quita muchos errores con navegadores. Protege el servidor de manera superficial.
        this.app.use( cors() );

        //Lectura y parseo del body:
        this.app.use( express.json() ); //cualquier info que venga la intenta serializar a JSON.

        //Directorio publico:   //Sirve el contenido que hay en la carpeta public en index.html
        this.app.use( express.static('public') ); 

        //File upload - Carga de archivos
        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath: true //Para que cree una carpeta dentro de uploads si le mandamos 
            //una ruta con una carpeta nueva que no existe
        }));

       /*  this.app.use(bodyParser.urlencoded({ extended: false }));

        this.app.use(bodyParser.json()); */
    }

    
    routes() {
        //Definimos las rutas:
        this.app.use(this.paths.auth,       require('../routes/auth'));
        this.app.use(this.paths.buscar,     require('../routes/buscar'));

    //Midleware condicional, se solicita a /usuarios y se llama a /routes/user
        this.app.use(this.paths.usuarios,   require('../routes/user'));
    //Nuevo path que hay que poner en el navegador
        this.app.use(this.paths.categorias, require('../routes/categorias'));
        this.app.use(this.paths.productos,  require('../routes/productos'));
        this.app.use(this.paths.uploads,    require('../routes/uploads'))
    }


    sockets() {
        this.io.on('connection', ( socket ) => socketController(socket, this.io) )//NO ENTIENDO
    }


    listen(){
        
        this.server.listen( this.port, () => {

            console.log('Servidor corriendo en el puerto: ', this.port )
        });
    }
}


module.exports = Server;