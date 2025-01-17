'use client';

import useConversation from '@/hooks/useConversation';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';
import toast from 'react-hot-toast';
import Modal from './Modal';

import { FiAlertTriangle } from 'react-icons/fi';
import { Dialog } from '@headlessui/react';
import Button from '../Button';

interface ConfirmModalProps {
  isOpen?: boolean;
  onClose: () => void;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({ isOpen, onClose }) => {

  const router = useRouter();

  const { conversationId } = useConversation();
  const [isLoading, setIsLoading] = useState(false);

  const onDelete = useCallback(() => {
    setIsLoading(true);

    axios.delete(`/api/conversations/${conversationId}`)
    .then(() => {
      onClose();

      router.push('/conversations');
      router.refresh();
    })
    .catch(() => toast.error(<div className='text-sm font-semibold'>Something went wrong!</div>))
    .finally(() => setIsLoading(false));

  }, [conversationId, router, onClose]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className='sm:flex sm:items-start'>
        <div className='mx-auto flex h-12 w-12 flex-shrink-0 items-center 
          justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10'
        >
          <FiAlertTriangle className='w-6 h-6 text-red-600' />
        </div>
        <div className='mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left'>
          <Dialog.Title as='h3' className='text-base font-semibold leading-6 text-[#d2d2d2]'>
            Delete conversation
          </Dialog.Title>
          <div className='mt-2'>
            <p className='text-sm text-[#797979]'>
              Are you sure you want to delete this conversation? This can not be undone.
            </p>
          </div>
        </div>  
      </div>

      <div className='mt-5 sm:mt-4 sm:flex sm:flex-row-reverse'>
        <Button disabled={isLoading} danger
          onClick={onDelete}
        >
          Delete
        </Button>
        <button disabled={isLoading}
          onClick={onClose} className='px-3 py-2 text-sm font-normal text-[#d2d2d2] tracking-[0.5px]'
        >
          Cancel
        </button>
      </div>

    </Modal>
  )
}
 
export default ConfirmModal;