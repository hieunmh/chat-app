import Image from 'next/image';
import { IconType } from 'react-icons';

interface AuthSocialButtonProps {
  icon: string;
  onClick: () => void;
}

const AuthSocialButton: React.FC<AuthSocialButtonProps> = ({ icon, onClick }) => {
  return (
    <button type='button' onClick={onClick} 
      className='inline-flex w-full justify-center rounded-md bg-white px-4 py-2 text-gray-500 
      shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-100 focus:outline-offset-0'
    >
      <Image alt={icon} src={icon} width={1000} height={1000} className='w-4 h-4' />
    </button>
  )
}

export default AuthSocialButton;