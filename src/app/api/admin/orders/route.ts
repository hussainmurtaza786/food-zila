import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { getErrorMessage } from "@/lib/api-helpers";

export const GET = async () => {
  const orders = await prisma.order.findMany({
    include: { items: { include: { product: true } }, customer: { select: { id: true, name: true, email: true } } },
    orderBy: { createdAt: "desc" },
  });
  return Response.json({ orders });
};

export const PUT = async (req: NextRequest) => {
  try {
    const { id, status } = await req.json();
    if (!id || !status) {
      return NextResponse.json({ error: "Order ID and status are required" }, { status: 400 });
    }
    const order = await prisma.order.update({
      where: { id },
      data: { status },
      include: { items: { include: { product: true } }, customer: { select: { id: true, name: true, email: true } } },
    });
    return Response.json({ order });
  } catch (err: unknown) {
    return NextResponse.json({ error: getErrorMessage(err) }, { status: 400 });
  }
};
