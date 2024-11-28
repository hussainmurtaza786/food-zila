import { prisma } from "@/prisma/client";
import { Prisma } from "@prisma/client";

import { NextRequest } from "next/server";


export const GET = async (req: NextRequest) => {
    const products = await prisma.product.findMany({})
    return Response.json(
        { products: products }
    )
}

export const PUT = async (req: NextRequest) => {
    const { id, slug, price, title, createdBy, imgUrl, description }: Prisma.ProductCreateInput = await req.json()
    try {
        const product = await prisma.product.create({
            data: { id, slug, price, title, createdBy, imgUrl, description },
            select: { id: true, slug: true, price: true, title: true, description: true, imgUrl: true }
        })
        return Response.json(
            { product: product }
        )
    } catch (err: any) {
        console.log("err ==>", err.message,)
        return Response.json(
            { pro: err.message },
            { status: 400 }
        )
    }
}
// export const PATCH = async (req: NextRequest) => {
//     const { id, slug,price, title, createdBy, imgUrl, description }: Prisma.ProductCreateInput = await req.json()
//     try {

//         if (!id) {
//             return Response.json(
//                 { data: "User ID is required" },
//                 { status: 400 }
//             )
//         }

//         const user = await prisma.product.update({
//             data: { id, slug, price, title, imgUrl, description },
//             where: { id: id as string }
//         })

//         return Response.json(
//             { product: user },
//             // { status: 200 }
//         )
//     } catch (err: any) {
//         console.log("err ==>", err.message,)
//         return Response.json(
//             { product: err.message },
//             { status: 400 }
//         )
//     }
// }
export const PATCH = async (req: NextRequest) => {
    const { id, title, price, imgUrl, description, slug }: Prisma.ProductCreateInput = await req.json();
  
    try {
      if (!id) {
        return Response.json({ error: "Product ID is required" }, { status: 400 });
      }
  
      const updatedProduct = await prisma.product.update({
        where: { id },
        data: { title, price, imgUrl, description, slug },
      });
  
      return Response.json({ product: updatedProduct }, { status: 200 });
    } catch (err: any) {
      console.error("Update Error:", err.message);
      return Response.json({ error: err.message }, { status: 400 });
    }
  };
  

export const DELETE = async (req: NextRequest) => {
    try {

        const { id }: { id: string } = await req.json();

        if (!id) {
            return Response.json(
                { error: "Product ID is required" },
                { status: 400 }
            );
        }

        // Delete the product from the database
        const deletedProduct = await prisma.product.delete({
            where: { id },
        });

        return Response.json(
            { message: "Product deleted successfully", product: deletedProduct },
            { status: 200 }
        );
    } catch (err: any) {
        console.log("err ==>", err.message);
        return Response.json(
            { error: err.message },
            { status: 400 }
        );
    }
};

