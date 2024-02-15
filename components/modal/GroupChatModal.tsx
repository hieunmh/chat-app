'use client';

import { User } from '@prisma/client';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Field, FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import Modal from './Modal';
import Input from '../input/Input';
import Select from '../input/Select';
import Button from '../Button';
import { LuLoader2 } from 'react-icons/lu';

interface GroupChatModalProps {
  isOpen?: boolean;
  onClose: () => void;
  users: User[]
}

const GroupChatModal: React.FC<GroupChatModalProps> = ({ isOpen, onClose, users }) => {

  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      members: []
    }
  });

  const members = watch('members');

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    axios.post('/api/conversations', {
      ...data,
      isGroup: true
    })
    .then(() => {
      router.refresh();
      onClose();
    })
    .catch(() => toast.error(<div className='text-sm font-semibold'>Somethign went wrong!</div>))
    .finally(() => setIsLoading(false));
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='space-y-12'>
          <div className='border-b border-gray-900/10 pb-12'>
            <h2 className='text-base font-semibold leading-7 text-gray-900'>
              Create a group chat
            </h2>
            <p className='mt-1 text-sm leading-6 text-gray-600'>Create a chat with more than 2 people.</p>
            <div className='mt-10 flex flex-col gap-y-8'>
              <Input register={register} label='Name' id='name' disabled={isLoading} required errors={errors} />
              <Select disabled={isLoading} label='Members'  
                options={users.map(user => ({
                  value: user.id,
                  label: user.name
                }))}
                onChange={(value) => setValue('members', value, { shouldValidate: true })}
                value={members}
              />
            </div>
          </div>
        </div>

        <div className='mt-6 flex items-center justify-end gap-x-6'>
          <button disabled={isLoading}
            onClick={onClose} className='px-3 py-2 text-sm font-semibold '
          >
            Cancel
          </button>

          <button disabled={isLoading} type='submit'
            className='px-3 py-2 text-sm font-semibold bg-sky-500 rounded-md text-white hover:opacity-80'
          >
            {isLoading ? (
              <div className='h-5 w-12 flex items-center justify-center'>
                <LuLoader2 size={20} className='animate-spin' />
              </div>
            ) : (
              <p className='w-12'>Create</p>
            )} 
          </button>
        </div>
      </form>
    </Modal>
  )
}
 
export default GroupChatModal;