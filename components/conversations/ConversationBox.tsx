'use client';

import { useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';  
import {  format } from 'date-fns';
import { useSession } from 'next-auth/react';
import clsx from 'clsx';
import { FullConversationType } from '@/types';
import useOtherUser from '@/hooks/useOtherUser';
import Avatar from '../Avatar';

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
      if (otherUser?.id === lastMessage?.sender?.id) {
        return `${lastMessage.sender.name} sent a photo.`;
      }
      
      return 'You sent a photo.';
    }

    if (lastMessage?.body) {
      
      return otherUser?.id === lastMessage?.sender?.id ? 
      lastMessage.body : 'You: ' + lastMessage.body;
    }

    return 'Started a conversation';

  }, [lastMessage, session, otherUser]);

  return ( 
    <div onClick={handleClick} className={clsx(` w-full relative flex items-center 
      space-x-3 hover:bg-neutral-100 rounded-lg transition cursor-pointer p-3`,
      selected ? 'bg-neutral-100' : 'bg-white'
      )}
    >
      <Avatar user={otherUser} />
      <div className='min-w-0 flex-1'>
        <div className='focus:outline-none'>
          <div className='flex justify-between items-center mb-1'>
            <p className='text-md font-medium text-gray-900'>{data.name || otherUser.name}</p>
          </div>
          <div className={clsx(`text-sm flex w-full justify-start items-center space-x-1`,
              hasSeen ? 'text-gray-500' : 'text-black font-medium'
            )}
          >
            <p className='truncate'>{lastMessageText}.</p>
            {lastMessage?.createdAt && (
              <p className='text-sm text-gray-400 font-light'>
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