'use strict';


let TokenManager = require('../Libs/tokenManager'),
    Config = require('../Config');


exports.plugin = {
    name: 'auth',
    register: async (server, options) => {
        await server.register(require('hapi-auth-jwt2'));
        server.auth.strategy(Config.APP_CONSTANTS.SCOPE.USER, 'jwt',
            { key: Config.APP_CONSTANTS.SERVER.JWT_SECRET_KEY_USER,          // Never Share your secret key
                validate: TokenManager.verifyToken,                         // validate function defined above
                verifyOptions: { algorithms: [ 'HS256' ] }                 // pick a strong algorithm
            });
        server.auth.default(Config.APP_CONSTANTS.SCOPE.ADMIN);
    }
};
