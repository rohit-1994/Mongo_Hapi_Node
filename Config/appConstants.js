
'use strict';
let SERVER = {
    APP_NAME : 'Assignment2',
    SECRET   :"#DubaIIeOkCfGdHahSHHSh",
    SALT:11,
    JWT_SECRET_KEY_USER:    "#GD%$HFD&&$DFDKI12~#^%&*+_->?L%QF"
};

let swaggerDefaultResponseMessages = [
    {code: 200, message: 'OK'},
    {code: 400, message: 'Bad Request'},
    {code: 401, message: 'Unauthorized'},
    {code: 404, message: 'Data Not Found'},
    {code: 500, message: 'Internal Server Error'}
];

let SCOPE = {
   USER: 'USER',
};



let APP_CONSTANTS = {
    SERVER: SERVER,
    swaggerDefaultResponseMessages:swaggerDefaultResponseMessages,
    SCOPE:SCOPE
};

module.exports = APP_CONSTANTS;
