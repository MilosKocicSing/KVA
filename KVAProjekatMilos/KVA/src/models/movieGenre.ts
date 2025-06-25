import { Genre } from "./genre";

export interface MovieGenre {
    movieGenreId: number;
    movieId: number;
    genreId: number;
    genre: Genre;
}