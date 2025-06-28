import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";

export async function GET() {
    try {
        await dbConnect();
        return NextResponse.json({ message: "MongoDB connected successfully" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to connect to MongoDB" }, { status: 500 });
    }
}