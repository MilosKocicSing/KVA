import axios from 'axios';

// export class FilmService {
//     static async getMovies(page: number = 0, size: number = 10) {
//         return axios.get('https://movie.pequla.com/api/movie')
//     }
// }

const client = axios.create({
    baseURL: 'https://movie.pequla.com/api',
    headers: {
        'Accept': 'app/json',
        'X-Client-Name': 'KVA/2025'
    },
    validateStatus: (status: number) => {
        return status === 200
        /*Samo ako je 200 vrati response
        U ostalim slucajevima baci izuzetak*/
    }
})

export class FilmService {
    static async getMovies(page: number = 0, size: number = 10) {
        return client.request({
            url: '/movie',
            method: 'GET',
            params: {
                'page': page,
                'size': size,
                'sort': 'startDate, desc',
            }
        })
    }
    static async getMoviesSearch(search: string) {
        return client.request({
            url: `/movie/?search=${search}`,
            method: 'GET',
        })
    }
    static async getMoviesFilter(actor: number | null, genre: number | null, director: number | null){
        return client.request({
            url: `/movie/?actor=${actor}&genre=${genre}&director=${director}`,
            method: 'GET',
        })
    }
    static async getMovieById(movieId: number) {
        return client.get(`/movie/${movieId}`)
    }
    static async getGenre() {
        return client.request({
            url: '/genre',
            method: 'GET',
            params: {
                'type': 'genre'
            }
        })
    }
    static async getActor() {
        return client.request({
            url: '/actor',
            method: 'GET',
            params: {
                'type': 'actor'
            }
        })
    }
    static async getDirector() {
        return client.request({
            url: '/director',
            method: 'GET',
            params: {
                'type': 'director'
            }
        })
    }
}