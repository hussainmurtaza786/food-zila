import { prisma } from "@/prisma/client"
import { Prisma, } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server"
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET || 'your-secret-key';

 const generateToken = (payload: object, expiresIn = '1h') => {
    return jwt.sign(payload, SECRET_KEY, { expiresIn });
};

export const GET = async (req: NextRequest) => {
    const users = await prisma.adminUser.findMany({});

    return Response.json(
        { data: users },
        // { status: 200 }
    )
}
export const PUT = async (req: NextRequest) => {
  const { id, email, name, password, phoneNumber, products, role }: Prisma.AdminUserCreateInput = await req.json();

  try {
      // If no role is provided, default to "STAFF"
      const userRole = role || "STAFF";  // Default to STAFF if no role is provided

      // Hash the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Create the user in the database
      const user = await prisma.adminUser.create({
          data: {
              id,
              email,
              name: name || "New User", // Default name if none provided
              password: hashedPassword,
              phoneNumber,
              role: userRole, // Set the role to the provided or default "STAFF"
              products,
          },
          select: { id: true, email: true, name: true, phoneNumber: true, password: true, role: true }, // Include role in response
      });


      // Generate a JWT
      const token = generateToken({ id: user.id, email: user.email, role: user.role });

      return Response.json(
          { user, token },
          { status: 201 }
      );
  } catch (err: any) {
      console.log("Error:", err.message);
      return Response.json(
          { error: err.message },
          { status: 400 }
      );
  }
};


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
            where: { id: id as string, }
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

export const DELETE = async (req: NextRequest) => {
    try {

        const { id }: { id: string } = await req.json();

        if (!id) {
            return Response.json(
                { error: "User ID is required" },
                { status: 400 }
            );
        }

        // Delete the product from the database
        const deletedUser = await prisma.adminUser.delete({
            where: { id },
        });

        return Response.json(
            { message: "User deleted successfully", user: deletedUser },
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


export const POST = async (req: NextRequest) => {
    try {
      const { email, password }: { email: string; password: string } = await req.json();
  
      // Validate email and password
      if (!email || !password) {
        return NextResponse.json(
          { error: "Email and password are required." },
          { status: 400 }
        );
      }
  
      // Fetch user by email
      const user = await prisma.adminUser.findUnique({
        where: { email },
      });
  
      if (!user) {
        return NextResponse.json(
          { error: "Invalid email or password." },
          { status: 401 }
        );
      }
  
      // Compare passwords
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return NextResponse.json(
          { error: "Invalid email or password." },
          { status: 401 }
        );
      }
  
      // Generate a JWT token
      const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, {
        expiresIn: "1h",
      });
  
      return NextResponse.json(
        {
          message: "Login successful",
          token,
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            phoneNumber: user.phoneNumber,
          },
        },
        { status: 200 }
      );
    } catch (err: any) {
      console.error("Login Error:", err.message);
      return NextResponse.json(
        { error: "An error occurred during login." },
        { status: 500 }
      );
    }
  };