import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { generateToken } from "@/lib/jwt";
import { getErrorMessage } from "@/lib/api-helpers";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required." },
        { status: 400 }
      );
    }

    const user = await prisma.adminUser.findUnique({ where: { email } });
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

    const token = generateToken({ email: user.email, id: user.id }, "1d");

    return NextResponse.json(
      {
        message: "Login successful",
        token,
        user: { email: user.email },
      },
      { status: 200 }
    );
  } catch (err: unknown) {
    console.error("Login Error:", getErrorMessage(err));
    return NextResponse.json(
      { error: "An error occurred during login." },
      { status: 500 }
    );
  }
}
