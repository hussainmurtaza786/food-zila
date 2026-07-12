import { prisma } from "@/prisma/client";
import FoodPoster from "@/components/HomePage/FoodPoster";
import FeaturedSpecials from "@/components/HomePage/FeaturedSpecials";
import CategoryBrowsing from "@/components/HomePage/CategoryBrowsing";
import HowItWorks from "@/components/HomePage/HowItWorks";
import FoodDeliver from "@/components/HomePage/FoodDeliver";
import WhyChooseUs from "@/components/HomePage/WhyChooseUs";
import ReservationForm from "@/components/HomePage/ReservationForm";
import { Box } from "@chakra-ui/react";

export default async function HomePage() {
  const [featuredProducts, categories] = await Promise.all([
    prisma.product.findMany({
      where: { isFeatured: true, isActive: true },
      include: { category: true },
      take: 8,
      orderBy: { createdAt: "desc" },
    }),
    prisma.category.findMany({
      include: { _count: { select: { products: true } } },
      orderBy: { name: "asc" },
    }),
  ]);

  const products = featuredProducts.map((p) => ({
    id: p.id,
    slug: p.slug,
    title: p.title,
    price: p.price,
    imgUrl: p.imgUrl ?? "",
    description: p.description ?? "",
    categoryId: p.categoryId ?? undefined,
    category: p.category
      ? { id: p.category.id, name: p.category.name, slug: p.category.slug }
      : null,
    isFeatured: p.isFeatured,
  }));

  const categoryList = categories.map((c) => ({
    id: c.id,
    name: c.name,
    slug: c.slug,
    description: c.description ?? undefined,
    image: c.image ?? undefined,
    _count: c._count,
  }));

  return (
    <Box>
      <FoodPoster />
      <FeaturedSpecials products={products} />
      <CategoryBrowsing categories={categoryList} />
      <HowItWorks />
      <FoodDeliver />
      <WhyChooseUs />
      <ReservationForm />
    </Box>
  );
}
