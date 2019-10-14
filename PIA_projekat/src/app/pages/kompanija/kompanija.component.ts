
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KorisniciService } from 'src/app/korisnici.service';
import { User } from 'src/app/user.model';
import { FormGroup, FormControl } from '@angular/forms'
import { MessageService, SelectItem } from 'primeng/api';
import { Konkurs } from 'src/app/konkurs.model';
import { Prijava } from 'src/app/prijava.model';

@Component({
    
    templateUrl: './kompanija.component.html'
})
export class KompanijaComponent implements OnInit  {

    korime: String;
    naziv:String;
    naziv1:String;
    putanjaSlike:String;
    form:FormGroup;
    uploadedFiles: any[] = [];
    poruka: String;
    konkursi: Array<Konkurs> = new Array();
    tipovi: SelectItem[];

selektovaniStudent: String;

    prijave: Array<Prijava> = new Array();
    prijavePrikaz: Array<Prijava> = new Array();
   constructor(private router: Router, private service: KorisniciService,private messageService: MessageService) {
    this.korime = localStorage.getItem("kompanijaKorisnickoIme");
    this.naziv1 = localStorage.getItem("kompanijaNaziv"); 
    this.service.pronadjiUsername(this.korime).subscribe((user: User)=>{
        if(user){
            this.putanjaSlike = user.putanjaSlika;
         
         this.naziv = user.naziv;
        }
    })
       
       
     }
   ngOnInit(){
       console.log("adsdsaasads");

    this.tipovi = [
        {label: 'Zaposlenje', value: 'zaposlenje'},
        {label: 'Strucna praksa', value: 'praksa'},
       
     
    ];
    this.form = new FormGroup({
        pozicija: new FormControl(),
        tekst: new FormControl(),
        datum: new FormControl(),

        tipKonkursa: new FormControl()



    });
        console.log(this.naziv1);


        this.service.dohvatiPrijavljene(this.naziv1).subscribe((prijave: Prijava[])=> {
            if(prijave) {
                this.prijave = prijave;
                console.log(this.prijave);
                for(let prijava of this.prijave) {
                    let today = new Date();
                    let rok = new Date(prijava.konkurs.datum);
                    if(rok< today) {
                        this.prijavePrikaz.push(prijava);
                    }
                }
            }
        })
      
   } 

 



   onUpload(event) {
       console.log("upload");
    for(let file of event.files) {
        this.uploadedFiles.push(file);
    }

    this.messageService.add({severity: 'info', summary: 'File Uploaded', detail: ''});
}

prihvati(){
    console.log(this.selektovaniStudent);
    this.service.prihvati(this.selektovaniStudent).subscribe((prijava: Prijava) => {
        if(prijava) {
            console.log("uspesno");
        }
    })
}

odbij(){
    console.log("odbija" + this.selektovaniStudent);
    this.service.odbij(this.selektovaniStudent).subscribe((prijava: Prijava) => {
        if(prijava) {
            console.log("uspesno");
        }
    })
}

submit() {
    console.log(this.form.get("pozicija").value);
    console.log(this.form.value.tipKonkursa);
    this.service.dodajKonkurs(this.form.value.pozicija, this.form.value.tekst, this.form.value.datum, this.form.value.tipKonkursa, this.naziv).subscribe((konkurs: Konkurs) => {
        if (konkurs) {
            console.log("konkurs");
            this.poruka = "Uspesan unos";

            this.router.navigate(['/kompanija']);
        } else console.log("neuspesno");;
    });
}

}