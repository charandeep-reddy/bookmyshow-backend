import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Movie from "@/models/Movie";

export async function POST(req: NextRequest) {
    try {
        await dbConnect();
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