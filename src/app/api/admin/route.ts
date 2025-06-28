//list all admins

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
        if (!user || !user.isAdmin) {
            return NextResponse.json({ error: "Forbidden: Admins only" }, { status: 403 });
        }
        const admins = await User.find({ isAdmin: true });
        return NextResponse.json(admins);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Failed to fetch admins" }, { status: 500 });
    }
}   