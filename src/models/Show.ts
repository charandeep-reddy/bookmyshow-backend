import mongoose, { Schema, Document } from "mongoose";

export interface IShow extends Document {
    movie: string;
    venue: string;
    showTime: Date;
    price: number;
}

const showSchema = new Schema({
    movie: { type: Schema.Types.ObjectId, ref: "Movie", required: true },
    venue: { type: Schema.Types.ObjectId, ref: "Venue", required: true },
    showTime: { type: Date, required: true },
    price: { type: Number, required: true },
});

const Show = mongoose.models.Show || mongoose.model<IShow>("Show", showSchema);
export default Show;