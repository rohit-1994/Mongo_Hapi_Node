
'use strict';
exports.ERROR = {

    USER_NOT_FOUND: {
        statusCode    :   400,
        customMessage :  'User not found.',
        type          :  'USER_NOT_FOUND'
    },

    DUPLICATE_EMAIL: {
        statusCode    :   400,
        customMessage :  'Duplicate Email.',
        type          :  'DUPLICATE_EMAIL'
    },

    UNAUTHORIZED: {
        statusCode:401,
        customMessage : 'You are not authorized to perform this action',
        type : 'UNAUTHORIZED'
    },

    DB_ERROR: {
        statusCode: 400,
        customMessage:  'DB Error : ',
        type: 'DB_ERROR'
    },

    DUPLICATE: {
        statusCode: 400,
        customMessage: 'Duplicate Entry',
        type: 'DUPLICATE'
    },

    APP_ERROR: {
        statusCode: 400,
        customMessage: 'Application Error ',
        type: 'APP_ERROR'
    },

    INVALID_OBJECT_ID : {
        statusCode:400,
        customMessage :  'Invalid Id provided.',
        type : 'INVALID_OBJECT_ID'
    }

};


exports.SUCCESS = {
    DEFAULT  : {
        statusCode    : 200,
        customMessage : 'Success',
        type          : 'DEFAULT'
    },
    ADDED   : {
        statusCode    : 200,
        customMessage : 'Added successfully.',
        type          : 'ADDED'
    },
    FORGOT_PASSWORD: {
        statusCode    : 200,
        customMessage : "A reset password link is sent to your registered email address.",
        type          : 'FORGOT_PASSWORD'
    }
};