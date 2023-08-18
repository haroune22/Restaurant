import React from 'react'
import Link from 'next/link'
import { MenuType } from '@/types/types'

const getData = async ()=>{
  const res = await fetch(`${process.env.NEXTAUTH_PUBLIC}/api/categories`,{
    cache:"no-store"
  })

  if(!res?.ok){
  
  }

  return res.json()
}

const MenuPage = async() => {
  const menu :MenuType = await getData()

  return (
    <div className='flex flex-col md:flex-row h-[calc(100vh-6rem)] md:h-[calc(100vh-9rem)] p-4 lg:px-20 xl:px-40 items-center'>
      {menu.map((category)=>(
        <Link key={category.id} href={`/menu/${category.slug}`} className='w-full h-2/3 bg-cover p-4 md:p-6 md:h-[70%]' style={{ backgroundImage: `url(${category.img})` }}>
          <div  className={`text-${category.color} w-1/2`}>
          <h1 className="uppercase font-bold text-2xl md:text-3xl">{category.title}</h1>
            <p className="text-sm md:text-lg my-4 md:my-8">{category.desc}</p>
            <button className={`hidden 2xl:block bg-${category.color} text-${category.color === "black" ? "white" : "red-500"} py-2 px-4 rounded-md`}>Explore</button>
          </div>
        </Link>
      ))}
    </div>
  )
}

export default MenuPage