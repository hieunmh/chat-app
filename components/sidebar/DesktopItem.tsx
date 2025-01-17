'use client';

import React from 'react';
import clsx from 'clsx';
import Link from 'next/link';

interface DesktopItemProps {
  label: string;
  icon: any;
  href: string;
  onClick?: () => void;
  active?: boolean;
}

const DesktopItem: React.FC<DesktopItemProps> = ({ label, icon: Icon, href, onClick, active }) => {

  const handleClick = () => {
    if (onClick) {
      return onClick();
    }
  }

  return (
    <div>
      <li onClick={handleClick}>
        <Link href={href} className={clsx(`group flex gap-x-3 rounded-md p-3 text-sm 
          leading-6 font-semibold text-gray-500 hover:text-gray-200 hover:bg-[#363636]`,
            active && 'bg-[#363636] text-white'
          )}
        >
          <Icon className='h-6 w-6 shrink-0' />
          <span className='sr-only'>{label}</span>
        </Link>
      </li>
    </div>
  )
}

export default DesktopItem;
