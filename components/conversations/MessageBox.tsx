'use client';

import { FullMessageType } from '@/types';
import clsx from 'clsx';
import { useSession } from 'next-auth/react';
import Avatar from '../avatar/Avatar';
import { format } from 'date-fns';
import Image from 'next/image';
import { useState } from 'react';
import ImageModal from '../modal/ImageModal';

interface MessageBoxProps {
  data: FullMessageType;
  isLast?: boolean;
}

const MessageBox: React.FC<MessageBoxProps> = ({ data, isLast }) => {

  const session = useSession();

  const [imageModalOpen, setImageModalOpen] = useState(false);

  const isOwn = session?.data?.user?.email === data?.sender?.email;
  const name = session?.data?.user?.email === data?.sender?.email ? '' : data?.sender?.name;
  const seenList= (data?.seen || []).filter(user => user.email !== data?.sender?.email)
  .map(user => user.name).join(', ');

  const container = clsx(`flex gap-3 p-4`, isOwn && 'justify-end');

  const [isHover, setIsHover] = useState(false);

  return (
    <div className={container}>
      <ImageModal src={data.image} isOpen={imageModalOpen} onClose={() => setImageModalOpen(false)} />
      
      <div className={isOwn ? 'hidden' : 'flex items-end'}>
        <Avatar user={data.sender} className='' />
      </div>

      <div className='flex flex-col gap-1'>
        <div className={`flex items-center gap-1 ${isOwn && 'flex-row-reverse'}`}>
          <div className='text-sm text-[#d2d2d2] font-normal tracking-[1px]'>{name}</div>
          <div className='text-xs text-[#d2d2d2] block md:hidden'>
            {format(new Date(data.createdAt), 'dd-MM-yyyy')} at {format(new Date(data.createdAt), 'HH:mm')}
          </div>
        </div>

        <div className={`flex items-center ${isOwn && 'justify-end'}`}>
          {isOwn && (
            <div className={`items-center mx-2 ${isHover ? 'flex' : 'hidden'}`}>
              <div className='text-xs text-[#d2d2d2]'>
                {format(new Date(data.createdAt), 'dd-MM-yyyy')} at {format(new Date(data.createdAt), 'HH:mm')}
              </div>
            </div>
          )}

          <div className='' onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}>
            {data.image ? (
              <Image onClick={() => setImageModalOpen(true)} src={data.image} height={1000} width={1000} alt='image' 
                className='object-cover cursor-pointer transition translate w-72 rounded-md p-0'
              />
            ) : (
              <div className={`${isOwn ? 'bg-[#0A7CFF] text-[#ffffff] items-start' : 'bg-[#424242] text-[#ffffff]'} 
                rounded-xl px-3 py-2 text-pretty max-w-[300px] sm:max-w-md xl:max-w-lg`}
              >
                {data.body}
              </div>
            )}
          </div>

          {!isOwn && (
            <div className={`items-center mx-2 ${isHover ? 'flex' : 'hidden'}`}>
              <div className='text-xs text-[#d2d2d2]'>
                {format(new Date(data.createdAt), 'dd-MM-yyyy')} at {format(new Date(data.createdAt), 'HH:mm')}
              </div>
            </div>
          )}
        </div>
        {isLast && isOwn && seenList.length > 0 && (
          <div className='text-xs font-light text-[#d2d2d2] text-end'>
            {`Seen by ${seenList}`}
          </div>
        )}
      </div>
    </div>
  )
}
 
export default MessageBox;