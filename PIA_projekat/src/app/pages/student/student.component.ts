import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KorisniciService } from 'src/app/korisnici.service';
import { User } from 'src/app/user.model';
import { FormGroup, FormControl, FormBuilder, FormArray } from '@angular/forms';
import { MenuItem, SelectItem } from 'primeng/api';

import { useAnimation } from '@angular/animations';
import { Biografija } from 'src/app/biografija.model';
import { Konkurs } from 'src/app/konkurs.model';
import { getLocaleDateTimeFormat } from '@angular/common';


@Component({

    templateUrl: './student.component.html'
})
export class StudentComponent implements OnInit {

    korime: String;
    ime: String;
    prezime: String;
    telefon: String;
    mail: String;
    selektovanaKompanija: String;
    imenaKompanija: Array<String> = new Array();

    flag:Boolean = true;

    pronadjenaBiografija: Boolean = false;
    konkursiKompanije: Array<Konkurs> = new Array();



    items: MenuItem[];
    putanjaSlike: String;
    poruka: String;
    public CVform: FormGroup;
    public searchForm: FormGroup;



    tipovi: SelectItem[];
    selektovaniTipovi: string[] = [];
    konkursi: Array<Konkurs>;
    prikazKonkursi: Array<Konkurs> = new Array();



    constructor(private router: Router, private service: KorisniciService, private fb: FormBuilder) {
        this.CVform = this.createForm();
        this.searchForm = this.createSearchForm();

        this.tipovi = [
            { label: 'Zaposlenje', value: 'zaposlenje' },
            { label: 'Strucna praksa', value: 'praksa' }

        ];


    }
    ngOnInit() {


        for (let konkurs of this.prikazKonkursi) {
            this.imenaKompanija.push(konkurs.kompanija);
        }

        this.korime = localStorage.getItem("studentKorisnickoIme");

        this.service.dohvatiSveKonkurse().subscribe((konkurs: Konkurs[]) => {
            if (konkurs) {

                this.konkursi = konkurs;
            }
        })


        
        this.service.dohvatiBiografiju(this.korime).subscribe((biografija: Biografija) => {
            if (biografija) {
                this.pronadjenaBiografija = true;
                this.ime = biografija.ime;
                this.CVform.get('ime').patchValue(this.ime);
                this.prezime = biografija.prezime;
                this.CVform.get('prezime').patchValue(this.prezime);
                this.mail = biografija.mail;

                this.CVform.get('mail').patchValue(this.mail);
                this.telefon = biografija.telefon;
                this.CVform.get('telefon').patchValue(this.telefon);
                this.CVform.get('grad').patchValue(biografija.grad);

                this.CVform.get('adresa').patchValue(biografija.adresa);
                this.CVform.get('sajt').patchValue(biografija.sajt);
                this.CVform.get('datumRodjenja').patchValue(new Date(biografija.datumRodjenja));


                console.log(biografija.radnaIskustva.length);


                biografija.radnaIskustva.forEach(x => {
                    this.radnaIskustvaRet.push(this.fb.group({

                        radnoIskustvoOd: new Date(x.radnoIskustvoOd),
                        radnoIskustvoDo: new Date(x.radnoIskustvoDo),
                        radnoIskustvoPozicija: x.radnoIskustvoPozicija,
                        radnoIskustvoAktivnosti: x.radnoIskustvoAktivnosti,
                        radnoIskustvoPoslodavac: x.radnoIskustvoPoslodavac,
                        radnoIskustvoAdresa: x.radnoIskustvoAdresa,
                        radnoIskustvoSajt: x.radnoIskustvoSajt

                    }));
                })


                biografija.obrazovanja.forEach(x => {
                    this.obrazovanjaRet.push(this.fb.group({
                        obrazovanjeOd: new Date(x.obrazovanjeOd),
                        obrazovanjeDo: new Date(x.obrazovanjeDo),
                        obrazovanjeUstanova: x.obrazovanjeUstanova,
                        obrazovanjeGrad: x.obrazovanjeGrad,
                        obrazovanjeAdresa: x.obrazovanjeAdresa
                    }))
                })


                this.CVform.get('maternjiJezik').patchValue(biografija.maternjiJezik);
                this.CVform.get('straniJezici').patchValue(biografija.straniJezici);
                this.CVform.get('komunikacioneVestine').patchValue(biografija.komunikacioneVestine);
                this.CVform.get('organizacioneVestine').patchValue(biografija.organizacioneVestine);
                this.CVform.get('poslovneVestine').patchValue(biografija.poslovneVestine);
                this.CVform.get('digitalneVestine').patchValue(biografija.digitalneVestine);
                console.log("pronadjena biografija");


            }
        })

        this.service.pronadjiUsername(this.korime).subscribe((user: User) => {
            if (user) {
                this.ime = user.ime;
                this.CVform.get('ime').patchValue(this.ime);
                this.prezime = user.prezime;
                this.CVform.get('prezime').patchValue(this.prezime);
                this.mail = user.mail;
                this.CVform.get('mail').patchValue(this.mail);
                this.telefon = user.telefon;
                this.CVform.get('telefon').patchValue(this.telefon);
                this.putanjaSlike = user.putanjaSlika;
            }
        });

        this.items = [

            {
                label: 'Biografija', command(event) {
                    this.pokaziBiografiju = true;
                    this.pokaziPretragu = false;
                }
            },
            {
                label: 'Pretraga', style: "color:red;", command(event) {
                    this.pokaziBiografiju = false;
                    this.pokaziPretragu = true;
                }
            }

        ];

    }

    createSearchForm(): FormGroup {
        return this.fb.group({
            kompanija: [],
            pozicija: [],
            tipKonkursa: []
        })
    }

    createForm(): FormGroup {

        return this.fb.group({
            ime: [''],
            prezime: [''],
            mail: [''],
            telefon: [''],
            grad: [''],
            adresa: [''],
            sajt: [''],
            datumRodjenja: [],
            radnaIskustva: this.fb.array([]),
            obrazovanja: this.fb.array([]),
            maternjiJezik: [],
            straniJezici: [],
            komunikacioneVestine: [],
            organizacioneVestine: [],
            poslovneVestine: [],
            digitalneVestine: []

        });


    }

    get obrazovanjaRet() {
        return this.CVform.get('obrazovanja') as FormArray
    }

    get radnaIskustvaRet() {
        return this.CVform.get('radnaIskustva') as FormArray
    }


    dodajObrazovanje() {

        const obrazovanja = this.fb.group({
            obrazovanjeOd: [],
            obrazovanjeDo: [],
            obrazovanjeUstanova: [],
            obrazovanjeGrad: [],
            obrazovanjeAdresa: []
        })

        this.obrazovanjaRet.push(obrazovanja);
    }

    dodajRadnoIskustvo() {

        const radnaIskustva = this.fb.group({
            radnoIskustvoOd: [],
            radnoIskustvoDo: [],
            radnoIskustvoPozicija: [],
            radnoIskustvoAktivnosti: [],
            radnoIskustvoPoslodavac: [],
            radnoIskustvoAdresa: [],
            radnoIskustvoSajt: []
        })

        this.radnaIskustvaRet.push(radnaIskustva);
    }




    submit() {
        console.log("submit");
        console.log(this.CVform.value.grad)
        console.log("000000000000000000000000000")
        console.log(this.CVform.get('grad').value);
        this.service.dodajCV(
            this.korime,
            this.CVform.value.ime,
            this.CVform.get('prezime').value,
            this.CVform.get('mail').value,
            this.CVform.get('telefon').value,
            this.CVform.value.grad,
            this.CVform.get('adresa').value,
            this.CVform.get('sajt').value,
            this.CVform.get('datumRodjenja').value,

            this.CVform.get('radnaIskustva').value,

            this.CVform.get('obrazovanja').value,

            this.CVform.value.maternjiJezik,
            this.CVform.value.straniJezici,
            this.CVform.value.komunikacioneVestine,
            this.CVform.value.organizacioneVestine,
            this.CVform.value.poslovneVestine,
            this.CVform.value.digitalneVestine).subscribe((cv: Biografija) => {
                if (cv) {
                    console.log("cv");
                    this.poruka = "Uspesan unos";

                    this.router.navigate(['/student']);
                } else console.log("neuspesno");;
            });
    }

    izmeni() {

        this.service.updateCV(
            this.korime,
            this.CVform.value.ime,
            this.CVform.get('prezime').value,
            this.CVform.get('mail').value,
            this.CVform.get('telefon').value,
            this.CVform.value.grad,
            this.CVform.get('adresa').value,
            this.CVform.get('sajt').value,
            this.CVform.get('datumRodjenja').value,

            this.CVform.get('radnaIskustva').value,

            this.CVform.get('obrazovanja').value,

            this.CVform.value.maternjiJezik,
            this.CVform.value.straniJezici,
            this.CVform.value.komunikacioneVestine,
            this.CVform.value.organizacioneVestine,
            this.CVform.value.poslovneVestine,
            this.CVform.value.digitalneVestine).subscribe((cv: Biografija) => {
                if (cv) {
                    console.log("cv");
                    this.poruka = " Uspesna izmena ";

                    this.router.navigate(['/student']);
                } else console.log("neuspesno");;
            });
    }

    pretraziKonkurse() {


        if (this.searchForm.value.kompanija == null && this.searchForm.value.pozicija == null && this.selektovaniTipovi.length == 0) {

            this.poruka = "Pretrazite po nekom kriterijumu!";

        } else if (this.searchForm.value.kompanija != null && this.searchForm.value.pozicija && this.selektovaniTipovi.length > 0) {

            for (let konkurs of this.konkursi) {
                if (konkurs.kompanija === this.searchForm.value.kompanija || konkurs.pozicija === this.searchForm.value.pozicija || konkurs.kompanija.toLowerCase().indexOf(this.searchForm.value.kompanija.toLowerCase()) !== -1 || konkurs.pozicija.toLowerCase().indexOf(this.searchForm.value.pozicija.toLowerCase()) !== -1) {
                    if (this.prikazKonkursi.indexOf(konkurs) == -1) {
                        let today = new Date();
                        let rok = new Date(konkurs.datum);
                        if (today < rok) {
                            this.flag = false;
                        }

                            this.prikazKonkursi.push(konkurs);
                    }
                }
            }

            for (let konkurs of this.konkursi) {
                for (let tip of this.selektovaniTipovi) {
                    if (konkurs.tipKonkursa === tip) {
                        if (this.prikazKonkursi.indexOf(konkurs) == -1) {
                            let today = new Date();
                            let rok = new Date(konkurs.datum);
                            if (today < rok) {
                                this.flag = false;
                            }
                                this.prikazKonkursi.push(konkurs);
                            break;
                        }
                    }
                }
            }


            this.router.navigate(['/student']);


        } else if (this.searchForm.value.kompanija == null && this.searchForm.value.pozicija != null && this.selektovaniTipovi.length > 0) {

            for (let konkurs of this.konkursi) {
                if (konkurs.pozicija === this.searchForm.value.pozicija || konkurs.pozicija.toLowerCase().indexOf(this.searchForm.value.pozicija.toLowerCase()) !== -1) {
                    if (this.prikazKonkursi.indexOf(konkurs) == -1) {
                        let today = new Date();
                        let rok = new Date(konkurs.datum);
                        if (today < rok) {
                            this.flag = false;
                        }
                            this.prikazKonkursi.push(konkurs);
                    }
                }
            }

            for (let konkurs of this.konkursi) {
                for (let tip of this.selektovaniTipovi) {
                    if (konkurs.tipKonkursa === tip) {
                        if (this.prikazKonkursi.indexOf(konkurs) == -1) {
                            let today = new Date();
                            let rok = new Date(konkurs.datum);
                            if (today < rok){
                                this.flag = false;
                            }
                                this.prikazKonkursi.push(konkurs);
                            break;
                        }
                    }
                }
            }


            this.router.navigate(['/student']);

        } else if (this.searchForm.value.kompanija != null && this.searchForm.value.pozicija == null && this.selektovaniTipovi.length > 0) {

            for (let konkurs of this.konkursi) {
                if (konkurs.kompanija === this.searchForm.value.kompanija || konkurs.kompanija.toLowerCase().indexOf(this.searchForm.value.kompanija.toLowerCase()) !== -1) {
                    if (this.prikazKonkursi.indexOf(konkurs) == -1) {
                        let today = new Date();
                        let rok = new Date(konkurs.datum);
                        if (today < rok){
                            this.flag = false;
                        }
                            this.prikazKonkursi.push(konkurs);
                    }
                }
            }

            for (let konkurs of this.konkursi) {
                for (let tip of this.selektovaniTipovi) {
                    if (konkurs.tipKonkursa === tip) {
                        if (this.prikazKonkursi.indexOf(konkurs) == -1) {
                            let today = new Date();
                            let rok = new Date(konkurs.datum);
                            if (today < rok){
                                this.flag = false;
                            }
                                this.prikazKonkursi.push(konkurs);
                            break;
                        }
                    }
                }
            }


            this.router.navigate(['/student']);
        } else if (this.searchForm.value.kompanija != null && this.searchForm.value.pozicija != null && this.selektovaniTipovi.length == 0) {
            for (let konkurs of this.konkursi) {
                if (konkurs.kompanija === this.searchForm.value.kompanija || konkurs.pozicija === this.searchForm.value.pozicija || konkurs.kompanija.toLowerCase().indexOf(this.searchForm.value.kompanija.toLowerCase()) !== -1 || konkurs.pozicija.toLowerCase().indexOf(this.searchForm.value.pozicija.toLowerCase()) !== -1) {
                    if (this.prikazKonkursi.indexOf(konkurs) == -1) {
                        let today = new Date();
                        let rok = new Date(konkurs.datum);
                        if (today < rok){
                            this.flag = false;
                        }
                            this.prikazKonkursi.push(konkurs);
                    }
                }
            }



            this.router.navigate(['/student']);
        } else if (this.searchForm.value.kompanija != null && this.searchForm.value.pozicija == null && this.selektovaniTipovi.length == 0) {

            for (let konkurs of this.konkursi) {

                if (konkurs.kompanija === this.searchForm.value.kompanija || konkurs.kompanija.toLowerCase().indexOf(this.searchForm.value.kompanija.toLowerCase()) !== -1) {

                    if (this.prikazKonkursi.indexOf(konkurs) == -1) {
                        let today = new Date();
                        let rok = new Date(konkurs.datum);
                        if (today < rok) {
                            this.flag = false;
                        }
                            this.prikazKonkursi.push(konkurs);
                    }
                }
            }
            console.log(this.prikazKonkursi);
            this.router.navigate(['/student']);

        } else if (this.searchForm.value.kompanija == null && this.searchForm.value.pozicija != null && this.selektovaniTipovi.length == 0) {
            console.log(this.konkursi);
            for (let konkurs of this.konkursi) {


                if (konkurs.pozicija === this.searchForm.value.pozicija || konkurs.pozicija.toLowerCase().indexOf(this.searchForm.value.pozicija.toLowerCase()) !== -1) {
                    console.log("isti");
                    if (this.prikazKonkursi.indexOf(konkurs) == -1) {
                        console.log("ubaci");
                        let today = new Date();
                        let rok = new Date(konkurs.datum);
                        if (today < rok) {
                            this.flag = false;
                        }
                            this.prikazKonkursi.push(konkurs);
                    }
                }
            }
            console.log(this.prikazKonkursi);
            this.router.navigate(['/student']);


        } else if (this.searchForm.value.kompanija == null && this.searchForm.value.pozicija == null && this.selektovaniTipovi.length > 0) {

            for (let konkurs of this.konkursi) {
                for (let tip of this.selektovaniTipovi) {
                    if (konkurs.tipKonkursa === tip) {
                        if (this.prikazKonkursi.indexOf(konkurs) == -1) {
                            let today = new Date();
                            let rok = new Date(konkurs.datum);
                            if (today < rok) {
                                this.flag = false;
                            }
                                this.prikazKonkursi.push(konkurs);
                            break;
                        }
                    }
                }
            }


            this.router.navigate(['/student']);
        }
    }


    informacijeKompanija(kompanija: HTMLDivElement) {
        console.dir("22222" + kompanija.textContent);

        this.service.dohvatiKompanijeSaImenom(kompanija.textContent).subscribe((user: User) => {
            if (user) {
                console.log("nasao");
                localStorage.setItem("kompanijaInfo", JSON.stringify(user));
                for (let konkurs of this.konkursi) {
                    if (konkurs.kompanija === user.naziv) {
                        let rokPrijave = new Date(konkurs.datum);
                        let danas = new Date();
                        console.log(danas);
                        console.log(rokPrijave);
                        if (rokPrijave > danas) {
                            this.konkursiKompanije.push(konkurs);
                        } else console.log("Nije otvoren");

                    }
                }
                localStorage.setItem("nizKonkursa", JSON.stringify(this.konkursiKompanije));
                console.log(this.konkursiKompanije);
                this.router.navigate(['/student/kompanija']);
            }
        });
    }


    informacijeKonkurs(konkurs: HTMLDivElement) {
        console.dir("22222" + konkurs.textContent);
        this.service.dohvatiKonkurs(konkurs.textContent).subscribe((konkurs: Konkurs) => {
            if (konkurs) {
                console.log("provera" + konkurs.pozicija);
                localStorage.setItem("konkursInfo", JSON.stringify(konkurs));
                localStorage.setItem("korime", String(this.korime));
                localStorage.setItem("idKonkursa", String(konkurs._id));
                localStorage.setItem("flag", JSON.stringify(this.flag));
                console.log("uuu" +konkurs._id)
                localStorage.setItem("imeKonkursa", String(konkurs.pozicija));
                this.router.navigate(['/student/konkurs']);

            }
        })
    }
}