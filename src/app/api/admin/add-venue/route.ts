import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Venue from "@/models/Venue";

export async function POST(req: NextRequest) {
    try {
        await dbConnect();

        const { name, address, city, state, pincode } = await req.json();

        if (!name || !address || !city || !state || !pincode) {
            return NextResponse.json({ error: "All fields are required" }, { status: 400 });
        }

        const existingVenue = await Venue.findOne({ name });
        if (existingVenue) {
            return NextResponse.json({ error: "Venue already exists" }, { status: 400 });
        }

        const venue = await Venue.create({ name, address, city, state, pincode });
        return NextResponse.json({ message: "Venue added successfully", venue }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to add venue" }, { status: 500 });
    }
}