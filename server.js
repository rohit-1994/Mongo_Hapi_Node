'use strict';


const Hapi           = require('hapi'),
    Config          = require('./Config'),
    Plugins         = require('./Plugins'),
    bootstrap = require('./Utils/bootstrap'),
    mongoose        = require('mongoose');
    global.ObjectId = mongoose.Types.ObjectId;



const Routes = require('./Routes');



// Create Server
let server = new Hapi.Server({
    app : {
        name : Config.APP_CONSTANTS.SERVER.APP_NAME
    },
    port     : Config.dbConfig.config.PORT,
    routes: {
        cors: true
    }
});


(async initServer => {

    await server.register(Plugins);

    await server.route(Routes);


    server.events.on('response', request => {
        console.log('info',`[${request.method.toUpperCase()} ${request.url.path} ](${request.response.statusCode}) : ${request.info.responded-request.info.received} ms`);
    });

    // Default Routes
    server.route({
        method: 'GET',
        path: '/',
        handler: (request, h) => {
            return 'WELCOME PEOPLE';
        },
        config: {
            auth: false
        }
    });

    server.ext('onRequest', async (request, h) => {
        request.headers['x-forwarded-host'] = (request.headers['x-forwarded-host'] || request.info.host);
        return h.continue;
    });


    // Start Server
    try {
        await server.start();
        console.log(server.info.uri);
    } catch (error) {

    }


})();

