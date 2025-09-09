import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest){
  try{
    const body = await request.json()
    const {noteId,memoDetail} = body.memoInfo
    const newMemo = await prisma.memos.create({
      data: {
        memoSubject:"unUsed",
        memoDetail:memoDetail,
        noteId:noteId,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Memo saved successfully",
      data: newMemo,
    });

  } catch (error) {
    console.error("Error posting Memo Info:", error);
    return NextResponse.json({ success: false, error: "Failed to post Memo Info" });
  }
}
