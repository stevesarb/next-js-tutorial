import { NextRequest, NextResponse } from "next/server";
import schema from "./schema";
import prisma from "@/prisma/client";

// Generic GET all products request
export async function GET(request: NextRequest) {
  // get all products from DB
  const products = await prisma.product.findMany();

  return NextResponse.json(products);
}

// creating a product
export async function POST(request: NextRequest) {
  // get the data from the request body
  const body = await request.json();
  const validation = schema.safeParse(body);

  // validate that the request contains a name and price
  if (!validation.success)
    return NextResponse.json(
      { error: "Must include name and price" },
      { status: 400 }
    );

  // validate that the product doesn't already exist in DB
  const product = await prisma.product.findUnique({
    where: {
      name: body.name,
    },
  });

  if (product)
    return NextResponse.json(
      { error: "Product already exists" },
      { status: 400 }
    );

    // create a new product
    const newProduct = await prisma.product.create({
        data: {
            name: body.name,
            price: body.price
        }
    })

    return NextResponse.json( newProduct, { status: 201 });
}
