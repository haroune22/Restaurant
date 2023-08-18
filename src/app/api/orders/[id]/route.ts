import { prisma } from "@/utils/connect"
import { NextRequest, NextResponse } from "next/server"


export const PUT =async(req:NextRequest,{params}:{params:{id:string}})=>{
    const {id}= params
   
    try {
        await prisma.order.update({
            where: {
                id:id
            },
            data:{ status:await req.json() },
        });
        return new NextResponse(JSON.stringify({message:'Order has been updated'}),{status:200})
    } catch (error) {
        return new NextResponse(JSON.stringify({message:'Somthing Went Wrong'}),{status:500})
    }
}