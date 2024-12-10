import { prisma } from "@/prisma/client";
import { Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

// Utility to verify JWT
const verifyToken = (req: NextRequest) => {
  const authHeader = req.headers.get("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new Error("Unauthorized: No token provided");
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded;
  } catch (err) {
    throw new Error("Unauthorized: Invalid or expired token");
  }
};

// GET: Fetch products
export const GET = async () => {
  const products = await prisma.product.findMany({});
  return NextResponse.json({ products });
};

// PUT: Add a product
export const PUT = async (req: NextRequest) => {
  try {
    verifyToken(req); // Check token

    const { id, slug, price, title, createdBy, imgUrl, description }: Prisma.ProductCreateInput = await req.json();
    const product = await prisma.product.create({
      data: { id, slug, price, title, createdBy, imgUrl, description },
      select: { id: true, slug: true, price: true, title: true, description: true, imgUrl: true },
    });

    return NextResponse.json({ product });
  } catch (err: any) {
    console.error("Error:", err.message);
    return NextResponse.json({ error: err.message }, { status: 401 });
  }
};

// PATCH: Update a product
export const PATCH = async (req: NextRequest) => {
  try {
    verifyToken(req); // Check token

    const { id, title, price, imgUrl, description, slug }: Prisma.ProductCreateInput = await req.json();
    if (!id) {
      throw new Error("Product ID is required");
    }

    const updatedProduct = await prisma.product.update({
      where: { id },
      data: { title, price, imgUrl, description, slug },
    });

    return NextResponse.json({ product: updatedProduct });
  } catch (err: any) {
    console.error("Error:", err.message);
    return NextResponse.json({ error: err.message }, { status: 401 });
  }
};

// DELETE: Delete a product
export const DELETE = async (req: NextRequest) => {
  try {
    verifyToken(req); // Check token

    const { id }: { id: string } = await req.json();
    if (!id) {
      throw new Error("Product ID is required");
    }

    const deletedProduct = await prisma.product.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Product deleted successfully", product: deletedProduct });
  } catch (err: any) {
    console.error("Error:", err.message);
    return NextResponse.json({ error: err.message }, { status: 401 });
  }
};
