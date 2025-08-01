import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await getServerSession(authOptions)

  if(!session){
    return new NextResponse(JSON.stringify({error:"unauthorized"}),{status:401})
  }

  console.log("GET API", session)
  return NextResponse.json({authenticated: !!session})
}