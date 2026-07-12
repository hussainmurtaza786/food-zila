import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/jwt";

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get("foodzilla-auth-token")?.value ||
      req.headers.get("authorization")?.replace("Bearer ", "");

    if (!token) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const decoded = verifyToken(token) as { id: string; email: string };
    const customer = await prisma.customer.findUnique({
      where: { id: decoded.id },
      select: { id: true, name: true, email: true, phone: true, address: true, city: true, zipCode: true },
    });

    if (!customer) {
      return NextResponse.json({ error: "Customer not found" }, { status: 404 });
    }

    return NextResponse.json({ customer });
  } catch {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }
}
