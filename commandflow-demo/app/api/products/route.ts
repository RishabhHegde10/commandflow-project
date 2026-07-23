import { NextResponse } from "next/server";

let products = [
  {
    id: 1,
    name: "Nike Air Max",
    brand: "Nike",
    category: "Shoes",
    variants: [
      {
        sku: "NIKE-RED-8",
        color: "Red",
        size: 8,
        price: 4999,
        stock: 5,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff"
      },
      {
        sku: "NIKE-BLUE-9",
        color: "Blue",
        size: 9,
        price: 4999,
        stock: 8,
        image: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519"
      }
    ]
  },
  {
    id: 2,
    name: "Adidas Hoodie",
    brand: "Adidas",
    category: "Clothing",
    variants: [
      {
        sku: "ADI-BLACK-M",
        color: "Black",
        size: "M",
        price: 2999,
        stock: 10,
        image: "https://images.unsplash.com/photo-1520975922215-2301b8db2d9d"
      }
    ]
  }
];

export async function GET() {
  return NextResponse.json(products);
}