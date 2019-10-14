import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';

import {InputTextModule} from 'primeng/inputtext';
import {PasswordModule} from 'primeng/password';
import {ButtonModule} from 'primeng/button';
import {CardModule} from 'primeng/card';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {TabMenuModule} from 'primeng/tabmenu';
import {MultiSelectModule} from 'primeng/multiselect';
import {CalendarModule} from 'primeng/calendar';
import {EditorModule} from 'primeng/editor';
import {TabViewModule} from 'primeng/tabview';
import {FileUploadModule} from 'primeng/fileupload';
import {RadioButtonModule} from 'primeng/radiobutton';
import {DropdownModule} from 'primeng/dropdown';




import { KompanijaComponent } from './pages/kompanija/kompanija.component';
import { StudentComponent } from './pages/student/student.component';
import { AdminComponent } from './pages/admin/admin.component';
import { KorisniciService } from './korisnici.service';

import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";


import { ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './pages/register/register.component';
import { PromenaLozinkeComponent } from './pages/promenaLozinke/promenaLozinke.component';
import { NeregistrovaniComponent } from './pages/neregistrovaniKorisnik/neregistrovani.component';
import { MessageService } from 'primeng/api';
import { StudentKompanijaComponent } from './pages/studentKompanija/studentKompanija.component';
import { StudentKonkursComponent } from './pages/studentKonkurs/studentKonkurs.component';





@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    KompanijaComponent,
    StudentComponent,
    AdminComponent,
    RegisterComponent,
    PromenaLozinkeComponent,
    NeregistrovaniComponent,
    StudentKompanijaComponent,
    StudentKonkursComponent

  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    HttpClientModule,
    FormsModule,
    CardModule,
    ReactiveFormsModule,
    MessageModule,
    MessagesModule,
    TabMenuModule,
    MultiSelectModule,
    CalendarModule,
    EditorModule,
    TabViewModule,
    FileUploadModule,
    RadioButtonModule,
    DropdownModule
    
   
  ],
  providers: [KorisniciService, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
