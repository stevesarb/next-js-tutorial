import { NextRequest, NextResponse } from "next/server";
import schema from "../schema";
import prisma from "@/prisma/client";

interface Props {
    params: { id: string }
}

// Get a single product
export async function GET(request: NextRequest, { params: { id } }: Props) {
    // Ensure the product exists
    const product = await prisma.product.findUnique({
        where: {
            id: parseInt(id)
        }
    })

    if (!product)
        return NextResponse.json({ error: "Product not found" }, { status: 404 });

    return NextResponse.json(product);
}

// update a product
export async function PUT(request: NextRequest, { params: { id } }: Props) {
    // get the data from request body
    const body = await request.json();

    // validate the request body
    const validation = schema.safeParse(body);
    if (!validation.success)
        return NextResponse.json( validation.error.errors, { status: 400 });

    // check that the product exists
    const product = await prisma.product.findUnique({
        where: { id: parseInt(id) }
    })

    // validate product id
    if (!product)
        return NextResponse.json({ error: "Product not found" }, { status: 404 });

    // update product
    const updatedProduct = await prisma.product.update({
        where: { id: product.id },
        data: {
            name: body.name,
            price: body.price
        }
    })

    return NextResponse.json(updatedProduct);
}

// Delete a product
export async function DELETE(request: NextRequest, { params: { id } }: Props) {
    // make sure product exists
    const product = await prisma.product.findUnique({
        where: { id: parseInt(id) }
    })

    // validate product
    if (!product)
        return NextResponse.json({ error: "Product not found" }, { status: 404 });

    // delete product
    await prisma.product.delete({
        where: { id: product.id }
    })

    return NextResponse.json({});
}