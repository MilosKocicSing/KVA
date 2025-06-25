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
import { FilmService } from '../../services/film.service';
import { Input} from '@angular/core';
import { UtilsService } from 'services/utils.service';

@Component({
  selector: 'app-korpa',
  imports: [NgIf,
    MatButtonModule,
    MatCardModule,
    MatTableModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatSelectModule,
    RouterLink,
],
  templateUrl: './korpa.component.html',
  styleUrl: './korpa.component.css'
})
export class KorpaComponent {
  public displayedColumns: string[] = ['poster', 'title', 'runTime', 'startDate', 'projectionDate', 'projectionTime', 'price', 'count', 'total', 'status', 'actions'];
  private activeUser = UserService.getActiveUser()?.username;

  @Input() orders: any[] = [];
  ordersForUser: any[] = [];
  ordersForDifferentUsers: any[] = [];
  purchaseHistory: any[] = [];
  purchaseHistoryForUser: any[] = [];

  ngOnInit() {
  const savedOrders = localStorage.getItem('orders');
  this.orders = savedOrders ? JSON.parse(savedOrders) : [];
  for(let i=0; i < this.orders.length; i++){
    if(this.orders[i].activeUser == this.activeUser){
      this.ordersForUser.push(this.orders[i]);
    }
    else{
      this.ordersForDifferentUsers.push(this.orders[i]);
    }
  }
  const reservationHistory = localStorage.getItem('purchaseHistory');
  this.purchaseHistory = reservationHistory ? JSON.parse(reservationHistory) : [];
  for(let i=0; i < this.purchaseHistory.length; i++){
    if(this.purchaseHistory[i].activeUser == this.activeUser){
      this.purchaseHistoryForUser.push(this.purchaseHistory[i]);
    }
  }
  }
  constructor(public utils: UtilsService){
    
  }
  clearLocalStorage(){
      localStorage.setItem('orders', JSON.stringify(this.ordersForDifferentUsers))
      window.location.reload()
  }
  getTotalPrice(): number {
  let total = 0
  for(let i = 0; i < this.ordersForUser.length; i++){
    if(this.ordersForUser[i].count > 0 && this.ordersForUser[i].count <= 10){
      total += (Number(this.ordersForUser[i].count) * Number(this.ordersForUser[i].price))
    }
    else if(this.ordersForUser[i].count <= 0){
      total += Number(this.ordersForUser[i].price)
    }
    else if(this.ordersForUser[i].count > 10){
      total += (Number(this.ordersForUser[i].price) * 10)
    }
  }
  return total
}
Reserve() {
    const orders = this.ordersForUser
    const purchaseHistory = JSON.parse(localStorage.getItem('purchaseHistory') || '[]');
    for (let i = 0; i < orders.length; i++) {
      if(orders[i].activeUser == this.activeUser && orders[i].count > 0 && orders[i].count <= 10){
        purchaseHistory.push({
          movieId: orders[i].movieId,
          poster: orders[i].poster,
          runTime: orders[i].runTime,
          startDate: orders[i].startDate,
          projectionDate: orders[i].projectionDate,
          projectionTime: orders[i].projectionTime,
          title: orders[i].title,
          price: orders[i].price,
          status: 'Rezervisano',
          count: orders[i].count,
          total: orders[i].price * orders[i].count,
          activeUser: this.activeUser
        });
      }
      else{
        alert('Unesite validnu količinu rezervacija')
        return;
      }
    }
    localStorage.setItem('purchaseHistory', JSON.stringify(purchaseHistory));
    localStorage.setItem('orders', JSON.stringify(this.ordersForDifferentUsers))
    window.location.reload()
    alert('Vaša rezervacija je dodata u istoriju na vašem nalogu')
  }
  count(){
    this.ordersForUser = this.ordersForUser.map(order => ({
      ...order,
      count: document.getElementById("count")
    }));
  }
  getStatus(order: any):string{
    for(let i = 0; i < this.purchaseHistoryForUser.length; i++){
      if(order.movieId === this.purchaseHistoryForUser[i].movieId && this.purchaseHistoryForUser[i].status === "Gledano"){
        return "Gledano"
      }
    }
    return ""
  }
  removeItem(order: any){
    let tempOrders = this.ordersForDifferentUsers
    for(let i = 0; i < this.ordersForUser.length; i++){
      if(order != this.ordersForUser[i]){
        tempOrders.push(this.ordersForUser[i])
      }
    }
    localStorage.setItem('orders', JSON.stringify(tempOrders))
    window.location.reload()
  }
}
