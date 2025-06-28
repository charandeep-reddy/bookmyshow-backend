import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import User from "@/models/User";

export async function POST(req: NextRequest) {
    try {
        await dbConnect();
        const { name, email, password } = await req.json();
        
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json({ error: "User already exists" }, { status: 400 });
        }

        const user = await User.create({ name, email, password });
        return NextResponse.json(
            {
                message: "User registered successfully",
                user: {
                    name: user.name,
                    email: user.email,
                },
            },
            { status: 201 }
        );
    } catch (error) {
        return NextResponse.json({ error: "Failed to register user" }, { status: 500, statusText: "Internal Server Error" });
    }
}