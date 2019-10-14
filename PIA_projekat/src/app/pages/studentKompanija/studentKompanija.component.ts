import { Component, OnInit } from '@angular/core';
import { Konkurs } from 'src/app/konkurs.model';
import { User } from 'src/app/user.model';
import { KorisniciService } from 'src/app/korisnici.service';
import { Router } from '@angular/router';
@Component({

    templateUrl: './studentKompanija.component.html'
})
export class StudentKompanijaComponent implements OnInit {

    konkursi: Array<Konkurs>;
    kompanijaKorime : String;
    kompanija: User;
    putanjaSlike: String;


    constructor(private router: Router, private service: KorisniciService) {}
 ngOnInit() {

       this.konkursi = JSON.parse(localStorage.getItem("nizKonkursa"));
        this.kompanija =  JSON.parse(localStorage.getItem("kompanijaInfo"));
        this.putanjaSlike = this.kompanija.putanjaSlika;
        console.log(this.kompanija.grad);
        console.log(this.kompanija.adresa);
        
 }


}