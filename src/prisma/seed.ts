import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

function slugify(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

const CATEGORIES = [
  { name: "Burgers", description: "Juicy burgers grilled to perfection" },
  { name: "Pizza", description: "Handcrafted pizzas with fresh toppings" },
  { name: "Biryani & Rice", description: "Aromatic biryanis and rice dishes" },
  { name: "Asian", description: "Flavor-packed Asian cuisine" },
  { name: "Sides & Snacks", description: "Crispy sides and savory snacks" },
  { name: "Desserts", description: "Sweet treats to finish your meal" },
];

const PRODUCTS = [
  // ─── Burgers ────────────────────────────────────────
  {
    title: "Classic Beef Burger",
    price: 8.99,
    imgUrl: "/assets/burger.png",
    description:
      "A timeless classic with a juicy beef patty, crisp lettuce, ripe tomato, onions, pickles, and our signature sauce, all tucked in a toasted sesame bun.",
    isFeatured: true,
    category: "Burgers",
  },
  {
    title: "Zinger Burger",
    price: 9.49,
    imgUrl: "/assets/burger.png",
    description:
      "Crispy, crunchy, and spicy! A golden-fried chicken fillet topped with creamy coleslaw and zesty mayo, served in a soft brioche bun.",
    isFeatured: true,
    category: "Burgers",
  },
  {
    title: "Double Cheese Burger",
    price: 11.99,
    imgUrl: "/assets/burger.png",
    description:
      "Two flame-grilled beef patties layered with melted cheddar cheese, mustard, ketchup, and fresh veggies. A tower of flavor.",
    isFeatured: false,
    category: "Burgers",
  },
  {
    title: "Mushroom Swiss Burger",
    price: 10.49,
    imgUrl: "/assets/burger.png",
    description:
      "A tender beef patty topped with sauteed mushrooms, melted Swiss cheese, and truffle aioli. Earthy and indulgent.",
    isFeatured: false,
    category: "Burgers",
  },
  {
    title: "BBQ Bacon Burger",
    price: 11.49,
    imgUrl: "/assets/burger.png",
    description:
      "Smoky BBQ-glazed beef patty with crispy bacon strips, cheddar cheese, onion rings, and tangy BBQ sauce in a charcoal bun.",
    isFeatured: true,
    category: "Burgers",
  },
  {
    title: "Spicy Peri Peri Burger",
    price: 9.99,
    imgUrl: "/assets/burger.png",
    description:
      "For heat lovers! A spicy peri peri-marinated chicken fillet with jalapenos, pepper jack cheese, and fiery peri mayo.",
    isFeatured: false,
    category: "Burgers",
  },

  // ─── Pizza ──────────────────────────────────────────
  {
    title: "Margherita Pizza",
    price: 12.99,
    imgUrl: "/assets/pizza.png",
    description:
      "Simple yet perfect. San Marzano tomato sauce, fresh mozzarella cheese, basil leaves, and a drizzle of extra virgin olive oil on a thin, crispy crust.",
    isFeatured: true,
    category: "Pizza",
  },
  {
    title: "Pepperoni Pizza",
    price: 14.49,
    imgUrl: "/assets/pizza.png",
    description:
      "Loaded with spicy pepperoni slices, mozzarella cheese, and our tangy pizza sauce. A crowd favorite that never disappoints.",
    isFeatured: true,
    category: "Pizza",
  },
  {
    title: "BBQ Chicken Pizza",
    price: 14.99,
    imgUrl: "/assets/pizza-2.png",
    description:
      "Smoky BBQ sauce base, grilled chicken, red onions, cilantro, and a blend of mozzarella and cheddar cheese.",
    isFeatured: false,
    category: "Pizza",
  },
  {
    title: "Veggie Supreme Pizza",
    price: 13.49,
    imgUrl: "/assets/pizza-2.png",
    description:
      "A garden feast with bell peppers, mushrooms, olives, onions, tomatoes, corn, and mozzarella cheese on a crispy base.",
    isFeatured: false,
    category: "Pizza",
  },
  {
    title: "Tandoori Chicken Pizza",
    price: 15.49,
    imgUrl: "/assets/pizza.png",
    description:
      "Fusion at its best! Tandoori-spiced chicken, onions, capsicum, mozzarella, and a drizzle of mint chutney on naan-style crust.",
    isFeatured: true,
    category: "Pizza",
  },
  {
    title: "Meat Lovers Pizza",
    price: 16.99,
    imgUrl: "/assets/pizza.png",
    description:
      "For the carnivore in you! Pepperoni, sausage, bacon, ham, and ground beef layered over mozzarella and pizza sauce.",
    isFeatured: false,
    category: "Pizza",
  },

  // ─── Biryani & Rice ─────────────────────────────────
  {
    title: "Chicken Biryani",
    price: 13.99,
    imgUrl: "/assets/biryani.png",
    description:
      "Fragrant basmati rice slow-cooked with tender chicken pieces, saffron, caramelized onions, and a blend of aromatic whole spices.",
    isFeatured: true,
    category: "Biryani & Rice",
  },
  {
    title: "Mutton Biryani",
    price: 16.99,
    imgUrl: "/assets/biryani.png",
    description:
      "Rich and royal! Succulent mutton pieces layered with saffron-infused rice, fried onions, fresh mint, and a secret spice blend.",
    isFeatured: true,
    category: "Biryani & Rice",
  },
  {
    title: "Vegetable Biryani",
    price: 10.99,
    imgUrl: "/assets/biryani.png",
    description:
      "A colorful medley of seasonal vegetables cooked with fragrant rice, saffron, and warming spices. A vegetarian delight.",
    isFeatured: false,
    category: "Biryani & Rice",
  },
  {
    title: "Chicken Pulao",
    price: 11.99,
    imgUrl: "/assets/biryani.png",
    description:
      "Mild and comforting one-pot rice with tender chicken, cumin, coriander, and whole garam masala. Served with raita.",
    isFeatured: false,
    category: "Biryani & Rice",
  },
  {
    title: "Special Haleem",
    price: 12.49,
    imgUrl: "/assets/haleem.png",
    description:
      "A slow-cooked, rich stew of wheat, lentils, and shredded meat, garnished with fried onions, fresh ginger, lemon, and green chilies.",
    isFeatured: true,
    category: "Biryani & Rice",
  },
  {
    title: "Singaporean Rice",
    price: 11.49,
    imgUrl: "/assets/biryani.png",
    description:
      "A Indo-Chinese fusion dish with layered rice, noodles, and spicy chicken gravy, topped with fried garlic and spring onions.",
    isFeatured: false,
    category: "Biryani & Rice",
  },

  // ─── Asian ──────────────────────────────────────────
  {
    title: "Sushi Platter",
    price: 18.99,
    imgUrl: "/assets/sushi.webp",
    description:
      "A premium assortment of 12 pieces including California rolls, spicy tuna rolls, and salmon nigiri. Served with soy sauce, wasabi, and pickled ginger.",
    isFeatured: true,
    category: "Asian",
  },
  {
    title: "Chicken Chow Mein",
    price: 10.99,
    imgUrl: "/assets/sushi.webp",
    description:
      "Stir-fried egg noodles with tender chicken, crunchy vegetables, and a savory soy-based sauce. Wok-tossed to perfection.",
    isFeatured: false,
    category: "Asian",
  },
  {
    title: "Thai Green Curry",
    price: 12.49,
    imgUrl: "/assets/sushi.webp",
    description:
      "Creamy coconut milk curry infused with Thai green paste, bamboo shoots, bell peppers, and basil. Served with jasmine rice.",
    isFeatured: true,
    category: "Asian",
  },
  {
    title: "Chicken Ramen",
    price: 11.99,
    imgUrl: "/assets/sushi.webp",
    description:
      "A steaming bowl of rich chicken broth with springy noodles, marinated egg, tender chicken slices, nori, and spring onions.",
    isFeatured: false,
    category: "Asian",
  },
  {
    title: "Sweet & Sour Chicken",
    price: 11.49,
    imgUrl: "/assets/sushi.webp",
    description:
      "Crispy battered chicken tossed in a tangy sweet and sour sauce with pineapple chunks, bell peppers, and onions.",
    isFeatured: false,
    category: "Asian",
  },

  // ─── Sides & Snacks ────────────────────────────────
  {
    title: "Classic French Fries",
    price: 4.99,
    imgUrl: "/assets/fries.png",
    description:
      "Golden, crispy, and perfectly seasoned fries. A universal favorite that pairs with everything.",
    isFeatured: true,
    category: "Sides & Snacks",
  },
  {
    title: "Loaded Cheese Fries",
    price: 7.99,
    imgUrl: "/assets/fries.png",
    description:
      "Crispy fries smothered in melted cheddar and mozzarella cheese sauce, topped with jalapenos, bacon bits, and a drizzle of ranch.",
    isFeatured: true,
    category: "Sides & Snacks",
  },
  {
    title: "Spicy Chicken Wings",
    price: 8.99,
    imgUrl: "/assets/fries.png",
    description:
      "Crispy fried wings tossed in our signature spicy buffalo sauce. Served with celery sticks and blue cheese dip.",
    isFeatured: false,
    category: "Sides & Snacks",
  },
  {
    title: "Potato Wedges",
    price: 5.49,
    imgUrl: "/assets/fries.png",
    description:
      "Thick-cut potato wedges, seasoned with paprika, garlic, and herbs, then baked until golden and crispy.",
    isFeatured: false,
    category: "Sides & Snacks",
  },
  {
    title: "Onion Rings",
    price: 5.99,
    imgUrl: "/assets/fries.png",
    description:
      "Thick-cut onion rings battered and deep-fried to a crispy golden brown. Served with our tangy dipping sauce.",
    isFeatured: false,
    category: "Sides & Snacks",
  },
  {
    title: "Mozzarella Sticks",
    price: 6.49,
    imgUrl: "/assets/fries.png",
    description:
      "Golden-breaded mozzarella sticks with a satisfying cheese pull. Served with marinara sauce for dipping.",
    isFeatured: false,
    category: "Sides & Snacks",
  },

  // ─── Desserts ───────────────────────────────────────
  {
    title: "Chocolate Brownie with Ice Cream",
    price: 7.99,
    imgUrl: "/assets/ras-malai.webp",
    description:
      "A warm, fudgy chocolate brownie topped with a scoop of vanilla ice cream and drizzled with rich chocolate sauce.",
    isFeatured: true,
    category: "Desserts",
  },
  {
    title: "Gulab Jamun",
    price: 5.99,
    imgUrl: "/assets/ras-malai.webp",
    description:
      "Soft, melt-in-your-mouth milk dumplings soaked in fragrant sugar syrup infused with cardamom and rose water. Served warm.",
    isFeatured: false,
    category: "Desserts",
  },
  {
    title: "Ras Malai",
    price: 6.49,
    imgUrl: "/assets/ras-malai.webp",
    description:
      "Delicate cottage cheese patties swimming in chilled, saffron-flavored thickened milk, garnished with pistachios and almonds.",
    isFeatured: true,
    category: "Desserts",
  },
  {
    title: "Chocolate Lava Cake",
    price: 8.49,
    imgUrl: "/assets/ras-malai.webp",
    description:
      "A rich chocolate cake with a molten, gooey chocolate center. Served warm with a dusting of powdered sugar and whipped cream.",
    isFeatured: false,
    category: "Desserts",
  },
  {
    title: "Mango Cheesecake",
    price: 7.49,
    imgUrl: "/assets/ras-malai.webp",
    description:
      "A creamy, smooth cheesecake with a fresh mango coulis and a buttery graham cracker crust. Light and tropical.",
    isFeatured: false,
    category: "Desserts",
  },
];

const CATEGORY_PRODUCT_MAP: Record<string, string[]> = {
  Burgers: ["burger", "zinger"],
  Pizza: ["pizza"],
  "Biryani & Rice": ["biryani", "rice", "pulao", "haleem"],
  Asian: ["sushi", "noodle", "chow mein", "curry", "thai", "asian"],
  "Sides & Snacks": [
    "fries",
    "wedges",
    "wings",
    "loaded",
    "sides",
    "snacks",
    "onion rings",
    "mozzarella",
  ],
  Desserts: [
    "ras malai",
    "gulab jamun",
    "brownie",
    "ice cream",
    "dessert",
    "sweet",
    "cheesecake",
    "lava cake",
  ],
};

async function main() {
  // 1. Seed admin user
  const hashedPassword = await bcrypt.hash("hussain123", 10);

  await prisma.adminUser.upsert({
    where: { email: "hussain@example.com" },
    update: {},
    create: {
      name: "hussain",
      email: "hussain@example.com",
      password: hashedPassword,
      role: "ADMIN",
    },
  });
  console.log("✅ Admin user seeded.");

  // 2. Seed categories
  const categoryMap: Record<string, string> = {};

  for (const cat of CATEGORIES) {
    const slug = slugify(cat.name);
    const created = await prisma.category.upsert({
      where: { slug },
      update: { name: cat.name, description: cat.description },
      create: { name: cat.name, slug, description: cat.description },
    });
    categoryMap[cat.name] = created.id;
  }
  console.log("✅ Categories seeded.");

  // 3. Seed products
  let createdCount = 0;
  let skippedCount = 0;

  for (const item of PRODUCTS) {
    const slug = slugify(item.title);
    try {
      await prisma.product.upsert({
        where: { slug },
        update: {
          title: item.title,
          price: item.price,
          imgUrl: item.imgUrl,
          description: item.description,
          isFeatured: item.isFeatured,
          isActive: true,
          categoryId: categoryMap[item.category] || null,
        },
        create: {
          slug,
          title: item.title,
          price: item.price,
          imgUrl: item.imgUrl,
          description: item.description,
          isFeatured: item.isFeatured,
          isActive: true,
          categoryId: categoryMap[item.category] || null,
        },
      });
      createdCount++;
    } catch (err) {
      console.warn(`⚠️  Skipped "${item.title}": ${(err as Error).message}`);
      skippedCount++;
    }
  }
  console.log(
    `✅ ${createdCount} products seeded, ${skippedCount} skipped.`
  );

  // 4. Assign any existing products to categories based on title matching
  const existingProducts = await prisma.product.findMany();
  let assignedCount = 0;

  for (const product of existingProducts) {
    if (product.categoryId) continue;
    const titleLower = product.title.toLowerCase();
    for (const [catName, keywords] of Object.entries(CATEGORY_PRODUCT_MAP)) {
      const match = keywords.some((kw) =>
        titleLower.includes(kw.toLowerCase())
      );
      if (match) {
        await prisma.product.update({
          where: { id: product.id },
          data: { categoryId: categoryMap[catName] },
        });
        assignedCount++;
        break;
      }
    }
  }
  console.log(`✅ ${assignedCount} existing products assigned to categories.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
