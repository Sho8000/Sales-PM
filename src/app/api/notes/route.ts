import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest){
  try{
    const body = await request.json()
    const {prospectId,content,status,appointmentDate,memoDetail} = body.noteInfo
    const newNote = await prisma.notes.create({
      data: {
        noteTitle:"unUsed",
        content:content,
        status:status,
        appointmentDate:appointmentDate,
        prospectId:prospectId,
        memos: {
          create: {
            memoSubject: "unUsed",
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
