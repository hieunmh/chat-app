'use client';

import { useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';  
import {  format } from 'date-fns';
import { useSession } from 'next-auth/react';
import clsx from 'clsx';
import { FullConversationType } from '@/types';
import useOtherUser from '@/hooks/useOtherUser';
import Avatar from '../Avatar';
import AvatarGroup from '../AvatarGroup';

interface ConversationBoxProps {
  data: FullConversationType;
  selected?: boolean;
}

const ConversationBox: React.FC<ConversationBoxProps> = ({ data, selected }) => {

  const otherUser = useOtherUser(data);

  const session = useSession();
  const router = useRouter();

  const handleClick = useCallback(() => {
    router.push(`/conversations/${data.id}`);

  }, [data.id, router]);

  const lastMessage = useMemo(() => {
    const messages = data.messages || [];

    return messages[messages.length - 1];
  }, [data.messages]);

  const userEmail = useMemo(() => {
    return session?.data?.user?.email;
  }, [session?.data?.user?.email]);

  const hasSeen = useMemo(() => {
    if (!lastMessage) {
      return false;
    }

    const seenArray = lastMessage.seen || [];

    if (!userEmail) {
      return false;
    }

    return seenArray.filter(user => user.email === userEmail).length !== 0;

  }, [userEmail, lastMessage]);

  const lastMessageText = useMemo(() => {
    if (lastMessage?.image) {
      return session.data?.user?.email === lastMessage?.sender?.email ? 
      'You sent a photo' : (data.isGroup ? 
        lastMessage.sender.name + ' sent a photo' : ''
      );
    }

    if (lastMessage?.body) {
      
      return session.data?.user?.email === lastMessage?.sender?.email ? 
      'You: ' + lastMessage.body : (data.isGroup ? 
        lastMessage.sender.name + ': ' + lastMessage.body : lastMessage.body
      );
    }

    return 'Started a conversation';

  }, [lastMessage, session, otherUser]);

  return ( 
    <div onClick={handleClick} className={clsx(` w-full relative flex items-center 
      space-x-3 hover:bg-neutral-100 rounded-lg transition cursor-pointer p-3`,
      selected ? 'bg-neutral-100' : 'bg-white'
      )}
    > 
      <div className='h-12 w-12 flex items-center justify-center'>
        {data.isGroup ? ( 
          <AvatarGroup users={data.users} className='scale-[1.6]' /> 
          ) : ( 
          <Avatar user={otherUser} className='scale-[1.6]' />
        )}
      </div>

      <div className='min-w-0 flex-1'>
        <div className='focus:outline-none'>
          <div className='flex justify-between items-center mb-1'>
            <p className='text-sm font-semibold text-gray-900'>{data.name || otherUser.name}</p>
          </div>
          <div className={clsx(`text-xs flex w-full justify-start items-center space-x-1`,
              hasSeen ? 'text-gray-500' : 'text-black font-medium'
            )}
          >
            <p className='truncate'>{lastMessageText}.</p>
            {lastMessage?.createdAt && (
              <p className='text-xs text-gray-400 font-light'>
                {format(new Date(lastMessage?.createdAt), 'HH:mm')}
              </p>
            )}
          </div>
        </div>
      </div>
    </div> 
  )
}
 
export default ConversationBox;