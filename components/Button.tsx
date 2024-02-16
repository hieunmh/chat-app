import clsx from 'clsx';

import { LuLoader2 } from 'react-icons/lu';

interface ButtonProps {
  type?: 'button' | 'submit' | 'reset' | undefined;
  fullWidth?: boolean;
  children?: React.ReactNode;
  onClick?: () => void;
  secondary?: boolean;
  danger?: boolean;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ type, fullWidth, children, onClick, secondary, danger, disabled }) => {
  return (
    <button onClick={onClick} type={type} disabled={disabled}
      className={clsx(`flex justify-center rounded-md px-3 py-2 text-sm font-normal
      focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 transition-all duration-500`,
        disabled && 'cursor-default', fullWidth && 'w-full',
        secondary ? 'text-gray-950' : 'text-white tracking-[0.5px]',
        danger && 'bg-rose-500 hover:bg-rose-600 focus-visible:outline-rose-600',
        !secondary && !danger && `bg-gradient-to-r from-[#0695FF] via-[#A334FA] to-[#FF6968] 
        hover:opacity-85
        focus-visible:opacity-85`
      )}
    >
      {disabled ? (
        <div className='h-5'>
          <LuLoader2 size={20} className='animate-spin' />
        </div>
      ) : (
        <>{children}</>
      )}
    </button>
  )
}

export default Button;