import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest, { params }:{params: Promise<{listId: string}>}){
  const {listId} = await params

  if( !listId ){
    return NextResponse.json(
      { status: "error", message: "list ID is required" },
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

export async function PUT(request: NextRequest, { params }:{params: Promise<{listId: string}>}){
  const {listId} = await params

  if( !listId ){
    return NextResponse.json(
      { status: "error", message: "list ID is required" },
      { status: 400 }
    );
  }

  try{
    const body = await request.json()
    const {prospectName,prospectSex,prospectAge,prospectMarital,children,prospectBusiness,prospectPosition,prospectLocation,prospectPhone,prospectEmail,prospectHidden,prospectFirstcontact,prospectListId} = body.prospectInfo
    
    const prospect = await prisma.prospects.findUnique({
      where:{
        id: listId
      }
    }) 

    if(!prospect){
      return NextResponse.json(
        { status: "error", message: "Prospect ID info has error. Please try again after logout" },
        { status: 400 }
      );  
    }

    const updateProspec = await prisma.prospects.update({
      where:{
        id: listId
      },
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
        prospectHidden: prospectHidden,
        prospectFirstcontact: prospectFirstcontact,
        prospectListId: prospectListId,
      },
    })

    return NextResponse.json({
      success: true,
      message: "Prospect updated successfully",
      data: updateProspec,
    });

  } catch (error) {
    console.error("Error updating Prospect Info:", error);
    return NextResponse.json({ success: false, error: "Failed to update Prospects Info" });
  }

}

export async function DELETE(request: NextRequest, { params }:{params: Promise<{listId: string}>}){
  const {listId} = await params

  if( !listId ){
    return NextResponse.json(
      { status: "error", message: "list ID is required" },
      { status: 400 }
    );
  }

  try{    
    const prospect = await prisma.prospects.findUnique({
      where:{
        id: listId
      }
    }) 

    if(!prospect){
      return NextResponse.json(
        { status: "error", message: "Prospect ID info has error. Please try again after logout" },
        { status: 400 }
      );  
    }

    const deleteProspec = await prisma.prospects.delete({
      where:{
        id: listId
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
