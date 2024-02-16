'use client';

import useOtherUser from '@/hooks/useOtherUser';
import { Conversation, User } from '@prisma/client';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import { HiChevronLeft, HiEllipsisHorizontal } from 'react-icons/hi2';
import Avatar from '../avatar/Avatar';
import ProfileDrawer from './ProfileDrawer';
import AvatarGroup from '../avatar/AvatarGroup';
import useActiveList from '@/hooks/useActiveList';


interface HeaderProps {
  conversation: Conversation & { users: User[] };
}

const Header: React.FC<HeaderProps> = ({ conversation }) => {

  const otherUser= useOtherUser(conversation);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { members } = useActiveList();
  
  const isActive = members.indexOf(otherUser?.email!) !== -1;

  const statusText = useMemo(() => {
    if (conversation.isGroup) {
      return `${conversation.users.length} members`;
    }

    return isActive ? 'Active now' : 'Offline';

  }, [conversation]);

  return (
    <>  
      <ProfileDrawer data={conversation} isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} />

      <div className='bg-[#242424] w-full flex border-b border-b-[#363636] 
        sm:px-4 py-3 px-4 lg:px-6 justify-between items-center shadow-sm'
      >
        <div className='flex gap-3 items-center'>
          <Link href={'/conversations'} className='lg:hidden block 
            text-sky-500 hover:text-sky-600 transition cursor-pointer'
          >
            <HiChevronLeft size={32} />
          </Link>

          {conversation.isGroup ? (
            <AvatarGroup users={conversation.users} className='scale-[1.2]' />
          ) : (
            <Avatar user={otherUser} className='scale-[1.2]' />
          )}

          <div className='flex flex-col'>
            <div className='font-semibold text-[#d2d2d2] tracking-[1px]'>{conversation.name || otherUser.name}</div>
            <div className='text-xs font-normal tracking-[0.5px] text-[#797979]'>{statusText}</div>
          </div>
        </div>
        <div className='p-1 rounded-full hover:bg-[#363636]/50'>
          <HiEllipsisHorizontal size={28} onClick={() => setDrawerOpen(true)} 
            className='text-sky-500 cursor-pointer hover:text-sky-600 transition'
          />
        </div>
      </div>
    </>
  )
}
 
export default Header;