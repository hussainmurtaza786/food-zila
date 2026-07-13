import { prisma } from "@/prisma/client";
import { NextRequest } from "next/server";
import { getErrorMessage } from "@/lib/api-helpers";

export const GET = async () => {
  const products = await prisma.product.findMany({
    include: { category: true },
    orderBy: { createdAt: "desc" },
  });
  return Response.json({ products });
};

export const POST = async (req: NextRequest) => {
  try {
    const { slug, price, title, imgUrl, description, categoryId } = await req.json();
    const product = await prisma.product.create({
      data: {
        slug,
        price: Number(price),
        title,
        imgUrl: imgUrl || null,
        description: description || null,
        categoryId: categoryId || null,
      },
      include: { category: true },
    });
    return Response.json({ product });
  } catch (err: unknown) {
    return Response.json({ error: getErrorMessage(err) }, { status: 400 });
  }
};

export const PATCH = async (req: NextRequest) => {
  try {
    const { id, title, price, imgUrl, description, slug, categoryId } = await req.json();
    if (!id) return Response.json({ error: "Product ID is required" }, { status: 400 });

    const updated = await prisma.product.update({
      where: { id },
      data: {
        title,
        price: Number(price),
        imgUrl,
        description,
        slug,
        categoryId: categoryId || null,
      },
      include: { category: true },
    });
    return Response.json({ product: updated });
  } catch (err: unknown) {
    return Response.json({ error: getErrorMessage(err) }, { status: 400 });
  }
};

export const DELETE = async (req: NextRequest) => {
  try {
    const { id } = await req.json();
    if (!id) return Response.json({ error: "Product ID is required" }, { status: 400 });
    const deleted = await prisma.product.delete({ where: { id } });
    return Response.json({ message: "Deleted", product: deleted });
  } catch (err: unknown) {
    return Response.json({ error: getErrorMessage(err) }, { status: 400 });
  }
};
