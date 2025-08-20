import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest, { params }:{params: Promise<{listId: string}>}){
  const {listId} = await params

  console.log("list ID",listId)

  if( !listId ){
    return NextResponse.json(
      { status: "error", message: "user ID is required" },
      { status: 400 }
    );
  }

  try{
    const body = await request.json()
    const {prospectName,prospectSex,prospectAge,prospectMarital,children,prospectBusiness,prospectPosition,prospectLocation,prospectPhone,prospectEmail,prospectFirstcontact} = body.prospectInfo
    const newProspect = await prisma.prospects.create({
      data: {
        prospectName: prospectName,
        prospectSex: prospectSex,
        prospectAge: prospectAge,
        prospectMarital: prospectMarital,
        children: children,
        prospectBusiness: prospectBusiness,
        prospectPosition: prospectPosition,
        prospectLocation: prospectLocation,
        prospectPhone: prospectPhone,
        prospectEmail: prospectEmail,
        prospectHidden: false,
        prospectFirstcontact: prospectFirstcontact,
        prospectListId: listId,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Prospect saved successfully",
      data: newProspect,
    });

  } catch (error) {
    console.error("Error posting Prospects Info:", error);
    return NextResponse.json({ success: false, error: "Failed to post Prospects Info" });
  }

}
