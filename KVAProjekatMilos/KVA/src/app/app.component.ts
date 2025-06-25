import { Component, EventEmitter, Output } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { NgIf } from '@angular/common';
import { UserService } from '../services/korisnik.service'
import { FormsModule,  ReactiveFormsModule, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatToolbarModule, MatButtonModule, RouterLink, NgIf, FormsModule, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  title = 'KVA';

  public service = UserService
  public constructor(private router: Router) {}
  public doLogout() {
    localStorage.removeItem('active')
    this.router.navigate(['/login'])
    alert("Izlogovani ste");
  }
}
