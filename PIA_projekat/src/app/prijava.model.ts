import { Biografija } from './biografija.model';
import { Konkurs } from './konkurs.model';

export interface Prijava {
    korime: String;
    biografija: Biografija;
    konkurs: Konkurs;
    cl:String;
    status: String;
    pozicija: String;
}