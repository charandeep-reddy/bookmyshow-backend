import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import User from "@/models/User";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

export async function POST(req: NextRequest) {
    try {
        await dbConnect();
        const { email, password } = await req.json();
        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        const isPasswordMatch = await user.comparePassword(password);
        if (!isPasswordMatch) {
            return NextResponse.json({ error: "Invalid password" }, { status: 401 });
        }
        
        const token = jwt.sign({ id: user._id }, JWT_SECRET as string, { expiresIn: "1d" });
        return NextResponse.json({
            message: "Login successful",
            token,
            user: {
                name: user.name,
                email: user.email,
            }
        }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to login" }, { status: 500, statusText: "Internal Server Error" });
    }
}