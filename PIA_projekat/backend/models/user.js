const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let User = new Schema({
    ime: {
        type: String
    },
    prezime: {
        type: String
    },
    korime: {
        type: String
    }, 
    lozinka: {
        type: String
    },
    mail: {
        type: String
    },
    telefon: {
        type: String
    },
    tip: {
        type: String
    },
    telefon: {
        type: String
    },
    godinaStudija: {
        type: String
    },
    diplomirao: {
        type: String
    },
    naziv: {
        type:String
    },
    grad: {
        type:String
    },
    adresa: {
        type:String
    },
    direktor: {
        type: String
    },
    PIB: {
        type: String
    },
    brojZaposlenih: {
        type: String
    },
    sajt: {
        type: String
    },
    delatnost: {
        type: String
    },
    uzaSpecijalnost: {
        type: String
    },
    putanjaSlika: {
        type: String
    }

});

module.exports = mongoose.model('User', User); //,Users
