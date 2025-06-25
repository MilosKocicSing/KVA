import { Component } from '@angular/core';
import { UserService } from '../../services/korisnik.service';
import { Router, RouterLink } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Korisnik } from '../../models/korisnik';
import { MatTableModule } from '@angular/material/table';
import { MatAccordion, MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { FilmService } from 'services/film.service';
import { Film } from 'models/film';
import { Input} from '@angular/core';
import { UtilsService } from 'services/utils.service';

@Component({
  selector: 'app-user',
  imports: [
    NgIf,
    NgFor,
    MatButtonModule,
    MatCardModule,
    MatTableModule,
    RouterLink,
    MatExpansionModule,
    MatAccordion,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatSelectModule
  ],
  templateUrl: './korisnik.component.html',
  styleUrl: './korisnik.component.css'
})
export class KorisnikComponent {
  public user: Korisnik | null = null
  public userCopy: Korisnik | null = null
  public movies: Film[] | null = null
  public favoriteMovies: string[] = []
  public displayedColumns: string[] = ['poster', 'title', 'runTime', 'startDate', 'projectionDate', 'projectionTime','price', 'count', 'total', 'status','buttons'/*, 'rating'*/];
  @Input() purchaseHistory: any[] = [];
  @Input() purchaseHistoryForUser: any[] = [];

  public oldPasswordValue = ''
  public newPasswordValue = ''
  public repeatPasswordValue = ''
  ngOnInit() {
  const purchaseHistory = localStorage.getItem('purchaseHistory');
  this.purchaseHistory = purchaseHistory ? JSON.parse(purchaseHistory) : [];
   for (let i = 0; i < this.purchaseHistory.length; i++){
    if(this.purchaseHistory[i].activeUser == this.user?.username){
      this.purchaseHistoryForUser.push(this.purchaseHistory[i]);
    }
   }
  }

  constructor(private router: Router, public utils: UtilsService) {
    if (!UserService.getActiveUser()) {
      router.navigate(['/home'])
      return
    }

    this.user = UserService.getActiveUser()
    this.userCopy = UserService.getActiveUser()
    FilmService.getMovies()
          .then(rsp => 
            this.movies = rsp.data
          )
  }

  public doChangePassword() {
    if (this.oldPasswordValue == '' || this.newPasswordValue == null) {
      alert('Password cant be empty')
      return
    }

    if (this.newPasswordValue !== this.repeatPasswordValue) {
      alert('Password dont match')
      return
    }

    if (this.oldPasswordValue !== this.user?.password) {
      alert('Password dont match')
      return
    }

    alert(
      UserService.changePassword(this.newPasswordValue) ?
        'Password has been changed' : 'Failed to change password'
    )

    this.oldPasswordValue = ''
    this.newPasswordValue = ''
    this.repeatPasswordValue = ''
  }

  public doUpdateUser() {
    if (this.userCopy == null) {
      alert('User not defined')
      return
    }

    UserService.updateUser(this.userCopy)
    this.user = UserService.getActiveUser()
    alert('User was updated')
  }

  
  Pay(movie: any){
    movie.status = "Gledano"
    localStorage.setItem('purchaseHistory', JSON.stringify(this.purchaseHistory));
  }

  Cancel(movie : any){
      movie.status = 'Otkazano'
    localStorage.setItem('purchaseHistory', JSON.stringify(this.purchaseHistory));
  }
}
