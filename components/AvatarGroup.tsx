'use client';

import { User } from '@prisma/client';
import Image from 'next/image';

interface AvatarGroupProps {
  users?: User[];
  className?: string;
}

const AvatarGroup: React.FC<AvatarGroupProps> = ({ users, className }) => {

  const sliceUsers = users?.slice(0, 2);

  const positionMap = {
    0: 'top-0 right-0',
    1: 'bottom-0',
  }

  return (
    <div className={`relative h-8 w-8 ${className}`}>
      {sliceUsers?.map((user, index) => (
        <div key={user.id} className={`absolute inline-block rounded-full overflow-hidden h-[22px] w-[22px] border
          ${positionMap[index as keyof typeof positionMap]}`}
        >
          <Image src={user?.image || '/image/placeholder.jpg'} alt='avatar' fill />
        </div>
      ))}
      <span className='absolute block rounded-full bg-green-500 
        ring-1 ring-white bottom-[2px] right-[2px] h-1.5 w-1.5' 
      />
    </div>
  )
}
 
export default AvatarGroup;