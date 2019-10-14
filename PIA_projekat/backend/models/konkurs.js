const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let Konkurs = new Schema({
    pozicija: {
        type: String
    },
    tekst: {
        type: String
    },
    datum: {
        type: String
    }, 
   tipKonkursa: {
       type: String
   },
   kompanija: {
       type: String
   }

});

module.exports = mongoose.model('Konkurs', Konkurs, 'konkursi'); //,Users
