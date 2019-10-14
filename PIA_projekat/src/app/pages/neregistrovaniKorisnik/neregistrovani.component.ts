
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KorisniciService } from 'src/app/korisnici.service';
import { SelectItem } from 'primeng/api';
import { $ } from 'protractor';
import { User } from 'src/app/user.model';

@Component({
    selector: 'app-login',
    templateUrl: './neregistrovani.component.html'
})
export class NeregistrovaniComponent implements OnInit {

    delatnosti: SelectItem[];
    nazivKompanije: String;
    nazivGrada: String;
    poruka: String;
    kompanije: Array<User>;
    prikazKompanija:  Array<User> = new Array();

    selektovaneDelatnosti: string[] = [];

    constructor(private router: Router, private service: KorisniciService) {
        this.delatnosti = [
            {label: 'IT', value: 'IT'},
            {label: 'Telekomunikacije', value: 'Telekomunikacije'},
            {label: 'Energetika', value: 'Energetika'},
            {label: 'Gradjevina i arhitektura', value: 'Gradjevina i arhitektur'},
            {label: 'Masinstvo', value: 'Masinstvo'},
            {label: 'Drugo', value: 'Drugo'}
         
        ];
     }
  
    ngOnInit() {
        this.service.dohvatiSveKompanije().subscribe((kompanije: User[])=> {
            if(kompanije){
                 console.log("komponenta");
                this.kompanije = kompanije;
            }
        })
    }

    pretrazi() {

       

        if (this.nazivKompanije == null && this.nazivGrada == null && this.selektovaneDelatnosti.length==0) {

            this.poruka = "Pretrazite po nekom kriterijumu!";

        } else if(this.nazivKompanije != null && this.nazivGrada != null && this.selektovaneDelatnosti.length>0) {

            for (let kompanija of this.kompanije) {
               if(kompanija.naziv === this.nazivKompanije || kompanija.grad === this.nazivGrada) {
                if(this.prikazKompanija.indexOf(kompanija) == -1) {
                 this.prikazKompanija.push(kompanija);
                }
               }
            }

            for (let kompanija of this.kompanije) {
                for(let delatnost of this.selektovaneDelatnosti) {
                 if(kompanija.delatnost === delatnost){
                     if(this.prikazKompanija.indexOf(kompanija) == -1) {
                     this.prikazKompanija.push(kompanija);
                     break;
                    }
                 }
                }
             }
           

            this.router.navigate(['/neregistrovani']);


        } else if(this.nazivKompanije == null && this.nazivGrada != null && this.selektovaneDelatnosti.length>0) {

            for (let kompanija of this.kompanije) {
                if(kompanija.grad === this.nazivGrada) {
                    if(this.prikazKompanija.indexOf(kompanija) == -1) {
                  this.prikazKompanija.push(kompanija);
                    }
                }
             }
 
             for (let kompanija of this.kompanije) {
                 for(let delatnost of this.selektovaneDelatnosti) {
                  if(kompanija.delatnost === delatnost){
                    if(this.prikazKompanija.indexOf(kompanija) == -1) {
                      this.prikazKompanija.push(kompanija);
                      break;
                    }
                  }
                 }
              }
              this.router.navigate(['/neregistrovani']);

        } else if(this.nazivKompanije != null && this.nazivGrada == null && this.selektovaneDelatnosti.length>0) {

            for (let kompanija of this.kompanije) {
                if(kompanija.naziv === this.nazivKompanije ) {
                    if(this.prikazKompanija.indexOf(kompanija) == -1){
                  this.prikazKompanija.push(kompanija);
                    }
                }
             }
 
             for (let kompanija of this.kompanije) {
                 for(let delatnost of this.selektovaneDelatnosti) {
                  if(kompanija.delatnost === delatnost){
                    if(this.prikazKompanija.indexOf(kompanija) == -1){
                      this.prikazKompanija.push(kompanija);
                      break;
                  }
                }
                 }
              }

              this.router.navigate(['/neregistrovani']);
        } else if(this.nazivKompanije != null && this.nazivGrada != null && this.selektovaneDelatnosti.length==0){
            for (let kompanija of this.kompanije) {
                if(kompanija.naziv === this.nazivKompanije || kompanija.grad === this.nazivGrada) {
                    if(this.prikazKompanija.indexOf(kompanija) == -1) {
                  this.prikazKompanija.push(kompanija);
                    }
                }
             }
 
            

             this.router.navigate(['/neregistrovani']);
        } else if(this.nazivKompanije != null && this.nazivGrada == null && this.selektovaneDelatnosti.length==0){
            for (let kompanija of this.kompanije) {
                if(kompanija.naziv === this.nazivKompanije) {
                    if(this.prikazKompanija.indexOf(kompanija) == -1){
                  this.prikazKompanija.push(kompanija);
                    }
                }
             }
 
             this.router.navigate(['/neregistrovani']);

        } else if(this.nazivKompanije == null && this.nazivGrada != null && this.selektovaneDelatnosti.length==0){
            for (let kompanija of this.kompanije) {
                if(kompanija.grad === this.nazivGrada) {
                    if(this.prikazKompanija.indexOf(kompanija) == -1) {
                  this.prikazKompanija.push(kompanija);
                    }
                }
             }
 
             this.router.navigate(['/neregistrovani']);


        } else if(this.nazivKompanije == null && this.nazivGrada == null && this.selektovaneDelatnosti.length>0){
            
 
             for (let kompanija of this.kompanije) {
                 for(let delatnost of this.selektovaneDelatnosti) {
                  if(kompanija.delatnost === delatnost){
                    if(this.prikazKompanija.indexOf(kompanija) == -1) {
                      this.prikazKompanija.push(kompanija);
                      break;
                    }
                  }
                 }
              }
              this.router.navigate(['/neregistrovani']);
        }

    }

}
