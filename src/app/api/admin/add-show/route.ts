import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Show from "@/models/Show";
import Venue from "@/models/Venue";
import Movie from "@/models/Movie";
import { getUserIdFromRequest } from "@/lib/auth";
import User from "@/models/User";

export async function POST(req: NextRequest) {
    try {
        await dbConnect();
        const userId = getUserIdFromRequest(req);
        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        const user = await User.findById(userId);
        if (!user || !user.isAdmin) {
            return NextResponse.json({ error: "Forbidden: Admins only" }, { status: 403 });
        }
        const { movieTitle, venueName, showTime, price } = await req.json();
        const movie = await Movie.findOne({ title: movieTitle });
        if (!movie) {
            return NextResponse.json({ error: "Movie not found" }, { status: 404 });
        }
        const venue = await Venue.findOne({ name: venueName });
        if (!venue) {
            return NextResponse.json({ error: "Venue not found" }, { status: 404 });
        }
        const existingShow = await Show.findOne({ movie, venue, showTime });
        if (existingShow) {
            return NextResponse.json({ error: "Show already exists" }, { status: 400 });
        }
        const show = await Show.create({
            movie: movie._id,
            venue: venue._id,
            showTime,
            price,
        });
        return NextResponse.json({ message: "Show added successfully", show }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to add show" }, { status: 500 });
    }
}