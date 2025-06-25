import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { UserService } from '../../services/korisnik.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatCardModule, MatButtonModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  public username: string = ''
  public password: string = ''

  constructor(private router: Router) {
    if (UserService.getActiveUser()) {
      router.navigate(['/korisnik'])
      return
    }
  }

  public doLogin() {
    if (UserService.login(this.username, this.password)) {
      this.router.navigate(['/korisnik'])
      return
    }

    alert('Bad username or password')
  }
}
