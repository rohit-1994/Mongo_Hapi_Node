
const Boom      = require('boom'),
      Models    = require('../Models'),
      Joi       = require('joi'),
      Config    = require('../Config'),
      ERROR     = Config.responseMessages.ERROR,
      SUCCESS   = Config.responseMessages.SUCCESS,
      ObjectId  = require('mongoose').Types.ObjectId,
      DAO       = require('../DAOManager').queries,
      MD5       = require('md5');





const CryptData = function (stringToCrypt) {
    return MD5(MD5(stringToCrypt));
};


function sendError(data,reply) {
    let error;
    if (typeof data === 'object' && data.hasOwnProperty('statusCode') && data.hasOwnProperty('customMessage')) {
        let finalMessage = data.customMessage;
        error =  Boom.create(data.statusCode, finalMessage);
        if(data.hasOwnProperty('type')) {
            error.output.payload.type = data.type;
            return error;
        }
    }
    else {
        let errorToSend = '',
            type = '';

        if (typeof data === 'object') {
            if (data.name === 'MongoError') {


                errorToSend += ERROR.DB_ERROR.customMessage;

                type = ERROR.DB_ERROR.type;
                if (data.code = 11000) {
                    errorToSend += ERROR.DUPLICATE.customMessage;

                    type = ERROR.DUPLICATE.type;
                }
            } else if (data.name === 'ApplicationError') {

                errorToSend += ERROR.APP_ERROR.customMessage;

                type = ERROR.APP_ERROR.type;
            } else if (data.name === 'ValidationError') {

                 errorToSend += ERROR.APP_ERROR.customMessage + data.message;

                type = ERROR.APP_ERROR.type;
            } else if (data.name === 'CastError') {

              errorToSend += ERROR.DB_ERROR.customMessage + ERROR.INVALID_OBJECT_ID.customMessage;

                type = ERROR.INVALID_OBJECT_ID.type;
            } else if(data.response) {
                errorToSend = data.response.message;
            }
        } else {
            errorToSend = data;
            type = ERROR.DEFAULT.type;
        }
        let customErrorMessage = errorToSend;
        if (typeof errorToSend === 'string'){
            if (errorToSend.indexOf("[") > -1) {
                customErrorMessage = errorToSend.substr(errorToSend.indexOf("["));
            } else {
                customErrorMessage = errorToSend;
            }
            customErrorMessage = customErrorMessage.replace(/"/g, '');
            customErrorMessage = customErrorMessage.replace('[', '');
            customErrorMessage = customErrorMessage.replace(']', '');
        }
        error =  Boom.create(400,customErrorMessage);
        error.output.payload.type = type;
        return error;
    }
};


function sendSuccess(successMsg, data, h) {
    successMsg = successMsg || SUCCESS.DEFAULT.customMessage;

    if (typeof successMsg === 'object' && successMsg.hasOwnProperty('statusCode') && successMsg.hasOwnProperty('customMessage')){

        let finalMessage = successMsg.customMessage;

        return {statusCode:successMsg.statusCode, message: finalMessage, data: data || {}};
    }
    else return {statusCode:200, message: successMsg, data: data || {}};
};


function failActionFunction(request, reply, error) {

    winston.info("==============request===================",request.payload, error)
    error.output.payload.type = "Joi Error";

    if (error.isBoom) {
        delete error.output.payload.validation;
        if (error.output.payload.message.indexOf("authorization") !== -1) {
            error.output.statusCode = ERROR.UNAUTHORIZED.statusCode;
            return reply(error);
        }
        let details = error.details[0];
        if (details.message.indexOf("pattern") > -1 && details.message.indexOf("required") > -1 && details.message.indexOf("fails") > -1) {
            error.output.payload.message = "Invalid " + details.path;
            return reply(error);
        }
    }
    let customErrorMessage = '';
    if (error.output.payload.message.indexOf("[") > -1) {
        customErrorMessage = error.output.payload.message.substr(error.output.payload.message.indexOf("["));
    } else {
        customErrorMessage = error.output.payload.message;
    }
    customErrorMessage = customErrorMessage.replace(/"/g, '');
    customErrorMessage = customErrorMessage.replace('[', '');
    customErrorMessage = customErrorMessage.replace(']', '');
    error.output.payload.message = customErrorMessage.replace(/\b./g, (a) => a.toUpperCase());
    delete error.output.payload.validation;
    return error;
};


const authorizationHeaderObj = Joi.object({
    authorization: Joi.string().required()
}).unknown();


module.exports = {
    
    failActionFunction            : failActionFunction,
    sendSuccess                   : sendSuccess,
    sendError                     : sendError,
    CryptData                     : CryptData,
    authorizationHeaderObj        : authorizationHeaderObj
};