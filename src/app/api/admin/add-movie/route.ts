import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
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
        const { title, description, releaseDate, duration, genre, language } = await req.json();
        if (!title || !description || !releaseDate || !duration || !genre || !language) {
            return NextResponse.json({ error: "All fields are required" }, { status: 400 });
        }
        const existingMovie = await Movie.findOne({ title });
        if (existingMovie) {
            return NextResponse.json({ error: "Movie already exists" }, { status: 400 });
        }
        const movie = await Movie.create({ title, description, releaseDate, duration, genre, language });
        return NextResponse.json({ message: "Movie added successfully", movie }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to add movie" }, { status: 500 });
    }
}