import { prisma } from "@/prisma/client";
import { NextRequest } from "next/server";
import { getErrorMessage } from "@/lib/api-helpers";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "foodzilla-secret-key";

export const PUT = async (req: NextRequest) => {
  try {
    const token = req.cookies.get("foodzilla-token")?.value;
    if (!token) return Response.json({ error: "Not authenticated" }, { status: 401 });

    const decoded = jwt.verify(token, JWT_SECRET) as { id: string };
    const body = await req.json();

    const updateData: Record<string, string> = {};
    if (body.name) updateData.name = body.name;
    if (body.phone !== undefined) updateData.phone = body.phone;
    if (body.address !== undefined) updateData.address = body.address;
    if (body.city !== undefined) updateData.city = body.city;
    if (body.zipCode !== undefined) updateData.zipCode = body.zipCode;

    if (body.currentPassword && body.newPassword) {
      const customer = await prisma.customer.findUnique({ where: { id: decoded.id } });
      if (!customer) return Response.json({ error: "Customer not found" }, { status: 404 });

      const valid = await bcrypt.compare(body.currentPassword, customer.password);
      if (!valid) return Response.json({ error: "Current password is incorrect" }, { status: 400 });

      updateData.password = await bcrypt.hash(body.newPassword, 10);
    }

    const updated = await prisma.customer.update({
      where: { id: decoded.id },
      data: updateData,
      select: { id: true, name: true, email: true, phone: true, address: true, city: true, zipCode: true },
    });

    return Response.json({ customer: updated });
  } catch (error) {
    return Response.json({ error: getErrorMessage(error) }, { status: 500 });
  }
};
