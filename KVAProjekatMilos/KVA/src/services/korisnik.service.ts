import { Film } from "../models/film"
import { Ticket } from "../models/ticket"
import { Korisnik } from "../models/korisnik"

export class UserService {

    static retrieveUsers(): Korisnik[] {
        if (!localStorage.getItem('users')) {
            const arr: Korisnik[] = [
                {
                    username: 'korisnik1',
                    email: 'user@example.com',
                    name: 'Example',
                    surname: 'User',
                    phoneNumber: '+3816123456789',
                    address: 'Mokroluska 14, Vozdovac',
                    favoriteMovies: [],
                    password: 'user123'
                }
            ]

            localStorage.setItem('users', JSON.stringify(arr))
        }

        return JSON.parse(localStorage.getItem('users')!)
    }

    static createUser(model: Korisnik) {
        const users = this.retrieveUsers()

        for (let u of users) {
            if (u.email === model.email)
                return false
            if (u.username === model.username)
                return false
        }

        users.push(model)
        localStorage.setItem('users', JSON.stringify(users))
        return true
    }

    static updateUser(model: Korisnik) {
        const users = this.retrieveUsers()
        for (let u of users) {
            if (u.email === model.email && u.username === model.username) {
                u.name = model.name
                u.surname = model.surname
                u.address = model.address
                u.phoneNumber = model.phoneNumber
                u.favoriteMovies = model.favoriteMovies
            }
        }

        localStorage.setItem('users', JSON.stringify(users))
    }

    static login(username: string, password: string): boolean {
        for (let user of this.retrieveUsers()) {
            if (user.username === username && user.password === password) {
                localStorage.setItem('active', user.username)
                return true
            }
        }

        return false
    }

    static getActiveUser(): Korisnik | null {
        if (!localStorage.getItem('active'))
            return null

        for (let user of this.retrieveUsers()) {
            if (user.username == localStorage.getItem('active')) {
                return user
            }
        }

        return null
    }

    static changePassword(newPassword: string): boolean {

        const arr = this.retrieveUsers()
        for (let user of arr) {
            if (user.username == localStorage.getItem('active')) {
                user.password = newPassword
                localStorage.setItem('users', JSON.stringify(arr))
                return true
            }
        }

        return false
    }
    
}