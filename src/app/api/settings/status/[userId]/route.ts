import { StatusSetting } from '@/lib/dbInterface';
import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest, { params }:{params: Promise<{userId: string}>}){
  const {userId} = await params

  if( !userId ){
    return NextResponse.json(
      { status: "error", message: "user ID is required" },
      { status: 400 }
    );
  }

  try{
    const getStatusSetting = await prisma.statusSetting.findMany({
      where:{
        userId: userId
      },
    });

    return NextResponse.json({
      success: true,
      message: "StatusSetting got successfully",
      data: getStatusSetting,
    });

  } catch (error) {
    console.error("Error getting StatusSetting Info:", error);
    return NextResponse.json({ success: false, error: "Failed to get StatusSetting Info" });
  }
}

export async function PUT(request: NextRequest, { params }:{params: Promise<{userId: string}>}){
  const {userId} = await params

  if( !userId ){
    return NextResponse.json(
      { status: "error", message: "user ID is required" },
      { status: 400 }
    );
  }

  try{
    const body = await request.json()
    const statusData:StatusSetting[] = body.statusSettingsInfo
        
    const userData = await prisma.user.findUnique({
      where:{
        id: userId
      }
    })

    if(!userData){
      return NextResponse.json(
        { status: "error", message: "User ID info has error. Please try again after logout" },
        { status: 400 }
      );  
    }

    const updateStatusSetting = await prisma.$transaction(async(tx)=>{
      await tx.statusSetting.deleteMany({
        where:{userId:userId}
      })

      await tx.statusSetting.createMany({
        data: statusData.map(item=>({
          statusName:item.statusName,
          statusColor:item.statusColor,
          statusOrder:item.statusOrder,
          userId:userId
        }))
      })

      return tx.statusSetting.findMany({
        where: { userId: userId },
        orderBy: { statusOrder: 'asc' }
      });
    })

    return NextResponse.json({
      success: true,
      message: "StatusSettings updated successfully",
      data: updateStatusSetting,
    });

  } catch (error) {
    console.error("Error updating UserData Info:", error);
    return NextResponse.json({ success: false, error: "Failed to update UserData Info" });
  }

}
