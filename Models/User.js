'use strict';

const mongoose = require('mongoose'),
    Schema     = mongoose.Schema;


let User = new Schema({
    name                   : {type:String, trim: true, index: true,  sparse: true},
    emailId                : {type:String, trim: true, index: true,  sparse: true},
    password               : {type:String, trim: true, index: true,  sparse: true},
    passwordResetToken     : {type:String, trim: true, index: true, sparse: true}  ,
    createdDate            : {type:Number, default: Date.now,index:true,required: true},
});


module.exports = mongoose.model('User',User);