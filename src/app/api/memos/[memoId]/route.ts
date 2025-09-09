import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function DELETE(request: NextRequest, { params }:{params: Promise<{memoId: string}>}){
  const {memoId} = await params

  if( !memoId ){
    return NextResponse.json(
      { status: "error", message: "memo ID is required" },
      { status: 400 }
    );
  }

  try{    
    const memo = await prisma.memos.findUnique({
      where:{
        id: memoId
      }
    }) 

    if(!memo){
      return NextResponse.json(
        { status: "error", message: "Memo ID info has error. Please try again after logout" },
        { status: 400 }
      );  
    }
    
    const deleteMemo = await prisma.memos.delete({
      where:{
        id: memoId
      },
    })

    return NextResponse.json({
      success: true,
      message: "Memo deleted successfully",
      data: deleteMemo,
    });

  } catch (error) {
    console.error("Error deleting Memo Info:", error);
    return NextResponse.json({ success: false, error: "Failed to delete Memo Info" });
  }
}
