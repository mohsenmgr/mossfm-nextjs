import { Document, Schema, model, models } from 'mongoose';

export interface IMovie extends Document {
    id: number;
    hidden: boolean;
    watched: boolean;
    dateWatched: string;
    watchlist: boolean;
    recommended: boolean;
    review: string;
    rating: number;
}

export interface IError {
    error: string;
}

export type MovieResponse = IMovie | IError;

const MovieSchema = new Schema<IMovie>(
    {
        id: {
            type: Number,
            required: [true, 'id is required']
        },
        hidden: {
            type: Boolean,
            default: false
        },
        watched: {
            type: Boolean,
            default: false
        },
        watchlist: {
            type: Boolean,
            default: false
        },
        recommended: {
            type: Boolean,
            default: false
        },
        dateWatched: {
            type: String,
            default: null
        },
        review: {
            type: String,
            default: null
        },
        rating: {
            type: Number,
            default: null
        }
    },
    {
        timestamps: true
    }
);

const Movie = models.Movie || model<IMovie>('Movie', MovieSchema);

export default Movie;
