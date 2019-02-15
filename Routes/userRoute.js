'use strict';






let Controller = require('../Controller');
let UniversalFunctions = require('../Utils/UniversalFunctions');
let Joi = require('joi');
let Config = require('../Config');
let SUCCESS = Config.responseMessages.SUCCESS;
let ERROR = Config.responseMessages.ERROR;



let AuthRoutes = [
    {
        method: 'PUT',
        path: '/user/changePassword',
        config: {
            description: 'changePassword',
            auth : 'USER',
            tags: ['api', 'company'],
            handler: async (request, h)=> {
                return Controller.userController.changePassword(request.payload,request.auth.credentials)
                    .then(response => {
                        return UniversalFunctions.sendSuccess(SUCCESS.DEFAULT,response, h);
                    })
                    .catch(error => {
                        return UniversalFunctions.sendError(error, h);
                    });
            },
            validate: {
                payload: {
                    emailId                 : Joi.string().required(),
                    password                : Joi.string().required()
                },
                headers: UniversalFunctions.authorizationHeaderObj,
                failAction: UniversalFunctions.failActionFunction
            },
            plugins: {
                'hapi-swagger': {
                    payloadType: 'form'
                }
            }
        }
    },
];

let NonAuthRoutes = [

    {
        method: 'POST',
        path: '/user/SignUp',
        config: {
            description: 'SignUp',
            auth : false,
            tags: ['api', 'user'],
            handler: async (request, h)=> {
                return Controller.userController.userSignUp(request.payload,request.info)
                    .then(response => {
                        return UniversalFunctions.sendSuccess(SUCCESS.DEFAULT,response, h);
                    })
                    .catch(error => {
                        return UniversalFunctions.sendError(error, h);
                    });
            },
            validate: {
                payload: {
                    name            : Joi.string().required(),
                    emailId         : Joi.string().required(),
                    password        : Joi.string().required()
                },
                failAction: UniversalFunctions.failActionFunction
            },
            plugins: {
                'hapi-swagger': {
                    payloadType: 'form'
                }
            }
        }
    },

    {
        method: 'POST',
        path: '/user/login',
        config: {
            description: 'login',
            auth : false,
            tags: ['api', 'user'],
            handler: async (request, h)=> {
                return Controller.userController.login(request.payload,request.info)
                    .then(response => {
                        return UniversalFunctions.sendSuccess(SUCCESS.DEFAULT,response, h);
                    })
                    .catch(error => {
                        return UniversalFunctions.sendError(error, h);
                    });
            },
            validate: {
                payload: {
                    emailId         : Joi.string().required(),
                    password        : Joi.string().required()
                },
                failAction: UniversalFunctions.failActionFunction
            },
            plugins: {
                'hapi-swagger': {
                    payloadType: 'form'
                }
            }
        }
    },

    {
        method: 'POST',
        path: '/user/forgot',
        config: {
            description: 'forgot',
            tags: ['api', 'company'],
            handler: async (request, h)=> {
                return Controller.userController.forgotPassword(request.payload)
                    .then(response => {
                        return UniversalFunctions.sendSuccess(SUCCESS.DEFAULT,response, h);
                    })
                    .catch(error => {
                        return UniversalFunctions.sendError(error, h);
                    });
            },
            validate: {
                payload: {
                    emailId         : Joi.string().required()
                },
                failAction: UniversalFunctions.failActionFunction
            },
            plugins: {
                'hapi-swagger': {
                    payloadType: 'form'
                }
            }
        }
    },

    {
        method: 'POST',
        path: '/user/resetPassword',
        config: {
            description: 'forgot',
            tags: ['api', 'company'],
            handler: async (request, h)=> {
                return Controller.userController.resetPassword(request.payload)
                    .then(response => {
                        return UniversalFunctions.sendSuccess(SUCCESS.DEFAULT,response, h);
                    })
                    .catch(error => {
                        return UniversalFunctions.sendError(error, h);
                    });
            },
            validate: {
                payload: {
                    passwordResetToken   : Joi.string().required(),
                    password             : Joi.string().required()
                },
                failAction: UniversalFunctions.failActionFunction
            },
            plugins: {
                'hapi-swagger': {
                    payloadType: 'form'
                }
            }
        }
    }
];


module.exports=[...AuthRoutes,...NonAuthRoutes];