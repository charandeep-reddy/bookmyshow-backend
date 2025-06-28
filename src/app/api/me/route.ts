import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import User from "@/models/User";
import { getUserIdFromRequest } from "@/lib/auth";

export async function GET(req: NextRequest) {
    try {
        await dbConnect();

        const userId = getUserIdFromRequest(req);
        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const user = await User.findById(userId);
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        return NextResponse.json({ user }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Failed to fetch user" }, { status: 500 });
    }
}