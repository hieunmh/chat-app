'use client';

import { User } from "@prisma/client";
import Image from "next/image";

interface AvatarProps {
  user?: User;
  className?: string;
}

const Avatar: React.FC<AvatarProps> = ({ user, className }) => {
  return (
    <div className={`relative h-8 w-8 ${className}`}>
      <div className='relative inline-block rounded-full overflow-hidden h-8 w-8 border'>
        <Image src={user?.image || '/image/placeholder.jpg'} alt='avatar' fill />
      </div>
      <span className='absolute block rounded-full bg-green-500 
        ring-1 ring-white bottom-[2px] right-[2px] h-1.5 w-1.5' 
      />
    </div>
  )
}

export default Avatar;