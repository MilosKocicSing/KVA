import { Injectable } from '@angular/core';
import { UserService } from './korisnik.service';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  priceMap: Map<number, number> = new Map([
    [1, 999],
    [2, 699],
    [3, 499],
    [4, 1199],
    [5, 899],
    [6, 599],
    [7, 649],
    [8, 1299],
    [9, 399],
    [10, 349],
    [11, 199],
    [12, 699],
    [13, 799],
    [14, 799],
    [15, 1099],
    [16, 299],
    [17, 359],
    [18, 699],
    [19, 499],
    [20, 599],
    [21, 259],
    [22, 759],
    [23, 599],
    [24, 399],
    [25, 529],
    [26, 1099],
    [27, 999],
    [28, 859],
    [29, 379],
    [30, 399],
    [31, 499],
    [32, 699],
    [33, 1250],
    [34, 419],
    [35, 559],
    [36, 459],
    [37, 899],
    [38, 1099],
    [39, 609],
    [40, 799],
    [41, 899],
    [42, 799],
    [43, 399],
    [44, 499],
    [45, 699],
    [46, 599],
    [47, 299],
    [48, 369],
    [49, 479],
    [50, 959],
    [51, 699],
    [52, 799],
    [53, 1499],
    [54, 239],
    [55, 199],
    [56, 399],
    [57, 599],
    [58, 529],
    [59, 649],
    [60, 899],
    [61, 399],
    [62, 459],
    [63, 999],
    [64, 259],
    [65, 1099],
    [66, 799],
    [67, 689],
    [68, 789],
    [69, 299],
    [70, 459],
    [71, 1259],
    [72, 1299],
    [73, 399],
    [74, 459],
    [75, 489],
    [76, 239],
    [77, 189],
    [78, 769],
    [79, 1499],
    [80, 299],
    [81, 499],
    [82, 659],
  ]);
  public projectionDate: string[] = [];
  public projectionTime: string[] = [
    '12:00',
    '14:30',
    '15:30',
    '17:00',
    '19:00',
  ];
  constructor() {
    let datestring;
    for (let i = 0; i < 5; i++) {
      let date = new Date();
      date.setDate(date.getDate() + i);
      datestring = date.toISOString().slice(0, 10);
      this.projectionDate.push(datestring);
    }
  }

  public generateMovieImage(poster: string) {
    return poster;
  }

  public formatDate(iso: string) {
    return new Date(iso).toLocaleString('sr-RS').slice(0, 12);
  }
  public round(number: number) {
    return Math.round(number);
  }
  public round2(number: number) {
    return Math.round(number * 100) / 100;
  }
  public leftover(number: number) {
    return number % 60;
  }
  public multiply(cena: number, kolicina: number): number {
    if (kolicina > 0 && kolicina <= 10) {
      return cena * kolicina;
    } else if (kolicina > 10) {
      return cena * 10;
    } else {
      return cena * 1;
    }
  }

  Orders(
    movie: any,
    userInputDate: string,
    userInputTime: string,
    userInputCount: number
  ) {
    const activeUser = UserService.getActiveUser()?.username;
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    const ordered = orders.find(
      (o: any) =>
        o.movieId === movie.movieId &&
        o.projectionTime === userInputTime &&
        o.projectionDate === userInputDate
    );
    if (!activeUser) {
      alert('Ulogujte se');
    } else if (
      ordered &&
      ordered.count <= 10 &&
      activeUser &&
      userInputCount > 0
    ) {
      if (userInputCount + ordered.count <= 10) {
        ordered.count += userInputCount;
        alert('Dodali ste u korpu još karata za ovu projekciju');
      } else {
        alert('Previše karata! Maksimum je 10 po projekciji');
      }
    } else if (
      userInputDate != '' &&
      userInputTime != '' &&
      userInputCount > 0 &&
      userInputCount <= 10 &&
      activeUser
    ) {
      alert('Dodali ste film u vašu korpu');
      orders.push({
        movieId: movie.movieId,
        poster: movie.poster,
        runTime: movie.runTime,
        startDate: movie.startDate,
        projectionDate: userInputDate,
        projectionTime: userInputTime,
        title: movie.title,
        price: movie.price,
        status: '',
        rating: '',
        count: userInputCount,
        activeUser: activeUser,
      });
    } else {
      alert(
        'Unesite datum i vreme projekcije \nMaksimalna količina karata je 10'
      );
    }
    localStorage.setItem('orders', JSON.stringify(orders));
  }
}
