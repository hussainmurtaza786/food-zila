import { prisma } from "@/prisma/client"
import { Prisma, } from "@prisma/client";
import { NextRequest } from "next/server"

export const GET = async (req: NextRequest) => {
    const users = await prisma.adminUser.findMany({});

    return Response.json(
        { data: users },
        // { status: 200 }
    )
}

export const PUT = async (req: NextRequest) => {
    const { name, email, password, phoneNumber, products, id }: Prisma.AdminUserCreateInput = await req.json();
    try {
        const user = await prisma.adminUser.create({
            // data: { name: "John Doe", email: "john@gmail.com", password: "123", phoneNumber: "0033" }
            data: { name, email, password, phoneNumber, products, id },
            select: { id: true, email: true, phoneNumber: true, name: true }
        })

        return Response.json(
            { data: user },
            // { status: 200 }
        )
    } catch (err: any) {
        console.log("err ==>", err.message,)
        return Response.json(
            { data: err.message },
            { status: 400 }
        )
    }
}


export const PATCH = async (req: NextRequest) => {
    const { name, email, password, phoneNumber, id }: Prisma.AdminUserUpdateInput = await req.json();
    try {

        if (!id) {
            return Response.json(
                { data: "User ID is required" },
                { status: 400 }
            )
        }

        const user = await prisma.adminUser.update({
            data: { id, email, password, phoneNumber, name },
            where: { id: id as string }
        })

        return Response.json(
            { data: user },
            // { status: 200 }
        )
    } catch (err: any) {
        console.log("err ==>", err.message,)
        return Response.json(
            { data: err.message },
            { status: 400 }
        )
    }
}