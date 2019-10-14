const express = require("express");
const router = express.Router();
const User = require("../models/user");

const multer = require("multer");
const MIME_TYPE_MAP = {
  'image/png' : 'png',
  'image/jpeg' : 'jpg',
  'image/jpg' : 'jpg'
};

const Biografija = require("../models/biografija");
const Konkurs = require('../models/konkurs');
const Prijava = require('../models/prijava');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
  const isValid = MIME_TYPE_MAP[file.mimetype];
  let error = new Error("Nije validan fajl");
  if(isValid) {
    error = null;
  }
    cb(error, "backend/images");

},
filename: (req, file, cb)=> {
  const name = file.originalname.toLowerCase().split(' ').join('-');
  const ext = MIME_TYPE_MAP[file.mimetype];
  cb(null, name + '.' + ext);
}});


//dodamo multer(storage).single("image") za register 
router.post( "/login",
    
    (req, res) => {
      console.log('usao3');
        const korime = req.body.korime;
        const lozinka = req.body.lozinka;

        User.findOne({'korime': korime, 'lozinka': lozinka},
         (err, user) => {
            if (err) {
              console.log(err);
            } else {
              res.json(user);
            }
        });
    }
);


router.get("/register/:korime", 
    (req, res) => {
      console.log(req.params.korime);
      User.findOne({'korime': req.params.korime}, (err, user)=>{
        if(err) console.log(err);
        else{
            res.json(user);
        }
    })
    }
);



router.get("/promenaLozinke/:korime", 
    (req, res) => {
      User.findOne({'korime': req.params.korime}, (err, user)=>{
        if(err) console.log(err);
        else{
            res.json(user);
        }
    })
    }
);


router.route('/promenaLozinke/:korime').put((req, res) => {
  console.log("Updejtuje");
  User.update({'korime' : req.params.korime}, 
  {
      $set: {'lozinka':req.body.lozinka}
      
  }).then(result => {
      console.log(result);
      res.status(200).json({message: 'Update successful!'});
  });
});

router.put("/register/student", multer({storage: storage}).single("image"),
    (req, res) => {
      console.log("usao 3");
     
      url = req.protocol + "://" + req.get("host");
     
        let  user = new User({
         
          korime: req.body.korime,
          lozinka: req.body.lozinka,
          ime:req.body.ime,
          prezime: req.body.prezime,
          telefon:req.body.telefon,
          mail: req.body.mail,
          tip: req.body.tip,
          godinaStudija: req.body.godinaStudija,
          diplomirao: req.body.diplomirao,
          putanjaSlika : url + "/images/" + req.file.filename
        });


      user.save().
        then(user=>{
            res.status(200).json({'user':'ok'});
        }).catch(err=>{
            res.status(400).json({'user':'no'});
        });
      })


      router.put("/register/kompanija/", multer({storage: storage}).single("image"),
    (req, res) => {
      console.log("usao 3");
     
      url = req.protocol + "://" + req.get("host");
     
   

      
         let  user = new User({
          naziv: req.body.naziv,
          korime: req.body.korime,
          lozinka: req.body.lozinka,
          grad:req.body.grad,
          adresa: req.body.adresa,
          direktor:req.body.direktor,
          mail: req.body.mail,
          tip: req.body.tip,

          PIB: req.body.PIB,
          brojZaposlenih: req.body.brojZaposlenih,
          delatnost: req.body.delatnost,
          uzaSpecijalnost: req.body.uzaSpecijalnost,
          putanjaSlika : url + "/images/" + req.file.filename
        }); 
  
      user.save().
        then(user=>{
            res.status(200).json({'user':'ok'});
        }).catch(err=>{
            res.status(400).json({'user':'no'});
        });
      })

      

  router.get("/student/:korime", 
    (req, res) => {
      Biografija.findOne({'korime': req.params.korime}, (err, user)=>{
        if(err) console.log(err);
        else{
         
            res.json(user);
        }
    })
    }
);

router.get("/student/konkurs/:korime", 
    (req, res) => {
      console.log(req.params.korime + "users.js");
      Biografija.findOne({'korime': req.params.korime}, (err, user)=>{
        if(err) console.log(err);
        else{
         
            res.json(user);
        }
    })
    }
);

router.put("/student/konkurs/dohvPrijavu", 
    (req, res) => {
 //     console.log(req.params.korime + "users.js");
      Prijava.findOne({'korime': req.body.korime, 'pozicija' : req.body.pozicija}, (err, user)=>{
        if(err) console.log(err);
        else{
         
            res.json(user);
        }
    })
    }
);
   
router.get("/student/kompanija/dohvKonkurse/:naziv", 
    (req, res) => {
     console.log(req.params.naziv + "users.js");
      Konkurs.find({'kompanija': req.params.naziv}, (err, user)=>{
        if(err) console.log(err);
        else{
         
            res.json(user);
        }
    })
    }
);
  
router.get("/student/dohvKonkurs/:pozicija", 
    (req, res) => {
     console.log(req.params.pozicija + "users.js");
      Konkurs.findOne({'pozicija': req.params.pozicija}, (err, user)=>{
        if(err) console.log(err);
        else{
         
            res.json(user);
        }
    })
    }
);
  
      
  router.get("/neregistrovani", 
    (req, res) => {
      User.find({'tip': 'kompanija'}, (err, user)=>{
        if(err) console.log(err);
        else{
            res.json(user);
        }
    })
    }
);

router.post("/student", 
           (req, res) => {
        
           console.log("usao 3");
            console.log(req.body.grad);
            console.log(req.body.telefon);
     
           let cv = new Biografija(req.body);
  
          cv.save().
              then(cv=>{
            res.status(200).json({'user':'ok'});
        }).catch(err=>{
            res.status(400).json({'user':'no'});
        });
      });


      router.put("/student/:korime", 
    (req, res)=> {
      console.log("Updejtuje");
      Biografija.update({'korime' : req.params.korime}, 
      {
          $set: {'korime':req.body.korime, 
                  'ime':req.body.ime, 
                    'prezime':req.body.prezime,
                    'mail':req.body.mail,
                    'telefon':req.body.telefon,
                    'grad':req.body.grad,
                    'adresa':req.body.adresa,
                    'sajt':req.body.sajt,
                    'datumRodjenja':req.body.datumRodjenja,
                    'radnaIskustva':req.body.radnaIskustva,
                    'obrazovanja':req.body.obrazovanja,
                    'maternjiJezik':req.body.maternjiJezik,
                    'straniJezici':req.body.straniJezici,
                    'komunikacioneVesine':req.body.komunikacioneVesine,
                    'organizacioneVestine':req.body.organizacioneVestine,
                    'poslovneVestine' : req.body.poslovneVestine,
                    'digitalneVestine':req.body.digitalneVestine
      }
          
      }).then(result => {
          console.log(result);
          res.status(200).json({message: 'Update successful!'});
      });
  
  });
  
  router.route('/kompanija').post((req, res)=>{
    let konkurs = new Konkurs(req.body)
    console.log(req.body)
    konkurs.save().
        then(konkurs=>{
            res.status(200).json({'konkurs':'ok'});
        }).catch(err=>{
            res.status(400).json({'konkurs':'no'});
        })
});


router.get("/student", 
    (req, res) => {
      Konkurs.find({}, (err, user)=>{
        if(err) console.log(err);
        else{
            res.json(user);
        }
    })
    }
);


router.get("/student/dohvKompanije/:kompanija", 
    (req, res) => {
      console.log("usao1");
      User.findOne({'naziv': req.params.kompanija}, (err, user)=>{
        if(err) console.log(err);
        else{
            res.json(user);
        }
    })
    }
);





router.post("/student/konkurs", 
           (req, res) => {
        
           console.log("usao 3");
           
     
           let prijava = new Prijava(req.body);
            
          prijava.save().
              then(cv=>{
            res.status(200).json({'user':'ok'});
        }).catch(err=>{
            res.status(400).json({'user':'no'});
        });
      });



      router.put("/student/kompanija/dohvPrijave", 
    (req, res) => {
      console.log(req.body.konkurs.pozicija);
      Prijava.find({'konkurs':req.body.konkurs}, (err, prijava)=>{
        if(err) console.log(err);
        else{
            res.json(prijava);
        }
    })
    }
);



router.get("/student/konkurs/prijavljeni/:naziv", 
    (req, res) => {
     console.log(req.params.naziv + "users.js");
      Prijava.find({'konkurs.kompanija': req.params.naziv}, (err, user)=>{
        if(err) console.log(err);
        else{
         
            res.json(user);
        }
    })
    }
);



router.put("/student/konkurs/prihvati", 
    (req, res) => {
      console.log("Updejtuje status "+ req.body.korime);
      Prijava.update({'_id' : req.body.korime}, 
      {
          $set: {'status':"prihvacen"}
          
      }).then(result => {
          console.log(result);
          res.status(200).json({message: 'Update successful!'});
      });
    });


    router.put("/student/konkurs/odbij", 
    (req, res) => {
      console.log("Updejtuje status "+ req.body.korime);
      Prijava.update({'_id' : req.body.korime}, 
      {
          $set: {'status':"odbijen"}
          
      }).then(result => {
          console.log(result);
          res.status(200).json({message: 'Update successful!'});
      });
    });




    router.get("/student/konkurs/prijave/:id", 
    (req, res) => {
     console.log(req.params.id + "users.js");
      Prijava.find({'konkurs._id': req.params.id}, (err, user)=>{
        if(err) console.log(err);
        else{
         
            res.json(user);
        }
    })
    }
);
module.exports = router;
    
