import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function PUT(request: NextRequest, { params }:{params: Promise<{noteId: string}>}){
  const {noteId} = await params

  if( !noteId ){
    return NextResponse.json(
      { status: "error", message: "note ID is required" },
      { status: 400 }
    );
  }

  try{
    const body = await request.json()
    const {content,status,appointmentDate} = body.noteInfo
    
    const note = await prisma.notes.findUnique({
      where:{
        id: noteId
      }
    }) 

    if(!note){
      return NextResponse.json(
        { status: "error", message: "Note ID info has error. Please try again after logout" },
        { status: 400 }
      );  
    }

    const updateNote = await prisma.notes.update({
      where:{
        id: noteId
      },
      data: {
        content: content,
        status: status,
        appointmentDate: appointmentDate,
      },
    })

    return NextResponse.json({
      success: true,
      message: "Note updated successfully",
      data: updateNote,
    });

  } catch (error) {
    console.error("Error updating Note Info:", error);
    return NextResponse.json({ success: false, error: "Failed to update Notes Info" });
  }

}

export async function DELETE(request: NextRequest, { params }:{params: Promise<{noteId: string}>}){
  const {noteId} = await params

  if( !noteId ){
    return NextResponse.json(
      { status: "error", message: "note ID is required" },
      { status: 400 }
    );
  }

  try{    
    const note = await prisma.notes.findUnique({
      where:{
        id: noteId
      }
    }) 

    if(!note){
      return NextResponse.json(
        { status: "error", message: "Note ID info has error. Please try again after logout" },
        { status: 400 }
      );  
    }

    await prisma.memos.deleteMany({
      where: { noteId: noteId },
    });
    
    const deleteNote = await prisma.notes.delete({
      where:{
        id: noteId
      },
    })

    return NextResponse.json({
      success: true,
      message: "Note deleted successfully",
      data: deleteNote,
    });

  } catch (error) {
    console.error("Error deleting Note Info:", error);
    return NextResponse.json({ success: false, error: "Failed to delete Note Info" });
  }
}
