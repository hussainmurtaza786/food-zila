import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken';
const SECRET_KEY = process.env.JWT_SECRET || 'your-secret-key';

export async function GET(params: NextRequest) {
    return Response.json(
        { user: { name: 'hussain', age: 16, isMarried: false } },
        // { status: 200 }
    )

}



export async function POST(req: NextRequest) {
    try {

        const { email, password } = await req.json();
        if (!email || !password) {
            return NextResponse.json(
                { error: "Email and password are required." },
                { status: 400 }
            );
        }
        const user = await prisma.adminUser.findUnique({ where: { email: email, } })

        if (!user) {
            return NextResponse.json(
                { error: "Invalid email or password." },
                { status: 401 }
            );
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return NextResponse.json(
                { error: "Invalid email or password." },
                { status: 401 }
            );
        }
        const token = jwt.sign({ email: user.email, id: user.id }, SECRET_KEY, {
            expiresIn: "1d",
        });
        return NextResponse.json(
            {
                message: "Login successful",
                token: token,
                user: {
                    email: user.email,

                },
            },
            { status: 200 }

        )
    } catch (err: any) {
        console.error("Login Error:", err.message);
        return NextResponse.json(
            { error: "An error occurred during login." },
            { status: 500 }
        );
    }

}