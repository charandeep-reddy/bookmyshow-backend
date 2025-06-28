import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Booking from "@/models/Booking";
import Show from "@/models/Show";
import User from "@/models/User";

export async function POST(req: NextRequest) {
    try {
        await dbConnect();
        const { userId, showId, seats } = await req.json();

        if (!userId || !showId || !seats || !Array.isArray(seats) || seats.length === 0) {
            return NextResponse.json({ error: "Invalid request" }, { status: 400 });
        }

        const show = await Show.findById(showId);
        if (!show) {
            return NextResponse.json({ error: "Show not found" }, { status: 404 });
        }

        const existingBookings = await Booking.find({ show: showId });
        const alreadyBookedSeats = new Set();
        existingBookings.forEach(booking => {
            booking.seats.forEach((seat: string) => alreadyBookedSeats.add(seat));
        });

        const conflictingSeats = seats.filter((seat) => alreadyBookedSeats.has(seat));
        if (conflictingSeats.length > 0) {
            return NextResponse.json({ error: "Seats are already booked" }, { status: 400 });
        }

        const totalPrice = seats.length * show.price;


        const booking = await Booking.create({ user: userId, show: showId, seats, totalPrice, bookingDate: new Date() });
        return NextResponse.json({ message: "Booking created successfully", booking }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to create booking" }, { status: 500 });
    }
}