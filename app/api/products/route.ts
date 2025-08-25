import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import Product, { IProduct } from "@/models/Product";


export async function GET() {
  try {
    await connectToDatabase();
    const products = await Product.find({}).lean();

    if (!products || products.length === 0) {
      return NextResponse.json([], { status: 200 });
    }

    return NextResponse.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user?.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();
    const body: IProduct = await request.json();
     // Check for each required field separately
    if (!body.name) {
      return NextResponse.json({ error: "Product name is required" }, { status: 400 });
    }

    if (!body.description) {
      return NextResponse.json({ error: "Product description is required" }, { status: 400 });
    }

    if (!body.price) {
      return NextResponse.json({ error: "Product price is required" }, { status: 400 });
    }

    if (!body.imageUrl) {
      return NextResponse.json({ error: "Product image URL is required" }, { status: 400 });
    }

    if (!body.category) {
      return NextResponse.json({ error: "Product category is required" }, { status: 400 });
    }

    const product = await Product.create(body);
    return NextResponse.json(product);
  } catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.json(
      { error: "Failed to create product" },
      { status: 500 }
    );
  }
}
    