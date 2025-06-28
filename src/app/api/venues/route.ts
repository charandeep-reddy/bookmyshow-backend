import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Venue from "@/models/Venue";

export async function GET(req: NextRequest) {
    try {
        await dbConnect();
        const venues = await Venue.find();
        return NextResponse.json({ venues }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch venues" }, { status: 500 });
    }
}