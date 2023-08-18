import { getAuthSesion } from "@/utils/auth"
import { prisma } from "@/utils/connect"
import { NextRequest, NextResponse } from "next/server"

export const GET=async(req:NextRequest,{params}:{params:{id:string}})=>{
    const {id} = params
    
    try {
        const product = await prisma.product.findUnique({
            where:{
               id:id
            }
        })
        return new NextResponse(JSON.stringify(product),{status:200})
    } catch (error) {
        console.log(error)
        return new NextResponse(JSON.stringify({message:'somthing went wrong'}),{status:500})
    }
}

export const DELETE = async(req:NextRequest,{params}:{params:{id:string}})=>{
    const {id} = params
    const session =await getAuthSesion()
 
    if(session?.user.isAdmin){ 
        try {
            const product = await prisma.product.delete({
                where:{
                   id:id
                }
            })
            return new NextResponse(JSON.stringify('Product has been deleted'),{status:200})
        } catch (error) {
            console.log(error)
            return new NextResponse(JSON.stringify({message:'somthing went wrong'}),{status:500})
        }
    }  else{
        return new NextResponse(JSON.stringify({message:'Not Allowed'}),{status:403})
    }
}