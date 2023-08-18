import DeleteButton from '@/Components/DeleteButton'
import Price from '@/Components/Price'
import { ProductType } from '@/types/types'

import Image from 'next/image'
import React from 'react'

const getData = async (id:string)=>{
  const res = await fetch(`${process.env.NEXTAUTH_PUBLIC}/api/products/${id}`,{
    cache:"no-store"
  })

  if(!res?.ok){
  
  }

  return res.json()
}
type Props = {
  params: {id:string}
}
const SingleProduct = async({params}:Props) => {
  const singleProduct :ProductType = await getData(params.id);
  return (
    <div className="p-4 lg:px-20 xl:px-40 h-screen flex flex-col justify-around text-red-500 md:flex-row md:gap-8 md:items-center relative">
      {/* IMAGE CONTAINER */}
      {singleProduct?.img && (
        <div className="relative w-full h-1/2 md:h-[70%]">
          <Image
            src={singleProduct?.img}
            alt=""
            className="sm:w-full w-[90%] object-contain"
            fill
          />
        </div>
      )}
      {/* TEXT CONTAINER */}
      <div className="h-1/2 flex flex-col gap-4 md:h-[70%] md:justify-center md:gap-6 xl:gap-8">
        <h1 className="text-3xl font-bold uppercase">
          <span>{singleProduct?.title}</span>
          <DeleteButton id={singleProduct?.id} />
        </h1>
        <p>{singleProduct?.desc}</p>
        <Price product={singleProduct} />
      </div>
    </div>
  )
}

export default SingleProduct