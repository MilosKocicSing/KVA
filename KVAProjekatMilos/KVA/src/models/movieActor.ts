import { Actor } from "./actor"

export interface MovieActor {
    movieActorId: number;
    movieId: number;
    actorId: number;
    actor: Actor;
}