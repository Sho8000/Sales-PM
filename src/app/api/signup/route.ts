import { hashPassword } from '@/lib/hashPass';
import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest){
  try{
    const body = await request.json()
    const {username,useremail,password,adminEmail} = body.signupInfo

    if(adminEmail!=="yoshikichi8000@gmail.com"){
      return NextResponse.json(
        { status: "error", message:"adminEmail is wrong or empty"},
        {status: 400}
      )
    }

    const hashedPassword = await hashPassword(password);

    const newUser = await prisma.user.create({
      data: {
        username:username,
        useremail:useremail,
        password:hashedPassword,
        prospectList:{
          create:{}
        }
      },
    });

    return NextResponse.json({
      success: true,
      message: "User saved successfully",
      data: newUser,
    });

  } catch (error) {
    console.error("Error posting newUser Info:", error);
    return NextResponse.json({ success: false, error: "Failed to post newUser Info" });
  }
}
