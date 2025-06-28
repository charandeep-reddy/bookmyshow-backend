import mongoose, { Schema, Document } from "mongoose";

export interface IMovie extends Document {
    title: string;
    description: string;
    releaseDate: Date;
    duration: number;
    genre: string;
    language: Array<string>;
}

const movieSchema = new Schema({
    title: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    releaseDate: { type: Date, required: true },
    duration: { type: Number, required: true },
    genre: { type: String, required: true },
    language: { type: [String], required: true },
});

const Movie = mongoose.models.Movie || mongoose.model<IMovie>("Movie", movieSchema);
export default Movie;