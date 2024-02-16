'use client';

import { User } from '@prisma/client';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';
import Avatar from '../avatar/Avatar';
import LoadingModal from '../LoadingModal';

interface UserBoxProps {
  data: User
}

const UserBox: React.FC<UserBoxProps> = ({ data }) => {

  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = useCallback(() => {
    setIsLoading(true);

    axios.post('/api/conversations', {
      userId: data.id
    })
    .then((data) => {
      router.push(`/conversations/${data.data.id}`)
    })
    .finally(() => setIsLoading(false));

  }, [data, router])
  
  return (
    <>
      {isLoading && (
        <LoadingModal />
      )}
      <div onClick={handleClick} className='w-full relative flex items-center justify-center space-x-5
        bg-[#242424] p-3 hover:bg-[#363636] rounded-lg transition cursor-pointer'
      >
        <Avatar user={data} className='scale-[1.3]' />
        <div className='min-w-0 flex-1'>
          <p className='text-[#d2d2d2] font-semibold text-sm'>{data.name}</p>
        </div>
      </div>
    </>
  )
}

export default UserBox;