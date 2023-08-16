import Hapi from '@hapi/hapi'
import routes from './routes';
import { db } from './database';
import * as admin from 'firebase-admin'; 
import credentials from '../credentials.json'

// setting up firebase 
admin.initializeApp({
    credential: admin.credential.cert(credentials),
});

let server; 

const start = async () => {
    server = Hapi.server({
        port: 8000, 
        host: 'localhost', 
    });

    // adding the routes in the array to server
    routes.forEach(route => server.route(route))

    db.connect();

    await server.start();
    console.log(`Server is listening on ${server.info.uri}`);
    
}

process.on('unhandledRejection', err => {
    console.log(err); 
    process.exit(1);
}); 

// handle manual killing of server (ctrl C)
process.on('SIGINT', async () => {
    console.log("Stopping server..."); 
    await server.stop({timeout: 10000}); 
    db.end(); 
    console.log('Server stopped'); 
    process.exit(0)
});

start();

