import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import { NgFor } from '@angular/common';
import { UserService } from '../../services/korisnik.service';
import { FilmService } from 'services/film.service';
import { Film } from '../../models/film';

@Component({
  selector: 'app-register',
  imports: [MatCardModule, NgFor, RouterLink, MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, MatSelectModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  public movies: Film[] | null = null
  public favoriteMovies: string[] = []
  public email = ''
  public password = ''
  public repeatPassword = ''
  public name = ''
  public surname = ''
  public phone = ''
  public address = ''
  public username = ''

  public constructor(private router: Router) {
    FilmService.getMovies()
      .then(rsp => 
        this.movies = rsp.data
      )
  }

  public doSignup() {
    if (this.email == '' || this.password == '' || this.username == '') {
      alert('Email, korisničko ime i šifra su obavezna polja')
      return
    }

    if (this.password !== this.repeatPassword) {
      alert('Šifre se ne podudaraju')
      return
    }

    const result = UserService.createUser({
      email: this.email,
      password: this.password,
      name: this.name,
      surname: this.surname,
      phoneNumber: this.phone,
      address: this.address,
      favoriteMovies: this.favoriteMovies,
      username: this.username
    })

    result ? this.router.navigate(['/login']) : alert('Email ili korisničko ime je već zauzeto')
  }
}