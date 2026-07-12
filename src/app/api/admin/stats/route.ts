import { prisma } from "@/prisma/client";

export const GET = async () => {
  const [totalOrders, totalCustomers, totalProducts, revenueResult] = await Promise.all([
    prisma.order.count(),
    prisma.customer.count(),
    prisma.product.count({ where: { isActive: true } }),
    prisma.order.aggregate({ _sum: { total: true }, where: { status: { not: "CANCELLED" } } }),
  ]);

  const recentOrders = await prisma.order.findMany({
    take: 5,
    include: { customer: { select: { name: true } } },
    orderBy: { createdAt: "desc" },
  });

  return Response.json({
    totalOrders,
    totalCustomers,
    totalProducts,
    totalRevenue: revenueResult._sum.total || 0,
    recentOrders: recentOrders.map((o) => ({
      id: o.id,
      total: o.total,
      status: o.status,
      customerName: o.customer.name,
      createdAt: o.createdAt,
    })),
  });
};
