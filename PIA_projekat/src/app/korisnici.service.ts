import { Injectable } from '@angular/core';

import {HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class KorisniciService {

  uri='http://localhost:3000'

  constructor(private http: HttpClient) { }

  login(korime, lozinka){
    const data = {
      korime: korime,
      lozinka: lozinka
    };
    console.log('usao2');
    return this.http.post(`${this.uri}/login`, data);
  }

  pronadjiUsername(korime){
    console.log(korime + "---");
    return this.http.get(`${this.uri}/register/${korime}`);
  }


  registrujStudenta(korime, lozinka, ime, prezime, telefon, mail, godinaStudija, diplomirao, image){
    const data = new FormData(); 
      data.append("korime", korime);
      data.append("lozinka", lozinka);
      data.append("ime", ime);
      data.append("prezime", prezime);
      data.append("telefon", telefon);
      data.append("mail", mail);
      data.append("tip", "student");
      data.append("godinaStudija", godinaStudija);
      data.append("diplomirao", diplomirao);
      data.append("image", image, korime);
      console.log('usao2');
       return this.http.put(`${this.uri}/register/student`, data);
  }


  
  registrujKompaniju(korime, lozinka, naziv, grad, adresa, direktor, PIB, brojZaposlenih, mail, sajt, delatnost,uzaSpecijalnost, image){
    const data = new FormData(); 
  
    data.append("korime", korime);
    data.append("lozinka", lozinka);
    data.append("naziv", naziv);
    data.append("grad", grad);
    data.append("adresa", adresa);
    data.append("direktor", direktor);
    data.append("tip", "kompanija");
    data.append("PIB", PIB);
    data.append("brojZaposlenih", brojZaposlenih);
    data.append("mail", mail);
    data.append("sajt", sajt);
    data.append("delatnost", delatnost);
    data.append("uzaSpecijalnost", uzaSpecijalnost);
    data.append("image", image, korime);
   // data.append("putanjaSlika", "" + korime);
    console.log('usao2');
    return this.http.put(`${this.uri}/register/kompanija`, data);
  }


  proveriKorisnickoIme(korime) {
    return this.http.get(`${this.uri}/promenaLozinke/${korime}`);
}

dohvatiSveKompanije() {
  return this.http.get(`${this.uri}/neregistrovani`);
}

 promenaLozinke(lozinka, korime) {
  
  const data = {
     lozinka: lozinka,
  };


   return this.http.put(`${this.uri}/promenaLozinke/${korime}`, data);
 }


 updateCV(korime, ime, prezime, mail, telefon, grad, adresa, sajt, datumRodjenja, radnaIskustva, obrazovanja, maternjiJezik, straniJezici, komunikacioneVestine, organizacioneVestine, poslovneVestine, digitalneVestine){

  const data = {
    korime: korime,
    ime: ime,
    prezime:prezime,
    mail: mail,
    telefon:telefon,
    grad:grad,
    adresa:adresa,
    sajt:sajt,
    datumRodjenja:datumRodjenja,
   radnaIskustva: radnaIskustva,
    obrazovanja:obrazovanja,
    maternjiJezik:maternjiJezik,
    straniJezici:straniJezici,
    komunikacioneVestine:komunikacioneVestine,
    organizacioneVestine:organizacioneVestine,
    poslovneVestine:poslovneVestine,
    digitalneVestine:digitalneVestine

  };
  

  return this.http.put(`${this.uri}/student/${korime}`, data);

 }

  dohvatiBiografiju(korime){
    return this.http.get(`${this.uri}/student/${korime}`);
  }

  dohvatiBiografijuZaKonkurs(korime){
    console.log("dohvatiBiografiju" +  korime)
    return this.http.get(`${this.uri}/student/konkurs/${korime}`);
  }

   dodajCV(korime, ime, prezime, mail, telefon, grad, adresa, sajt, datumRodjenja, radnaIskustva, obrazovanja, maternjiJezik, straniJezici, komunikacioneVestine, organizacioneVestine, poslovneVestine, digitalneVestine){
      console.log("11111111111111111");
      console.log(grad);
      console.log(adresa);
      console.log(maternjiJezik);
      const data = {
        korime: korime,
        ime: ime,
        prezime:prezime,
        mail: mail,
        telefon:telefon,
        grad:grad,
        adresa:adresa,
        sajt:sajt,
        datumRodjenja:datumRodjenja,
       radnaIskustva: radnaIskustva,
        obrazovanja:obrazovanja,
        maternjiJezik:maternjiJezik,
        straniJezici:straniJezici,
        komunikacioneVestine:komunikacioneVestine,
        organizacioneVestine:organizacioneVestine,
        poslovneVestine:poslovneVestine,
        digitalneVestine:digitalneVestine

      };
      
    
      return this.http.post(`${this.uri}/student`, data);

    }

    dodajKonkurs(pozicija, tekst, datum, tipKonkursa, kompanija) {
     
      console.log("servis" + tipKonkursa);

      const data = {
        pozicija: pozicija,
        tekst: tekst,
        datum: datum,
        tipKonkursa: tipKonkursa,
        kompanija: kompanija
      }
      return this.http.post(`${this.uri}/kompanija`, data);
    }

    dohvatiSveKonkurse() {
      return this.http.get(`${this.uri}/student`);
    }

    dohvatiKompanijeSaImenom(kompanija) {
      console.log(kompanija);
      return this.http.get(`${this.uri}/student/dohvKompanije/${kompanija}`);
    }

    dohvatiKonkurs(pozicija) {
      console.log('usao1');
      return this.http.get(`${this.uri}/student/dohvKonkurs/${pozicija}`);
    }

    dohvatiPrijavljene(naziv) {
      return this.http.get(`${this.uri}/student/konkurs/prijavljeni/${naziv}`);

    }

    prihvati(korime) {
      console.log("servis" + korime);
      const data = {
        korime: korime
      }
      return this.http.put(`${this.uri}/student/konkurs/prihvati`, data);
    }

    odbij(korime) {
      console.log("servis" + korime);
      const data = {
        korime: korime
      }
      return this.http.put(`${this.uri}/student/konkurs/odbij`, data);
    }


    dohvatiPrijaveZaKonkurs(id) {
      return this.http.get(`${this.uri}/student/konkurs/prijave/${id}`);
    }



    dodajPrijavu(korime,biografija, konkurs, cl, status, pozicija) {
   

      const data = {
        korime: korime,
        biografija:biografija,
        konkurs:konkurs,
        cl:cl,
        status:status,
        pozicija:pozicija
      }
      return this.http.post(`${this.uri}/student/konkurs`, data);
    }


    dohvatiPrijavu(korime, pozicija){
      const data = {
        korime: korime,
        pozicija: pozicija
      }
      return this.http.put(`${this.uri}/student/konkurs/dohvPrijavu`, data);
    }



    dohvatiKonkurseZaKompaniju(naziv){
      console.log(naziv + "get");
      return this.http.get(`${this.uri}/student/kompanija/dohvKonkurse/${naziv}`);
    }

    dohvatiPrijaveZaSvakiKonkurs(konkurs){
      console.log("wtf");
      const data = {
        konkurs: konkurs
      }

      return this.http.put(`${this.uri}/student/kompanija/dohvPrijave`, data);
    }

}
