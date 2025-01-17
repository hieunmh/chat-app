'use client';

import useConversation from '@/hooks/useConversation';
import axios from 'axios';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { HiPaperAirplane, HiPhoto } from 'react-icons/hi2';
import MessageInput from './MessageInput';
import { CldUploadButton } from 'next-cloudinary';

interface FormProps {

}

const Form: React.FC<FormProps> = ({  }) => {

  const { conversationId } = useConversation();
  
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<FieldValues>({
    defaultValues: {
      message: ''
    }
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setValue('message', '', { shouldValidate: true });

    axios.post('/api/messages', { ...data, conversationId })
  }

  const handleUpload = async (res: any) => {
    axios.post('/api/messages', {
      image: res?.info?.secure_url,
      conversationId
    })
  }

  return (
    <div className='py-4 px-4 bg-[#242424] border-t border-t-[#363636] flex items-center gap-2 lg:gap-4 w-full'>
      <CldUploadButton options={{ maxFiles: 1 }}
        onUpload={handleUpload}
        uploadPreset='o8neke75'
      >
        <HiPhoto size={30} className='text-sky-500' />
      </CldUploadButton>

      <form onSubmit={handleSubmit(onSubmit)} className='flex items-center gap-2 lg:gap-4 w-full'>
        <MessageInput id='message' register={register} errors={errors} 
          required placeholder='Aa' 
        />
        <button type='submit' className='rounded-full p-2 bg-sky-500 hover:bg-sky-600 cursor-pointer transition'>
          <HiPaperAirplane size={18} className='text-white' />
        </button>
      </form>
    </div>
  )
}
 
export default Form;