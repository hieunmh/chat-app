

import clsx from 'clsx';

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
      className={clsx(`flex justify-center rounded-md px-3 py-2 text-sm font-semibold 
      focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 transition-all duration-500`,
        disabled && 'opacity-50 cursor-default', fullWidth && 'w-full',
        secondary ? 'text-gray-950' : 'text-white',
        danger && 'bg-rose-500 hover:bg-rose-600 focus-visible:outline-rose-600',
        !secondary && !danger && ` bg-gradient-to-r from-[#0695FF] via-[#A334FA] to-[#FF6968] 
        hover:from-indigo-500 hover:via-purple-500 hover:to-pink-500
        focus-visible:from-indigo-500 focus-visible:via-purple-500 focus-visible:to-pink-500`
      )}
    >
      {children}
    </button>
  )
}

export default Button;