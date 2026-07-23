import { NextRequest, NextResponse } from "next/server";
import { getProducts, createProduct } from "@/services/product.service";

export async function GET() {
  try {
    const products = await getProducts();
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json(
      {
        message: error instanceof Error ? error.message : "Failed to fetch products",
      },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    // We expect the frontend/client to provide the demo backend token in the Authorization header
    const authHeader = req.headers.get("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ message: "Unauthorized. Demo Backend token required." }, { status: 401 });
    }
    const token = authHeader.split(" ")[1];

    const body = await req.json();
    const result = await createProduct(body, token);

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      {
        message: error instanceof Error ? error.message : "Failed to create product",
      },
      { status: 400 }
    );
  }
}
