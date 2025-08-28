import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest){
  try{
    const body = await request.json()
    const {prospectId,content,status,appointmentDate,memoSubject,memoDetail} = body.noteInfo
    const newNote = await prisma.notes.create({
      data: {
        noteTitle:"unUsed",
        content:content,
        status:status,
        appointmentDate:appointmentDate,
        prospectId:prospectId,
        memos: {
          create: {
            memoSubject: memoSubject,
            memoDetail: memoDetail
          }
        }
      },
      include: {
        memos: true
      }
    });

    return NextResponse.json({
      success: true,
      message: "Note saved successfully",
      data: newNote,
    });

  } catch (error) {
    console.error("Error posting Note Info:", error);
    return NextResponse.json({ success: false, error: "Failed to post Note Info" });
  }
}
/* 
export async function DELETE(request: NextRequest, { params }:{params: Promise<{prospectId: string}>}){
  const {prospectId} = await params

  if( !prospectId ){
    return NextResponse.json(
      { status: "error", message: "prospect ID is required" },
      { status: 400 }
    );
  }

  try{    
    const note = await prisma.prospects.findUnique({
      where:{
        id: prospectId
      }
    }) 

    if(!note){
      return NextResponse.json(
        { status: "error", message: "Note ID info has error. Please try again after logout" },
        { status: 400 }
      );  
    }

    const deleteProspec = await prisma.prospects.delete({
      where:{
        id: prospectId
      },
    })

    return NextResponse.json({
      success: true,
      message: "Prospect updated successfully",
      data: deleteProspec,
    });

  } catch (error) {
    console.error("Error deleting Prospect Info:", error);
    return NextResponse.json({ success: false, error: "Failed to delete Prospects Info" });
  }
}
 */