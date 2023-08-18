import { prisma } from "@/utils/connect"
import { NextResponse } from "next/server"



//fetch categories
export const GET=async()=>{
    try {
        const categories = await prisma.category.findMany()
        return new NextResponse(JSON.stringify(categories),{status:500})
    } catch (error) {
        console.log(error)
        return new NextResponse(JSON.stringify({message:'somthing went wrong'}),{status:500})
    }
}