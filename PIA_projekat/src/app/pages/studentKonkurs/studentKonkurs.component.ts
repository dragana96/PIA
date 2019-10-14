import { Component, OnInit } from '@angular/core';
import { Konkurs } from 'src/app/konkurs.model';
import { KorisniciService } from 'src/app/korisnici.service';
import { Router } from '@angular/router';
import { Biografija } from 'src/app/biografija.model';
import { Prijava } from 'src/app/prijava.model';
@Component({

    templateUrl: './studentKonkurs.component.html'
})
export class StudentKonkursComponent implements OnInit {

    konkurs: Konkurs;
    coverLetter: String;
    korime: string;
    poruka: String;
    pozicija: string;
    id: string;
    flag: Boolean;

    prijave: Array<Prijava> = new Array();
 ngOnInit() {

    this.konkurs = JSON.parse(localStorage.getItem("konkursInfo"));
    this.id = localStorage.getItem('idKonkursa');
    console.log("eeee" +this.id);
    this.korime = localStorage.getItem("korime");
    this.pozicija = localStorage.getItem("imeKonkursa");
    this.flag = JSON.parse(localStorage.getItem("flag"));
    console.log("FLAG" + this.flag)
    this.service.dohvatiPrijaveZaKonkurs(this.id).subscribe((prijave: Prijava[]) => {
        if(prijave) {
            this.prijave = prijave;
            console.log("prijave" + this.prijave.length);
        }
    })
    
 }

 constructor(private router: Router, private service: KorisniciService) {}


proveri(): Boolean  {

   let today = new Date();
   let rok = new Date(this.konkurs.datum);
   if(rok>today){
       return false;
   } else return true;
}

 dodajPrijavu() {
    console.log("dodajPrijavu" + this.korime);

    this.service.dohvatiPrijavu(this.korime, this.pozicija).subscribe((prijava: Prijava) => {
        if(prijava) {
            this.poruka = "Vec ste prijavljeni za ovaj konkurs!"
        } else {
            this.service.dohvatiBiografijuZaKonkurs(this.korime).subscribe((biografija: Biografija) => {
                if(biografija) {
                    this.service.dodajPrijavu(this.korime,biografija, this.konkurs, this.coverLetter, "ceka", this.pozicija).subscribe((prijava: Prijava) => {
                        if(prijava) {
                          
                            this.poruka = "Uspesno ste se prijavili za konkurs";
                            this.router.navigate(['/student/konkurs']);
                        }
                    })
                }
            })
        }
    })
   


 }
}