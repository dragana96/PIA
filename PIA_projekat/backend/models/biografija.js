const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let Biografija = new Schema({
    korime: {
        type:String
    },
    ime: {
        type: String
    },
    prezime: {
        type: String
    },
    mail: {
        type: String
    },
    telefon: {
        type: String
    },
    grad: {
        type:String
    },
    adresa: {
        type:String
    },
    sajt: {
        type: String
    },
   datumRodjenja: {
       type: Date
   },
   radnaIskustva: {
       type : Array
   },
   /*
   radnoIskustvoOd: {
    type: Date
   },
   radnoIskustvoDo: {
    type: Date
   },
   radnoIskustvoPozicija: {
       type: String
   },
   radnoIskustvoAktivnosti: {
       type: String
   },
   radnoIskustvoPoslodavac: {
       type: String
   },
   radnoIskustvoAdresa: {
       type: String
   },
   radnoIskustvoSajt: {
       type: String
   },
   */
   obrazovanja: {
       type: Array
   },

    maternjiJezik: {
        type: String
    },
    straniJezici: {
        type: String
    },
    komunikacioneVestine: {
        type: String
    },
    organizacioneVestine: {
        type: String
    },
    poslovneVestine: {
        type: String
    },
    digitalneVestine: {
        type: String
    }

});

module.exports = mongoose.model('Biografija', Biografija, 'biografijas');