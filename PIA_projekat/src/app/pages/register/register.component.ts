import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/user.model';
import { KorisniciService } from 'src/app/korisnici.service';
import { NgForm, NG_ASYNC_VALIDATORS } from '@angular/forms';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CustomValidators } from './custom-validators';
import {MenuItem} from 'primeng/api';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import {mimeType} from "./mime-type.validator";
@Component({
    templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {
    items: MenuItem[];
    
    
    korime: String;
    lozinka: String;
    mail: String;

    // student

    ime: String;
    prezime: String;
    telefon: String;
    godinaStudija: String;
    diplomirao: String;

    // kompanija
    naziv: String;
    grad: String;
    adresa: String;
    direktor: String;
    PIB: String;
    trenutnoZaposlenih: String;
    sajt: String;
    delatnost: String;
    uzaSpecijalnost:String;

    student: String = "student";
    kompanija: String = "kompanija";
    // meni
    pokaziStudenta: Boolean = true;
    pokaziKompaniju: Boolean = false;
    activeItem:MenuItem;
    
    
    imagePreview: string;
    poruka: string;
    flag: Boolean = false;
    porukaRegistrovanje: String;
    flagRegistrovanje: Boolean = false;


    constructor(private router: Router, private fb: FormBuilder, private service: KorisniciService) {
      this.frmSignup = this.createSignupForm();
      
      
    }
    

    ngOnInit() {
        
      this.items = [
            
        {label: 'Student', command(event) {
          this.pokaziStudenta = true;
          this.pokaziKompaniju = false;
        }},
        {label: 'Kompanija', style : "color:red;", command(event) {
          this.pokaziStudenta =false;
          this.pokaziKompaniju = true;
        }}
        
    ];

    }

    public frmSignup: FormGroup;

  

  createSignupForm(): FormGroup {
  
    return this.fb.group(
      { korime: [],
        email: [
          null,
          Validators.compose([Validators.email, Validators.required])
        ],
        image: [
          null,
          Validators.required,
          [mimeType]
         
        ],
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

  submit(tip) {
    

    this.service.pronadjiUsername(this.frmSignup.value.korime).subscribe((user: User)=>{
     
      if (user) {
        this.porukaRegistrovanje = "Korisnik sa zadatim korisnickim imenom vec postoji!";
        this.router.navigate(['/register']);
      } else {
        
        if(tip =="student" )
        this.service.registrujStudenta(this.frmSignup.value.korime,this.frmSignup.get('password').value, this.ime, this.prezime, this.telefon, this.frmSignup.get('email').value, this.godinaStudija, this.diplomirao,this.frmSignup.get('image').value).subscribe((user: User)=>{
                    if(user){
                      console.log(this.frmSignup.get('image').value);
                  
                      this.router.navigate(['/login']);
                    } else console.log("neuspesno");
       });
      
          
          else if(tip == "kompanija") { 
            console.log("Registruje kompaniju");
            this.service.registrujKompaniju(this.frmSignup.value.korime,this.frmSignup.get('password').value, this.naziv, this.grad, this.adresa, this.direktor, this.PIB, this.trenutnoZaposlenih, this.frmSignup.get('email').value,this.sajt, this.delatnost, this.uzaSpecijalnost, this.frmSignup.get('image').value).subscribe((user: User)=>{
              if(user){
                this.router.navigate(['/login']);
              } else console.log("neuspesno");
          });
          
        }
      }
    })

   

  
  }

  prikazi() {

    if(this.pokaziStudenta) {
      this.pokaziStudenta = false;
      this.pokaziKompaniju = true;
      this.poruka = "";
      this.flag = false;
      this.router.navigate(['/register']);
    } else if (this.pokaziKompaniju) {
      this.pokaziStudenta = true;
      this.pokaziKompaniju = false;
      this.poruka = "";
      this.flag = false;
      this.router.navigate(['/register']);
    } 
      
  }

  onImagePicked(event: Event) {
    const file =(event.target as HTMLInputElement).files[0];
    const img = new Image();
    this.frmSignup.patchValue({image: file});
    this.frmSignup.get('image').updateValueAndValidity();
    const reader = new FileReader();


    reader.onload = () => {

        img.src = reader.result as string;
  
       this.imagePreview = reader.result as string;
    };

    img.onload = () => {
      const width = img.naturalWidth;
      const height = img.naturalHeight;
      this.flag = false;
      this.poruka = "";
      if(width > 300 || width <100 || height>300 || height < 100) {
        this.poruka = "Unesite sliku ispravne velicine!";
        this.flag = true;
        console.log(this.flag);
        
     }
 
  
    }
 
    reader.readAsDataURL(file);
    
  
  }
}