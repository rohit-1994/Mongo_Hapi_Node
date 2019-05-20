'use strict';

let nodemailer = require('nodemailer'),
    transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        auth: {
            user: "officialgarg1@gmail.com",
            pass: "***********"
        }
});

function mailSend(mailOptions)
{
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}
module.exports={
    mailSend:mailSend
};
