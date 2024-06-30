import { NextRequest, NextResponse } from "next/server";
import schema from "./schema"
import prisma from "@/prisma/client"

// NOTE: we are not using NextRequest in this function, so you would think that we don't need it.
//       However, if we do not include NextRequest, the client will cache this data and next time
//       this request is made, it will not actually get new data
export async function GET(request: NextRequest) {

    // get all users from DB
    const users = await prisma.user.findMany();

    return NextResponse.json(users)
}

// Creating a user
// Test this function using postman.
export async function POST(request: NextRequest) {
    // the request.json() function returns a promise, so we await it.
    // Because we are awaiting in this function, it must be async
    const body = await request.json();
    const validation = schema.safeParse(body);

    // validate that the request does include a name property
    if (!validation.success)
        return NextResponse.json({ error: "Name is required" }, { status: 400 });

    // validate that the user doesn't already exist in DB
    const user = await prisma.user.findUnique({
        where: {
            email: body.email
        }
    })

    if (user)
        NextResponse.json({ error: "User already exists"}, { status: 400 });

    // Create a new user
    const newUser = await prisma.user.create({
        data: {
            name: body.name,
            email: body.email
        }
    })

    return NextResponse.json( newUser, { status: 201 });
}