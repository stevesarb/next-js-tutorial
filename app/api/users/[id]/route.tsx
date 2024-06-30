import { NextRequest, NextResponse } from "next/server";
import schema from "../schema";
import prisma from "@/prisma/client";

interface Props {
  params: { id: string };
}

// Reading a user
export async function GET(request: NextRequest, { params: { id } }: Props) {
  const user = await prisma.user.findUnique({
    where: {
      id: parseInt(id),
    },
  });

  if (!user)
    return NextResponse.json({ error: "User not found" }, { status: 404 });

  return NextResponse.json(user);
}

// Updating a user
export async function PUT(request: NextRequest, { params: { id } }: Props) {
  const body = await request.json();

  // use predefined schema for what the object we are expecting is to validate
  const validation = schema.safeParse(body);

  // validate request body
  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 });

  // validate user id
  if (id > 10)
    return NextResponse.json({ error: "User not found" }, { status: 404 });

  return NextResponse.json({ id: 1, name: body.name });
}

// Deleting a user
export async function DELETE(request: NextRequest, { params: { id } }: Props) {
  const body = await request.json();

  const validation = schema.safeParse(body);

  // validate request body
  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 });

  // validate user id
  if (id > 10)
    return NextResponse.json({ error: "User not found" }, { status: 404 });

  return NextResponse.json({ id: 1, name: body.name });
}
