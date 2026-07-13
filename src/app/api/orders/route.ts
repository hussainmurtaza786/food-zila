import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/jwt";
import { getErrorMessage } from "@/lib/api-helpers";

export const dynamic = "force-dynamic";

export const POST = async (req: NextRequest) => {
  try {
    const token = req.cookies.get("foodzilla-auth-token")?.value ||
      req.headers.get("authorization")?.replace("Bearer ", "");
    if (!token) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const decoded = verifyToken(token) as { id: string };
    const { items, shippingAddress, phone, paymentMethod, note } = await req.json();

    if (!items?.length || !shippingAddress || !phone) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    let total = 0;
    const orderItems = [];

    for (const item of items) {
      const product = await prisma.product.findUnique({ where: { id: item.id } });
      if (!product) continue;
      total += product.price * item.quantity;
      orderItems.push({ productId: product.id, quantity: item.quantity, price: product.price });
    }

    const order = await prisma.order.create({
      data: {
        total,
        shippingAddress,
        phone,
        paymentMethod: paymentMethod || "COD",
        note: note || null,
        customerId: decoded.id,
        items: { create: orderItems },
      },
      include: { items: { include: { product: true } } },
    });

    return NextResponse.json({ order }, { status: 201 });
  } catch (err: unknown) {
    return NextResponse.json({ error: getErrorMessage(err) }, { status: 500 });
  }
};

export const GET = async (req: NextRequest) => {
  try {
    const token = req.cookies.get("foodzilla-auth-token")?.value ||
      req.headers.get("authorization")?.replace("Bearer ", "");
    if (!token) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const decoded = verifyToken(token) as { id: string };
    const orders = await prisma.order.findMany({
      where: { customerId: decoded.id },
      include: { items: { include: { product: true } } },
      orderBy: { createdAt: "desc" },
    });

    return Response.json({ orders });
  } catch (err: unknown) {
    return NextResponse.json({ error: getErrorMessage(err) }, { status: 500 });
  }
};
