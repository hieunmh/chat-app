import AuthForm from '@/components/auth/AuthForm';
import Image from 'next/image';

export default function Home() {
  return (
    <div className='flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8 bg-gray-100'>
      <div className='sm:mx-auto sm:w-full sm:max-w-md'>
        <Image src={'/image/messenger.png'} alt="logo" height={2048} width={2048} 
          className='mx-auto w-12 h-12'
        />
        <h2 className='mt-6 text-center text-2xl font-bold text-gray-950'>
          Connect with your favorite people
        </h2>
      </div>

      <AuthForm />
    </div>
  );
}
