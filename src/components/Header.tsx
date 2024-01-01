'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { UserType } from '@/types/type';
import { useUser } from '@/hooks/userUser';

export default function Header() {

  let menu = [
    'Vận chuyển',
    'Dịch vụ',
    'Tư Vấn khách hàng',
  ]

  const user = useUser();

  const [userInfo, setUserInfo] = useState<UserType | null>(null);

  useEffect(() => {

  })

  return (
    <div className='w-full h-16 bg-white flex items-center justify-between md:justify-evenly shadow-lg border-b-[1px] z-50'>
      <Link href={'/'} className='pl-4 md:pl-0'>
        <Image src={'/spx.png'} width={100} height={0} alt='' />
      </Link>

      <div className=''>
        <ul className='flex justify-between font-semibold w-full'>
          {menu.map((item, index) => (
            <li key={index} className='px-5 cursor-pointer text-gray-500 hover:text-[#ee4d2d]'>
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div>
        {user?.userData?.email}
      </div>

      <div className='flex justify-between w-[200px]'>
        <Link href={'/login'} className='w-full rounded h-10 font-semibold text-white bg-[#ee4d2d] text-center flex items-center justify-center'>
          Đăng nhập {}
        </Link>

        <Link href={'/register'} className='w-full rounded h-10 font-semibold text-gray-500 hover:text-[#ee4d2d] flex items-center justify-center'>
          Đăng ký
        </Link>
      </div>
    </div>
  )
}
