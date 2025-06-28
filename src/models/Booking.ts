import mongoose, { Schema, Document } from "mongoose";

export interface IBooking extends Document {
    user: string;
    show: string;
    seats: string[];
    totalPrice: number;
    bookingDate: Date;
}

const bookingSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    show: { type: Schema.Types.ObjectId, ref: "Show", required: true },
    seats: { type: [String], required: true },
    totalPrice: { type: Number, required: true },
    bookingDate: { type: Date, default: Date.now },
});

const Booking = mongoose.models.Booking || mongoose.model<IBooking>("Booking", bookingSchema);
export default Booking;