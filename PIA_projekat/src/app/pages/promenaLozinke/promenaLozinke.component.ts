import { Component, OnInit } from '@angular/core';

import { KorisniciService } from 'src/app/korisnici.service';
import { Router } from '@angular/router';
import { CustomValidators } from '../register/custom-validators';
import { User } from 'src/app/user.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
    selector: 'app-login',
    templateUrl: './promenaLozinke.component.html'
})
export class PromenaLozinkeComponent implements OnInit {

 

    novaLozinka: String;
    korime: String;
    lozinka: String;
    poruka: String;
    uspeh: Boolean = false;
   
    public frmChange: FormGroup;


    createChangeForm(): FormGroup {
  
        return this.fb.group(
          { korime :[],
            lozinka: [],
            password: [
              null,
              Validators.compose([
                Validators.required,
               
                // check whether the entered password has a number
                CustomValidators.patternValidator(/\d/, {
                  hasNumber: true
                }),
                // check whether the entered password has upper case letter
                CustomValidators.patternValidator(/[A-Z]/, {
                  hasCapitalCase: true
                }),
                // check whether the entered password has 3 lower case letters
                CustomValidators.patternValidator(/(?=(.*[a-z]){3})/, {
                  hasSmallCase: true
                }),
                // check whether the entered password has a special character
                CustomValidators.patternValidator(
                  /[ !?#$.*]/,
                  {
                    hasSpecialCharacters: true
                  }
                ),
                Validators.minLength(8),
                Validators.maxLength(12),
                // check whether the entered password has upper case letter
                CustomValidators.patternValidator(/^[a-zA-Z]/, {
                  firstChar: true
                }) ,
    
                CustomValidators.patternValidator(/^(?!.*(.)\1)[a-z|A-Z|0-9]/, {
                  noTwoSameConsecutive: true 
                })
              ])
            ],
            confirmPassword: [null, Validators.compose([Validators.required])]
          },
          {
            // check whether our password and confirm password match
            validator: CustomValidators.passwordMatchValidator
          }
        );
      }
    
    constructor(private router: Router, private service: KorisniciService, private fb: FormBuilder) {
        this.frmChange = this.createChangeForm();
     }
  
    ngOnInit() {

    }
  
   
    promeniLozinku() {
    this.uspeh = false;
    this.service.proveriKorisnickoIme(this.frmChange.get('korime').value).subscribe((user: User) => {
        if (!user) {
            this.poruka = "Uneto korisnicko ime nije ispravno";
            this.router.navigate['/promenaLozinke'];
        } else {
            if (user.lozinka != this.frmChange.get('lozinka').value) {
                this.poruka = "Uneli ste neispravnu lozinku";
                this.router.navigate(['/promenaLozinke']);
                
             } else {

            this.service.promenaLozinke(this.frmChange.get('password').value,this.frmChange.get('korime').value).subscribe(response => console.log(response));
            this.uspeh = true;
            this.poruka = null;
            this.router.navigate(['/login']);
             }
        }
    })

    }
  
  }