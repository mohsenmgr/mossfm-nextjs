import { IMovie } from '@/models/Movie';

export type ApiMovie = {
    id: number;
    original_title: string;
    overview: string;
    release_date: string;
    vote_average: number;
    poster_path: string;
    original_language: string;
};

export type Movie = ApiMovie & {
    hidden: boolean;
    watched: boolean;
    watchlist: boolean;
    recommended: boolean;
    dateWatched: string | null;
    review: string | null;
    rating: number | null;
};

export type LocalMovie = {
    id: number;
    hidden: boolean;
    watched: boolean;
    watchlist: boolean;
    recommended: boolean;
    dateWatched: string | null;
    review: string | null;
    rating: number | null;
};
export function toMovie(apiMovie: ApiMovie, dbMovie?: IMovie): Movie {
    return {
        ...apiMovie,
        hidden: dbMovie?.hidden ?? false,
        watched: dbMovie?.watched ?? false,
        watchlist: dbMovie?.watched ?? false,
        recommended: dbMovie?.recommended ?? false,
        dateWatched: dbMovie?.dateWatched ?? null,
        review: dbMovie?.review ?? null,
        rating: dbMovie?.rating ?? null
    };
}

export function toIMovie(movie: Movie): IMovie {
    return {
        id: movie.id,
        hidden: movie.hidden,
        watched: movie.watched,
        watchlist: movie.watchlist,
        recommended: movie.recommended,
        dateWatched: movie.dateWatched,
        review: movie.review,
        rating: movie.rating
    } as IMovie;
}
