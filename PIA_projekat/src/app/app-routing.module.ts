import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { KompanijaComponent } from './pages/kompanija/kompanija.component';
import { StudentComponent } from './pages/student/student.component';
import { AdminComponent } from './pages/admin/admin.component';
import { RegisterComponent } from './pages/register/register.component';
import { PromenaLozinkeComponent } from './pages/promenaLozinke/promenaLozinke.component';
import { NeregistrovaniComponent } from './pages/neregistrovaniKorisnik/neregistrovani.component';
import { StudentKonkursComponent } from './pages/studentKonkurs/studentKonkurs.component';
import { StudentKompanijaComponent } from './pages/studentKompanija/studentKompanija.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: '', component: LoginComponent},
  {path: 'kompanija', component: KompanijaComponent},
  {path: 'student', component: StudentComponent},
  {path: 'admin', component: AdminComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'promenaLozinke', component: PromenaLozinkeComponent},
  {path: 'neregistrovani', component: NeregistrovaniComponent},
  {path: 'student/konkurs', component: StudentKonkursComponent},
  {path: 'student/kompanija', component: StudentKompanijaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
