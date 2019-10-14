import { RadnoIskustvo } from './radnoIskustvo.model';
import { Obrazovanje } from './obrazovanje.model';

export interface Biografija {
    ime:  String;
   
    prezime:  String;
    mail:   String;
    telefon: String;
    grad: String;
    adresa: String;
    sajt:  String;
    datumRodjenja:  Date;
    radnaIskustva: Array<RadnoIskustvo> ;
    obrazovanja: Array<Obrazovanje>;
    maternjiJezik: String;
    straniJezici: String;
    komunikacioneVestine:  String;
    organizacioneVestine: String;
    poslovneVestine:String;
    digitalneVestine: String;
}