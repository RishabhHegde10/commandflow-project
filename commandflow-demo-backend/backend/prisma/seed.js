const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  await prisma.product.create({
    data: {
      productId: "P1001",
      name: "Nike Air Max 90",
      brand: "Nike",
      category: "Shoes",
      description: "Comfortable running shoe",
      status: "active",

      variants: {
        create: [
          {
            sku: "NIKE-AM90-BLK-9",
            color: "Black",
            size: "9",
            price: 4999,
            stock: 12,
            image: "/images/nike-black.png"
          },
          {
            sku: "NIKE-AM90-WHT-10",
            color: "White",
            size: "10",
            price: 5199,
            stock: 8,
            image: "/images/nike-white.png"
          }
        ]
      }
    }
  });

  console.log("✅ Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });