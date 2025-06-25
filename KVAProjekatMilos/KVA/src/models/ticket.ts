export interface Ticket {
    id: number
    filmID: number
    count: number
    price: number
    startDate: Date
    status: 'rezervisano' | 'gledano' | 'otkazano'
}