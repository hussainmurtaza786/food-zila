import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/jwt";
import { getErrorMessage } from "@/lib/api-helpers";

export const dynamic = "force-dynamic";

export const GET = async (req: NextRequest, { params }: { params: { id: string } }) => {
  try {
    const token = req.cookies.get("foodzilla-auth-token")?.value ||
      req.headers.get("authorization")?.replace("Bearer ", "");
    if (!token) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const decoded = verifyToken(token) as { id: string };
    const order = await prisma.order.findFirst({
      where: { id: params.id, customerId: decoded.id },
      include: { items: { include: { product: true } } },
    });

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    return Response.json({ order });
  } catch (err: unknown) {
    return NextResponse.json({ error: getErrorMessage(err) }, { status: 500 });
  }
};
