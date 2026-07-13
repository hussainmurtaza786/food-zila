import { prisma } from "@/prisma/client";
import { Prisma } from "@prisma/client";
import { NextRequest } from "next/server";
import bcrypt from "bcryptjs";
import { generateToken } from "@/lib/jwt";
import { getErrorMessage } from "@/lib/api-helpers";

export const dynamic = "force-dynamic";

export const GET = async () => {
  const users = await prisma.adminUser.findMany({});
  return Response.json({ data: users });
};

export const PUT = async (req: NextRequest) => {
  const { id, email, name, password, phoneNumber, products, role }: Prisma.AdminUserCreateInput = await req.json();

  try {
    const userRole = role || "STAFF";
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await prisma.adminUser.create({
      data: {
        id,
        email,
        name: name || "New User",
        password: hashedPassword,
        phoneNumber,
        role: userRole,
        products,
      },
      select: { id: true, email: true, name: true, phoneNumber: true, password: true, role: true },
    });

    const token = generateToken({ id: user.id, email: user.email, role: user.role });

    return Response.json({ user, token }, { status: 201 });
  } catch (err: unknown) {
    return Response.json({ error: getErrorMessage(err) }, { status: 400 });
  }
};

export const PATCH = async (req: NextRequest) => {
  const { name, email, password, phoneNumber, id }: Prisma.AdminUserUpdateInput = await req.json();
  try {
    if (!id) {
      return Response.json({ data: "User ID is required" }, { status: 400 });
    }

    const user = await prisma.adminUser.update({
      data: { id, email, password, phoneNumber, name },
      where: { id: id as string },
    });

    return Response.json({ data: user });
  } catch (err: unknown) {
    return Response.json({ data: getErrorMessage(err) }, { status: 400 });
  }
};

export const DELETE = async (req: NextRequest) => {
  try {
    const { id }: { id: string } = await req.json();

    if (!id) {
      return Response.json({ error: "User ID is required" }, { status: 400 });
    }

    const deletedUser = await prisma.adminUser.delete({ where: { id } });
    return Response.json({ message: "User deleted successfully", user: deletedUser }, { status: 200 });
  } catch (err: unknown) {
    return Response.json({ error: getErrorMessage(err) }, { status: 400 });
  }
};
