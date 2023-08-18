import { getAuthSesion } from "@/utils/auth"
import { prisma } from "@/utils/connect"
import { NextRequest, NextResponse } from "next/server"





//fetch orders
export const GET=async(req:NextRequest)=>{
   
 const session =await getAuthSesion()
 
 if(session){
     try {
        if(session?.user.isAdmin){
            const orders = await prisma.order.findMany()
            return new NextResponse(JSON.stringify(orders),{status:200})
            
        }
        const orders = await prisma.order.findMany({
            where:{
                userEmail:session?.user.email!
            }
        })
         return new NextResponse(JSON.stringify(orders),{status:200})
     } catch (error) {
         console.log(error)
         return new NextResponse(JSON.stringify({message:'somthing went wrong'}),{status:500})
     }
 }else{
  
    return new NextResponse(JSON.stringify({message:'You are Not authenticated'}),{status:401})
 }
}
export const POST =async (req:NextRequest) => {

    const session =await getAuthSesion()

    if(session){
        try {
            const body = req.json()
            const order = await prisma.order.create({
                data:await body,
              });
              return new NextResponse(JSON.stringify(order), { status: 201 });
        } catch (error) {
            console.log(error)
            return new NextResponse(JSON.stringify({message:'somthing went wrong'}),{status:500})
        }
    }else{
       return new NextResponse(JSON.stringify({message:'You are Not authenticated'}),{status:401})
    }
}