const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let Prijava = new Schema({
    korime: {
        type : String
    },
    biografija: {
        type: Object
    },
    konkurs: {
        type: Object
    },
    cl: {
        type: String
    },
    status: {
        type: String
    },
    pozicija: {
        type: String
    }

});

module.exports = mongoose.model('Prijava', Prijava, 'prijave'); //,Users
