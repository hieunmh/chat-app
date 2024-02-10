'use client';

import useRoutes from '@/hooks/useRoutes';
import React, { useState } from 'react'
import DesktopItem from './DesktopItem';

export default function DeskopSidebar() {

  const routes = useRoutes();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className='hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-40 lg:w-20 xl:px-6 
      lg:overflow-y-auto lg:bg-white lg:border-r lg:pb-4 lg:flex lg:flex-col justify-between'
    >
      <nav className='mt-4 flex flex-col justify-between'>
        <ul role='list' className='flex flex-col items-center space-y-1'>
          {routes.map(item => (
            <DesktopItem key={item.label} href={item.href} active={item.active}
              label={item.label} icon={item.icon} onClick={item.onClick} 
            />
          ))}
        </ul>
      </nav>
    </div>
  )
}
