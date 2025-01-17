import React from 'react';
import clsx from 'clsx';
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';

interface InputProps {
  label: string;
  id: string;
  type?: string;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  disabled?: boolean;
  dark?: boolean;
}

const Input: React.FC<InputProps> = ({ label, id, type, required, register, errors, disabled, dark }) => {
  return (
    <div>
      <label htmlFor={id} className={`block text-sm font-medium leading-6 ${dark ? 'text-[#d2d2d2]' : 'text-gray-950'}`}>
        {label}
      </label>
      <div className='mt-2'>
        <input type={type} id={id} autoComplete={id} disabled={disabled} 
          {...register(id, { required })}
          className={clsx(`form-input block w-full rounded-md border-0 py-1.5 
          shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset 
          focus-within:ring-sky-600 sm:text-sm sm:leading-6`,
           errors[id] && 'focus:ring-rose-500', 
           disabled && 'opacity-80 cursor-default',
           dark && 'text-[#d2d2d2] bg-[#242424] ring-0 outline-none'
          )}
        />
      </div>
    </div>
  )
}


export default Input;