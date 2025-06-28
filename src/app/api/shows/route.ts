import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Show from "@/models/Show";

export async function GET(req: NextRequest) {
    try {
        await dbConnect();
        const shows = await Show.find();
        return NextResponse.json({ shows }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch shows" }, { status: 500 });
    }
}