'use strict';




let DAO           = require('../DAOManager').queries,
    Config        = require('../Config'),
    TokenManager  = require('../Libs/tokenManager'),
    emailmanager  = require('../Libs/emailManager'),
    Models        = require('../Models/'),
    UniversalFunctions = require('../Utils/UniversalFunctions');




///////////////////////////////   userSignUp   ////////////////////////////////////////////////////
let    userSignUp        =  async (payload,loginInfo)=> {
    try{
            let step1    = await checkEmailExists(payload);
            let step2    = await createUserEntry(payload);
            let accessToken = await generateAccess(step2);

            return{
                name         : step2.name,
                emailId      : step2.emailId,
                accessToken  : accessToken
            }
    }
    catch (err){
        throw err;
    }
};

async function checkEmailExists(payload)
{
    if((await DAO.getData(Models.User,{emailId:payload.emailId}, {}, {})).length>0)
    {
        return Promise.reject(Config.responseMessages.ERROR.DUPLICATE_EMAIL);
    }
    else
    {
        return null;
    }
}

async function createUserEntry(payload)
{
    let dataToSave = {
        name      : payload.name,
        emailId   : payload.emailId,
        password  : UniversalFunctions.CryptData(payload.password)
    };

    return  DAO.saveData(Models.User,dataToSave);

}

async function generateAccess(payload)
{
    let tokenData={
        scope:Config.APP_CONSTANTS.SCOPE.USER,
        _id:payload._id,
        time:new Date()
    };

    return  TokenManager.generateToken(tokenData,Config.APP_CONSTANTS.SCOPE.USER);

};

///////////////////////////////   login   ////////////////////////////////////////////////////
let    login        =  async (payload,loginInfo)=> {
    try{

        let step1    = await checkUserExists(payload);
         let accessToken = await generateAccess(step1[0]);

        return{
            name         : step1[0].name,
            emailId      : step1[0].emailId,
            accessToken  : accessToken
        }
    }
    catch (err){
        throw err;
    }
};

async function checkUserExists(payload)
{
    let dataOfUser =(await DAO.getData(Models.User,
        {emailId:payload.emailId,password:UniversalFunctions.CryptData(payload.password)},
        {},
        {}));

    if(dataOfUser.length>0)
    {
        return dataOfUser;
    }
    else
    {
        return Promise.reject(Config.responseMessages.ERROR.USER_NOT_FOUND);
    }
}


///////////////////////////////   forgotPassword   ////////////////////////////////////////////////////
let    forgotPassword        =  async (payload)=> {
    try{

        let passwordResetToken = UniversalFunctions.CryptData(payload.emailId);

         (await DAO.findAndUpdate(Models.User,{emailId:payload.emailId}, {
             passwordResetToken:passwordResetToken
         }, {})) ;

         let  mailOptions = {
            from    : 'HOPE_RESEARCH_GROUP ishan@code-brew.com',
            to      : payload.emailId,
            subject : 'forgotPasswordLink',
            text    : 'Your Password Reset Token is '+ passwordResetToken
         };

        emailmanager.mailSend(mailOptions);
    }
    catch (err){
        throw err;
    }
};


///////////////////////////////   resetPassword   ////////////////////////////////////////////////////
let    resetPassword        =  async (payload)=> {
    try{

        (await DAO.findAndUpdate(Models.User,
            {passwordResetToken:payload.passwordResetToken},
            {
            password           : UniversalFunctions.CryptData(payload.password)  ,
            passwordResetToken :''
            }, {})) ;

        return null;
    }
    catch (err){
        throw err;
    }
};

///////////////////////////////   resetPassword   ////////////////////////////////////////////////////
let    changePassword        =  async (payload,credentials)=> {
    try{

       let step1 =      await DAO.findAndUpdate(Models.User,
            {emailId:payload.emailId},
            {
            password: UniversalFunctions.CryptData(payload.password)
            },{});

        return null;
    }
    catch (err){
        throw err;
    }
};

module.exports = {
    userSignUp              : userSignUp,
    login                   : login,
    forgotPassword          : forgotPassword,
    resetPassword           : resetPassword,
    changePassword          : changePassword
};