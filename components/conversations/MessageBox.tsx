'use client';

import { FullMessageType } from '@/types';
import clsx from 'clsx';
import { useSession } from 'next-auth/react';
import Avatar from '../Avatar';
import { format } from 'date-fns';
import Image from 'next/image';
import { useState } from 'react';

interface MessageBoxProps {
  data: FullMessageType;
  isLast?: boolean;
}

const MessageBox: React.FC<MessageBoxProps> = ({ data, isLast }) => {

  const session = useSession();

  const isOwn = session?.data?.user?.email === data?.sender?.email;
  const name = session?.data?.user?.email === data?.sender?.email ? '' : data?.sender?.name;
  const seenList= (data?.seen || []).filter(user => user.email !== data?.sender?.email)
  .map(user => user.name).join(', ');

  const container = clsx(`flex gap-3 p-4`, isOwn && 'justify-end');

  const [isHover, setIsHover] = useState(false);

  return (
    <div className={container}>
      <div className={isOwn ? 'hidden' : 'flex items-end'}>
        <Avatar user={data.sender} />
      </div>

      <div className='flex flex-col gap-1'>
        <div className={`flex items-center gap-1 ${isOwn && 'flex-row-reverse'}`}>
          <div className='text-sm text-gray-500'>{name}</div>
          <div className='text-xs text-gray-400 block md:hidden'>
            {format(new Date(data.createdAt), 'dd-MM-yyyy')} at {format(new Date(data.createdAt), 'HH:mm')}
          </div>
        </div>

        <div className={`flex items-center ${isOwn && 'justify-end'}`}>
          {isOwn && (
            <div className={`items-center text-black mx-2 ${isHover ? 'flex' : 'hidden'}`}>
              <div className='text-xs text-gray-400'>
                {format(new Date(data.createdAt), 'dd-MM-yyyy')} at {format(new Date(data.createdAt), 'HH:mm')}
              </div>
            </div>
          )}

          <div className='' onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}>
            {data.image ? (
              <Image src={data.image} height={1000} width={1000} alt='image' 
                className='object-cover cursor-pointer transition translate w-72 h-72 rounded-md p-0'
              />
            ) : (
              <div className={`${isOwn ? 'bg-sky-500 text-white items-start' : 'bg-gray-100'} 
                rounded-xl px-3 py-2 text-pretty max-w-[300px] sm:max-w-md xl:max-w-lg`}
              >
                {data.body}
              </div>
            )}
          </div>

          {!isOwn && (
            <div className={`items-center text-black mx-2 ${isHover ? 'flex' : 'hidden'}`}>
              <div className='text-xs text-gray-400'>
                {format(new Date(data.createdAt), 'dd-MM-yyyy')} at {format(new Date(data.createdAt), 'HH:mm')}
              </div>
            </div>
          )}
        </div>
        {isLast && isOwn && seenList.length > 0 && (
          <div className='text-xs font-light text-gray-500 text-end'>
            {`Seen by ${seenList}`}
          </div>
        )}
      </div>
    </div>
  )
}
 
export default MessageBox;