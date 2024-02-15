'use client';

import { User } from '@prisma/client';
import Image from 'next/image';

interface AvatarGroupProps {
  users?: User[]
}

const AvatarGroup: React.FC<AvatarGroupProps> = ({ users }) => {

  const sliceUsers = users?.slice(0, 2);

  const positionMap = {
    0: 'top-0 right-0',
    1: 'bottom-0',
  }

  return (
    <div className='relative md:h-11 h-9 md:w-11 w-9'>
      {sliceUsers?.map((user, index) => (
        <div key={user.id} className={`absolute inline-block rounded-full overflow-hidden h-[30px] w-[30px] border
          ${positionMap[index as keyof typeof positionMap]}`}
        >
          <Image src={user?.image || '/image/placeholder.jpg'} alt='avatar' fill />
        </div>
      ))}
      <span className='absolute block rounded-full bg-green-500 
        ring-2 ring-white bottom-0 right-0 h-2 w-2 md:h-3 md:w-3' 
      />
    </div>
  )
}
 
export default AvatarGroup;