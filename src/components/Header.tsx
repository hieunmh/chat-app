'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { useUser } from '@/hooks/userUser';
import { Toaster, toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export default function Header() {

  const supabase = createClientComponentClient();
  const router = useRouter();

  let menu = [
    'Vận chuyển',
    'Dịch vụ',
    'Tư vấn khách hàng',
  ]

  const user = useUser();

  const logout = async () => {
    toast.promise(supabase.auth.signOut(), {
      loading: 'Đang đang xuất',
      success: () => {
        router.push('/login')
        return "Đã đăng xuất"
      },
      error: "Lỗi"
    })
    user?.logOut();
  }

  return (
    <div className='w-full h-16 bg-white flex items-center justify-between md:justify-evenly shadow-lg border-b-[1px] z-50'>
      <Link href={'/'} className='pl-4 md:pl-0'>
        <Image src={'/spx.png'} width={100} height={0} alt='' />
      </Link>

      <div className='hidden md:block'>
        <ul className='flex justify-between font-semibold w-full'>
          {menu.map((item, index) => (
            <li key={index} className='px-5 cursor-pointer text-gray-500 hover:text-[#ee4d2d]'>
              {item}
            </li>
          ))}
        </ul>
      </div>
      
      {user?.userData ? (
        <div className='font-semibold text-gray-500 flex items-center'>
          {user?.userData?.email}
          <div className='bg-[#ee4d2d] px-4 py-1 text-white rounded ml-2'>
            <button onClick={logout}>
              Đăng xuất
            </button>
          </div>
        </div>
      ) : (
        <div className='flex justify-between w-[200px]'>
          <Link href={'/login'} className='w-full rounded h-10 font-semibold text-white bg-[#ee4d2d] text-center flex items-center justify-center'>
            Đăng nhập {}
          </Link>

          <Link href={'/register'} className='w-full rounded h-10 font-semibold text-gray-500 hover:text-[#ee4d2d] flex items-center justify-center'>
            Đăng ký
          </Link>
        </div>
      )}


      
    </div>
  )
}
