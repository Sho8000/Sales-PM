import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest, { params }: { params: Promise<{ userId: string }> }) {
  const {userId} = await params

  if( !userId ){
    return NextResponse.json(
      { status: "error", message: "user ID is required" },
      { status: 400 }
    );
  }

  try {
    const prospects = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        prospectList: {
          include: {
            prospects: {
              include: {
                notes: {
                  include: {
                    memos: true,
                  },
                },
              },
            },
          },
        },
        statusSetting: true,
        contentsSetting: true,
      },
    });
        
    return NextResponse.json(prospects);

  } catch (error) {
    console.error("Error updating Prospects Info:", error);
    return NextResponse.json({ success: false, error: "Failed to get Prospects Info" });
  }
}
