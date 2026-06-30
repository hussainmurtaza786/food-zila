import { prisma } from "@/prisma/client";
import { ProductDTO } from "@/types/user";

export async function ProductList(): Promise<ProductDTO[]> {
  const products = await prisma.product.findMany();

  return products.map((p) => ({
    id: p.id,
    slug: p.slug,
    title: p.title,
    price: p.price,
    imgUrl: p.imgUrl ?? "",          // ✅ convert null → ""
    description: p.description ?? "", // ✅ convert null → ""
  }));
}