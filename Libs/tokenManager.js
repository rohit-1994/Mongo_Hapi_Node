'use strict';


let Jwt = require('jsonwebtoken'),
    Config = require('../Config'),
    DAO = require('../DAOManager').queries,
    Models = require('../Models/'),
    UniversalFunctions = require('../Utils/UniversalFunctions'),
    ERROR = Config.responseMessages.ERROR;



let generateToken = (tokenData,userType) => {
    return new Promise((resolve, reject) => {
        try {
           let secretKey;
            switch(userType){
                case Config.APP_CONSTANTS.SCOPE.USER:
                    secretKey = Config.APP_CONSTANTS.SERVER.JWT_SECRET_KEY_USER;
                    break;
            }
            
            let token = Jwt.sign(tokenData, secretKey);
            return resolve(token);
        } catch (err) {
            return reject(err);
        }
    });
};


let verifyToken = async (tokenData) => {

    let user;

         if(tokenData.scope === Config.APP_CONSTANTS.SCOPE.USER)
            user = await DAO.getData(Models.User,{_id: tokenData._id},{__v : 0},{lean : true});

        if(user && user[0] ) {

            user[0].scope =tokenData.scope;
            return {
                isValid: true,
                credentials: user[0]
            };
        }

        else throw UniversalFunctions.sendError("en",ERROR.UNAUTHORIZED);
       
};

module.exports={
    generateToken:generateToken,
    verifyToken:verifyToken
};