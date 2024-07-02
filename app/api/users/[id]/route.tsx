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

  // make sure user exists
  const user = await prisma.user.findUnique({
    where: { id: parseInt(id) }
  })

  // validate user id
  if (!user)
    return NextResponse.json({ error: "User not found" }, { status: 404 });

  // update user
  const updatedUser = await prisma.user.update({
    where: {id: user.id },
    data: {
        name: body.name,
        email: body.email
    }
  })

  return NextResponse.json(updatedUser);
}

// Deleting a user
export async function DELETE(request: NextRequest, { params: { id } }: Props) {

  // make sure user exists
  const user = await prisma.user.findUnique({
    where: { id: parseInt(id) }
  })

  // validate user id
  if (!user)
    return NextResponse.json({ error: "User not found" }, { status: 404 });

  await prisma.user.delete({
    where: { id: user.id }
  })

  return NextResponse.json({});
}
