'use strict';

let mongoose = require('mongoose'),
    Config = require('../Config'),
    DAO = require('../DAOManager').queries,
    Models = require('../Models');
    mongoose.Promise = Promise;




mongoose.set('useFindAndModify', false);

mongoose.connect(Config.dbConfig.config.dbURI, {
    useCreateIndex: true,
    useNewUrlParser: true
}).then(success => {
    console.log("MongoDB Connected");
}).catch(err => {
    process.exit(1);
});

