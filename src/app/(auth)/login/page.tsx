'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaEye, FaEyeSlash, FaLock, FaUser } from "react-icons/fa";
import { BiLoaderCircle } from "react-icons/bi";

export default function Login() {

  let [email, setEmail] = useState<string>('');
  let [emailError, setEmailError] = useState<string>('');

  let [password, setPassword] = useState<string>('');
  let [passwordError, setPasswordError] = useState<string>('');
  let [passwordType, setPasswordType] = useState<string>('password');

  let [loading, setLoading] = useState<boolean>(false);

  const checkEmail = () => {
    if (email.length == 0) {
      setEmailError('Vui lòng nhập Email của bạn')
    }
    else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      setEmailError('Email không hợp lệ')
    }
    
    else {
      setEmailError('');
    }
  }

  const checkPassword = () => {
    if (password.length < 8) {
      setPasswordError('Mật khẩu cần chứa ít nhất 8 ký tự');
    }
    else if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,50}$/.test(password)) {
      setPasswordError('Mật khẩu cần chứa ít nhất 1 chữ số, 1 chữ in hoa và 1 ký tự đặc biệt');
    }
    else {
      setPasswordError('');
    }
  }

  let togglePassword = () => {
    if (passwordType == 'text') {
      setPasswordType('password');
    }
    else if (passwordType == 'password') {
      setPasswordType('text');
    }
  } 

  return (
    <div className='fixed w-full h-full flex items-center justify-center lg:bg-[#ee4d2d]'>
      <div className='text-[30px] font-bold lg:text-white text-[#ee4d2d] hidden lg:block'>
        <Link href={'/'}>
          <Image src={'/spxwhite.png'} width={400} height={0} alt='logo' />
          <p>Ship siêu rẻ - Giao siêu tốc</p>
        </Link>
      </div>

      <div className='w-[500px] bg-white h-fit lg:ml-20 rounded-lg sm:shadow-xl sm:border-[1px] lg:border-none'>
        <Link href={'/'} className='text-center flex justify-center items-center lg:hidden mt-8'>
          <Image src={'/spx.png'} alt='logo' width={150} height={0} />
        </Link>

        <div className='p-8 flex flex-col justify-center text-gray-500'>
          <h1 className='text-3xl text-center font-semibold hidden lg:block'>Đăng nhập</h1>

          <form className='mt-10'>
            <div className='h-16'>
              <div className={`flex border-b-[1px] border-b-gray-500 items-center ${emailError && 'border-b-red-500'}`}>
                <FaUser className='' />
                <input type="text" className='w-full outline-none pl-2 font-semibold text-lg' placeholder='Email' 
                  onBlur={() => { 
                    if (email.length < 1) {
                      setEmailError('Vui lòng nhập Email của bạn')
                    }
                   }} onChange={(event) => setEmail(event.target.value)}
                  onFocus={() => checkEmail()}
                />
              </div>
              <p className='text-red-500 font-semibold mt-1 text-sm'>{emailError}</p>
            </div>

            <div className='h-16 mt-6'>
              <div className={`flex border-b-[1px] border-b-gray-500 items-center ${passwordError && 'border-b-red-500'}`}>
                <FaLock />

                <input type={passwordType} className='w-full outline-none pl-2 font-semibold text-lg' placeholder='Mật khẩu' 
                  onChange={(event) => setPassword(event.target.value)} onInput={() => checkPassword()}
                />

                <div className='flex items-center justify-center'>
                  {passwordType == 'text' ? (
                    <FaEye className='text-xl' onClick={() => togglePassword()} />
                  ) : (
                    <FaEyeSlash className='text-xl' onClick={() => togglePassword()} />
                  )}
                  <Link href={'/forgotpassword'}>
                    <p className='font-semibold text-blue-500 cursor-pointer hover:underline ml-1'>Quên</p>
                  </Link>
                </div>
              </div>
              <p className='text-red-500 font-semibold mt-1 text-sm'>{passwordError}</p>
            </div>

            <button className={`w-full mt-6 rounded-lg h-12 font-semibold flex items-center justify-center text-center
            ${email && password && emailError.length < 1 && passwordError.length < 1 ? 'bg-[#ee4d2d] text-white' : 'bg-[#e8e8e8] text-gray-500'}`}
            >
              {loading ? (
                <BiLoaderCircle className='animate-spin text-xl' />
              ) : (
                <p>Đăng nhập</p>
              )}
            </button>

            <button className='w-full h-12 rounded-lg bg-[#e8e8e8] hover:bg-[#e1e1e1] mt-6 flex items-center justify-center cursor-pointer'>
              <Image  src={'/google-logo.png'} width={25} height={25} alt='gg' />
              <p className='ml-1.5 font-semibold'>Đăng nhập bằng Google</p>
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
