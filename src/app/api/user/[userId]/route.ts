import { hashCompare, hashPassword } from "@/lib/hashPass";
import prisma from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";

export async function PUT(request: NextRequest, { params }: { params: Promise<{ userId: string }> }) {
  const {userId} = await params
  const {currentPassword,newPassword} = await request.json();

  if( !userId ){
    return NextResponse.json(
      { status: "error", message: "User ID is required" },
      { status: 400 }
    );
  }

  const user = await prisma.user.findUnique({
    where: {
      id: userId
    }
  })

  if(!user){
    return NextResponse.json(
      { status: "error", message: "User ID info has error. Please try again after logout" },
      { status: 400 }
    );
  }

  const isPasswordValid =  await hashCompare(currentPassword,user.password)

  if(!isPasswordValid){
    console.log("Your Current Password is worng,,,")
    return NextResponse.json(
      { status: "error", message: "Your Current Password is worng,,," },
      { status: 400 }
    );
  }
  
  const hashedPassword = await hashPassword(newPassword)
  
  try {
    const updateUser = await prisma.user.update({
      where:{
        id: userId,
      },
      data:{
        username: user.username,
        useremail: user.useremail,
        password: hashedPassword,
        updatedAt: new Date(),
      }
    });

    return NextResponse.json({
      status: "success",
      data: updateUser,
    });
  } catch (error) {
    console.error("Error updating User Info:", error);
    return NextResponse.json({ success: false, error: "Failed to update User Info" });
  }
}
