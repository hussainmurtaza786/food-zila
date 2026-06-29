import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash("hussain123", 10);

  await prisma.adminUser.upsert({
    where: {
      email: "hussain@example.com",
    },
    update: {},
    create: {
      name: "hussain",
      email: "hussain@example.com",
      password: hashedPassword,
      role: "ADMIN",
    },
  });

  console.log("✅ Admin user seeded successfully.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });