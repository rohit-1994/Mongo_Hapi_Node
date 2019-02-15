
'use strict';

if (process.env.NODE_ENV === 'dev') {

    exports.config = {
        PORT   : 8000,
        dbURI  : 'mongodb://localhost/hopeResearchGroup'
    }

}
else if (process.env.NODE_ENV === 'test') {

    exports.config = {
        PORT   : 8000,
        dbURI  : 'mongodb://localhost/hopeResearchGroup'
    }

}
else {
    exports.config = {
        PORT : 8000,
        dbURI : 'mongodb://localhost/hopeResearchGroup'
    };
}