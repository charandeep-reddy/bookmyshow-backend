import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Movie from "@/models/Movie";
import Venue from "@/models/Venue";
import Show from "@/models/Show";

export async function GET(req: NextRequest) {
  try {
    await dbConnect();

    // 1. Get the 'city' query parameter
    const { searchParams } = new URL(req.url);
    const city = searchParams.get("city");

    // 2. If no city is provided, return all movies
    if (!city) {
      const movies = await Movie.find();
      return NextResponse.json({ movies }, { status: 200 });
    }

    // 3. Find all venues in the given city
    const venues = await Venue.find({ city });
    const venueIds = venues.map((v) => v._id);

    // 4. Find all shows at those venues
    const shows = await Show.find({ venue: { $in: venueIds } });
    const movieIds = shows.map((s) => s.movie);

    // 5. Find all unique movies for those shows
    const uniqueMovieIds = [...new Set(movieIds.map(id => id.toString()))];
    const movies = await Movie.find({ _id: { $in: uniqueMovieIds } });

    // 6. Return the movies
    return NextResponse.json({ movies }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch movies" }, { status: 500 });
  }
}