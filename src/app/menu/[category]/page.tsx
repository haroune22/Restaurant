
import { ProductType } from '@/types/types'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const getData = async (category:string)=>{
  const res = await fetch(`${process.env.NEXTAUTH_PUBLIC}/api/products?cat=${category}`,{
    cache:"no-store"
  })

  if(!res?.ok){
  
  }

  return res.json()
}
type Props = {
  params: {category:string}
}
const CategoryPage = async({params}:Props) => {

  const products : ProductType[] = await getData(params.category)
  return (
    <div className='flex flex-wrap text-red-500'>
          {products.map((item)=>(
            <Link href={`/product/${item.id}`} className='w-full sm:w-1/2 h-[60vh] lg:w-1/3 border-b-2 border-r-2 border-red-500 p-4 flex flex-col justify-between group odd:bg-fuchsia-50' key={item.id}>
              {item.img && (
                <div className='relative h-[80%]'>
                  <Image src={item.img} alt='' className="object-contain" fill/>
                </div>
              )}   
              <div className='flex items-start justify-between font-bold'>
                <h1  className="text-2xl uppercase p-2">{item.title}</h1>
                <h2 className='group-hover:hidden text-xl sm:text-base md:text-xl'>{item.price}</h2>
                <button className='uppercase hidden group-hover:block bg-red-500 text-white p-2 rounded'>Add To Cart</button>
              </div>
            </Link>
          ))}
    </div>
  )
}

export default CategoryPage