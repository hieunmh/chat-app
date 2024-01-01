'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';

import { FaEye, FaEyeSlash, FaLock, FaUser } from "react-icons/fa";
import { BiLoaderCircle } from "react-icons/bi";

import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import axios from "axios";

import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { LoginSchema } from '@/schema/authSchema';
import { cn } from '@/lib/utils';

export type tLoginSchema = z.infer<typeof LoginSchema>


export default function Login() {

  const supabase = createClientComponentClient();

  const searchParams = useSearchParams();
  const router = useRouter()

  let [passwordType, setPasswordType] = useState<string>('password');
  let [serverError, setServerError] = useState<string>('');

  let [loading, setLoading] = useState<boolean>(false);


  let togglePassword = () => {
    if (passwordType == 'text') {
      setPasswordType('password');
    }
    else if (passwordType == 'password') {
      setPasswordType('text');
    }
  } 

  const form = useForm<tLoginSchema>({ resolver: zodResolver(LoginSchema) });

  const login = async (value: tLoginSchema) => {
    setLoading(true);
    const res = await axios.post('/api/auth/login', value)


    if (res.data.error) {
      if (res.data.error.message === 'Invalid login credentials') {
        setServerError('Sai email hoặc mật khẩu')
      } else {
        setServerError(res.data.error.message);
      }
    } else {
      if (searchParams.get('redirect')) {
        router.push(searchParams.get('redirect') as string);
      } else {
        router.push('/');
      }
    }
    
    setLoading(false);
  }

  return (
    <div className='fixed w-full h-full flex items-center justify-center lg:bg-[#ee4d2d]'>
      <div className='text-[30px] font-bold lg:text-white text-[#ee4d2d] hidden lg:block'>
        <Link href={'/'}>
          <Image src={'/spxwhite.png'} width={400} height={0} alt='logo' />
          <p>Ship siêu rẻ - Giao siêu tốc</p>
        </Link>
      </div>

      <div className='w-[500px] bg-white h-fit lg:ml-20 rounded sm:shadow-xl sm:border-[1px] lg:border-none'>
        <Link href={'/'} className='text-center flex justify-center items-center lg:hidden mt-8'>
          <Image src={'/spx.png'} alt='logo' width={100} height={0} />
        </Link>

        <div className='p-8 flex flex-col justify-center text-gray-500'>
          <h1 className='text-3xl text-center font-semibold hidden lg:block'>Đăng nhập</h1>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(login)} className={cn('w-full mt-10')}>
              <FormField control={form.control} name='email' 
                render={({ field }) => (
                  <FormItem className='h-16'>
                    <FormControl className='border-b-[1px] border-b-gray-500'>
                      <div className='flex items-center'>
                        <FaUser />
                        <input type="email" {...field} placeholder='Email' 
                          className='w-full outline-none font-semibold text-gray-500 pl-3'
                          onInput={() => setServerError('')}
                        />
                      </div>
                    </FormControl>
                    <FormMessage className='text-red-500' />
                  </FormItem>
                )}
              />

              <FormField control={form.control} name='password' 
                render={({ field }) => (
                  <FormItem className='h-16 mt-6'>
                    <FormControl className='border-b-[1px] border-b-gray-500'>
                      <div className='flex items-center justify-between'>
                        <FaLock />
                        <input type={passwordType} {...field} placeholder='Mật khẩu' 
                          className='w-full outline-none font-semibold text-gray-500 pl-3' 
                          onInput={() => setServerError('')}
                        />
                        <div className='flex items-center'>
                          {passwordType == 'password' ? (
                            <FaEyeSlash onClick={() => togglePassword()} />
                          ) : (
                            <FaEye onClick={() => togglePassword()} />
                          )}
                          <Link href={'/forgotpassword'} className='ml-2 font-semibold text-blue-500 hover:underline cursor-pointer'>Quên?</Link>
                        </div>
                        
                       </div>
                    </FormControl>
                    <FormMessage className='text-red-500' />
                    {serverError && (
                      <p className="mt-0 font-semibold text-sm text-red-500">
                        {serverError}
                      </p>
                    )}
                  </FormItem>
                )}
              />

            
              
              <button type='submit' className={`w-full bg-[#ee4d2d] hover:bg-[#de4d2d] text-white h-12 rounded mt-6 flex items-center justify-center`}>
                {loading ? (
                  <BiLoaderCircle className='animate-spin text-[25px]' />
                ) : (
                  <p className='font-semibold'>Đăng nhập</p>
                )}
              </button>

              <button type='submit' className={`w-full bg-[#e8e8e8] hover:bg-[#e1e1e1] text-gray-500 h-12 rounded mt-6 flex items-center justify-center`}>
                <Image src={'/google-logo.png'} alt='GGlogo' width={25} height={25} />
                <p className='font-semibold ml-2'>Đăng nhập bằng Google</p>
              </button>
            </form>
          </Form>
          
        </div>
      </div>
    </div>
  )
}
