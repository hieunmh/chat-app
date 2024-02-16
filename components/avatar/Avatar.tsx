'use client';

import useActiveList from "@/hooks/useActiveList";
import { User } from "@prisma/client";
import Image from "next/image";

interface AvatarProps {
  user?: User;
  className?: string;
}

const Avatar: React.FC<AvatarProps> = ({ user, className }) => {

  const { members } = useActiveList();
  const isActive = members.indexOf(user?.email!) !== -1;


  return (
    <div className={`relative h-8 w-8 ${className}`}>
      <div className='relative inline-block rounded-full overflow-hidden h-8 w-8'>
        <Image src={user?.image || '/image/placeholder.jpg'} alt='avatar' fill />
      </div>
     {isActive && (
       <span className='absolute block rounded-full bg-green-500 
        bottom-[1.5px] right-[1.5px] h-2 w-2' 
      />
     )}
    </div>
  )
}

export default Avatar;