import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { getErrorMessage } from "@/lib/api-helpers";

export const GET = async () => {
  const categories = await prisma.category.findMany({
    include: { _count: { select: { products: true } } },
    orderBy: { name: "asc" },
  });
  return Response.json({ categories });
};

export const PUT = async (req: NextRequest) => {
  try {
    const { name, slug, description, image } = await req.json();
    if (!name || !slug) {
      return NextResponse.json({ error: "Name and slug are required" }, { status: 400 });
    }
    const category = await prisma.category.create({
      data: { name, slug, description, image },
    });
    return Response.json({ category }, { status: 201 });
  } catch (err: unknown) {
    return NextResponse.json({ error: getErrorMessage(err) }, { status: 400 });
  }
};

export const PATCH = async (req: NextRequest) => {
  try {
    const { id, name, slug, description, image } = await req.json();
    if (!id) {
      return NextResponse.json({ error: "Category ID is required" }, { status: 400 });
    }
    const category = await prisma.category.update({
      where: { id },
      data: { name, slug, description, image },
    });
    return Response.json({ category });
  } catch (err: unknown) {
    return NextResponse.json({ error: getErrorMessage(err) }, { status: 400 });
  }
};

export const DELETE = async (req: NextRequest) => {
  try {
    const { id } = await req.json();
    if (!id) {
      return NextResponse.json({ error: "Category ID is required" }, { status: 400 });
    }
    await prisma.category.delete({ where: { id } });
    return Response.json({ message: "Category deleted" }, { status: 200 });
  } catch (err: unknown) {
    return NextResponse.json({ error: getErrorMessage(err) }, { status: 400 });
  }
};
