import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Venue from "@/models/Venue";
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