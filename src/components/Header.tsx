import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Header() {

  let menu = [
    'Vận chuyển',
    'Dịch vụ',
    'Tư Vấn khách hàng',
  ]

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

      <div className=''>
        
      </div>
    </div>
  )
}
