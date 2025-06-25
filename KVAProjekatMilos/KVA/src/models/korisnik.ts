import { Film } from "./film"
import { Ticket } from "./ticket"

export interface Korisnik {
    name: string;
    surname: string;
    email: string;
    phoneNumber: string;
    address: string;
    favoriteMovies: string[];
    username: string;
    password: string;
}
