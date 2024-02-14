'use client';

import { User } from '@prisma/client';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import Modal from './Modal';
import Input from '../input/Input';
import Image from 'next/image';
import { CldUploadButton } from 'next-cloudinary';
import Button from '../Button';

interface SettingModalProps {
  isOpen?: boolean;
  onClose: () => void;
  currentUser: User
}

const SettingModal: React.FC<SettingModalProps> = ({ isOpen, onClose, currentUser }) => {

  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<FieldValues>({
    defaultValues: {
      name: currentUser?.name,
      image: currentUser?.image
    }
  });

  const image = watch('image');

  const handleUpload = (res: any) => {
    setValue('image', res?.info?.secure_url, {
      shouldValidate: true
    })
  }

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);  

    axios.post('/api/settings', data)
    .then(() => {
      router.refresh();
      onClose();
    })
    .catch(() => toast.error(<div className='font-semibold text-sm'>Some thing went wrong!</div>))
    .finally(() => setIsLoading(false));

  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='space-y-12'>
          <div className='border-b border-b-gray-900/10 pb-12'>
            <h2 className='text-base font-semibold leading-7 text-gray-900'>Profile</h2>

            <p className='mt-1 text-sm leading-6 text-gray-600'>Edit your public information</p>

            <div className='mt-10 flex flex-col gap-y-8'>
              <Input disabled={isLoading} label='Name' id='name' errors={errors} required register={register} />

              <div>
                <label className='block text-sm font-medium leading-6 text-gray-900'>Photo</label>
                <div className='mt-2 flex items-center gap-x-3'>
                  <Image width={960} height={960} src={image || currentUser?.image || '/image/placeholder.jpg'}
                    className='rounded-full h-24 w-24 border-[2px] border-sky-500' alt='avatar'
                  />

                  <CldUploadButton options={{ maxFiles: 1 }} onUpload={handleUpload} uploadPreset='o8neke75'>
                    <button disabled={isLoading} type='button' className='px-3 py-2 text-sm font-semibold'>
                      Change
                    </button>
                  </CldUploadButton>
                </div>
              </div>
            </div>
          </div>

          <div className='mt-6 flex items-center justify-end gap-x-6'>
            <button className='px-3 py-2 text-sm font-semibold'
              onClick={onClose}
            >
              Cancel
            </button>
            <button className='px-3 py-2 text-sm font-semibold bg-sky-500 rounded-md text-white hover:opacity-80'
              onClick={onClose} type='submit'
            >
              Save
            </button>
          </div>
          
        </div>
      </form>
    </Modal>
  )
}
 
export default SettingModal;