'use client';

import useRoutes from '@/hooks/useRoutes';
import React, { useState } from 'react'
import DesktopItem from './DesktopItem';
import { User } from '@prisma/client';
import Avatar from '../avatar/Avatar';
import SettingModal from '../modal/SettingModal';

interface DeskopSidebarProps {
  currentUser: User
}

const DeskopSidebar: React.FC<DeskopSidebarProps> = ({ currentUser }) => {

  const routes = useRoutes();
  const [isOpen, setIsOpen] = useState(false);

  

  return (
    <>
      <SettingModal currentUser={currentUser} isOpen={isOpen} onClose={() =>  setIsOpen(false)} />

      <div className='hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-40 lg:w-20 xl:px-6 
        lg:overflow-y-auto lg:bg-[#242424] lg:border-r border-r-[#363636] lg:pb-4 lg:flex lg:flex-col justify-between'
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
        
        <nav className='mt-4 flex flex-col justify-between items-center'>
          <div onClick={() => setIsOpen(true)} className='cursor-pointer hover:opacity-75 transition'>
            <Avatar user={currentUser} className='scale-[1.3]' />
          </div>
        </nav>
      </div>
    </>
  )
}

export default DeskopSidebar;
