import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { KorisnikComponent } from './korisnik/korisnik.component';
import { KorpaComponent } from './korpa/korpa.component';
import { LoginComponent } from './login/login.component';
import { FilmComponent } from './film/film.component';
import { RegisterComponent } from './register/register.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'korisnik', component: KorisnikComponent },
    { path: 'korpa', component: KorpaComponent },
    { path: 'film/:id', component: FilmComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent },
    { path: '**', redirectTo: '' }
];