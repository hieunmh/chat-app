'use client';

import React from 'react';
import Link from 'next/link';
import clsx from 'clsx';

interface MobileItemProps {
  icon: any;
  href: string;
  onClick?: () => void;
  active?: boolean;
}


const MobileItem: React.FC<MobileItemProps> = ({ href, icon: Icon, active, onClick }) => {

  const handleClick= () => {
    if (onClick) return onClick();
  }

  return (
    <Link href={href} onClick={handleClick} className={clsx(` group flex gap-x-3 text-sm leading-6 
      font-semibold w-full justify-center p-4 text-gray-500 hover:text-gray-100 hover:bg-[#363636]`,
        active && 'bg-[#363636] text-gray-100'
      )}
    >
      <Icon className='h-6 w-6' />
    </Link>
  )
}

export default MobileItem;
