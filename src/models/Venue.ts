import mongoose, { Schema, Document } from "mongoose";

export interface IVenue extends Document {
    name: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
}

const venueSchema = new Schema({
    name: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    pincode: { type: String, required: true },
});

const Venue = mongoose.models.Venue || mongoose.model<IVenue>("Venue", venueSchema);
export default Venue;