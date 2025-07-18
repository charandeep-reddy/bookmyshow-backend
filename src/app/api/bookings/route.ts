import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Booking from "@/models/Booking";
import { getUserIdFromRequest } from "@/lib/auth";

export async function GET(req: NextRequest) {
    try {
        await dbConnect();

        const userId = getUserIdFromRequest(req);
        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const bookings = await Booking.find({ user: userId });
        if (!bookings) {
            return NextResponse.json({ error: "No bookings found" }, { status: 404 });
        }

        return NextResponse.json({ bookings }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Failed to fetch bookings" }, { status: 500 });
    }
}