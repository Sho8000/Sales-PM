import { ContentsSetting } from '@/lib/dbInterface';
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
    const getContentSetting = await prisma.contentsSetting.findMany({
      where:{
        userId: userId
      },
    });

    return NextResponse.json({
      success: true,
      message: "ContentsSetting got successfully",
      data: getContentSetting,
    });

  } catch (error) {
    console.error("Error getting ContentSetting Info:", error);
    return NextResponse.json({ success: false, error: "Failed to get ContentSetting Info" });
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
    const contentsData:ContentsSetting[] = body.contentsSettingsInfo
        
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

    const updateContentsSetting = await prisma.$transaction(async(tx)=>{
      await tx.contentsSetting.deleteMany({
        where:{userId:userId}
      })

      await tx.contentsSetting.createMany({
        data: contentsData.map(item=>({
          contentName:item.contentName,
          userId:userId
        }))
      })

      return tx.contentsSetting.findMany({
        where: { userId: userId },
        orderBy: { contentName: 'asc' }
      });
    })

    return NextResponse.json({
      success: true,
      message: "ContentsSettings updated successfully",
      data: updateContentsSetting,
    });

  } catch (error) {
    console.error("Error updating UserData Info:", error);
    return NextResponse.json({ success: false, error: "Failed to update UserData Info" });
  }

}

export async function DELETE(request: NextRequest){
  try{
    const body = await request.json()
    const contentId = body.contentId 

    console.log("Id here",contentId)
    const deleteContent = await prisma.contentsSetting.delete({
      where:{
        id: contentId
      },
    })

    return NextResponse.json({
      success: true,
      message: "Content deleted successfully",
      data: deleteContent,
    });

  } catch (error) {
    console.error("Error deleting contents Info:", error);
    return NextResponse.json({ success: false, error: "Failed to delete contents Info" });
  }

}
