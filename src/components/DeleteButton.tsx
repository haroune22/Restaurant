'use client'
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react'
import { toast } from 'react-toastify';

const DeleteButton = ({id}:{id:string}) => {
  
    const { data: session, status } = useSession();
    const router = useRouter();
  
    if (status === "loading") {
      return <p className="absolute top-4 right-4">Loading...</p>;
    }
  
    if (status === "unauthenticated" || !session?.user.isAdmin) {
      return;
    }
    const handleDelete =async()=>{
      const res = await fetch(`${process.env.NEXT_PUBLIC_NEXTAUTH_URL!}/api/products/${id}`, {
        method: "DELETE",
      });
  
      if (res.status === 200) {
        router.push("/menu");
        toast("The product has been deleted!");
      } else {
        const data = await res.json();
        toast.error(data.message);
      }
    }
    return (
        <button
          className="bg-red-400 hover:bg-red-500 text-white p-2 rounded-full ml-6 absolute top-4 right-4"
          onClick={handleDelete}
        >
          <Image src="/delete.png" alt="" width={20} height={20} />
        </button>
      );
    };
    
    export default DeleteButton;