import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { getErrorMessage } from "@/lib/api-helpers";

export const PATCH = async (req: NextRequest, { params }: { params: { id: string } }) => {
  try {
    const { status } = await req.json();
    if (!status) {
      return NextResponse.json({ error: "Status is required" }, { status: 400 });
    }
    const order = await prisma.order.update({
      where: { id: params.id },
      data: { status },
      include: { items: { include: { product: true } }, customer: { select: { id: true, name: true, email: true } } },
    });
    return Response.json({ order });
  } catch (err: unknown) {
    return NextResponse.json({ error: getErrorMessage(err) }, { status: 400 });
  }
};

export const GET = async (req: NextRequest, { params }: { params: { id: string } }) => {
  try {
    const order = await prisma.order.findUnique({
      where: { id: params.id },
      include: { items: { include: { product: true } }, customer: { select: { id: true, name: true, email: true, phone: true } } },
    });
    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }
    return Response.json({ order });
  } catch (err: unknown) {
    return NextResponse.json({ error: getErrorMessage(err) }, { status: 500 });
  }
};
