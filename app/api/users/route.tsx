import { NextRequest, NextResponse } from "next/server";
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

    // validate that the request does include a name property
    if (!body.name)
        return NextResponse.json({ error: "Name is required" }, { status: 400 });

    return NextResponse.json({ id: 1, name: body.name }, { status: 201 });
}