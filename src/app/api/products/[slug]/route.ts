import { prisma } from "@/prisma/client";
import { NextRequest } from "next/server";

export const GET = async (req: NextRequest, { params }: { params: { slug: string } }) => {
  const product = await prisma.product.findUnique({
    where: { slug: params.slug },
    include: { category: true },
  });

  if (!product) {
    return Response.json({ error: "Product not found" }, { status: 404 });
  }

  const related = await prisma.product.findMany({
    where: {
      isActive: true,
      id: { not: product.id },
      ...(product.categoryId ? { categoryId: product.categoryId } : {}),
    },
    include: { category: true },
    take: 4,
  });

  return Response.json({
    product: {
      id: product.id,
      slug: product.slug,
      title: product.title,
      price: product.price,
      imgUrl: product.imgUrl ?? "",
      description: product.description ?? "",
      categoryId: product.categoryId,
      category: product.category ? { id: product.category.id, name: product.category.name, slug: product.category.slug } : null,
      isFeatured: product.isFeatured,
    },
    related: related.map((p) => ({
      id: p.id,
      slug: p.slug,
      title: p.title,
      price: p.price,
      imgUrl: p.imgUrl ?? "",
      description: p.description ?? "",
      category: p.category ? { id: p.category.id, name: p.category.name, slug: p.category.slug } : null,
    })),
  });
};
