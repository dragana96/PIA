import { Component, OnInit } from '@angular/core';

import { KorisniciService } from 'src/app/korisnici.service';
import { Router } from '@angular/router';

import { User } from 'src/app/user.model';


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

 


    korime: String;
    lozinka: String;
    poruka: String;
    prikaziPoruku: boolean = false;
    
    constructor(private router: Router, private service: KorisniciService) { }
  
    ngOnInit() {
    }
  
    login():void{
        console.log('usao1');
      this.service.login(this.korime, this.lozinka).subscribe((korisnik: User)=>{
        if(korisnik){

         

          if(korisnik.tip=='student') {
            localStorage.setItem("studentKorisnickoIme", String(korisnik.korime));
              this.router.navigate(['/student']);
          } 
          else if (korisnik.tip == 'admin') {
            this.router.navigate(['/admin']);
              }  
                else if (korisnik.tip == 'kompanija') {
                  console.log("kompanija?");
                  localStorage.setItem("kompanijaKorisnickoIme", String(korisnik.korime));
                  localStorage.setItem("kompanijaNaziv", String(korisnik.naziv));
                this.router.navigate(['/kompanija']);
        }
        } else {
          this.poruka = "Korisnicko ime ili lozinka koju ste uneli nije validna! Pokusajte ponovo!";
          this.prikaziPoruku = true;
        }
       
      })
    }
  
  }