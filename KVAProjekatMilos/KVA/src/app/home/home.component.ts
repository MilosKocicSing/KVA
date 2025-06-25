import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { RouterLink } from '@angular/router';
import { UtilsService } from '../../services/utils.service';
import { FilmService } from '../../services/film.service';
import { Film } from '../../models/film';
import { AxiosError } from 'axios';
import { JsonPipe } from '@angular/common';
import { FormControl } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { Genre } from 'models/genre';
import { Actor } from 'models/actor';
import { Director } from 'models/director';
import express, { Request, Response } from 'express';

@Component({
  selector: 'app-home',
  imports: [NgIf, NgFor, MatButtonModule, MatCardModule, RouterLink, FormsModule, MatFormFieldModule, MatInputModule, MatSelectModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  service = FilmService
  moviesMaster: Film[] = []
  public movies: Film[] = []
  public error: string | null = null
  public genres: Genre[] | null = null
  public actors: Actor[] | null = null
  public directors: Director[] | null = null
  userInputName: string = ''
  userInputActor: string = ''
  userInputGenre: string = ''
  userInputDirector: string = ''
  searchValue: string = ''
  actorId: number | null = null
  genreId: number | null = null
  directorId: number | null = null
  orders: any[] = [];
  public userRatings: any[] = [];
  moviesCopy: Film[] = [];

  constructor(public utils: UtilsService) {
    FilmService.getMovies()
      .then(rsp => {
        this.movies = rsp.data.map((movie: Film) => ({
          ...movie,
          price: utils.priceMap.get(movie.movieId)
        }));
        this.moviesMaster = this.movies
      })
      .catch((e: AxiosError) => this.error = `${e.code}: ${e.message}`)
    FilmService.getGenre()
      .then(rsp =>
        this.genres = rsp.data
      )
      .catch((e: AxiosError) => this.error = `${e.code}: ${e.message}`)
    FilmService.getActor()
      .then(rsp =>
        this.actors = rsp.data
      )
      .catch((e: AxiosError) => this.error = `${e.code}: ${e.message}`)
    FilmService.getDirector()
      .then(rsp =>
        this.directors = rsp.data
      )
      .catch((e: AxiosError) => this.error = `${e.code}: ${e.message}`)
      const ratings = localStorage.getItem('userRatings')
      this.userRatings = ratings ? JSON.parse(ratings) : [];
  }
  Search(name: string) {
    name.toLocaleLowerCase()

    if (!name) {
      FilmService.getMovies()
      .then(rsp => {
        this.movies = rsp.data.map((movie: Film) => ({
          ...movie,
          price: this.utils.priceMap.get(movie.movieId)
        }));
      })
      return;
    }

    for(let i = 0; i<this.moviesMaster.length; i++){
      if(this.moviesMaster[i].title.toLocaleLowerCase().includes(name)){
        this.moviesCopy.push(this.moviesMaster[i])
      }
    }

    this.movies = this.moviesCopy
    this.moviesCopy = []
  }

  Filter() {

    let actor = this.userInputActor;
    let genre = this.userInputGenre;
    let director = this.userInputDirector;

    if (actor) {
      this.actorId = Number(actor);
    }

    if (genre) {
      this.genreId = Number(genre);
    }

    if (director) {
      this.directorId = Number(director);
    }

    FilmService.getMoviesFilter(this.actorId, this.genreId, this.directorId)
      .then(rsp =>
        this.movies = rsp.data.map((movie: Film) => ({
          ...movie,
          price: this.utils.priceMap.get(movie.movieId)
        }))
      )

      .catch((e: AxiosError) => this.error = `${e.code}: ${e.message}`)

    this.genreId = null
    this.directorId = null
    this.actorId = null
  }
  ProsecnaOcena(movieId: number): number{
    let sum = 0
    let br = 0
    for(let i = 0; i < this.userRatings.length; i++){
      if(this.userRatings[i].movieId == movieId){
        sum += Number(this.userRatings[i].rating)
        br++
      }
    }
    if((sum/br) > 0){
      return sum/br
    }
    else{
      return 0
    }
  }
}