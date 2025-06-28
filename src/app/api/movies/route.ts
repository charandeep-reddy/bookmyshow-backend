import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Movie from "@/models/Movie";

export async function GET(req: NextRequest) {
    try {
        await dbConnect();
        const movies = await Movie.find();
        return NextResponse.json({ movies }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch movies" }, { status: 500 });
    }
}