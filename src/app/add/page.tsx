'use client'
import Loading from '@/Components/Loading';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

type Inputs = {
    title: string;
    desc: string;
    price: number;
    catSlug: string;
  };
  type Option = {
    title: string;
    additionalPrice: number;
  };
const AddPage = () => {
    const { data: session, status } = useSession();
    const router = useRouter();

    const [inputs, setInputs] = useState<Inputs>({
   title: "",
   desc: "",
   price: 0,
   catSlug: "",
 });
 const [option, setOption] = useState<Option>({
    title: "",
    additionalPrice: 0,
  });
  const [options, setOptions] = useState<Option[]>([]);
  const [Submiting, setSubmiting] = useState(false);
  
  const [file, setFile] = useState<File>();

  const handleChange = ( e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=>{
    e.preventDefault();
    setInputs((prev) => {
        return { ...prev, [e.target.name]: e.target.value };
      });
  }
  const changeOption = (e: React.ChangeEvent<HTMLInputElement>)=>{
    e.preventDefault();
    setOption((prev) => {
        return { ...prev, [e.target.name]: e.target.value };
      });
  }
  const handleChangeImg = (e: React.ChangeEvent<HTMLInputElement>)=>{
    const target = e.target as HTMLInputElement;
    const item = (target.files as FileList)[0];
    setFile(item);
  }

  const upload = async () => {
    const data = new FormData();
    data.append("file", file!);
    data.append("upload_preset", "restaurant");
    try {
      const res = await fetch(process.env.NEXT_PUBLIC_CLOUDINARY_URL!, {
        method: "POST",
        body: data,
      });
  
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }

      const resData = await res.json();
      return resData.url;
    } catch (error) {
      console.error("Upload error:", error);
    }
  };

  const handleSubmit =async (e: React.FormEvent<HTMLFormElement>) =>{
    e.preventDefault(); 
    setSubmiting(true)
    try {
      const url = await upload();
      const res = await fetch(`${process.env.NEXT_PUBLIC_NEXTAUTH_URL!}/api/products`, {
        method: "POST",
        body: JSON.stringify({
          img: url,
          ...inputs,
          options,
        }),
      });
          const data = await res.json();
          
          router.push(`/product/${data.id}`);
    } catch (err) {
        console.log(err);
    }
  }

    if (status === "loading") {
      return (
      <div className='flex items-center justify-center w-full h-[100vh] '>
          <Loading/>
        </div>
      )
    }
  
    if (status === "unauthenticated" || !session?.user.isAdmin) {
      router.push("/");
    }
    return (
        <div className='w-full p-2 lg:px-20 xl:px-40 flex items-center justify-center'>
            <form onSubmit={handleSubmit}  className="shadow-lg flex flex-wrap p-8 gap-4 w-full">
            <h1  className="text-4xl mb-2 text-gray-300 font-bold">Add New Product</h1>
            <div className="w-full flex flex-col gap-2 ">
          <label
            className="text-sm cursor-pointer flex gap-4 items-center"
            htmlFor="file"
          >
            <Image src="/upload.png" alt="" width={40} height={30} />
            <span>Upload Image</span>
          </label>
          <input
            type="file"
            onChange={handleChangeImg}
            id="file"
            className="hidden"
            required
          />
        </div>
            <div className='flex felx-col gap-2 w-full'>
                <label>Title</label>
                <input  className="ring-1 ring-red-200 p-4 rounded-sm placeholder:text-red-200 outline-none" type='text' placeholder='Title' name='title'  onChange={handleChange} required/>
            </div>
            <div className='flex flex-col gap-2 w-full'>
                <label>Desc</label>
                <textarea className="ring-1 ring-red-200 p-4 rounded-sm placeholder:text-red-200 outline-none" placeholder='desc' name='desc' onChange={handleChange} required/>
            </div>
            <div className='flex flex-col gap-2 w-full'>
                <label>Price</label>
                <input  className="ring-1 ring-red-200 p-4 rounded-sm placeholder:text-red-200 outline-none" type='number' placeholder='22' name='price' onChange={handleChange} required/>
            </div>
            <div className='flex flex-col gap-2 w-full'>
                <label>Category</label>
                <input  className="ring-1 ring-red-200 p-4 rounded-sm placeholder:text-red-200 outline-none" type='text' placeholder='pizzas' name='catSlug' onChange={handleChange} required/>
                <div className="w-full flex flex-col gap-2">
          <label className="text-sm">Options</label>
          <div className="flex flex-wrap">
            <input
              className="ring-1 ring-red-200 p-4 rounded-sm placeholder:text-red-200 outline-none"
              type="text"
              placeholder="Title"
              name="title"
              onChange={changeOption}
              required
            />
            <input
              className="ring-1 ring-red-200 p-4 rounded-sm placeholder:text-red-200 outline-none"
              type="number"
              placeholder="Additional Price"
              name="additionalPrice"
              onChange={changeOption}
              required
            />
            <div
              className="bg-gray-500 gap-2 p-2 text-white text-center"
              onClick={(e) => {
                e.preventDefault(),
                setOptions((prev) => [...prev, option])
            }}
            >
              Add Option
            </div>
          </div>
          <div className="flex flex-wrap gap-4 mt-2">
          {options.map((opt) => (
              <div
                key={opt.title}
                className="p-2  rounded-md cursor-pointer bg-gray-200 text-gray-400"
                onClick={() =>
                  setOptions((prev) =>
                    prev.filter((item) => item.title !== opt.title)
                  )
                }
              >
                <span>{opt.title}</span>
                <span className="text-xs"> (+ ${opt.additionalPrice})</span>
              </div>
            ))}
              </div>
          </div>
        </div>
        <button
          type="submit"
          className="bg-red-500 p-4 text-white w-48 rounded-md relative h-14 flex items-center justify-center"
        >
          Submit
        </button>
        {Submiting && <p>Wiat... ,We are Creating Your Prodcut</p>}
            </form>
        </div>
      );
    };

export default AddPage